"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";

export const updateUserName = async (newUsername: string) => {
  try {
    // Get the session, and handle authentication failure in getSessionOrThrow
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("User not authenticated");
    }

    //Getting the current username
    const currentEmail = session.user.email;
    //Finding if the user thats mkaing the request is the same as the user that is being updated
    const existingUser = await prisma.user.findUnique({
      where: {
        email: currentEmail,
      },
    });
    if(!existingUser){
      console.log("User not found");
      throw new Error("User not found");

    }
    if(existingUser.email !== currentEmail){
      throw new Error("Not authenticated to update the username");
    }
    //Checking if the new username is already taken
    const existingUserWithNewUsername = await prisma.user.findUnique({
      where: {
        username: newUsername,
      },
    });
    if(existingUserWithNewUsername){
      throw new Error("Username already taken");
    }
    //Updating the username
    const updatedUser = await prisma.user.update({
      where: {
        email: currentEmail,
      },
      data: {
        username: newUsername,
      },
    });
    console.log("User updated successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Could not update username");
  }
};
