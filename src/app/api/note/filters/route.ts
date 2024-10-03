import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
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

  // Pagination parameters
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit; // Number of results to skip

  try {
    const filter: any = {};

    // Prisma uses "in" for array filtering
    if (categories.length > 0) {
      filter.category = { in: categories };
    }

    if (languages.length > 0) {
      filter.language = { in: languages };
    }

    const notes = await prisma.voiceNote.findMany({
      where: filter,
      skip,
      take: limit,
    });
    const totalNotes = await prisma.voiceNote.count({
      where: filter, // To get the total count for pagination purposes
    });

    console.log("Query executed successfully");

    if (notes.length === 0) {
      return NextResponse.json({
        status: 404,
        body: "No notes found",
      });
    }

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
      body: "An error occurred while fetching notes",
    });
  }
}
