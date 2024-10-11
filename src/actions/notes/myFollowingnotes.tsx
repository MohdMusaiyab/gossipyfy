"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const myFollowingNotes = async () => {
  try {
    // Get the session of the user
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("You must be logged in to perform this action");
    }

    // Get the user id
    const userId = session.user.id;
    const voiceNotes = await prisma.voiceNote.findMany({
      where: {
        user: {
          followers: {
            some: {
              id: userId, // Current user's ID (who is following)
            },
          },
        },
      },
      include: {
        user: true, // Optional: Include the user data if needed
        comments: true, // Optional: Include comments if needed
        likes: true, // Optional: Include likes if needed
      },
    });

    return voiceNotes;

    // Fetch all the notes of the users that the current user is following
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch following notes");
  }
};
