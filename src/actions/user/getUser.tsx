"use server ";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";

export const getUser = async () => {
  try {
    // Get the session, and handle authentication failure in getSessionOrThrow
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("User not authenticated");
    }
    //Get the profile of the user and return everyting except the password
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        voiceNotes: true,
        followers: true,
        following: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Could not get user");
  }
};
