import { Schema, model, Model, models, Types } from "mongoose";
import { AchievementSchemaType } from "./achievement.model";
import { SpecializationSchemaType } from "./specialization.model";

export type LawyerSchemaType = {
  lawyerId: string;
  firstName: string;
  lastName: string;
  email: string;
  licenseNumber: string;
  bio?: string;
  university: string;
  specialization: Types.ObjectId[] | SpecializationSchemaType[];
  document?: string;
  rating?: number;
  profilePicture: string;
  achievements: Types.ObjectId[] | AchievementSchemaType[];
  createdAt: Date;
  updatedAt: Date;
};

const LawyerSchema = new Schema<LawyerSchemaType>(
  {
    lawyerId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    licenseNumber: { type: String, required: true, unique: true },
    bio: { type: String },
    university: { type: String, required: true },
    specialization: [{ type: Schema.Types.ObjectId, ref: "Specialization" }],
    document: { type: String },
    rating: { type: Number, default: 0 },
    profilePicture: { type: String, required: true },
    achievements: [{ type: Schema.Types.ObjectId, ref: "Achievement" }],
  },
  { timestamps: true }
);

export const Lawyer: Model<LawyerSchemaType> =
  models.Lawyer || model<LawyerSchemaType>("Lawyer", LawyerSchema);
