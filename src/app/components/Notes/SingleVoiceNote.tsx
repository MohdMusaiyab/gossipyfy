"use client"
import React, { useEffect, useState } from 'react';
import { singleNote } from '@/actions/notes/singleNote'; 


// Component that takes a noteId and fetches the corresponding voice note
const SingleVoiceNote = ({ noteId}) => {
    const [note, setNote] = useState(null); // State to store note data
    const [error, setError] = useState(null); // State to store error message
    const [loading, setLoading] = useState(true); // State to handle loading
  
    // Fetch the note when the component mounts
    useEffect(() => {
      const fetchNote = async () => {
        try {
          const fetchedNote = await singleNote(noteId); // Call the server action
          setNote(fetchedNote); // Set the fetched note in state
          console.log(fetchedNote);
          setLoading(false); // Turn off the loading state
        } catch (err) {
          setError(err.message); // Set error message
          setLoading(false); // Turn off the loading state
        }
      };
  
      fetchNote(); // Invoke the function to fetch the note
    }, [noteId]);
  
    // Loading state
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Error handling
    if (error) {
      return <div>{error}</div>;
    }
  
    // If no note is found
    if (!note) {
      return <div>Note not found</div>;
    }
  
    // Render the note details
    return (
      <div className="voice-note-container">
        <h2 className="text-2xl font-bold">{note.title}</h2>
        <p>{note.description}</p>
        <audio controls src={note.fileUrl}>
          Your browser does not support the audio element.
        </audio>
        <p>Language: {note.language}</p>
        <p>Premium Content: {note.isPremium ? 'Yes' : 'No'}</p>
        <p>Category: {note.category}</p>
        <p>Likes: {note.likes.length}</p>
        <p>Comments {note.comments.length}</p>
        <p>Created At: {new Date(note.createdAt).toLocaleDateString()}</p>
        
      </div>
    );
  };
  
export default SingleVoiceNote
