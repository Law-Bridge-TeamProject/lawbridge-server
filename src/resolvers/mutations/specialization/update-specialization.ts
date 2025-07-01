import { SpecializationCategory } from "@/types/generated";
import { MutationResolvers } from "@/types/generated";
import { Specialization } from "@/models";

export const updateSpecialization: MutationResolvers["updateSpecialization"] = async (
  _,
  { categoryName, input }
) => {
  const specialization = await Specialization.findOne({ categoryName });

  if (!specialization) throw new Error("Specialization not found");

  if (input.subscription !== undefined) {
    specialization.subscription = input.subscription;
  }
  if (input.pricePerHour !== undefined) {
    specialization.pricePerHour = input.pricePerHour;
  }

  await specialization.save();

  return {
    id: specialization._id.toString(),
    categoryName: categoryName as SpecializationCategory,
    subscription: specialization.subscription,
    pricePerHour: specialization.pricePerHour ?? undefined,
  };
};
