"use client";

import React, { useEffect, useState } from 'react';
import { myFollowingNotes } from '@/actions/notes/myFollowingnotes';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userId = 'your-user-id-here'; // Pass the current userId (can come from session)
        const fetchedNotes = await myFollowingNotes(userId);
        setNotes(fetchedNotes);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        setError('Failed to fetch notes');
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Notes from My Subscriptions</h1>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h2>{note.title}</h2>
              <p>Created by: {note.user.username}</p>
              <p>Description: {note.description}</p>
              <audio controls src={note.fileUrl}></audio>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
};

export default NotesPage;
