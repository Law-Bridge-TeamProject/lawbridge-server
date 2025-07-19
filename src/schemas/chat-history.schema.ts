import { gql } from "graphql-tag";

export const chatHistoryTypeDefs = gql`
  type ChatHistory {
    _id: ID!
    userId: String!
    sessionId: String!
    userMessage: String!
    botResponse: String!
    createdAt: String!
  }

  input ChatHistoryInput {
    userId: String
    sessionId: String
    userMessage: String!
    botResponse: String
  }

  type Mutation {
    saveChatHistory(input: ChatHistoryInput!): ChatHistory!
  }

  type Query {
    getChatHistoryByUser(userId: String!): [ChatHistory!]!
  }
`;
