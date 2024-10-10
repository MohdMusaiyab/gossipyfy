// app/not-found.tsx
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-4">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link href="/" className="text-blue-500">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
