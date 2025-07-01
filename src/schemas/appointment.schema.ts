import { gql } from 'graphql-tag';

export const appointmentTypeDefs = gql`
  type Appointment {
    clientId: String!
    lawyerId: String!
    schedule: String!
    status: AppointmentStatus!
    chatRoomId: String
    createdAt: String
    updatedAt: String
  }

  enum AppointmentStatus {
    PENDING
    CONFIRMED
    COMPLETED
    CANCELLED
  }

  input CreateAppointmentInput {
    clientId: String!
    lawyerId: String!
    schedule: String!
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


  