"use client"
import React, { useEffect, useState } from 'react';
import { yourUserNotes } from '@/actions/notes/yourUserNotes'
import Link from 'next/link';
const YourNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const fetchedNotes = await yourUserNotes(); // Fetch the user notes
          setNotes(fetchedNotes.voiceNotes || []); // Set the notes in the state
          setLoading(false);
        } catch (error) {
          setError('Could not fetch user notes');
          setLoading(false);
        }
      };
  
      fetchNotes();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; // Show loading state
    }
  
    if (error) {
      return <div>{error}</div>; // Show error state
    }
  
    return (
      <div className="container mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Voice Notes</h2>
        {notes.length === 0 ? (
          <p>No voice notes found.</p>
        ) : (
          <ul className="space-y-4">
            {notes.map((note) => (
              <Link href={`profile/my-note/${note.id}`} key={note.id} className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold">{note.title}</h3>
                <p>{note.description || 'No description available'}</p>
                <p>
                  <strong>Language:</strong> {note.language}
                </p>
                <p>
                  <strong>Category:</strong> {note.category}
                </p>
                <p>
                  <strong>Created At:</strong> {new Date(note.createdAt).toLocaleDateString()}
                </p>
                <audio controls className="mt-2">
                  <source src={note.fileUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </Link>
            ))}
          </ul>
        )}
      </div>
    );
  };
  

export default YourNotes
