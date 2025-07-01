import { Message } from "@/models";
import { QueryResolvers } from "@/types/generated";

type MessageFromDB = {
  _id: string;
  chatRoomId: string;
  userId: string;
  type: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
  content?: string;
};

export const getMessages: QueryResolvers["getMessages"] = async (
  parent: unknown,
  { chatRoomId },
  context
) => {
  const messages = await context.db
    .collection("messages")
    .find({ chatRoomId })
    .sort({ createdAt: -1 })
    .toArray();

    await Message.find({ chatRoomId }).sort({ createdAt: -1 });

  return messages.map((msg: MessageFromDB) => ({
    id: msg._id.toString(),
    chatRoomId: msg.chatRoomId,
    userId: msg.userId,
    type: msg.type,
    content: msg.content,
  }));
};
