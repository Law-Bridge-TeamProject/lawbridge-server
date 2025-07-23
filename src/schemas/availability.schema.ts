import { gql } from "graphql-tag";

export const availabilityTypeDefs = gql`

  type Availability {
    lawyerId: String!
    day: String!
    startTime: String!
    endTime: String!
    availableDays: [String!]!
  }

  type AvailableDay {
    day: String!
    startTime: String!
    endTime: String!
  }

  type AvailabilitySchedule {
    _id: ID!
    lawyerId: String!
    availableDays: [AvailableDay!]!
  }

  input AvailableDayInput {
    day: String!
    startTime: String!
    endTime: String!
  }

  input SetAvailabilityInput {
    availableDays: [AvailableDayInput!]!
  }

  type Query {
    getAvailability(lawyerId: String, day: String): [Availability]
  }

  type Mutation {
    setAvailability(input: SetAvailabilityInput!): AvailabilitySchedule!
  }
`;
