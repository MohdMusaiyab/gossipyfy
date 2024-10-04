"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";

export const updatePassword = async (newPassword: string) => {
  // Get the session, and handle authentication failure in getSessionOrThrow
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
    throw new Error("Not authenticated to update the password");
  }
  //Updating the password
  const updatedUser = await prisma.user.update({
    where: {
      email: currentEmail,
    },
    data: {
      password: newPassword,
    },
  });
  console.log("User updated successfully:", updatedUser);
  return updatedUser;
};
