import { QueryResolvers, Availability, DayOfWeek } from "@/types/generated";

export const getAvailability:QueryResolvers["getAvailability"] = async (parent: unknown, { lawyerId, day }, context) => {

    const availabilityDocs = await context.db
      .collection("availabilityschedules")
      .find({ lawyerId, date: day })
      .toArray();

    interface AvailabilityDoc {
        _id: { toString(): string };
        lawyerId: string;
        date: string;
        startTime: string;
        endTime: string;
    }

    const availabilities: Availability[] = (availabilityDocs as AvailabilityDoc[]).map((doc: AvailabilityDoc): Availability => ({
        lawyerId: doc.lawyerId,
        day: doc.date as DayOfWeek, 
        startTime: doc.startTime,
        endTime: doc.endTime,
    }));

    return availabilities;
}