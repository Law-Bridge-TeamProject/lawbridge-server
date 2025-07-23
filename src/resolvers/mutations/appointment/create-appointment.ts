import { Appointment, ChatRoom } from "@/models";
import {
  MutationResolvers,
  Appointment as AppointmentType,
  AppointmentStatus,
} from "@/types/generated";

export const createAppointment: MutationResolvers["createAppointment"] = async (
  _,
  { input },
  context
) => {
  try {
    const { clientId, lawyerId, schedule, specializationId } = input;

    // Create the appointment
    const appointmentDoc = await Appointment.create({
      clientId: context.clientId,
      lawyerId,
      schedule: new Date(schedule),
      status: "PENDING",
      price: 0,
      isFree: false,
      specializationId,
    });

    // Create a chatroom for this appointment
    const chatRoomDoc = await ChatRoom.create({
      participants: [context.clientId, lawyerId.toString()],
      appointmentId: appointmentDoc._id,
    });

    // Link chatroom to appointment
    appointmentDoc.chatRoomId = chatRoomDoc._id;
    await appointmentDoc.save();

    // Populate specializationId
    const populatedAppointment = await Appointment.findById(appointmentDoc._id)
      .populate("specializationId")
      .lean();

    const appointment: AppointmentType = {
      lawyerId: populatedAppointment.lawyerId.toString(),
      clientId: populatedAppointment.clientId.toString(),
      schedule: populatedAppointment.schedule,
      status:
        populatedAppointment.status as unknown as AppointmentStatus.Pending,
      specializationId:
        populatedAppointment.specializationId &&
        typeof populatedAppointment.specializationId === "object" &&
        "categoryName" in (populatedAppointment.specializationId as any)
          ? {
              _id: (
                populatedAppointment.specializationId as any
              )._id.toString(),
              categoryName: (populatedAppointment.specializationId as any)
                .categoryName,
              lawyerId:
                (
                  populatedAppointment.specializationId as any
                ).lawyerId?.toString?.() ?? "",
              specializationId:
                (
                  populatedAppointment.specializationId as any
                ).specializationId?.toString?.() ?? "",
              subscription:
                (populatedAppointment.specializationId as any).subscription ??
                false,
              pricePerHour:
                (populatedAppointment.specializationId as any).pricePerHour ??
                null,
            }
          : null,
      chatRoomId: chatRoomDoc._id.toString(),
      createdAt: populatedAppointment.createdAt
        ? new Date(populatedAppointment.createdAt).toISOString()
        : "",
      endedAt: populatedAppointment.endedAt
        ? new Date(populatedAppointment.endedAt).toISOString()
        : "",
    };

    return appointment;
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    throw new Error("Failed to create appointment");
  }
};
