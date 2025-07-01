import { Post } from "@/models";
import { MutationResolvers, MediaType } from "@/types/generated";

export const createPost: MutationResolvers["createPost"] = async (
  _: unknown,
  { input },
  context
) => {
  const { lawyerId } = context;
  if (!lawyerId) throw new Error("Unauthorized: Lawyer not authenticated");

  const newPost = await Post.create({
    lawyerId,
    title: input.title,
    content: input.content,
    specialization: input.specialization,
    type: input.content.image
      ? MediaType.Image
      : input.content.video
      ? MediaType.Video
      : input.content.audio
      ? MediaType.File // эсвэл өөрийн enum утга
      : MediaType.Text,
  });

  return {
    _id: newPost._id.toString(), // ❗ GraphQL ID шаардлагад нийцүүлж string болгож байна
    lawyerId: newPost.lawyerId.toString(),
    title: newPost.title,
    content: newPost.content,
    specialization: newPost.specialization.map((id: any) => id.toString()),
    type: newPost.type as MediaType,
    createdAt: newPost.createdAt,
    updatedAt: newPost.updatedAt,
  };
};
