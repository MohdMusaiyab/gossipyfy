import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  // Get user session to check the user's premium status
  console.log("api hit");
  const session = await getServerSession(authOptions);
  const isPremium = session?.user?.isPremium || false;
  
  // Extract search parameters from the request
  const { searchParams } = new URL(req.url);
  const categories =
    searchParams
      .get("categories")
      ?.split(",")
      .map((cat) => cat.toUpperCase()) || [];
  const languages =
    searchParams
      .get("languages")
      ?.split(",")
      .map((lang) => lang.toUpperCase()) || [];
  
  // Extract search query parameter
  const searchQuery = searchParams.get("search")?.trim() || "";

  // Pagination parameters
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit; // Number of results to skip

  try {
    // Create a filter for the query
    const filter: any = {};

    // Filter by categories, but only if there are valid values
    if (categories.length > 0 && categories[0] !== "") {
      filter.category = { in: categories };
    }
    
    // Filter by languages, but only if there are valid values
    if (languages.length > 0 && languages[0] !== "") {
      filter.language = { in: languages };
    }

    // If user is not premium, show only free notes
    if (!isPremium) {
      filter.isPremium = false;
    }

    // If searchQuery is provided, add it to the filter
    if (searchQuery) {
      filter.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } }, // Search in titles
        { description: { contains: searchQuery, mode: 'insensitive' } } // Search in descriptions
      ];
    }

    // Fetch notes and total count based on the filter
    const notes = await prisma.voiceNote.findMany({
      where: filter,
      skip,
      take: limit,
    });

    const totalNotes = await prisma.voiceNote.count({
      where: filter,
    });

    // Check if any notes are found
    if (notes.length === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "No notes found",
      });
    }

    // Return the response with notes and pagination data
    console.log("notes", notes);
    return NextResponse.json({
      status: 200,
      success: true,
      notes,
      pagination: {
        total: totalNotes,
        page,
        pages: Math.ceil(totalNotes / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "An error occurred while fetching notes",
    });
  }
}
