import { gql } from "graphql-tag";

export const messageTypeDefs = gql`
  enum MediaType {
    TEXT
    IMAGE
    VIDEO
    AUDIO
  }

  type Message {
    chatRoomId: ID!
    userId: String!
    type: MediaType!
    content: String
  }
  type Query {
    getMessages(chatRoomId: ID!): [Message!]!
  }
  type Mutation {
    createMessage(
      chatRoomId: ID!
      userId: String!
      type: MediaType!
      content: String
    ): Message
  }
  type Subscription {
    messageAdded(chatRoomId: ID!): Message
  }
`;