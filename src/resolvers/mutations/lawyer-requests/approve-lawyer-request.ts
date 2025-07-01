import { MutationResolvers } from "@/types/generated";
import { LawyerRequest, Lawyer, Specialization } from "@/models";
import { clerkClient } from "@clerk/nextjs/server";
import mongoose from "mongoose";

export const approveLawyerRequest: MutationResolvers["approveLawyerRequest"] =
  async (_, { lawyerId }) => {
    const request = await LawyerRequest.findOne({ lawyerId });

    if (!request) {
      throw new Error("Lawyer request not found");
    }

    const client = await clerkClient();
    await client.users.updateUserMetadata(lawyerId, {
      publicMetadata: {
        role: "lawyer",
        verified: true,
      },
    });

    interface RequestSpecialization {
      categoryName: string;
      subscription: boolean;
      pricePerHour?: number | null;
    }

    interface LawyerRequestWithSpecializations {
      specializations: RequestSpecialization[];
    }

    const specializationIds: (mongoose.Types.ObjectId | null)[] =
      await Promise.all(
        (request as LawyerRequestWithSpecializations).specializations.map(
          async (
            spec: RequestSpecialization
          ): Promise<mongoose.Types.ObjectId | null> => {
            const existingSpec = await Specialization.findOne({
              categoryName: spec.categoryName,
              subscription: spec.subscription,
              pricePerHour: spec.pricePerHour ?? undefined,
            });
            return existingSpec ? existingSpec._id : null;
          }
        )
      );

    const filteredSpecializationIds = specializationIds.filter(
      (id): id is mongoose.Types.ObjectId => id !== null
    );

    await Lawyer.create({
      lawyerId: request.lawyerId,
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      licenseNumber: request.licenseNumber,
      bio: request.bio,
      university: request.university,
      profilePicture: request.profilePicture,
      specializations: filteredSpecializationIds,
    });

    request.status = "approved";
    await request.save();

    return true;
  };
