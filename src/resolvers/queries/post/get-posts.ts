import { Post, Lawyer, Comment } from "@/models";
import { QueryResolvers } from "@/types/generated";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export const getPosts: QueryResolvers["getPosts"] = async () => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("specialization")
    .populate("comments");

  // Fetch author information for each post
  const postsWithAuthors = await Promise.all(
    posts.map(async (post) => {
      let author = null;
      try {
        // Fetch lawyer details from our database using lawyerId
        console.log(`🔍 Looking up lawyer with ID: ${post.lawyerId}`);
        const lawyer = await Lawyer.findOne({ lawyerId: post.lawyerId }).lean();
        console.log(
          `👤 Found lawyer:`,
          lawyer ? `${lawyer.firstName} ${lawyer.lastName}` : "Not found"
        );

        if (lawyer) {
          // Try to get profile picture from Clerk
          let profilePicture = null;
          try {
            const clerkUser = await clerkClient.users.getUser(post.lawyerId);
            profilePicture = clerkUser.imageUrl || null;
          } catch (error) {
            console.error(
              `Failed to fetch profile picture for lawyer ${post.lawyerId}:`,
              error
            );
          }

          author = {
            id: lawyer.lawyerId,
            firstName: lawyer.firstName,
            lastName: lawyer.lastName,
            name: `${lawyer.firstName} ${lawyer.lastName}`,
            username: null,
            email: lawyer.email,
            profilePicture,
          };
        } else {
          // Fallback if lawyer not found in database
          author = {
            id: post.lawyerId,
            firstName: null,
            lastName: null,
            name: "Өмгөөлөгч",
            username: null,
            email: null,
            profilePicture: null,
          };
        }
      } catch (error) {
        console.error(`Failed to fetch author for post ${post._id}:`, error);
        // Fallback author data
        author = {
          id: post.lawyerId,
          firstName: null,
          lastName: null,
          name: "Өмгөөлөгч",
          username: null,
          email: null,
          profilePicture: null,
        };
      }

      return {
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
        type: post.type as any,
        author,
        comments: await Promise.all(
          (post.comments || []).map(async (c) => {
            const comment = c as any;
            let authorInfo = {
              id: comment.author,
              name: comment.author,
              email: null,
            };

            try {
              // Try to fetch user details from Clerk
              const clerkUser = await clerkClient.users.getUser(comment.author);
              authorInfo = {
                id: clerkUser.id,
                name:
                  clerkUser.fullName ||
                  clerkUser.emailAddresses[0]?.emailAddress ||
                  comment.author,
                email: clerkUser.emailAddresses[0]?.emailAddress || null,
              };
            } catch (error) {
              console.error(
                `Failed to fetch user details for comment author ${comment.author}:`,
                error
              );
              // Fallback to original author ID
            }

            return {
              _id: comment._id.toString(),
              post: comment.post.toString(),
              author: comment.author, // Keep original author ID for authentication
              authorInfo, // Add user details
              content: comment.content,
              createdAt: comment.createdAt,
              updatedAt: comment.updatedAt,
            };
          })
        ),
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    })
  );

  return postsWithAuthors;
};
