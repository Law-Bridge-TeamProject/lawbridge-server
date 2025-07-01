import { gql } from "graphql-tag";

export const postTypeDefs = gql`
  scalar Date

  enum Media {
    TEXT
    VIDEO
    IMAGE
  }

  type Post {
    _id: ID!
    lawyerId: String!
    title: String!
    content: Media!
    specialization: [String!]!
    type: Media!
    createdAt: Date!
    updatedAt: Date!
  }

  input MediaInput {
    text: String
    image: String
    video: String
    audio: String
  }

  input CreatePostInput {
    specialization: [String!]!
    title: String!
    content: MediaInput!
    type: Media!
  }

  input UpdatePostInput {
    specialization: [String!]
    title: String
    content: MediaInput
    type: Media
  }

  type Query {
    getPostsByLawyer(lawyerId: String!): [Post!]!
    getPostById(postId: ID!): Post
    getPostsBySpecializationId(specializationId: ID!): [Post!]!
    searchPosts(query: String!): [Post!]!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(postId: ID!, input: UpdatePostInput!): Post!
    deletePost(postId: ID!): Boolean!
  }
`;
