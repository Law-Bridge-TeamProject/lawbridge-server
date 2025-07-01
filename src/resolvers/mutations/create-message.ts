import { MutationResolvers } from "@/types/generated";
import { pubsub } from "@/lib/pubsub";
import { Message } from "@/models";

export const createMessage: MutationResolvers["createMessage"] = async (
  _: unknown,
  { chatRoomId, userId, type, content }, 
  context
) => {
  const message = {

    chatRoomId,
    userId,
    type,
    content,
  };

  pubsub.publish("MESSAGE_ADDED_" + chatRoomId, {
    messageAdded: message,
  });

  await Message.create({
    chatRoomId,
    userId,
    type,
    content,
  });

  return message;
};
