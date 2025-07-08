import { gql } from "graphql-tag";

export const lawyerSpecializationTypeDefs = gql`
  enum Response {
    SUCCESS
  }

  type Specialization {
    _id: ID!
    lawyerId: ID!
    categoryId: ID!
    subscription: Boolean!
    pricePerHour: Int
  }

  input CreateSpecializationInput {
    lawyerId: ID!
    categoryId: ID!
    subscription: Boolean!
    pricePerHour: Int
  }

  input SpecializationInput {
    specializations: [CreateSpecializationInput!]!
  }

  # type Query {
  #   getSpecializations: [Specialization]!
  # neg umguulugchiin mergeshsen chigleluud
  # }

  type Mutation {
    createSpecialization(input: SpecializationInput): [Specialization]!
  }
`;
