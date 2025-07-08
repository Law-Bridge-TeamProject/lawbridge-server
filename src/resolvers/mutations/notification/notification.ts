import { Notification, toGqlNotification } from "@/models";
import { NotificationService } from "@/services";
import { Context } from "@/types/context";
import { MutationResolvers } from "@/types/generated";
import { GraphQLError } from "graphql";

export const notificationMutations: MutationResolvers<Context> = {
  createNotification: async (_, { input }, context) => {
    const { userId } = context;
    if (!userId) {
      throw new GraphQLError("You must be logged in to create a notification.", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }
    return NotificationService.create(input, userId);
  },

  markNotificationAsRead: async (_, { notificationId }, context) => {
    const { userId } = context;
    if (!userId) {
      throw new GraphQLError("You must be logged in to perform this action.", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      throw new GraphQLError("Notification not found.", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (notification.recipientId !== userId) {
      throw new GraphQLError("You are not authorized to update this notification.", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    if (notification.read) {
      return toGqlNotification(notification);
    }
    
    notification.read = true;
    await notification.save();

    return toGqlNotification(notification);
  },

  markAllNotificationsAsRead: async (_, __, context) => {
    const { userId } = context;
    if (!userId) {
      throw new GraphQLError("You must be logged in to perform this action.", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    await Notification.updateMany(
      { recipientId: userId, read: false },
      { $set: { read: true } }
    );

    return true;
  },
};