"use client";

import React, { useEffect, useState } from 'react';
import { getMyFollowing } from '@/actions/user/getMyFollowing';

const FollowingPage = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const result = await getMyFollowing(); // Call server action
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Users I'm Following</h1>
      {following.length > 0 ? (
        <ul>
          {following.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>You are not following anyone yet.</p>
      )}
    </div>
  );
};

export default FollowingPage;
