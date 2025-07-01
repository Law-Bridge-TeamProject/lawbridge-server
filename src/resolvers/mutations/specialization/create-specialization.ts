import { Specialization } from "@/models";
import { MutationResolvers, SpecializationCategory } from "@/types/generated";

export const createSpecialization: MutationResolvers["createSpecialization"] = async (
  _: unknown,
  { input }
) => {
  const specialization = await Specialization.create(input);

  return {
    id: specialization._id.toString(),
    categoryName: specialization.categoryName as SpecializationCategory,
    subscription: specialization.subscription,
    pricePerHour: specialization.pricePerHour ?? undefined,
  };
};

