import { NotificationService } from "@/services";
import { Context } from "@/types/context";
import { MutationResolvers } from "@/types/generated";
import { GraphQLError } from "graphql";

export const createNotification: MutationResolvers<Context>['createNotification'] = async (_, { input }, context) => {
  // 1. Correctly get userId from the context
  const { userId } = context;

  // 2. Authentication: Ensure a user is making this request.
  if (!userId) {
    throw new GraphQLError("You must be logged in to create a notification.", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  // 3. Delegate to the service layer for business logic and validation.
  return NotificationService.create(input, userId);
};