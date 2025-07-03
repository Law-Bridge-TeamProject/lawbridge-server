import { Notification } from "@/models";
import {
  MutationResolvers,
  Notification as NotificationType,
} from "@/types/generated";
import { Context } from "@/types/context";
import { GraphQLError } from "graphql";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { sendEmail } from "@/lib/email-sender";

/**
 * Sends a notification email to a user via Clerk + nodemailer.
 */
const sendNotificationEmail = async (
  recipientId: string,
  content: string,
  type: string
) => {
  try {
    const recipient = await clerkClient.users.getUser(recipientId);
    const primaryEmail = recipient.emailAddresses.find(
      (e) => e.id === recipient.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) {
      console.warn(`No primary email found for user ${recipientId}`);
      return;
    }

    const subject = `You have a new alert: ${type.replace(/_/g, " ")}`;
    const html = `
      <p>Hello,</p>
      <p>This is an alert from LawBridge:</p>
      <p><strong>${content}</strong></p>
      <p>Please log in to your account for more details.</p>
    `;

    await sendEmail({ to: primaryEmail, subject, html });
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }
};

export const notificationMutationResolvers: MutationResolvers = {
  /**
   * Creates a notification and optionally sends an email.
   */
  createNotification: async (_, { input }) => {
    try {
      const newNotification = await Notification.create(input);

      // Non-blocking email send
      sendNotificationEmail(input.recipientId, input.content, input.type).catch(
        console.error
      );

      return newNotification.toObject() as NotificationType;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw new GraphQLError("Failed to create notification.", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },

  /**
   * Marks a specific notification as read.
   */
  markNotificationAsRead: async (_, { notificationId }, context: Context) => {
    const { userId } = context;
    if (!userId) {
      throw new GraphQLError("You must be logged in.", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipientId: userId },
      { $set: { read: true } },
      { new: true }
    );

    if (!updatedNotification) {
      throw new GraphQLError(
        "Notification not found or you are not authorized to update it.",
        { extensions: { code: "NOT_FOUND" } }
      );
    }

    return updatedNotification.toObject() as NotificationType;
  },

  /**
   * Marks all unread notifications for the current user as read.
   */
  markAllNotificationsAsRead: async (_, __, context: Context) => {
    const { userId } = context;
    if (!userId) {
      throw new GraphQLError("You must be logged in.", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const result = await Notification.updateMany(
      { recipientId: userId, read: false },
      { $set: { read: true } }
    );

    return result.modifiedCount > 0;
  },
};
