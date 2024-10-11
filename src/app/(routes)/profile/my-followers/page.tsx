"use client";

import React, { useEffect, useState } from 'react';
import { getMyFollowers } from '@/actions/user/getMyFollowers';

const FollowersPage = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const result = await getMyFollowers(); // Call server action to fetch data
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Followers</h1>
      {followers.length > 0 ? (
        <ul>
          {followers.map((follower) => (
            <li key={follower.id}>{follower.username}</li>
          ))}
        </ul>
      ) : (
        <p>You have no followers yet.</p>
      )}
    </div>
  );
};

export default FollowersPage;
