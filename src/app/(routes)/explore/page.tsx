"use client";
import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Link from "next/link";
import SearchBar from "@/app/components/Filters/SearchBar"; // Import SearchBar component

const ExplorePage = () => {
  const [languageFilters, setLanguageFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // Fixed limit for simplicity
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if there are more notes to load

  // Function to handle filter change
  const handleLanguageChange = (selectedLanguages: string[]) => {
    setLanguageFilters(selectedLanguages);
    setPage(1); // Reset to first page on filter change
    setNotes([]); // Reset the notes when filters change
  };

  const handleCategoryChange = (selectedCategories: string[]) => {
    setCategoryFilters(selectedCategories);
    setPage(1); // Reset to first page on filter change
    setNotes([]); // Reset the notes when filters change
  };

  // New function to handle search query change
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Set the new search query
    setPage(1); // Reset to first page on search change
    setNotes([]); // Reset the notes when search changes
  };

  // Fetch notes from the API
  const fetchNotes = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        languages: languageFilters.join(","),
        categories: categoryFilters.join(","),
        search: searchQuery, // Add search query to request
        page: String(page),
        limit: String(limit),
      });

      const response = await fetch(`/api/note/filters?${queryParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();

      if (Array.isArray(data.notes)) {
        setNotes((prevNotes) => {
          // Filter out notes that already exist in the current list
          const newNotes = data.notes.filter(
            (newNote) =>
              !prevNotes.some((prevNote) => prevNote.id === newNote.id)
          );
          return [...prevNotes, ...newNotes];
        });
      } else {
        console.error("Expected notes to be an array:", data.notes);
      }

      // If there are no more notes, stop further requests
      if (data.notes.length < limit) {
        setHasMore(false);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  // Infinite Scroll - Detect when user scrolls near the bottom
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1); // Load next page when scrolled near the bottom
    }
  };

  // Effect to fetch notes when filters, page, search query, or scroll changes
  useEffect(() => {
    fetchNotes(page);
  }, [languageFilters, categoryFilters, searchQuery, page]);

  // Attach scroll event listener to the window
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up listener on component unmount
    };
  }, [hasMore, loading]);

  return (
    <div className="flex">
      <SideBar
        selectedLanguages={languageFilters}
        onLanguageChange={handleLanguageChange}
        selectedCategories={categoryFilters}
        onCategoryChange={handleCategoryChange}
      />

      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Explore Voice Notes</h1>

        {/* Search Bar Component */}
        <SearchBar onSearch={handleSearch} /> {/* New SearchBar component */}

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="notes-list">
          {notes.map((note) => (
            <Link
              href={`explore/${note.id}`}
              key={note.id}
              className="note-card"
            >
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p>{note.description}</p>
            </Link>
          ))}
        </div>

        {/* If no more data to load, show a message */}
        {!hasMore && <p className="text-center mt-4">No more notes available.</p>}
      </div>
    </div>
  );
};

export default ExplorePage;

// Sample TypeScript interfaces for voice notes
interface VoiceNote {
  id: string;
  title: string;
  description?: string;
  // Add other fields as needed
}
