import { NextResponse, NextRequest } from "next/server";
import { requireAuth } from "../../../../../lib/auth"; // Ensure this works with NextRequest
import prisma from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const session = await requireAuth(req); // Use the utility to check authentication

  // If the session is null, it means the user is not authenticated
  if (!session) {
    return new Response(JSON.stringify({
      message: "Authentication required",
      success: false,
    }), {
      status: 401,
    });
  }

  // Extract page and limit from the query parameters
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
  const limit = parseInt(searchParams.get("limit")) || 10; // Default to 10 notes per page

  // Calculate the offset for pagination
  const offset = (page - 1) * limit;

  // Logic for getting premium notes with pagination
  const notes = await prisma.voiceNote.findMany({
    where: {
      isPremium: true,
    },
    take: limit, // Limit the number of notes retrieved
    skip: offset, // Skip the notes that belong to previous pages
  }); // This will get premium notes based on pagination

  // Get the total count of premium notes for calculating total pages
  const totalNotes = await prisma.voiceNote.count({
    where: {
      isPremium: true,
    },
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalNotes / limit);

  return NextResponse.json({
    success: true,
    message: "Premium Notes",
    notes,
    totalPages, // Include total pages in the response
    currentPage: page, // Include current page in the response
  });
}
