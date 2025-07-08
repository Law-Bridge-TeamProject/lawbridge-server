import { Notification, toGqlNotification } from "@/models";
import { Context } from "@/types/context";
import { QueryResolvers } from "@/types/generated";
import { GraphQLError } from  "graphql";

export const myNotifications: QueryResolvers["myNotifications"] =  async (_, __, context) => {
    const { userId } = context;
    if (!userId) {
      throw new GraphQLError("You must be logged in to view your notifications.", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const notifications = await Notification.find({ recipientId: userId })
      .sort({ createdAt: -1 })
      .lean();

    return notifications.map(toGqlNotification);
  }
