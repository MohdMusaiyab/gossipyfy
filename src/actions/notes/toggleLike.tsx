"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const toggleLike = async (noteId: string,userId:string) => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id; // Get the logged-in user's ID

    // Check if the user already liked this note
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        voiceNoteId: noteId,
      },
    });

    if (existingLike) {
      // If the like exists, remove it
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return { message: "Like removed successfully" };
    } else {
      // If the like does not exist, add it
      await prisma.like.create({
        data: {
          userId,
          voiceNoteId: noteId,
        },
      });
      return { message: "Like added successfully" };
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to toggle like");
  }
};
