"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUser } from "@/actions/user/getUser";
import { toggleFollowers } from "@/actions/notes/toggleFollowers"; // Import the toggle function
import { useSession } from "next-auth/react"; // Import session management

import Link from "next/link";

const Page = () => {
  const { id } = useParams(); // Get the id from the URL
  const { data: session } = useSession(); // Get the session data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); // State for following status
  const [toggleLoading, setToggleLoading] = useState(false); // State for loading during toggle

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const userData = await getUser(id); // Call getUser with the id
          setUser(userData);

          // Set initial follow state
          const currentUser = session?.user;
          const isUserFollowing = userData.followers.some(
            (follower) => follower.id === currentUser?.id
          );
          setIsFollowing(isUserFollowing);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Could not load user data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [id, session?.user?.id]);

  const handleToggleFollow = async () => {
    if (!session) {
      setError("Please login to follow/unfollow this user.");
      return;
    }

    setToggleLoading(true); // Set loading during the toggle action
    try {
      // Optimistically toggle follow state
      setIsFollowing((prev) => !prev);
      const updatedFollowersCount = isFollowing ? user.followers.length - 1 : user.followers.length + 1;

      // Update followers count optimistically
      setUser((prev) => ({
        ...prev,
        followers: isFollowing
          ? prev.followers.slice(0, -1)
          : [...prev.followers, { id: session.user.id }],
      }));

      // Call API to toggle follow status
      await toggleFollowers(id);
    } catch (err) {
      console.error("Error toggling follow status", err);
      setError("Failed to update follow status.");
      setIsFollowing((prev) => !prev); // Rollback the follow state in case of error
    } finally {
      setToggleLoading(false); // End loading state
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data found</div>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">{user.username}'s Profile</h1>
      <p className="mt-4">
        <strong>Email:</strong> {user.email}
      </p>

      {/* Follow Button */}
      <div className="my-4">
        <button
          onClick={handleToggleFollow}
          disabled={toggleLoading} // Disable button while toggling
          className={`p-2 rounded ${
            isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
        <p>{user.followers.length} Followers</p>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Voice Notes</h2>
      {user.voiceNotes.length > 0 ? (
        <ul>
          {user.voiceNotes.map((note) => (
            <li key={note.id} className="mt-2 border p-2 rounded">
              <p>
                <Link href={`/explore/${note.id}`}>Content:</Link> {note.title}
              </p>
              {note.createdAt && (
                <p className="text-sm text-gray-500">
                  <strong>Created At:</strong>{" "}
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No voice notes found.</p>
      )}
    </div>
  );
};

export default Page;
