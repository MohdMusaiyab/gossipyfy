"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const getProfileofAnotherUser = async (userId: string) => {
  try {
    
  } catch (error) {
    console.error("Error fetching user data:", error);
    return "Could not load user data.";
  }
};
