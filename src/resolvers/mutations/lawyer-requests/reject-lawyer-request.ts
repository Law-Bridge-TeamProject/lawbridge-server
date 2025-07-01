import { MutationResolvers } from "@/types/generated";
import { LawyerRequest } from "@/models";
import { clerkClient } from "@clerk/express";
import mongoose from "mongoose";

export const rejectLawyerRequest: MutationResolvers["rejectLawyerRequest"] =
  async (_, { lawyerId }) => {
    const session = await mongoose.startSession();

    try {
      await session.startTransaction();

      const request = await LawyerRequest.findOne({ lawyerId })
        .session(session)
        .exec();

      if (!request) {
        throw new Error("Lawyer request not found for the given lawyerId.");
      }

      if (request.status !== "pending") {
        throw new Error(
          `This request has already been processed (status: ${request.status}).`
        );
      }

      await clerkClient.users.deleteUser(request.lawyerId);

      await LawyerRequest.findOneAndDelete({ lawyerId })
        .session(session)
        .exec();

      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      console.error("Transaction aborted during rejection:", error);
      throw error;
    } finally {
      await session.endSession();
    }
  };
