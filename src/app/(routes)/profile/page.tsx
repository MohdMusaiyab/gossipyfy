"use client";
import { getUser } from "@/actions/user/getUser";
import UpdateUsernameForm from "../../components/profile/UpdateUsernameForm";
import UpdateUserEmailForm from "../../components/profile/UpdateUserEmailForm";
import UpdateUserPasswordForm from "../../components/profile/UpdateUserPasswordForm";
import YourNotes from "../../components/profile/YourNotes";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const userId = session.user.id; // Get user ID from session
        const fetchedUser = await getUser(userId); // Fetch user data
        setUser(fetchedUser); // Update state with user data
      }
      setLoading(false); // Set loading to false
    };

    fetchUser(); // Call the fetchUser function
  }, [session]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle case where user is not authenticated
  if (!session) {
    return <div>Please log in to see this page.</div>;
  }

  // Handle case where user data is not found
  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">Profile Page</h1>

      {/* Display user's basic information */}
      <p className="mt-4">
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <Link href="/profile/my-followers">
          Followers ({user.followers.length})
        </Link>
        <Link href="/profile/my-followings">
          Following ({user.following.length})
        </Link>
      </p>

      {/* Render the UpdateUsernameForm and pass the current username */}
      <UpdateUsernameForm currentUsername={user.username} />
      <UpdateUserEmailForm currentEmail={user.email} />
      <UpdateUserPasswordForm />
      <YourNotes />
    </div>
  );
};

export default ProfilePage;
