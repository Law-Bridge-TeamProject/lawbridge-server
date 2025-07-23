// resolvers/lawyerSpecialization/getSpecializationsByLawyer.ts
import { LawyerSpecialization } from "@/models";
import { QueryResolvers } from "@/types/generated";
import { GraphQLError } from "graphql";

export const getSpecializationsByLawyer: QueryResolvers["getSpecializationsByLawyer"] =
  async (_, { lawyerId }) => {
    try {
      const specializations = await LawyerSpecialization.find({ lawyerId });

      return specializations.map((spec) => ({
        _id: spec._id.toString(),
        lawyerId: spec.lawyerId.toString(),
        specializationId: spec.specializationId.toString(),
        categoryName: spec.categoryName,
        subscription: spec.subscription,
        pricePerHour: spec.pricePerHour,
      }));
    } catch (error) {
      throw new GraphQLError("Failed to fetch specializations");
    }
  };
