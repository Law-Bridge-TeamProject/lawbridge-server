import { gql } from "graphql-tag";

export const availabilityTypeDefs = gql`
  enum DayOfWeek {
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
    SUNDAY
  }

  type Availability {
    lawyerId: String!
    day: DayOfWeek!
    startTime: String!
    endTime: String!
  }

  type Query {
    getAvailability(lawyerId: String!, day: DayOfWeek!): [Availability]
  }

  type Mutation {
    setAvailability(
      lawyerId: String!
      day: DayOfWeek!
      startTime: String!
      endTime: String!
    ): Availability
  }
`;
