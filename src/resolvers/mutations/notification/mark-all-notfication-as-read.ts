import { Notification } from "@/models";
import { Context } from "@/types/context";
import { MutationResolvers } from "@/types/generated";
import { GraphQLError } from "graphql";

export const markAllNotificationsAsRead: MutationResolvers<Context>['markAllNotificationsAsRead'] = async (_, __, context) => {
  const { userId } = context;

  // 1. Authentication
  if (!userId) {
    throw new GraphQLError("You must be logged in to perform this action.", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  // 2. Perform a bulk update for efficiency.
  await Notification.updateMany(
    { recipientId: userId, read: false },
    { $set: { read: true } }
  );

  // 3. Return success as per the schema
  return true;
};