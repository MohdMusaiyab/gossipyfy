// src/lib/getSession.ts
import { getServerSession } from "next-auth"; // Ensure you import the right method
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getSessionOrThrow = async () => {
    const session = await getServerSession(authOptions); // Fetch session with options
    if (!session || !session.user?.email) {
        return null; // Return null if no session
    }
    return session; // Return the session if authenticated
};
