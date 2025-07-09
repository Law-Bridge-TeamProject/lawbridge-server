import { gql } from "graphql-tag";

export const notificationTypeDefs = gql`
  scalar Date

  enum NotificationType {
    LAWYER_APPROVED
    APPOINTMENT_CREATED
    APPOINTMENT_REMINDER
    APPOINTMENT_STARTED
    REVIEW_RECEIVED
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