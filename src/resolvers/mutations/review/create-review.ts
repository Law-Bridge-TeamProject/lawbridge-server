import { Review } from "@/models";
import { MutationResolvers } from "@/types/generated";
import { Types } from "mongoose";

export const createReview: MutationResolvers["createReview"] = async (
  _: unknown,
  { input },
  context
) => {
  const { clientId, lawyerId } = context;

  if (!clientId) throw new Error("Unauthorized: Client not authenticated");
  if (!lawyerId) throw new Error("Unauthorized: Lawyer not authenticated");

  const newReview = await Review.create({
    clientId,
    lawyerId: new Types.ObjectId(lawyerId),
    rating: input.rating,
    comment: input.comment,
  });

  return {
    id: newReview._id.toString(),
    clientId: newReview.clientId,
    lawyerId: newReview.lawyerId.toString(),
    rating: newReview.rating,
    comment: newReview.comment,
    createdAt: newReview.createdAt,
    updatedAt: newReview.updatedAt,
  };
};
