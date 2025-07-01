import { gql } from "graphql-tag";

export const lawyerTypeDefs = gql`
  scalar Date

  type Lawyer {
    id: ID!
    lawyerId: ID!
    firstName: String!
    lastName: String!
    email: String!
    licenseNumber: String!
    bio: String
    university: String!
    specialization: [Specialization!]!
    achievements: [Achievement!]!
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
    university: String!
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

  type Query {
    getLawyers: [Lawyer!]!
    getLawyerById(lawyerId: ID!): Lawyer
    getLawyersBySpecialization(specializationId: ID!): [Lawyer!]!
    getLawyersByAchievement(achievementId: ID!): [Lawyer!]!
  }

  type Mutation {
    createLawyer(input: CreateLawyerInput!): Lawyer!
    updateLawyer(lawyerId: ID!, input: UpdateLawyerInput!): Lawyer!
    deleteLawyer(lawyerId: ID!): Boolean!
  }
`;
