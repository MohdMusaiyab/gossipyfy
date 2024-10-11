// /actions/user/getMyFollowing.ts
"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";

export const getMyFollowing = async () => {
  try {
    const session = await getSessionOrThrow();
    
    // Query to get the users the current user is following
    const following = await prisma.user.findMany({
      where: {
        followers: {
          some: {
            id: session.user.id, // The current user is in the followers list
          },
        },
      },
      select: {
        id: true,
        username: true, // Only selecting necessary fields (id and username)
      },
    });

    return following;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching following users");
  }
};
