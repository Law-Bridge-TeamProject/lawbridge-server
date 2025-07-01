import { Notification } from "@/models";
import { QueryResolvers } from "@/types/generated";

export const getNotificationsLawyer: QueryResolvers["getNotificationsLawyer"] =
  async (_, { lawyerId }, context) => {
    const notifications = await Notification.find({ lawyerId }).sort({
      createdAt: -1,
    });
    return notifications;
  };
