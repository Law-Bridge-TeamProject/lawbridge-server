import { sendNotificationEmail } from "@/lib/sendEmail";
import { Notification } from "@/models";
import { getUserEmailById } from "@/utils/getUserEmail";

export const createNotification = async (
  _: unknown,
  {
    recipientId,
    type,
    content,
  }: {
    recipientId: string;
    type: string;
    content: string;
  }
) => {
  const notification = await Notification.create({
    recipientId,
    type,
    content,
    read: false,
    createdAt: new Date(),
  });


    const email = await getUserEmailById(recipientId);
    if (email) {
      await sendNotificationEmail({
        to: email,
        subject: "Шинэ мэдэгдэл",
        text: content,
      });
    }

  return notification;
};
