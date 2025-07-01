import { Schema, model, Model, models, Types } from "mongoose";

enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}
type AvailabilityScheduleSchemaType = {
    lawyerId: Types.ObjectId; 
    day: DayOfWeek;
    startTime: string; 
    endTime: string; 
};

const AvailabilityScheduleSchema = new Schema<AvailabilityScheduleSchemaType>({
    lawyerId: { type: Schema.Types.ObjectId, ref: 'Lawyer', required: true },
    day: {
      enum: Object.values(DayOfWeek),
      type: String,
      required: true
    },
    startTime: { type: String, required: true }, 
    endTime: { type: String, required: true },   
  },{timestamps: true});
  
  export const AvailabilitySchedule: Model<AvailabilityScheduleSchemaType> =
    models["AvailabilitySchedule"] || model("AvailabilitySchedule", AvailabilityScheduleSchema);