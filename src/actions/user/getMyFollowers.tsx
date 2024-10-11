"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const getMyFollowers = async () => {
  try {
    const session = await getSessionOrThrow();
    const followers = await prisma.user.findMany({
        where: {
          following: {
            some: {
              id: session.user.id, // The logged-in user's ID should be in the "following" list of other users
            },
          },
        },
        select: {
          id: true,
          username: true, // Add any other fields you want to fetch, like email
        },
      });
    
    return followers;
  } catch (err) {
    console.log(err);
    throw new Error("Error in getMyFollowers");
  }
};
