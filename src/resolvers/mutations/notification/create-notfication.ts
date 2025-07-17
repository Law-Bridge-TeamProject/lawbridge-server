// ===== resolvers/notification.ts =====
import { Notification } from "@/models";
import { MutationResolvers } from "@/types/generated";
import { io } from "@/server";

export const createNotification: MutationResolvers["createNotification"] =
  async (_, { input }) => {
    const notification = await Notification.create(input);

    // Socket.IO realtime мэдэгдэл илгээх
    io.to(input.recipientId).emit("new-notification", {
      id: notification._id.toString(),
      type: notification.type,
      content: notification.content,
      read: notification.read,
      createdAt: notification.createdAt,
    });

    return {
      __typename: "Notification",
      id: notification._id.toString(),
      recipientId: notification.recipientId,
      type: notification.type,
      content: notification.content,
      read: notification.read,
      createdAt: notification.createdAt,
    };
  };