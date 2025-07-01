import { Schema, model, Model, models } from "mongoose";
import { NotificationType } from "@/types/generated";

type NotificationSchemaType = {
  recipientClerkId: string;
  type: NotificationType;
  content?: string;
  read?: boolean;
  createdAt?: Date;
};

const NotificationSchema = new Schema<NotificationSchemaType>(
  {
    recipientClerkId: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    content: String,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Notification: Model<NotificationSchemaType> =
  models["Notification"] || model("Notification", NotificationSchema);
