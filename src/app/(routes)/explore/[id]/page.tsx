"use client"
import React from 'react';
import SingleVoiceNote from '@/app/components/SingleVoiceNote';
import { useParams } from 'next/navigation'; // Hook for query params

const Page = () => {
  
  const {id} = useParams();


  // Log to verify the ID
  console.log(id);

  // Return the component only if the id is available
  return (
    <div>
      {id ? (
        <SingleVoiceNote noteId={id as string} /> // Cast id as string
      ) : (
        <p>No note ID provided</p> // Fallback message if no id is found
      )}
    </div>
  );
};

export default Page;
