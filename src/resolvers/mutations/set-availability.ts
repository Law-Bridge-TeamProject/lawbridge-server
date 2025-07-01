import { Types } from "mongoose";
import { AvailabilitySchedule } from "@/models";
import { MutationResolvers, DayOfWeek } from "@/types/generated";

export const setAvailability: MutationResolvers["setAvailability"] = async (
  _,
  { lawyerId, day, startTime, endTime }
) => {
  try {
    if (!Types.ObjectId.isValid(lawyerId)) {
      console.error("❌ Invalid lawyerId:", lawyerId);
      throw new Error("Invalid lawyerId");
    }
    console.log("🔥 Creating availability:", {
      lawyerId,
      day,
      startTime,
      endTime,
    });

    const created = await AvailabilitySchedule.create({
      lawyerId: new Types.ObjectId(lawyerId),
      day,
      startTime,
      endTime,
    });
    
    return {
      _id: created._id.toString(),
      lawyerId: created.lawyerId.toString(),
      day: created.day as unknown as DayOfWeek,
      startTime: created.startTime,
      endTime: created.endTime,
    };
  } catch (err) {
    console.error("❌ setAvailability error:", err);
    throw new Error("Failed to set availability");
  }
};
