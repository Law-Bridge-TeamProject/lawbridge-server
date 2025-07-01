import { MutationResolvers } from "@/types/generated";
import { LawyerRequest, Lawyer, Specialization } from "@/models";
import { clerkClient } from "@clerk/express";
import mongoose from "mongoose";

export const approveLawyerRequest: MutationResolvers["approveLawyerRequest"] =
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

      await clerkClient.users.updateUserMetadata(request.lawyerId, {
        publicMetadata: {
          role: "lawyer",
          verified: true,
        },
      });

      const specializationIds = await Promise.all(
        request.specializations.map(async (spec) => {

          const existingSpec = await Specialization.findOne({
            categoryName: spec.categoryName,
          })
            .session(session)
            .exec();
          return existingSpec ? existingSpec._id : null;
        })
      );

      const filteredSpecializationIds = specializationIds.filter(
        (id): id is mongoose.Types.ObjectId => id !== null
      );

      await Lawyer.create(
        [
          {
            lawyerId: request.lawyerId,
            firstName: request.firstName,
            lastName: request.lastName,
            email: request.email,
            licenseNumber: request.licenseNumber,
            bio: request.bio,
            university: request.university,
            profilePicture: request.profilePicture,
            specializations: filteredSpecializationIds,
          },
        ],
        { session } 
      );

      request.status = "approved";
      await request.save({ session }); 

      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      console.error("Transaction aborted during approval:", error);
      throw error;
    } finally {
      await session.endSession();
    }
  };
