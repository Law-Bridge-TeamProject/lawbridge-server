// src/resolvers/subscription.ts
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub<any>(); 

export const Subscription = {
  messageAdded: {
    subscribe: (_: unknown, { chatRoomId }: { chatRoomId: string }) => {
      return pubsub.asyncIterableIterator([`MESSAGE_ADDED_${chatRoomId}`]);
    },
  },
};
