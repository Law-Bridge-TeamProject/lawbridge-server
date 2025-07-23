import { gql } from "graphql-tag";

export const appointmentTypeDefs = gql`
  type Appointment {
    clientId: String!
    lawyerId: String!
    schedule: String!
    status: AppointmentStatus!
    chatRoomId: String
    specializationId: Specialization # <-- Add this for population
    createdAt: String
    endedAt: String
  }

  enum AppointmentStatus {
    PENDING
    COMPLETED
  }

  input CreateAppointmentInput {
    clientId: String!
    lawyerId: String!
    schedule: String!
    createdAt: String!
    endedAt: String!
    specializationId: Specialization
  }

  type Query {
    getAppointments: [Appointment]
    getAppointmentById(id: String!): Appointment
    getAppointmentsByLawyer(lawyerId: String!): [Appointment]
    getAppointmentsByUser(clientId: String!): [Appointment]
  }

  type Mutation {
    createAppointment(input: CreateAppointmentInput!): Appointment
    createChatRoom(appointmentId: String!): String
  }
`;
