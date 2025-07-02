// /resolvers/mutations/lawyer/create-lawyer.ts

import { MutationResolvers } from "@/types/generated";
import { Lawyer as LawyerModel } from "@/models";
import { GraphQLContext } from "@/types/context";

export const createLawyer: MutationResolvers["createLawyer"] = async (
  _,
  { input },
  context: GraphQLContext
) => {
  // === THE ROBUST FIX: VALIDATE YOUR INPUT! ===
  // Check if the essential lawyerId is present.
  if (!input.lawyerId || input.lawyerId.trim() === "") {
    // Throw a clear, user-friendly error immediately.
    throw new Error("A valid lawyerId is required to create a lawyer profile.");
  }

  const lawyerId = context.lawyerId;

  if (!lawyerId) {
    console.error("❌ context.userId not found");
    throw new Error("Authentication required. Clerk userId missing.");
  }

  try {
    const lawyerData = {
      ...input,
      lawyerId: lawyerId, // Ensure the correct field is being populated
    };

    const newLawyer = await LawyerModel.create(lawyerData); // Use the validated data

    // ... rest of your successful creation logic (populate, toObject, etc.)
    const populatedLawyer = await LawyerModel.findById(newLawyer._id)
      .populate("specialization")
      .populate("achievements")
      .exec();

    if (!populatedLawyer) {
      throw new Error(
        "Critical error: Failed to retrieve lawyer after creation."
      );
    }

    return populatedLawyer.toObject() as any; // Using `as any` for brevity here, but your `as unknown as GqlLawyer` is better
  } catch (error: any) {
    console.error("--- Create Lawyer Resolver Failed ---", error);

    if (error.code === 11000) {
      throw new Error("A lawyer with this ID or email already exists.");
    }

    throw new Error(
      "An internal server error occurred while creating the lawyer."
    );
  }
};
