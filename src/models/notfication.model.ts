// /models/notification.model.ts

import { Schema, model, Model, models } from "mongoose";
import { NotificationType } from "@/types/generated";

// The data stored in MongoDB for a system-generated notification
export type NotificationSchemaType = {
  id?: string; // For the virtual 'id'
  recipientId: string; // The Clerk User ID of the person receiving the notification
  type: NotificationType;
  content: string;
  read?: boolean;
  relatedEntityId?: string; // e.g., an appointment ID or post ID
  createdAt?: Date;
  updatedAt?: Date;
};

const NotificationSchema = new Schema<NotificationSchemaType>(
  {
    recipientId: { type: String, required: true, index: true }, // Indexed for fast lookups
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
    relatedEntityId: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Creates the virtual 'id' field for GraphQL
NotificationSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Notification =
  (models.Notification as Model<NotificationSchemaType>) ||
  model<NotificationSchemaType>("Notification", NotificationSchema);
