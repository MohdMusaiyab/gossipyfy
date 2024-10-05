"use client"; // Mark this as a client component
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import useParams from next/navigation
import { singleNote } from '@/actions/notes/singleNote';
import { updateVoiceNote } from '@/actions/notes/updateVoiceNote';

const Page = () => {
  const { id } = useParams(); // Get noteId from URL parameters
  const [note, setNote] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPremium: false,
    category: '',
    language: '',
  });
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const fetchedNote = await singleNote(id as string);
          setNote(fetchedNote);
          setFormData({
            title: fetchedNote.title,
            description: fetchedNote.description || '',
            isPremium: fetchedNote.isPremium,
            category: fetchedNote.category,
            language: fetchedNote.language,
          });
        } catch (err) {
          setError("Failed to load note. It may not exist.");
        } finally {
          setLoading(false); // Set loading to false after the request
        }
      };
      fetchNote();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateVoiceNote(id, formData);
    alert("Voice note updated successfully!");
  };

  if (loading) {
    return <p>Loading note details...</p>; // Show loading message
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Show error message
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Update Voice Note</h1>
      {note && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPremium"
                checked={formData.isPremium}
                onChange={handleInputChange}
                className="mr-2"
              />
              Premium Content
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Language:</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
            Update Voice Note
          </button>
        </form>
      )}
    </div>
  );
};

export default Page;
