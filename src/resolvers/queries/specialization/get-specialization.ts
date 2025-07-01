import { Specialization } from "@/models";
import { QueryResolvers } from "@/types/generated";

export const getSpecializations: QueryResolvers["getSpecializations"] = async () => {
  return await Specialization.find();
};
