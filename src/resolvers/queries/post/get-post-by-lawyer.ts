import { Post } from "@/models";
import { QueryResolvers } from "@/types/generated";

export const getPostsByLawyer: QueryResolvers["getPostsByLawyer"] = async (
  _,
  { lawyerId },
  context
) => {
  const posts = await Post.find({ lawyerId }).sort({ createdAt: -1 });

  return posts.map((post) => ({
    _id: post.id,                 
    lawyerId: post.lawyerId,
    title: post.title,
    content: post.content,
    specialization: post.specialization.map((s) => s.toString()),
    type: post.type,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));
};


