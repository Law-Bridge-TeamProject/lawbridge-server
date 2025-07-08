// models/LawyerSpecialization.ts
import { Schema, model, models, Types, Model } from "mongoose";

export type lawyerSpecializationType = {
  lawyerId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  pricePerHour: Number;
  subscription: Boolean;
};

const lawyerSpecializationSchema = new Schema<lawyerSpecializationType>({
  lawyerId: { type: Schema.Types.ObjectId, ref: "Lawyer", required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  pricePerHour: { type: Number },
  subscription: { type: Boolean, required: true },
});

export const LawyerSpecialization: Model<lawyerSpecializationType> =
  models.LawyerSpecialization ||
  model("LawyerSpecialization", lawyerSpecializationSchema);
