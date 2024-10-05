"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const isOwner = async (noteId: string) => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("You must be logged in to perform this action");
    }
    //Now fetch the note by ID
    const note = await prisma.voiceNote.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new Error("Note not found");
    }
    //Check if the user is the owner of the note
    if (note.userId !== session.user.id) {
      throw new Error("You are not authorized to perform this action");
    }
    //When the user is the owner of the note
    return true;
  } catch (error) {
    console.log(error);
  }
};
