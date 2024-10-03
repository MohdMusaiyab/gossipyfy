"use client"
import React, { useEffect, useState, useRef } from 'react';
import VoiceNoteCard from './VoiceNoteCard';

const Free = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const observer = useRef();

  // Function to fetch notes from the API
  const fetchNotes = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/note/free-notes?page=${pageNum}&limit=10`);
      const data = await response.json();
  
      if (data.success) {
        // Prevent duplicates
        setNotes((prevNotes) => {
          const existingIds = new Set(prevNotes.map(note => note.id));
          const newNotes = data.notes.filter(note => !existingIds.has(note.id));
          return [...prevNotes, ...newNotes]; // Combine without duplicates
        });
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch notes", error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll implementation
  const lastNoteElementRef = (node) => {
    if (loading) return; // Prevent adding observer if loading

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  // Fetch notes on mount and when the page number changes
  useEffect(() => {
    fetchNotes(page);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Free Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note, index) => {
          // Use lastNoteElementRef on the last note for infinite scroll
          if (notes.length === index + 1) {
            return (
              <div ref={lastNoteElementRef} key={note.id}>
                <VoiceNoteCard
                  title={note.title}
                  description={note.description}
                  fileUrl={note.fileUrl}
                  username={note.username}
                  createdAt={note.createdAt}
                  likes={note.likes}
                  comments={note.comments}
                  userAvatar={note.userAvatar}
                />
              </div>
            );
          }
          return (
            <VoiceNoteCard
              key={note.id}
              title={note.title}
              description={note.description}
              fileUrl={note.fileUrl}
              username={note.username}
              createdAt={note.createdAt}
              likes={note.likes}
              comments={note.comments}
              userAvatar={note.userAvatar}
            />
          );
        })}
      </div>
      {loading && <p className="text-center mt-4">Loading more notes...</p>}
    </div>
  );
};

export default Free;
