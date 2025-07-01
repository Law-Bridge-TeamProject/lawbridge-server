import { MutationResolvers } from "@/types/generated";
import { Lawyer } from "@/models";

export const createLawyer: MutationResolvers["createLawyer"] = async (
  _,
  { input },
  context
) => {
  const newLawyer = await Lawyer.create(input);

  const populated = await Lawyer.findById(newLawyer._id)
    .populate("specialization")
    .populate("achievements")
    .lean();

  if (!populated) {
    throw new Error("Lawyer not found");
  }

  const casted = {
    ...populated,
    id: populated._id.toString(),
    specialization: Array.isArray(populated.specialization)
      ? populated.specialization.map((s: any) => ({
          id: s._id.toString(),
          categoryName: s.categoryName,
          subscription: s.subscription,
          pricePerHour: s.pricePerHour,
        }))
      : [],
    achievements: Array.isArray(populated.achievements)
      ? populated.achievements.map((a: any) => ({
          _id: a._id.toString(),
          title: a.title,
          description: a.description,
          threshold: a.threshold,
          icon: a.icon,
        }))
      : [],
  };

  return casted;
};
