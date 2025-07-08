import { LawyerSpecialization, Specialization } from "@/models";
import { MutationResolvers, SpecializationInput } from "@/types/generated";

export const createSpecialization: MutationResolvers["createSpecialization"] =
  async (_, { input }: { input: SpecializationInput }) => {
    try {
      const createdSpecializations = await LawyerSpecialization.insertMany(
        input.specializations
      );

      // category => io
      // lawyer table ru update category ids => categoryId

      // Return the created documents with proper typing
      return createdSpecializations.map((spec) => ({
        _id: spec._id.toString(),
        lawyerId: spec.lawyerId.toString(),
        categoryId: spec.categoryId.toString(),
        subscription: spec.subscription,
        pricePerHour: spec.pricePerHour,
      }));
    } catch (error) {
      console.error("Error creating specializations:", error);
      throw new Error("Failed to create specializations");
    }
  };
