// models/LawyerSpecialization.ts
import { Schema, model, models, Model } from "mongoose";

export type lawyerSpecializationType = {
  lawyerId: Schema.Types.ObjectId;
  specializationId: Schema.Types.ObjectId;
  pricePerHour: number;
  subscription: boolean;
};

const lawyerSpecializationSchema = new Schema<lawyerSpecializationType>({
  lawyerId: { type: Schema.Types.ObjectId, ref: "Lawyer", required: true },
  specializationId: { type: Schema.Types.ObjectId, ref: "Specialization", required: true },
  pricePerHour: { type: Number },
  subscription: { type: Boolean, required: true },
});

export const LawyerSpecialization: Model<lawyerSpecializationType> =
  models.LawyerSpecialization ||
  model("LawyerSpecialization", lawyerSpecializationSchema);
