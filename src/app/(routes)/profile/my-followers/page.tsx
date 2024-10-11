"use client";

import React, { useEffect, useState } from 'react';
import { getMyFollowers } from '@/actions/user/getMyFollowers';
import { removeFollower } from '@/actions/user/removeFollower';

const FollowersPage = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const result = await getMyFollowers(); // Call server action to fetch followers
        setFollowers(result);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching followers:', err);
        setError('Failed to fetch followers');
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  const handleRemoveFollower = async (followerId: string) => {
    try {
      await removeFollower(followerId); // Call server action to remove the follower
      // Update the local state by filtering out the removed follower
      setFollowers(followers.filter((follower) => follower.id !== followerId));
    } catch (err) {
      console.error('Error removing follower:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Followers</h1>
      {followers.length > 0 ? (
        <ul>
          {followers.map((follower) => (
            <li key={follower.id} className="flex justify-between items-center">
              <span>{follower.username}</span>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                onClick={() => handleRemoveFollower(follower.id)}
              >
                Remove Follower
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no followers yet.</p>
      )}
    </div>
  );
};

export default FollowersPage;
