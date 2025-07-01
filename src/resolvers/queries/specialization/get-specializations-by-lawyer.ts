import { Specialization } from "@/models";
import { QueryResolvers } from "@/types/generated";

export const getSpecializationsByLawyer: QueryResolvers["getSpecializationsByLawyer"] = async (
  _:unknown,
  { lawyerId, subscription }
) => {
  
  const filter: any = {};
  if (subscription !== undefined) {
    filter.subscription = subscription;
  }

  return await Specialization.find(filter);
};
