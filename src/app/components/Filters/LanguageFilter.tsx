// LanguageFilter.jsx
import React from 'react';

const LanguageFilter = ({ selectedLanguages, onChange }) => {
  const languages = ['ENGLISH', 'HINDI', 'BHOJPURI', 'OTHER'];

  const handleCheckboxChange = (language) => {
    const newSelectedLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter((item) => item !== language) // Remove if already selected
      : [...selectedLanguages, language]; // Add if not selected
    onChange(newSelectedLanguages);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Languages</h3>
      {languages.map((language) => (
        <div key={language} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={language}
            value={language}
            checked={selectedLanguages.includes(language)}
            onChange={() => handleCheckboxChange(language)}
            className="mr-2"
          />
          <label htmlFor={language} className="text-white">
            {language}
          </label>
        </div>
      ))}
    </div>
  );
};

export default LanguageFilter;
