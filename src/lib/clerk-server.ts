import { clerkClient } from "@clerk/clerk-sdk-node";  // getting the username

export const getUser = async (userId: string) => {
  return await clerkClient.users.getUser(userId);
};
