"use client"
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search by title or description"
        className="border border-gray-300 p-2 w-full"
      />
      <button onClick={handleSearch} className="mt-2 bg-blue-500 text-white p-2">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
