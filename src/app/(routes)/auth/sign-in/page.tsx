"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      // Redirect to the home page or any other page after successful sign-in
      router.push("/explore");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            Sign in with Credentials
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 mb-6">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
        <p className="text-blue-600">
          Don't Have an Account?<Link href="/auth/sign-up">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
