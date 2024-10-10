"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const singleNote = async (id: string) => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("Please Login");
    }

    const userId = session.user.id; // The logged-in user

    // Fetch the note with additional user info (followers, following)
    const note = await prisma.voiceNote.findUnique({
      where: { id: id },
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
            id: true,
            followers: true, // Include followers array
            following: true, // Include following array
          },
        },
      },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    const noteOwnerId = note.user.id;

    // Check if the current user is following the note owner
    const isFollowing = await prisma.user.findFirst({
      where: {
        id: userId,
        following: {
          some: { id: noteOwnerId },
        },
      },
    });

    // Return the note data along with followers/following counts and follow status
    return {
      ...note,
      isFollowing: !!isFollowing, // Convert to boolean
      followersCount: note.user.followers.length,
      followingCount: note.user.following.length,
    };
  } catch (error) {
    console.error("Error fetching note:", error);
    throw new Error("Failed to fetch note");
  }
};
