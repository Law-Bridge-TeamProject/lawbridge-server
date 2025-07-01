import { QueryResolvers } from "@/types/generated";
import { Lawyer as LawyerModel } from "@/models";

export const getLawyerById: QueryResolvers["getLawyerById"] = async (
  _,
  { lawyerId },
  context
) => {
  const lawyer = await LawyerModel.findById(lawyerId)
    .populate("specialization")
    .populate("achievements")
    .lean();

  if (!lawyer) {
    throw new Error("Lawyer not found");
  }

  return {
    ...lawyer,
    id: lawyer._id.toString(),
    specialization: lawyer.specialization.map((s: any) => ({
      ...s,
      id: s._id.toString(),
    })),
    achievements: lawyer.achievements.map((a: any) => ({
      ...a,
      id: a._id.toString(),
    })),
  };
};
