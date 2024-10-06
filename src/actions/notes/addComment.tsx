"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const addComment = async (
  noteId: string,
  text: string,
  userId: string
) => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("User not authenticated");
    }
    //Checking if the userId making the comment and logged in user are same
    
    if (session.user.id !== userId) {
      throw new Error("User not authenticated");
    }
    //Now since the user is logged in He/She can add a comment
    const newComment = await prisma.comment.create({
      data: {
        text,
        userId,
        voiceNoteId: noteId,
      },
      include: {
        user: true,
        voiceNote: true, // Include voice note if necessary
      },
    }); //Create a new comment
    return newComment;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add comment");
  }
};
