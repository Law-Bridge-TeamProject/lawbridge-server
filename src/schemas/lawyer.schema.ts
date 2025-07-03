import { gql } from "graphql-tag";

export const lawyerTypeDefs = gql`
  scalar Date

  enum LawyerRequestStatus {
    PENDING
    VERIFIED
    REJECTED
  }

  type Lawyer {
    _id: ID!
    lawyerId: ID!
    clerkUserId: String
    clientId: String
    firstName: String!
    lastName: String!
    email: String!
    licenseNumber: String!
    bio: String
    university: String
    specialization: [Specialization!]!
    achievements: [Achievement!]!
    status: LawyerRequestStatus
    document: String
    rating: Int
    profilePicture: String!
    createdAt: Date!
    updatedAt: Date
  }

  input CreateLawyerInput {
    lawyerId: ID!
    firstName: String!
    lastName: String!
    email: String!
    licenseNumber: String!
    bio: String
    university: String
    specialization: [ID!]!
    achievements: [ID!]
    document: String
    rating: Int
    profilePicture: String!
  }

  input UpdateLawyerInput {
    firstName: String
    lastName: String
    email: String
    licenseNumber: String
    bio: String
    university: String
    specialization: [ID!]
    achievements: [ID!]
    document: String
    rating: Int
    profilePicture: String
  }

  input ManageLawyerRequestInput {
    lawyerId: ID!
    status: LawyerRequestStatus!
  }

  type Query {
    getLawyers: [Lawyer!]!
    getLawyerById(lawyerId: ID!): Lawyer
    getLawyersBySpecialization(specializationId: ID!): [Lawyer!]!
    getLawyersByAchievement(achievementId: ID!): [Lawyer!]!
    getLawyersByStatus(status: LawyerRequestStatus!): [Lawyer!]!
  }

  type Mutation {
    createLawyer(input: CreateLawyerInput!): Lawyer!
    updateLawyer(lawyerId: ID!, input: UpdateLawyerInput!): Lawyer!
    deleteLawyer(lawyerId: ID!): Boolean!
    manageLawyerRequest(input: ManageLawyerRequestInput!): Lawyer!
  }
`;
