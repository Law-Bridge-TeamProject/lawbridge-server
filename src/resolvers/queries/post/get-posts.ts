import { Post } from "@/models";
import { QueryResolvers } from "@/types/generated";

export const getPosts: QueryResolvers["getPosts"] = async () => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("specialization");

  return posts.map((post) => ({
    id: post._id.toString(),
    _id: post._id.toString(),
    lawyerId: post.lawyerId,
    title: post.title,
    content: post.content,
    specialization: (post.specialization || []).map((s) => {
      const spec = s as any;
      return {
        id: spec._id.toString(),
        _id: spec._id.toString(),
        categoryName: spec.categoryName,
      };
    }),
    type: post.type as any, // Cast to MediaType if needed
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));
};
