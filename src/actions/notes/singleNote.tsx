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
      select: {
        id: true,
        title: true,
        description: true,
        fileUrl: true,
        likes: {
          select: {
            userId: true,
          },
        },
        //Also return the username from the user table in the response form comments
        comments: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
        isPremium: true,
        language: true,
        category: true,
        createdAt: true,
        user: {
          select: {
            username: true,
          },
        },
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
