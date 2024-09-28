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
    <button
      onClick={session ? handleLogout : handleLogin}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {session ? "Logout" : "Login"}
    </button>
  );
}
