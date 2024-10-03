// SideBar.jsx
"use client";
// SideBar.jsx
import React, { useState } from "react";

import UploadModal from "./UploadModal";
import CategoryFilter from "./Filters/CategoryFilter";
import LanguageFilter from "./Filters/LanguageFilter";
import axios from "axios";
const SideBar = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleCategoryChange = async (categories) => {
    setSelectedCategories(categories);
    // Implement your filtering logic here
    try {
      const res = await axios.get("/api/note/filters", {
        params: {
          categories: categories.join(","),
        },
      });
      // console.log("Notes:", res.data.notes);

    } catch (error) {
      console.log("Error in fetching notes:", error);
    }
  };

  const handleLanguageChange = async(languages) => {
    setSelectedLanguages(languages);
    // Implement your filtering logic here
    try{
      const res = await axios.get("/api/note/filters", {
        params: {
          languages: languages.join(","),
        },
      });
      // console.log("Notes:", res.data.notes);
    }
    catch(error)
    {
      console.log("Error in fetching notes:", error);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-4">Explore Options</h2>

      <CategoryFilter
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
      />
      <LanguageFilter
        selectedLanguages={selectedLanguages}
        onChange={handleLanguageChange}
      />

      {/* Other sections (Recent Uploads, Popular Notes) */}
      <UploadModal />
    </div>
  );
};

export default SideBar;
