"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";
export const getUser = async (userId: string) => {
  try {
    // Get the profile of the user by their ID and return everything except the password
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("Log in Before this Step");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId, // Use the provided userId instead of session
      },
      select: {
        id: true,
        username: true,
        email: true,
        voiceNotes: true,
        followers: {
          select: {
            id: true,
            username: true,
          },
        },
        following: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    // Check if user exists
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Could not get user");
  }
};
