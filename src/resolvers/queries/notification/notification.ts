import { Notification } from "@/models";

export const getNotificationsLawyer = async (
  _: unknown,
  { lawyerId }: { lawyerId: string }
) => {
  return await Notification.find({ lawyerId: lawyerId }).sort({
    createdAt: -1,
  });
};

export const getNotificationsClient = async (
  _: unknown,
  { clientId }: { clientId: string }
) => {
  return await Notification.find({ clientId: clientId }).sort({
    createdAt: -1,
  });
};
