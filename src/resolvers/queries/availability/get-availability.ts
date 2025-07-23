import { QueryResolvers } from "@/types/generated";
import { AvailabilitySchedule } from "@/models";

export const getAvailability: QueryResolvers["getAvailability"] = async (
  _,
  { lawyerId },
) => {
  const schedule = await (AvailabilitySchedule as any).findOne({ lawyerId });
  if (!schedule) {
    return [];
  }
  return schedule.availableDays.map((dayObj: any) => ({
    lawyerId: schedule.lawyerId,
    day: dayObj.day,
    startTime: dayObj.startTime,
    endTime: dayObj.endTime,
    availableDays: [], // Only if required by your Availability type
  }));
};
