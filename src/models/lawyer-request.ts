import { Schema, model, models } from "mongoose";

type LawyerRequestSchemaType = {
  lawyerId: string;
  firstName: string;
  lastName: string;
  email: string;
  licenseNumber: string;
  bio: string;
  university: string;
  profilePicture: string;
  documents?: string;
  specializations: Array<{
    categoryName: string;
    subscription: boolean;
    pricePerHour?: number;
  }>;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
};

const LawyerRequestSchema = new Schema<LawyerRequestSchemaType>(
  {
    lawyerId: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    email: String,
    licenseNumber: String,
    bio: String,
    university: String,
    profilePicture: String,
    documents: String,
    specializations: [
      {
        categoryName: {
          type: String,
          enum: [
            "Criminal",
            "Civil",
            "Family",
            "Labor",
            "Property",
            "Immigration",
            "IntellectualProperty",
            "Administrative",
            "Tax",
            "Environmental",
            "Constitutional",
          ],
          required: true,
        },
        subscription: { type: Boolean, default: false },
        pricePerHour: {
          type: Number,
          required: function (this: { subscription: boolean }) {
            return this.subscription === true;
          },
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const LawyerRequest =
  models.LawyerRequest || model("LawyerRequest", LawyerRequestSchema);
