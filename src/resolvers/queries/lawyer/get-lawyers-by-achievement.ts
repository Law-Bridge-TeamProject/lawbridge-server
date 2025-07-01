import { QueryResolvers } from "@/types/generated";
import { Lawyer as LawyerModel } from "@/models";
import { Types } from "mongoose";

export const getLawyersByAchievement: QueryResolvers["getLawyersByAchievement"] =
  async (_, { achievementId }) => {
    const lawyers = await LawyerModel.find({
      achievements: new Types.ObjectId(achievementId),
    })
      .populate("specialization")
      .populate("achievements")
      .lean();

    return lawyers.map((lawyer) => ({
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
    }));
  };
