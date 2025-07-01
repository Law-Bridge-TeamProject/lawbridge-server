import { gql } from "graphql-tag";

export const lawyerRequestTypeDefs = gql`
  scalar Date

  enum LawyerRequestStatus {
    pending
    approved
    rejected
  }

  type LawyerRequest {
    id: ID!
    lawyerId: ID!
    firstName: String!
    lastName: String!
    email: String!
    licenseNumber: String!
    bio: String!
    university: String!
    profilePicture: String!
    documents: String
    specializations: [Specialization!]!
    status: LawyerRequestStatus!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateLawyerRequestInput {
    firstName: String!
    lastName: String!
    email: String!
    licenseNumber: String!
    bio: String!
    university: String!
    profilePicture: String!
    documents: String
    specializations: [CreateSpecializationInput!]!
  }

  type Query {
    getPendingLawyerRequests: [LawyerRequest!]!
    getLawyerRequestByLawyerId(lawyerId: ID): LawyerRequest
  }

  type Mutation {
    createLawyerRequest(input: CreateLawyerRequestInput!): LawyerRequest!
    approveLawyerRequest(lawyerId: ID!): Boolean!
    rejectLawyerRequest(lawyerId: ID!): Boolean!
  }
`;
