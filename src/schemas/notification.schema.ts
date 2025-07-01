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
    id: ID!
    lawyerId: String!
    clientId: String
    type: NotificationType!
    content: String!
    read: Boolean!
    createdAt: Date!
  }

  extend type Query {
    getNotifications(userId: ID!): [Notification!]!
    getNotificationsClient(clientId: ID!): [Notification!]!
    getNotificationsLawyer(lawyerId: ID!): [Notification!]!
  }

  extend type Mutation {
    createNotification(
      lawyerId: ID!
      clientId: ID
      type: NotificationType!
      content: String!
    ): Notification!

    markNotificationAsRead(notificationId: ID!): Notification!
  }
`;
