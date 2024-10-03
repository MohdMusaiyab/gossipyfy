import { NextResponse, NextRequest } from "next/server";
import { requireAuth } from "../../../../../lib/auth"; // Ensure this works with NextRequest
import prisma from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  // Adapt requireAuth to work with NextRequest
  const session = await requireAuth(req); // Use the utility to check authentication

  // If the session is null, it means the user is not authenticated
  if (!session) {
    return new Response(
      JSON.stringify({
        message: "Authentication required",
        success: false,
      }),
      {
        status: 401,
      }
    );
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const notes = await prisma.voiceNote.findMany({
    take: limit,
    skip: skip,
    where: {
      OR: [{ isPremium: true }, { isPremium: false }],
    },
  });

  const totalNotes = await prisma.voiceNote.count();

  return NextResponse.json({
    success: true,
    message: "Fetched notes",
    notes,
    totalPages: Math.ceil(totalNotes / limit),
    currentPage: page,
  });
}
