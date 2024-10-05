"use server";
import prisma from "../../../lib/prisma";
import { isOwner } from "./isOwner";

export const updateVoiceNote = async (noteId: string, data: any) => {
  try {
    // Check if the user is authorized to update the note
    const isOwnerResult = await isOwner(noteId);
    if (!isOwnerResult) {
      throw new Error("You are not authorized to perform this action");
    }
    // Filter out undefined values from the data object to update only the provided fields
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    // Ensure there are fields to update
    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error("No valid fields to update");
    }

    // Update the note with the provided fields
    const updatedNote = await prisma.voiceNote.update({
      where: {
        id: noteId,
      },
      data: fieldsToUpdate, // Update only the provided fields
    });

    return updatedNote;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update note");
  }
};
