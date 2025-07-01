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
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { verifyToken } from "@clerk/backend";
import { Message } from "./models/message.model";

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URL ?? "");
  console.log("✅ Connected to MongoDB");

  const app = express();
  const httpServer = createServer(app);

  const io = new SocketIOServer(httpServer, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    console.log("⚡ Socket.IO client connected:", socket.id);

    socket.on("chat", async (data) => {
      try {
        const { content, sender } = data;
        const message = await Message.create({ content, sender });
        io.emit("chat", message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({ schema, introspection: true });
  await apolloServer.start();

  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        let userId, username, role, clientId, lawyerId;

        if (authHeader.startsWith("Bearer ")) {
          try {
            const parsedToken = await verifyToken(authHeader, {
              secretKey: process.env.CLERK_SECRET_KEY!,
            });

            userId = parsedToken.sub;
            username = parsedToken.username as string | undefined;
            role =
              ((parsedToken.publicMetadata as any)?.role as string) ??
              undefined;

            if (role === "user") clientId = userId;
            else if (role === "lawyer") lawyerId = userId;
          } catch (err) {
            console.warn("⚠️ Clerk token verification failed:", err);
          }
        }

        return {
          req,
          userId,
          username,
          role,
          clientId,
          lawyerId,
          db: mongoose.connection.db,
        };
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
