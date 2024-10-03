"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import VoiceNoteCard from "./VoiceNoteCard";

const Premium = () => {
  const [notes, setNotes] = useState([]); // Stores the fetched notes
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Determine if there are more notes to load
  const [loading, setLoading] = useState(false); // Loading state

  // Function to fetch premium notes from the backend
  const fetchNotes = async () => {
    if (loading || !hasMore) return; // Prevent multiple requests or when there's no more data

    setLoading(true);
    try {
      const response = await axios.get(`/api/note/premium-notes`, {
        params: { page, limit: 10 }, // Send page and limit as query params
      });

      const newNotes = response.data.notes;

      if (newNotes.length > 0) {
        setNotes((prevNotes) => {
          const existingIds = new Set(prevNotes.map(note => note.id)); // Store existing note IDs
          const uniqueNewNotes = newNotes.filter(note => !existingIds.has(note.id)); // Filter duplicates
          return [...prevNotes, ...uniqueNewNotes]; // Append unique new notes
        });
        setPage((prevPage) => prevPage + 1); // Increment page number
      } else {
        setHasMore(false); // No more notes to load
      }
    } catch (error) {
      console.error("Failed to load notes", error);
    }
    setLoading(false);
  };

  // Detect when the user scrolls to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      ) {
        fetchNotes(); // Load more notes when reaching the bottom
      }
    };

    // Set up the scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup event listener
  }, [page, hasMore]); // Rerun on page or hasMore change

  // Fetch the first batch of notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Premium Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note) => (
          <VoiceNoteCard
            key={note.id} // Assuming each note has a unique ID
            title={note.title}
            description={note.description}
            fileUrl={note.fileUrl}
            username={note.username}
            createdAt={note.createdAt}
            likes={note.likes}
            comments={note.comments}
            userAvatar={note.userAvatar}
          />
        ))}
      </div>
      {loading && <div>Loading more notes...</div>}
      {!hasMore && <div>No more notes available.</div>}
    </div>
  );
};

export default Premium;
