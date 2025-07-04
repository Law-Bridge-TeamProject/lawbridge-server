import { Notification } from "@/models";
import {
  MutationResolvers,
  Notification as GqlNotification,
  NotificationType,
} from "@/types/generated";
import { Context } from "@/types/context";
import { GraphQLError } from "graphql";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { sendEmail } from "@/lib/email-sender";

// --- Constants for Error Codes ---
const ERROR_CODES = {
  UNAUTHENTICATED: "UNAUTHENTICATED",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  FORBIDDEN: "FORBIDDEN",
};

// --- Helper Functions for Email Logic ---

/**
 * Formats a notification type enum into a human-readable title case string.
 * @example formatSubject(NotificationType.APPOINTMENT_REQUEST) // "Appointment Request"
 */
const formatSubject = (type: NotificationType): string => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Generates the HTML content for the notification email.
 */
const generateEmailHtml = (content: string): string => `
  <div style="font-family: sans-serif; line-height: 1.6;">
    <p>Hello,</p>
    <p>This is an alert from LawBridge:</p>
    <p style="background-color: #f4f4f4; border-left: 4px solid #007bff; padding: 12px 16px;">
      <strong>${content}</strong>
    </p>
    <p>Please log in to your account for more details.</p>
    <p>Thank you,<br/>The LawBridge Team</p>
  </div>
`;

/**
 * Fetches user's primary email and sends a notification email.
 */
const sendNotificationEmail = async (
  recipientId: string,
  content: string,
  type: NotificationType
): Promise<void> => {
  try {
    const recipient = await clerkClient.users.getUser(recipientId);
    const primaryEmail = recipient.primaryEmailAddress?.emailAddress;

    if (!primaryEmail) {
      console.warn(
        `[Email] No primary email found for user ${recipientId}. Skipping email.`
      );
      return;
    }

    const subject = `LawBridge Alert: ${formatSubject(type)}`;
    const html = generateEmailHtml(content);

    await sendEmail({ to: primaryEmail, subject, html });
    console.log(`[Email] Notification email sent to user ${recipientId}.`);
  } catch (error) {
    // Log the error with more context without crashing the parent process.
    console.error(
      `[Email] Failed to send email notification to user ${recipientId}:`,
      error
    );
  }
};

// --- GraphQL Resolvers ---

export const notificationMutationResolvers: MutationResolvers = {
  /**
   * Creates a notification in the database and triggers a non-blocking email.
   * This mutation is typically for internal system use.
   */
  createNotification: async (_, { input }) => {
    try {
      const newNotification = await Notification.create(input);

      // Fire-and-forget email sending. The main operation should not fail
      // if the email service is down.
      sendNotificationEmail(input.recipientId, input.content, input.type).catch(
        (err) => {
          // The inner function already logs, this is for any unhandled promise rejections.
          console.error(
            "[createNotification] Unhandled error from email sender:",
            err
          );
        }
      );

      return newNotification.toObject() as GqlNotification;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw new GraphQLError("Failed to create the notification.", {
        extensions: { code: ERROR_CODES.INTERNAL_SERVER_ERROR },
      });
    }
  },

  /**
   * Marks a single notification as read for the authenticated user.
   */
  markNotificationAsRead: async (_, { notificationId }, context: Context) => {
    const { userId } = context;
    if (!userId) {
      throw new GraphQLError("Authentication is required.", {
        extensions: { code: ERROR_CODES.UNAUTHENTICATED },
      });
    }

    // The query condition { _id, recipientId } is crucial for security.
    // It ensures a user can only update *their own* notifications.
    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipientId: userId },
      { read: true },
      { new: true } // Return the modified document
    ).lean(); // Use .lean() for faster, plain JS object results when not needing Mongoose methods

    if (!updatedNotification) {
      throw new GraphQLError(
        "Notification not found or you do not have permission to modify it.",
        { extensions: { code: ERROR_CODES.NOT_FOUND } }
      );
    }

    // .lean() returns a plain object, so no need for .toObject()
    // The cast is still useful for type safety with GraphQL.
    return updatedNotification as GqlNotification;
  },

  /**
   * Marks all unread notifications as read for the authenticated user.
   */
  markAllNotificationsAsRead: async (_, __, context: Context) => {
    const { userId } = context;
    if (!userId) {
      throw new GraphQLError("Authentication is required.", {
        extensions: { code: ERROR_CODES.UNAUTHENTICATED },
      });
    }

    const result = await Notification.updateMany(
      { recipientId: userId, read: false },
      { $set: { read: true } }
    );

    // `acknowledged` confirms the operation was received by the DB.
    // `modifiedCount` confirms that at least one document was changed.
    return result.acknowledged && result.modifiedCount > 0;
  },
};
