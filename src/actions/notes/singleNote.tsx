"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";
export const singleNote = async (id: string) => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("Please Login");
    }

    const note = await prisma.voiceNote.findUnique({
      where: {
        id: id,
      },
    });
    if (!note) {
      throw new Error("Note not found");
    }
    return note;
  } catch (error) {
    console.log(error);
  }
};
