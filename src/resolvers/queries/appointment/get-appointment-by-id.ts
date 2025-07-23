import { QueryResolvers } from "@/types/generated";
import { Appointment } from "@/models";

export const getAppointmentById: QueryResolvers["getAppointmentById"] = async (
  _,
  { id },
  context
) => {
  const appointment = await Appointment.findById(id)
    .populate("specializationId")
    .populate("specialization-lawyer")
    .lean();
  if (!appointment) {
    return null;
  }
  return {
    ...appointment,
    id: appointment._id.toString(),
    chatRoomId: appointment.chatRoomId
      ? appointment.chatRoomId.toString()
      : null,
    specializationId: appointment.specializationId?._id
      ? appointment.specializationId._id.toString()
      : appointment.specializationId?.toString?.() ?? "",
    specialization:
      appointment.specializationId &&
      typeof appointment.specializationId === "object" &&
      "categoryName" in appointment.specializationId
        ? {
            id: appointment.specializationId._id.toString(),
            categoryName: appointment.specializationId.categoryName,
          }
        : null,
    specializationLawyer:
      appointment["specialization-lawyer"] &&
      typeof appointment["specialization-lawyer"] === "object" &&
      "_id" in appointment["specialization-lawyer"]
        ? {
            id: appointment["specialization-lawyer"]._id.toString(),
            // Add other fields as needed
          }
        : null,
    createdAt: appointment.createdAt
      ? new Date(appointment.createdAt).toISOString()
      : "",
    endedAt: appointment.endedAt
      ? new Date(appointment.endedAt).toISOString()
      : "",
  };
};
