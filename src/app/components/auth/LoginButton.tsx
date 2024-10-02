"use client"; // This is a client-side component

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession();

  const handleLogin = async () => {
    try {
      await signIn(); // Redirect to the default NextAuth login page
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Sign the user out
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {session ? (
        <>
          {/* Display the username */}
          <span className="text-white">
            {session.user?.username || session.user?.email} {/* Fallback to email if username is not available */}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      )}
    </div>
  );
}
