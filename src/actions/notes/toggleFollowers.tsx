"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const toggleFollowers = async (id: string) => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("Please Login");
    }
    const userId = session.user.id; // The user who is logged in
    const followedId = id; // The user who is going to be followed/unfollowed

    // Check if the user is already following the target person
    const isFollowing = await prisma.user.findFirst({
      where: {
        id: userId,
        following: {
          some: { id: followedId },
        },
      },
    });

    if (isFollowing) {
      // If already following, unfollow the target user
      await prisma.user.update({
        where: { id: userId },
        data: {
          following: {
            disconnect: { id: followedId },
          },
        },
      });
      return { message: "Unfollowed successfully" };
    } else {
      // If not following, follow the target user
      await prisma.user.update({
        where: { id: userId },
        data: {
          following: {
            connect: { id: followedId },
          },
        },
      });
      return { message: "Followed successfully" };
    }
  } catch (error) {
    console.error("Error toggling follow status:", error);
    throw new Error("Failed to toggle follow status");
  }
};
