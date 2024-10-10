// app/error.tsx
"use client"; // Necessary to handle client-side rendering of the error page

import { useEffect } from "react";
import Link from "next/link";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error); // Log the error for debugging
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg mb-4">An error occurred on the server.</p>
      <button onClick={reset} className="mb-4 text-blue-500">
        Try again
      </button>
      <Link href="/" className="text-blue-500">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
