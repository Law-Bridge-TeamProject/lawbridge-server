// resolvers/lawyerSpecialization/createSpecialization.ts
import { LawyerSpecialization } from "@/models";
import { MutationResolvers } from "@/types/generated";
import { GraphQLError } from "graphql";

export const createSpecialization: MutationResolvers["createSpecialization"] =
  async (_, { input },context) => {
    try {
      const docs = input.specializations.map((s) => ({
        lawyerId: context.lawyerId,
        specializationId: s.specializationId,
        subscription: s.subscription,
        pricePerHour: s.pricePerHour,
        categoryName: s.categoryName,
      }));

      const created = await LawyerSpecialization.insertMany(docs);

      return created.map((spec) => ({
        _id: spec._id.toString(),
        lawyerId: spec.lawyerId.toString(),
        specializationId: spec.specializationId.toString(),
        subscription: spec.subscription,
        pricePerHour: spec.pricePerHour,
        categoryName: spec.categoryName,
      }));
    } catch (error) {
      console.error("❌ Error creating specializations:", error);
      throw new GraphQLError("Failed to create specializations");
    }
  };
