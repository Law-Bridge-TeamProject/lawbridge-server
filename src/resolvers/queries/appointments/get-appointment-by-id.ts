import { ObjectId } from "mongodb";
import { QueryResolvers } from "@/types/generated";

type GetAppointmentByIdArgs = { id: string };

export const getAppointmentById: QueryResolvers["getAppointmentById"] = async (
  _parent,
  { id }: GetAppointmentByIdArgs,
  context
) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(`Invalid appointment ID: ${id}`);
  }

  const appointment = await context.db
    .collection("appointments")
    .findOne({ _id: new ObjectId(id) });

  if (!appointment) {
    throw new Error(`Appointment with ID ${id} not found`);
  }

  return {
    _id: appointment._id.toString(),
    clientId: appointment.clientClerkId ?? "", // ⚠️ Та clientId биш clientClerkId гэж хадгалсан байж магадгүй
    lawyerId: appointment.lawyerId.toString?.() ?? "", // ObjectId бол toString ашиглана
    schedule:
      appointment.schedule instanceof Date
        ? appointment.schedule.toISOString()
        : appointment.schedule ?? "",
    status: appointment.status,
    chatRoomId: appointment.chatRoomId?.toString?.() ?? null,
    createdAt: appointment.createdAt?.toISOString?.() ?? null,
    updatedAt: appointment.updatedAt?.toISOString?.() ?? null,
  };
};
