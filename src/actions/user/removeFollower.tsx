"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const removeFollower = async (followerId: string) => {
  try {
    // Get the current session of the logged-in user
    const session = await getSessionOrThrow();
    const userId = session.user.id; // The ID of the logged-in user (whose followers list will be updated)

    // Remove the follower by disconnecting the relationship
    await prisma.user.update({
      where: { id: userId },
      data: {
        followers: {
          disconnect: { id: followerId }, // Remove the follower from the followers list
        },
      },
    });

    return { message: "Follower removed successfully" };
  } catch (error) {
    console.error("Error removing follower:", error);
    throw new Error("Error in removeFollower");
  }
};
