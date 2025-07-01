import { Notification } from "@/models";
import { QueryResolvers } from "@/types/generated";

export const getNotifications: QueryResolvers["getNotifications"] = async (
  _,
  { userId },
  context
) => {
  const notifications = await Notification.find({
    $or: [{ lawyerId: userId }, { clientId: userId }],
  }).sort({ createdAt: -1 });

  return notifications;
};
