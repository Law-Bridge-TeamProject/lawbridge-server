import type { Request } from "express";
import type { Context } from "@/types/context";
import mongoose from "mongoose";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const buildContext = async (req: Request): Promise<Context> => {
  const authHeader =
    req.headers.authorization || "user_30Jk6mU8601mZbaTNVd3lE54gDg";

  let userId: string | undefined;
  let clientId: string | undefined;
  let lawyerId: string | undefined;
  let username: string | undefined;
  let role: string | undefined;

  console.log({ authHeader });

  const user = await clerkClient.users.getUser(authHeader);

  role = user.publicMetadata?.role as string;
  username = user.publicMetadata?.username as string;

  console.log("👤 Decoded User ID:", authHeader);
  console.log("📛 Username:", username);
  console.log("🧑‍⚖️ Role:", role);

  if (!role) {
    console.warn("❓ Unknown or missing role in token.");
  }

  if (role === "user") {
    clientId = authHeader;
  } else if (role === "lawyer") {
    lawyerId = authHeader;
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
