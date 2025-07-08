import { Notification, toGqlNotification } from "@/models";
import { Context } from "@/types/context";
import { MutationResolvers } from "@/types/generated";
import { GraphQLError } from "graphql";

export const markNotificationAsRead: MutationResolvers<Context>['markNotificationAsRead'] = async (_, { notificationId }, context) => {
  const { userId } = context;

  // 1. Authentication
  if (!userId) {
    throw new GraphQLError("You must be logged in to perform this action.", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  // 2. Find the requested notification
  const notification = await Notification.findById(notificationId);
  if (!notification) {
    throw new GraphQLError("Notification not found.", {
      extensions: { code: "NOT_FOUND" },
    });
  }

  // 3. Authorization: CRITICAL!
  if (notification.recipientId !== userId) {
    throw new GraphQLError("You are not authorized to update this notification.", {
      extensions: { code: "FORBIDDEN" },
    });
  }

  // 4. Update the document if it's not already read
  if (!notification.read) {
      notification.read = true;
      await notification.save();
  }

  // 5. Use the mapper to return the correct GraphQL type
  return toGqlNotification(notification);
};