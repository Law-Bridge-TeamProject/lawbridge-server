import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { Server as SocketIOServer } from "socket.io";
import { useServer } from "graphql-ws/use/ws";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import mongoose from "mongoose";
import cors from "cors";
import { GraphQLError } from "graphql";

// Uses the pure backend SDK. This is the correct pattern now that dependencies are fixed.
import { verifyToken } from "@clerk/backend";
import { clerkClient } from "@clerk/express";

// Your project's local file imports
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { Message } from "./models/message.model";
import { Context } from "./types/context";

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URL ?? "");
  console.log("✅ Connected to MongoDB");

  const app = express();
  const httpServer = createServer(app);

  // --- Your existing Socket.IO setup (for non-GraphQL chat) ---
  const io = new SocketIOServer(httpServer, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    console.log("⚡ Socket.IO client connected:", socket.id);

    socket.on("chat", async (data) => {
      try {
        const { content, sender } = data;
        const message = await Message.create({ content, sender });
        io.emit("chat", message);
      } catch (error) {
        console.error("Error saving Socket.IO message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket.IO client disconnected:", socket.id);
    });
  });

  // --- GraphQL WebSocket Server for Subscriptions ---
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      context: async (ctx): Promise<Context> => {
        console.log("--- New WebSocket Connection Attempt ---");
        const connectionParams = ctx.connectionParams || {};
        const authHeader = (connectionParams.Authorization ||
          connectionParams.authorization ||
          "") as string;

        const baseContext: Context = { db: mongoose.connection.db };

        if (!authHeader.startsWith("Bearer ")) {
          console.warn("WebSocket connection without token. Closing.");
          // Use code 4401 for "Unauthorized"
          ctx.extra.socket.close(4401, "Unauthorized");
          return baseContext;
        }

        try {
          const token = authHeader.split(" ")[1];
          console.log("Verifying WebSocket token...");
          const parsedToken = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY!,
          });

          const userId = parsedToken.sub;
          const user = await clerkClient.users.getUser(userId);
          const role = user.publicMetadata?.role as string;

          console.log(
            "✅ WebSocket Auth Successful. Context created for user:",
            userId
          );
          return {
            ...baseContext,
            userId,
            username: user.username || user.emailAddresses[0]?.emailAddress,
            role,
            clientId: role === "user" ? userId : undefined,
            lawyerId: role === "lawyer" ? userId : undefined,
          };
        } catch (error) {
          console.error("❌ WebSocket Auth Failed:", (error as Error).message);
          ctx.extra.socket.close(4401, "Unauthorized");
          return baseContext;
        }
      },
    },
    wsServer
  );

  const apolloServer = new ApolloServer<Context>({
    schema,
    introspection: true,
  });
  await apolloServer.start();

  app.use(
    cors({
      origin: "*", // эсвэл яг ашиглаж байгаа хостыг тодорхой зааж болно, жишээ нь "http://localhost:3000"
      credentials: true,
    })
  );
  app.use(express.json());

  // --- This is the GraphQL HTTP Middleware. It will now work without errors. ---
  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }): Promise<Context> => {
        console.log("--- New HTTP Request ---");
        const authHeader = req.headers.authorization || "";
        const baseContext: Context = { req, db: mongoose.connection.db };

        if (!authHeader.startsWith("Bearer ")) {
          console.log(
            "Request has no Bearer token. Proceeding as unauthenticated."
          );
          return baseContext;
        }

        try {
          const token = authHeader.split(" ")[1];
          console.log("Verifying HTTP Bearer token...");
          const parsedToken = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY!,
          });

          const userId = parsedToken.sub;
          const user = await clerkClient.users.getUser(userId);
          const role = user.publicMetadata?.role as string;

          console.log("✅ HTTP Auth Successful. Context:", {
            userId,
            role,
            lawyerId: role === "lawyer" ? userId : undefined,
          });

          return {
            ...baseContext,
            userId,
            username: user.username || user.emailAddresses[0]?.emailAddress,
            role,
            clientId: role === "user" ? userId : undefined,
            lawyerId: role === "lawyer" ? userId : undefined,
          };
        } catch (error: any) {
          console.error("❌ HTTP Auth Failed:", error.message);
          // This stops the request and sends a clear error to the GraphQL client.
          throw new GraphQLError("User is not authenticated.", {
            extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
          });
        }
      },
    })
  );

  const PORT = Number(process.env.PORT) || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`📡 Subscriptions ready at ws://localhost:${PORT}/graphql`);
    console.log(`🔌 Socket.IO ready at ws://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
