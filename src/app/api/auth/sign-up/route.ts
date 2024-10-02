// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import prisma from "../../.../../../../../lib/prisma"; // Adjust the path based on your project structure
import bcrypt from "bcryptjs"; // For password hashing

export async function POST(request: Request) {
  const { email, username, password } = await request.json();

  // Validate input
  if (!email || !username || !password) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  // Check if the user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser?.email === email) {
    return NextResponse.json(
      { message: "User already exists." },
      { status: 409 }
    );
  }
  if (existingUser?.username === username) {
    return NextResponse.json(
      { message: "Username already taken." },
      { status: 409 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      isPremium: false, // Default value
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
