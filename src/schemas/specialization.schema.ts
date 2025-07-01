import { gql } from "graphql-tag";

export const specializationTypedefs = gql`
  enum SpecializationCategory {
    Criminal
    Civil
    Family
    Labor
    Property
    Immigration
    IntellectualProperty
    Administrative
    Tax
    Environmental
    Constitutional
  }

  type Specialization {
    id: ID!
    categoryName: SpecializationCategory!
    subscription: Boolean!
    pricePerHour: Int
  }

  input CreateSpecializationInput {
    categoryName: SpecializationCategory!
    subscription: Boolean!
    pricePerHour: Int
  }

  input UpdateSpecializationInput {
    subscription: Boolean
    pricePerHour: Int
  }
  
  type Query {
  getSpecializations: [Specialization!]!
  getSpecializationByCategory(categoryName: SpecializationCategory!): Specialization
  getSpecializationsByLawyer(
    lawyerId: ID!
    subscription: Boolean
  ): [Specialization!]!
}


  type Mutation {
    createSpecialization(input: CreateSpecializationInput!): Specialization!
    updateSpecialization(categoryName: SpecializationCategory!, input: UpdateSpecializationInput!): Specialization!
    deleteSpecialization(categoryName: SpecializationCategory!): Boolean!
  }
`;

