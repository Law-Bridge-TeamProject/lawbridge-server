import { QueryResolvers } from "@/types/generated";
import { Lawyer as LawyerModel } from "@/models";
import { Types } from "mongoose";

export const getLawyersBySpecialization: QueryResolvers["getLawyersBySpecialization"] =
  async (_, { specializationId }) => {
    const lawyers = await LawyerModel.find({
      specialization: new Types.ObjectId(specializationId),
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
