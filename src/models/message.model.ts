import { Schema, model, Model, models, Types } from "mongoose";

enum MediaType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO'
}

type MessageSchemaType = {
  chatRoomId: Types.ObjectId;
  userId: string;
  type: MediaType;
  content: string;
};

const MessageSchema = new Schema<MessageSchemaType>(
  {
    chatRoomId: { type: Schema.Types.ObjectId, ref: "ChatRoom" },
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(MediaType),
      default: MediaType.TEXT,
      required: true,
    },
    content: String,
  },
  { timestamps: true }
);
  
export const Message: Model<MessageSchemaType> =
    models["Message"] || model("Message", MessageSchema);