"use client";

import React, { useEffect, useState } from 'react';
import { getMyFollowing } from '@/actions/user/getMyFollowing';
import { toggleFollowers } from '@/actions/notes/toggleFollowers';
import Link from 'next/link';

const FollowingPage = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const result = await getMyFollowing(); // Call server action to fetch users you're following
        setFollowing(result);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching following users:', err);
        setError('Failed to fetch following users');
        setLoading(false);
      }
    };

    fetchFollowing();
  }, []);

  // Function to handle follow/unfollow toggle
  const handleToggleFollow = async (id: string) => {
    try {
      const response = await toggleFollowers(id); // Call server action to toggle follow status
      console.log(response.message);
      
      // After toggling, fetch the updated following list
      const updatedFollowing = await getMyFollowing();
      setFollowing(updatedFollowing);
    } catch (err) {
      console.error('Error toggling follow status:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Users I'm Following</h1>
      {following.length > 0 ? (
        <ul>
          {following.map((user) => (
            
            <li key={user.id} className="flex justify-between items-center">
              <Link href={`/profile/${user.id}`}>{user.username}</Link>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                onClick={() => handleToggleFollow(user.id)}
              >
                Unfollow
              </button>
            </li>
            
          ))}
        </ul>
      ) : (
        <p>You are not following anyone yet.</p>
      )}
    </div>
  );
};

export default FollowingPage;
