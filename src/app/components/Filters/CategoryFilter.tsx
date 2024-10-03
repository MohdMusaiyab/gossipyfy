// CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ selectedCategories, onChange }) => {
  const categories = ['MUSIC', 'PODCAST', 'NEWS', 'CONVERSATION','EDUCATION','OTHER'];

  const handleCheckboxChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category) // Remove if already selected
      : [...selectedCategories, category]; // Add if not selected
    onChange(newSelectedCategories);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      {categories.map((category) => (
        <div key={category} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={category}
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCheckboxChange(category)}
            className="mr-2"
          />
          <label htmlFor={category} className="text-white">
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
