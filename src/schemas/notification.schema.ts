// src/graphql/typeDefs/notification.typeDefs.ts

import { gql } from "graphql-tag";

export const notificationTypeDefs = gql`
  scalar Date

  enum NotificationType {
    APPOINTMENT_REQUEST
    APPOINTMENT_CONFIRMATION
    APPOINTMENT_CANCELLATION
    APPOINTMENT_REMINDER
    APPOINTMENT_STARTED
    REVIEW_RECEIVED
    SPECIALIZATION_UPDATE
  }

  # Simplified Notification type, as it's a system alert to one person
  type Notification {
    _id: ID
    recipientId: ID! # The ID of the user (lawyer or client) who gets the notification
    type: NotificationType!
    content: String!
    read: Boolean
    createdAt: Date
  }

  # Input for creating a system notification
  input CreateNotificationInput {
    recipientId: ID!
    type: NotificationType!
    content: String!
  }

  extend type Query {
    # Gets notifications for the currently logged-in user (lawyer or client)
    myNotifications: [Notification!]!
  }

  extend type Mutation {
    # Internal-facing mutation to create a notification and send an email
    createNotification(input: CreateNotificationInput!): Notification!

    # Marks a single notification as read
    markNotificationAsRead(notificationId: ID!): Notification!

    # Marks all unread notifications as read
    markAllNotificationsAsRead: Boolean!
  }
`;
