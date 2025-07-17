import { Notification, toGqlNotification } from "@/models";
import { Context } from "@/types/context";
import { MutationResolvers } from "@/types/generated";
import { GraphQLError } from "graphql";

export const markNotificationAsRead: MutationResolvers["markNotificationAsRead"] =
  async (_, { notificationId }, context) => {
    if (!context.userId) {
      throw new Error("Unauthorized");
    }

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      throw new Error("Notification not found");
    }
    if (notification.recipientId !== context.userId) {
      throw new Error("Not allowed");
    }

    notification.read = true;
    await notification.save();
    return toGqlNotification(notification);
  };