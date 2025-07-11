import {
  MutationResolvers,
  Appointment as AppointmentType,
  AppointmentStatus,
} from "@/types/generated";
import { Appointment } from "@/models";

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
      specializationId: [],
    });

    const appointment: AppointmentType = {
      lawyerId: appointmentDoc.lawyerId.toString(),
      clientId: appointmentDoc.clientId.toString(),
      schedule: appointmentDoc.schedule,
      status: appointmentDoc.status as unknown as AppointmentStatus.Pending,
      isFree: false,
      specializationId:null
    };

    return appointment;
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    throw new Error("Failed to create appointment");
  }
};
