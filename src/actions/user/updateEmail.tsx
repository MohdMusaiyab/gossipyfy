"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";

export const updateEmail = async (newEmail: string) => {
  try {
    //Get the session, and handle authentication failure in getSessionOrThrow
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("User not authenticated");
    }
    const currentEmail = session.user.email;
    //Finding if the user thats making the request is the same as the user that is being updated
    const existingUser = await prisma.user.findUnique({
      where: {
        email: currentEmail,
      },
    });
    if (!existingUser) {
      console.log("User not found");
      throw new Error("User not found");
    }
    if (existingUser.email !== currentEmail) {
      throw new Error("Not authenticated to update the email");
    }
    //Checking if the new email is already taken
    const existingUserWithNewEmail = await prisma.user.findUnique({
      where: {
        email: newEmail,
      },
    });
    if (existingUserWithNewEmail) {
      throw new Error("Email already in Use");
    }
    //Updating the email
    const updatedUser = await prisma.user.update({
      where: {
        email: currentEmail,
      },
      data: {
        email: newEmail,
      },
    });
    console.log("User updated successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Could not update email");
  }
};
