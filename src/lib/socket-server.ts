// // lib/socket-server.ts
// import { Server as HTTPServer } from "http";
// import { Server as SocketIOServer } from "socket.io";

// let io: SocketIOServer;

// export const initSocket = (server: HTTPServer) => {
//   io = new SocketIOServer(server, {
//     cors: {
//       origin: "*", // эсвэл Next.js origin: "http://localhost:3000"
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("🔌 Socket.IO client connected:", socket.id);

//     socket.on("disconnect", () => {
//       console.log("❌ Socket.IO client disconnected:", socket.id);
//     });
//   });

//   return io;
// };

// export const getIO = () => {
//   if (!io) {
//     throw new Error("❗Socket.IO server not initialized.");
//   }
//   return io;
// };
