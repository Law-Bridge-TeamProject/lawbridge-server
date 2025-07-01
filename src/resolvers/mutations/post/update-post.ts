import { Post } from "@/models";
import { MutationResolvers } from "@/types/generated";
import { ObjectId } from "mongodb";

export const updatePost: MutationResolvers["updatePost"] = async (
  _: unknown,
  { postId, input },
  context
) => {
  const { lawyerId } = context;
  if (!lawyerId) throw new Error("Unauthorized: Lawyer not authenticated");

  const post = await Post.findById(postId);
  
  if (!post) throw new Error("Post not found");
  if (post.lawyerId !== lawyerId) throw new Error("Not authorized to update this post");
  if (input.title !== undefined) post.title = input.title;
  if (input.specialization !== undefined) {
    post.specialization = input.specialization.map((s) => new ObjectId(s));
  }
  if (input.content !== undefined) post.content = input.content;
  if (input.type !== undefined) post.type = input.type;

  await post.save();

  return {
    _id: post._id.toString(),
    lawyerId: post.lawyerId,
    title: post.title,
    content: post.content,
    specialization: post.specialization.map((s) => s.toString()),
    type: post.type,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};



