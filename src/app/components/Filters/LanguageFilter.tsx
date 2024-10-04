// src/app/explore/LanguageFilter.tsx

const LanguageFilter = ({ selectedLanguages, onChange }: { selectedLanguages: string[]; onChange: (languages: string[]) => void }) => {
  const languages = ['ENGLISH', 'HINDI', 'BHOJPURI', 'OTHER'];

  const handleSelect = (lang: string) => {
    const updatedLanguages = selectedLanguages.includes(lang)
      ? selectedLanguages.filter(l => l !== lang)
      : [...selectedLanguages, lang];
    onChange(updatedLanguages);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold">Filter by Language</h3>
      {languages.map(lang => (
        <label key={lang} className="block">
          <input
            type="checkbox"
            checked={selectedLanguages.includes(lang)}
            onChange={() => handleSelect(lang)}
          />
          {lang}
        </label>
      ))}
    </div>
  );
};

export default LanguageFilter;
