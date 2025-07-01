import { Schema, model, Model, models } from "mongoose";

export type SpecializationSchemaType = {
  categoryName: string;
  subscription: boolean;
  pricePerHour?: number;
};

const SpecializationSchema = new Schema<SpecializationSchemaType>({
  categoryName: { type: String, required: true, unique: true },
  subscription: { type: Boolean, default: false },
  pricePerHour: {
    type: Number,
    required: function () {
      return this.subscription === true;
    },
  },
});

export const Specialization: Model<SpecializationSchemaType> =
  models.Specialization || model<SpecializationSchemaType>("Specialization", SpecializationSchema);
