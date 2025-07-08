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

  type Notification {
    id: ID! # Switched from _id to id for GraphQL best practice
    recipientId: ID!
    type: NotificationType!
    content: String!
    read: Boolean!
    createdAt: Date!
  }

  input CreateNotificationInput {
    recipientId: ID!
    type: NotificationType!
    content: String!
  }

  extend type Query {
    myNotifications: [Notification!]!
  }

  extend type Mutation {
    createNotification(input: CreateNotificationInput!): Notification!
    markNotificationAsRead(notificationId: ID!): Notification!
    markAllNotificationsAsRead: Boolean!
  }
`;