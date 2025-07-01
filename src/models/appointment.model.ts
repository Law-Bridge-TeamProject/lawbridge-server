import { Schema, model, Model, models, Types } from "mongoose";

enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

type AppointmentSchemaType = {
  clientId: string;
  lawyerId: Types.ObjectId;
  schedule: string;
  status: AppointmentStatus;
  chatRoomId?: Types.ObjectId;
};

const AppointmentSchema = new Schema<AppointmentSchemaType>(
  {
    clientId: { type: String, required: true },
    lawyerId: { type: Schema.Types.ObjectId, ref: "Lawyer", required: true },
    schedule: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.PENDING,
      required: true,
    },
    chatRoomId: { type: Schema.Types.ObjectId, ref: "ChatRoom" },
  },
  { timestamps: true }
);

export const Appointment: Model<AppointmentSchemaType> =
  models["Appointment"] || model("Appointment", AppointmentSchema);
