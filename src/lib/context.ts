import { verifyToken } from "@clerk/backend";
import type { Request } from "express";
import type { Context } from "@/types/context";
import mongoose from "mongoose";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const buildContext = async (req: Request): Promise<Context> => {
  const authHeader = req.headers.authorization || "";

  let userId: string | undefined;
  let clientId: string | undefined;
  let lawyerId: string | undefined;
  let username: string | undefined;
  let role: string | undefined;

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const sessionClaims = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      });

      userId = sessionClaims.sub;

      console.log("✅ Session claims decoded from token:", sessionClaims);

      const user = await clerkClient.users.getUser(userId);

      role = user.publicMetadata?.role as string;
      username = user.publicMetadata?.username as string;

      console.log("👤 Decoded User ID:", userId);
      console.log("📛 Username:", username);
      console.log("🧑‍⚖️ Role:", role);

      if (!role) {
        console.warn("❓ Unknown or missing role in token.");
      }

      if (role === "user") {
        clientId = userId;
      } else if (role === "lawyer") {
        lawyerId = userId;
      }
    } catch (err) {
      console.warn("⚠️ Clerk токен шалгах үед алдаа гарлаа:", err);
    }
  }

  return {
    req,
    db: mongoose.connection.db,
    userId,
    clientId,
    lawyerId,
    username,
    role,
    io: req.app.get("io"),
  };
};
