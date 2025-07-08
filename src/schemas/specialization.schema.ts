// import { gql } from "graphql-tag";

// export const specializationTypedefs = gql`



//   # type Specialization {
//   #   lawyerId: ID!
//   #   categoryID: ID!
//   #   subs: Boolean!
//   #   price: Int
//   #  }

//   # input CreateSpecializationInput {
//   #   lawyerId: ID!
//   #   categoryID: ID!
//   #   subs: Boolean!
//   #   price: Int
//   # }

  
//   type Query {
//   # getSpecializations: [Specialization!]!
//   # getSpecializationByCategory(categoryName: SpecializationCategory!): Specialization
//   # getSpecializationsByLawyer(
//   #   lawyerId: ID!
//   #   subscription: Boolean
//   # ): [Specialization!]!
// }


//   type Mutation {
//     # createSpecialization(input: [CreateSpecializationInput!]!): Response!
//     # updateSpecialization(categoryName: SpecializationCategory!, input: UpdateSpecializationInput!): Specialization!
//     # deleteSpecialization(categoryName: SpecializationCategory!): Boolean!
//   }
// `;
// // return Response.Success;
