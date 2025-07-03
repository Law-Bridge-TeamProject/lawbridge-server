// src/graphql/resolvers/queries/notification.queries.ts

import { Notification } from "@/models";
import { QueryResolvers } from "@/types/generated";
import { Context } from "@/types/context";
import { GraphQLError } from "graphql";

export const notificationQueryResolvers: QueryResolvers = {
  /**
   * Fetches all notifications for the currently authenticated user,
   * regardless of whether they are a lawyer or client.
   */
  myNotifications: async (_, __, context: Context) => {
    const { userId } = context;
    if (!userId) {
      throw new GraphQLError(
        "You must be logged in to view your notifications.",
        {
          extensions: { code: "UNAUTHENTICATED" },
        }
      );
    }

    const notifications = await Notification.find({ recipientId: userId })
      .sort({ createdAt: -1 })
      .lean();

    return notifications as any;
  },
};
