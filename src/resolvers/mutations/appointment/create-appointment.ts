import {
  MutationResolvers,
  Appointment as AppointmentType,
  AppointmentStatus,
} from "@/types/generated";
import { Appointment } from "@/models";
import { ChatRoom } from "@/models/chatRoom.model";

export const createAppointment: MutationResolvers["createAppointment"] = async (
  _,
  { input },
  context
) => {
  try {
    const { clientId, lawyerId, schedule } = input;

    const appointmentDoc = await Appointment.create({
      clientId: context.clientId,
      lawyerId,
      schedule: new Date(schedule),
      status: "PENDING",
      price: 0,
      isFree: false,
      specializationId: null, // Set to null since it's not in input
    });

    // Create a chatroom for this appointment
    const chatRoomDoc = await ChatRoom.create({
      participants: [context.clientId, lawyerId.toString()],
      appointmentId: appointmentDoc._id,
    });

    // Link chatroom to appointment
    appointmentDoc.chatRoomId = chatRoomDoc._id;
    await appointmentDoc.save();

    const appointment: AppointmentType = {
      lawyerId: appointmentDoc.lawyerId.toString(),
      clientId: appointmentDoc.clientId.toString(),
      schedule: appointmentDoc.schedule,
      status: appointmentDoc.status as unknown as AppointmentStatus.Pending,
      isFree: false,
      specializationId: appointmentDoc.specializationId ? appointmentDoc.specializationId.toString() : "",
      chatRoomId: chatRoomDoc._id.toString(),
    };

    return appointment;
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    throw new Error("Failed to create appointment");
  }
};
