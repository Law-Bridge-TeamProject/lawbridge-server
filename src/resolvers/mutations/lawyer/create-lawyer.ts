// /resolvers/mutations/lawyer/create-lawyer.ts

import { MutationResolvers } from "@/types/generated";
import { Lawyer as LawyerModel } from "@/models";
import { Context } from "@/types/context";

export const createLawyer: MutationResolvers["createLawyer"] = async (
  _,
  { input },
  context: Context
) => {
  const lawyerId = context.lawyerId; 

  if (!lawyerId) {
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
      lawyerId: lawyerId,
      clerkUserId: lawyerId,
      clientId: lawyerId
    };

    const newLawyer = await LawyerModel.create(lawyerData);

    const populatedLawyer = await LawyerModel.findById(newLawyer._id)
      .populate("specialization")
      .populate("achievements")
      .exec();

    if (!populatedLawyer) {
      throw new Error(
        "Critical error: Failed to retrieve lawyer after creation."
      );
    }

    return populatedLawyer.toObject() as any; 
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
