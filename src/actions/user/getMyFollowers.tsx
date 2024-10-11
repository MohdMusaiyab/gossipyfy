"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const getMyFollowers = async () => {
  try {
    const session = await getSessionOrThrow();
    const followers = await prisma.user.findMany({
      where: {
        followers: {
          some: {
            id: session.user.id, // Your user ID should be in the followers list of other users
          },
        },
      },
    });
    return followers;
  } catch (err) {
    console.log(err);
    throw new Error("Error in getMyFollowers");
  }
};
