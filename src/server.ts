// ====================================================================
//              EXPRESS SERVER - FULL IMPLEMENTATION
// ====================================================================

// --- 1. IMPORTS ---
import "dotenv/config"; // MUST be the very first import to load .env variables
import express from "express";
import { createServer, IncomingMessage } from "http";
import { Duplex } from "stream";
import mongoose from "mongoose";
import cors from "cors";
import { parse } from "url";

// Apollo & GraphQL Imports
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/use/ws";
import { WebSocketServer } from "ws";

// Socket.IO Import
import { Server as SocketIOServer, Socket } from "socket.io";

// Authentication & API Imports
import { clerkClient, getAuth, clerkMiddleware } from "@clerk/express";
import { verifyToken } from "@clerk/backend";
import { AccessToken } from "livekit-server-sdk";

// Local Schema and Type Imports
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { Context } from "./types/context";


// --- 2. PRE-SERVER SETUP & TYPE DEFINITIONS ---

// Create the single, executable schema object to be shared across services
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Define a custom interface for our authenticated Socket.IO sockets
interface SocketWithAuth extends Socket {
  data: {
    user?: {
      id: string;
      username: string;
      imageUrl: string;
    };
  };
}

// A simple in-memory store for connected users.
// In a production environment with multiple server instances, use Redis.
const connectedUsers = new Map<string, any>();


// --- 3. MAIN SERVER STARTUP LOGIC ---
async function startServer() {
  // Connect to the database first
  await mongoose.connect(process.env.MONGODB_CONNECTION_URL ?? "");
  console.log("✅ MongoDB Connected");

  const app = express();
  const httpServer = createServer(app);

  // --- A. CRITICAL: MIDDLEWARE SETUP (ORDER MATTERS) ---
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(clerkMiddleware());
  app.use(express.json());

  // --- B. SECURE API ROUTE for LiveKit Token Generation ---
  app.post("/api/livekit-token", async (req, res) => {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: User is not signed in." });
      }

      const { room } = req.body;
      if (!room || typeof room !== 'string') {
        return res.status(400).json({ error: "Bad Request: 'room' parameter is missing or invalid." });
      }
      
      const apiKey = process.env.LIVEKIT_API_KEY;
      const apiSecret = process.env.LIVEKIT_API_SECRET;
      if (!apiKey || !apiSecret) {
        console.error("FATAL: LiveKit API credentials are not found in .env file.");
        return res.status(500).json({ error: "Server Configuration Error: LiveKit credentials not set." });
      }

      const at = new AccessToken(apiKey, apiSecret, { identity: userId, name: userId });
      at.addGrant({ roomJoin: true, room, canPublish: true, canSubscribe: true });
      const token = await at.toJwt();
      
      return res.status(200).json({ token });
    } catch (error) {
      console.error("UNEXPECTED ERROR in /api/livekit-token:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // --- C. SOCKET.IO SERVER SETUP ---
  const io = new SocketIOServer(httpServer, {
    path: "/socket.io",
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"], credentials: true },
  });

  // Authentication middleware for each connecting socket
  io.use(async (socket: SocketWithAuth, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error: Token not provided."));
    try {
      const decoded = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY! });
      const clerkUser = await clerkClient.users.getUser(decoded.sub);
      socket.data.user = { id: clerkUser.id, username: clerkUser.username ?? "User", imageUrl: clerkUser.imageUrl };
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token."));
    }
  });

  // Main connection handler
  io.on("connection", (socket: SocketWithAuth) => {
    const user = socket.data.user;
    if (!user) return; // Should not happen if middleware is correct

    console.log(`⚡ Socket Connected: ${user.username} (ID: ${socket.id})`);
    connectedUsers.set(socket.id, { ...user, socketId: socket.id });
    socket.join(user.id); // Private room for user-specific events
    io.emit("onlineUsers", Array.from(connectedUsers.values()));

    // Example chat message handler
    socket.on("chat-message", async ({ toUserId, ...messageData }) => {
      if (!messageData.sender) return;
      const permanentId = `msg_${Date.now()}`; // In real app, use DB ID
      const messageToBroadcast = { ...messageData, id: permanentId };
      io.to(toUserId).to(messageData.sender.id).emit("chat-message", messageToBroadcast);
    });

    socket.on("disconnect", () => {
      const disconnectedUser = connectedUsers.get(socket.id);
      if (disconnectedUser) {
        console.log(`❌ Socket Disconnected: ${disconnectedUser.username}`);
        connectedUsers.delete(socket.id);
        io.emit("onlineUsers", Array.from(connectedUsers.values()));
      }
    });
  });

  // --- D. APOLLO GRAPHQL & WEBSOCKET SUBSCRIPTION SERVER SETUP ---
  const apolloServer = new ApolloServer<Context>({ schema, introspection: true });
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer, {
      context: async ({ req }): Promise<Context> => {
        const { userId } = getAuth(req);
        return { req, db: mongoose.connection.db, userId: userId ?? undefined };
      }
  }));

  const wsServer = new WebSocketServer({ noServer: true });
  useServer({ schema }, wsServer);

  // The critical fix for WebSocket server conflicts
  httpServer.on("upgrade", (req: IncomingMessage, socket: Duplex, head: Buffer) => {
    const pathname = req.url ? parse(req.url).pathname : undefined;
    if (pathname === "/graphql") {
      wsServer.handleUpgrade(req, socket, head, (ws) => wsServer.emit("connection", ws, req));
    }
    // Note: Socket.IO has its own internal 'upgrade' handler, so we don't need an 'else' block.
  });

  // --- E. START THE HTTP SERVER ---
  const PORT = Number(process.env.PORT) || 4000;
  httpServer.listen(PORT, () => {
    console.log("======================================================");
    console.log(`✅ Express Server listening on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL ready at POST /graphql`);
    console.log(`💬 Socket.IO ready at path /socket.io`);
    console.log(`🎥 LiveKit Token endpoint ready at POST /api/livekit-token`);
    console.log("======================================================");
  });
}

// --- 4. RUN THE SERVER ---
startServer().catch((err) => {
  console.error("❌ Fatal server startup error:", err);
  process.exit(1); // Exit if server fails to start
});