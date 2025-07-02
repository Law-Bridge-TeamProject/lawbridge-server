// /resolvers/mutations/lawyer/create-lawyer.ts

import { MutationResolvers } from "@/types/generated";
import { Lawyer as LawyerModel } from "@/models";

export const createLawyer: MutationResolvers["createLawyer"] = async (
  _,
  { input },
  context
) => {
  // --- THIS IS THE CRITICAL FIX ---
  // Always check for the required authentication data FIRST.
  const lawyerId = context.lawyerId; // Or clerkUserId, depending on your context

  if (!lawyerId) {
    // If there is no lawyerId, stop everything immediately.
    // This prevents the code from ever reaching the database with null data.
    throw new Error(
      "Authentication failed: Lawyer ID is missing from context."
    );
  }

  if (!lawyerId) {
    console.error("❌ context.lawyerId not found");
    throw new Error("Authentication required. Clerk lawyerId missing.");
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
