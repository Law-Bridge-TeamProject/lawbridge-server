import { Post } from "@/models";
import { QueryResolvers } from "@/types/generated";

export const getPostsByLawyer: QueryResolvers["getPostsByLawyer"] = async (
  _,
  { lawyerId },
  context
) => {
  const posts = await Post.find({ lawyerId }).sort({ createdAt: -1 });

  return posts.map((post) => ({
    id: post._id.toString(),
    _id: post._id.toString(),
    lawyerId: post.lawyerId,
    title: post.title,
    content: post.content,
    specialization: (post.specialization || []).map((s) =>
      typeof s === "object" && s !== null && s._id
        ? { ...s, _id: s._id.toString() }
        : s
    ),
    type: post.type,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));
};
