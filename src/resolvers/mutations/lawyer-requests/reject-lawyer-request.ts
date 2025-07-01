import { MutationResolvers } from "@/types/generated";
import { LawyerRequest, Lawyer } from "@/models";

export const rejectLawyerRequest: MutationResolvers["rejectLawyerRequest"] =
  async (_: unknown, { lawyerId }) => {
    const request = await LawyerRequest.findOne({ lawyerId });

    if (!request) throw new Error("Lawyer request not found");

    request.status = "rejected";
    await request.save();

    return true;
  };
