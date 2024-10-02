import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import mime from "mime-types";

// Configure AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession({ req, ...authOptions });

    // Checking if the user is authenticated
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract user ID from the session
    const { user } = session;
    //@ts-ignore
    const { id } = user;

    // Get form data
    const data = await req.formData();

    const title = data.get('title') as string;
    const description = data.get('description') as string;
    const language = data.get('language') as string;
    const category = data.get('category') as string;
    const file = data.get('file');

    // Ensure the file exists and is of type `File`
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: "Invalid file upload" }, { status: 400 });
    }

    // Convert the file to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const timestamp = Date.now(); // Get the current timestamp
    const uniqueFileName = `${title}-${timestamp}.${mime.extension(file.type)}`;
    const bucketName = process.env.AWS_S3_BUCKET_NAME!;

    // Create a new S3 command
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: buffer,
      ContentType: file.type, // Ensure content type is set correctly
    });

    // Execute the S3 command
    await s3.send(command);

    // Save the file details in the database
    await prisma.voiceNote.create({
      data: {
        title,
        description,
        language,
        category,
        fileUrl: uniqueFileName,
        userId: parseInt(id),
      },
    });

    // Return a success message
    return NextResponse.json({
      message: "Successfully uploaded the note",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error uploading the note" }, { status: 500 });
  }
}
