// src/types/context.ts
import { Request } from "express";
import { Db } from "mongodb";

export interface GraphQLContext {
  req: Request;
  userId?: string;
  username?: string;
  role?: "lawyer" | "user" | string;
  clientId?: string;
  lawyerId?: string;
  db: Db;
}
