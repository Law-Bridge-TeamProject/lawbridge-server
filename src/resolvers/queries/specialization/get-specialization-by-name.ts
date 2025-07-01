import { Specialization } from "@/models";
import { QueryResolvers } from "@/types/generated";

export const getSpecializationByCategory: QueryResolvers["getSpecializationByCategory"] = async (
    _: unknown,
    { categoryName }
  ) => {
    const specialization = await Specialization.findOne({ categoryName });
    if (!specialization) throw new Error("Specialization not found");
  
    return {
      id: specialization._id.toString(),
      categoryName: specialization.categoryName,
      subscription: specialization.subscription,
      pricePerHour: specialization.pricePerHour ?? null,
    };
  };
  
