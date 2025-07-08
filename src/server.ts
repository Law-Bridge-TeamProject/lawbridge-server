import "dotenv/config";
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/use/ws";
import { WebSocketServer } from "ws";
import { Server as SocketIOServer } from "socket.io";

import { clerkClient, getAuth } from "@clerk/express";
import { verifyToken } from "@clerk/backend";
import { clerkMiddleware } from "@clerk/express";

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

  // --- Socket.IO (chat) ---
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Socket.IO client connected:", socket.id);

    socket.on("chat", async (data) => {
      try {
        const { content, sender, userId } = data;

        if (!userId) {
          console.error("❌ Message validation failed: userId is required.");
          return;
        }

        const message = await Message.create({
          content,
          sender,
          userId,
        });

        io.emit("chat", message);
      } catch (err) {
        console.error("❌ Error saving Socket.IO message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket.IO client disconnected:", socket.id);
    });
  });

  // --- WebSocket (GraphQL Subscriptions) ---
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      context: async (ctx): Promise<Context> => {
        const token =
          (ctx.connectionParams?.Authorization as string)?.replace("Bearer ", "") ?? "";

        const baseContext: Context = {
          db: mongoose.connection.db,
        };

        if (!token) {
          console.warn("WebSocket token missing.");
          ctx.extra.socket.close(4401, "Unauthorized");
          return baseContext;
        }

        try {
          const decoded = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY!,
          });

          const user = await clerkClient.users.getUser(decoded.sub);
          const role = user.publicMetadata?.role as string;

          return {
            ...baseContext,
            userId: decoded.sub,
            role,
            username: user.username ?? user.emailAddresses[0]?.emailAddress,
            clientId: role === "user" ? decoded.sub : undefined,
            lawyerId: role === "lawyer" ? decoded.sub : undefined,
          };
        } catch (err) {
          console.error("❌ WebSocket Auth Failed:", (err as Error).message);
          ctx.extra.socket.close(4401, "Unauthorized");
          return baseContext;
        }
      },
    },
    wsServer
  );

  // --- Apollo Server (GraphQL HTTP) ---
  const apolloServer = new ApolloServer<Context>({
    schema,
    introspection: true,
  });
  await apolloServer.start();

  app.use(cors({ origin: "*", credentials: true }));
  app.use(express.json());

  app.use(clerkMiddleware()); // Clerk middleware-г бүртгэх (getAuth ажиллахын тулд энэ заавал хэрэгтэй!)

// GraphQL middleware
app.use(
  "/graphql",
  expressMiddleware(apolloServer, {
    context: async ({ req }): Promise<Context> => {
      const { userId, getToken } = getAuth(req);
      const baseContext: Context = { req, db: mongoose.connection.db };

      if (!userId) {
        console.log("🔓 No userId from Clerk.");
        return baseContext;
      }

      const token = await getToken();
      const user = await clerkClient.users.getUser(userId);
      const role = user.publicMetadata?.role as string;

      return {
        ...baseContext,
        userId,
        role,
        username: user.username ?? user.emailAddresses[0]?.emailAddress,
        clientId: role === "user" ? userId : undefined,
        lawyerId: role === "lawyer" ? userId : undefined,
      };
    },
  })
);

  const PORT = Number(process.env.PORT) || 4000;
  httpServer.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}/graphql`);
    console.log(`📡 Subscriptions: ws://localhost:${PORT}/graphql`);
    console.log(`💬 Socket.IO Chat: ws://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Server startup error:", err);
  process.exit(1);
});
