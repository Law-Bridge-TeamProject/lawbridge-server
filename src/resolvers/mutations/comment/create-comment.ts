import { Comment } from "@/models";
import { MutationResolvers } from "@/types/generated";

export const createComment: MutationResolvers["createComment"] = async (
  _,
  { input },
  context
) => {
  const author = context.userId;
  if (!author) throw new Error("Unauthorized");

  const newComment = await Comment.create({
    post: input.postId,
    author,
    content: input.content,
  });

  return {
    _id: newComment._id.toString(),
    post: newComment.post.toString(),
    author: newComment.author,
    content: newComment.content,
    createdAt: newComment.createdAt,
    updatedAt: newComment.updatedAt,
  };
};
