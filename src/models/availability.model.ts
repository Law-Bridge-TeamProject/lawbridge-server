import { Schema, model, models } from "mongoose";

const availableDaySchema = new Schema(
  {
    day: String,
    startTime: String,
    endTime: String,
  },
  { _id: false } // Prevents Mongoose from creating _id for subdocs
);

const availabilityScheduleSchema = new Schema({
  lawyerId: { type: String, required: true },
  availableDays: [availableDaySchema], // <-- Use a plain array of objects
});

export const AvailabilitySchedule = models.AvailabilitySchedule || model("AvailabilitySchedule", availabilityScheduleSchema);
