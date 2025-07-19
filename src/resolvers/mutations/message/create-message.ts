// src/resolvers/message/createMessage.ts

import { MutationResolvers } from "@/types/generated";
import { Message } from "@/models";

export const createMessage: MutationResolvers["createMessage"] = async (
  _: unknown,
  { chatRoomId, userId, type, content },
  context
) => {
  try {
    console.log(`📝 Creating message:`, { chatRoomId, userId, type, content });

    // Validate required fields
    if (!chatRoomId || !userId || !content) {
      throw new Error(
        "Missing required fields: chatRoomId, userId, or content"
      );
    }

    // Save message to MongoDB
    const savedMessage = await Message.create({
      chatRoomId,
      userId,
      type: type || "TEXT",
      content,
      createdAt: new Date(),
    });

    console.log(`💾 Message saved to DB:`, savedMessage);

    // Try to populate sender information (if your Message model has a sender reference)
    let populatedMessage;
    try {
      populatedMessage = await Message.findById(savedMessage._id).populate(
        "sender"
      );
    } catch (populateError) {
      console.warn(
        "⚠️  Could not populate sender, using saved message:",
        populateError
      );
      populatedMessage = savedMessage;
    }

    const messageToReturn = populatedMessage || savedMessage;

    // Emit via Socket.io to all clients in the room
    if (context.io) {
      context.io.to(chatRoomId).emit("message-created", messageToReturn);
      console.log(`📤 Message emitted to room: ${chatRoomId}`);
    } else {
      console.warn(
        "⚠️  Socket.io not available in context - message won't be broadcast"
      );
    }

    return messageToReturn;
  } catch (error) {
    console.error("❌ Error creating message:", error);
    throw new Error(`Failed to create message: ${error.message}`);
  }
};
