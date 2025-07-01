import { Notification } from "@/models";
import { QueryResolvers } from "@/types/generated";

export const getNotificationsClient: QueryResolvers["getNotificationsClient"] =
  async (_, { clientId }, context) => {
    const notifications = await Notification.find({ clientId }).sort({
      createdAt: -1,
    });
    return notifications;
  };
