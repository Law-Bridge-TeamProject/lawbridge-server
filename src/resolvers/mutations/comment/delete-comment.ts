import { Comment } from "@/models";
import { MutationResolvers } from "@/types/generated";

export const deleteComment: MutationResolvers["deleteComment"] = async (
  _,
  { input },
  context
) => {
  const author = context.userId;
  if (!author) throw new Error("Unauthorized");

  const comment = await Comment.findById(input.commentId);
  if (!comment) throw new Error("Comment not found");
  if (comment.author !== author) throw new Error("Not allowed to delete");

  await Comment.deleteOne({ _id: input.commentId });

  return true;
};
