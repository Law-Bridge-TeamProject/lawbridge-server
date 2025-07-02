// /models/lawyer.model.ts

import { Schema, model, models, Model, Types } from "mongoose";

// === FIX #1: THE TYPESCRIPT INTERFACE ===
// The interface MUST include the optional fields that Mongoose adds at runtime.
export interface LawyerSchemaType {
  id?: string; // For the virtual 'id'
  lawyerId: string;
  firstName: string;
  lastName: string;
  email: string;
  licenseNumber: string;
  bio?: string;
  university: string;
  specialization: Types.ObjectId[];
  achievements: Types.ObjectId[];
  document?: string;
  rating?: number;
  profilePicture: string;
  createdAt?: Date; // For timestamps
  updatedAt?: Date; // For timestamps
}

// === FIX #2: THE MONGOOSE SCHEMA CONFIGURATION ===
const LawyerSchema = new Schema<LawyerSchemaType>(
  {
    lawyerId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    licenseNumber: { type: String, required: true },
    // ... other fields
    specialization: [{ type: Schema.Types.ObjectId, ref: "Specialization" }],
    achievements: [{ type: Schema.Types.ObjectId, ref: "Achievement" }],
  },
  {
    // This configuration is essential for virtuals to work correctly.
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// === FIX #3: THE VIRTUAL DEFINITION ===
// This creates the 'id' field that GraphQL needs from the '_id' field.
LawyerSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Lawyer =
  (models.Lawyer as Model<LawyerSchemaType>) ||
  model<LawyerSchemaType>("Lawyer", LawyerSchema);
