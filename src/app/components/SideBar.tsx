// src/app/explore/Sidebar.tsx

import LanguageFilter from './Filters/LanguageFilter';
import CategoryFilter from './Filters/CategoryFilter';
import UploadModal from './UploadModal';

const Sidebar = ({
  selectedLanguages,
  onLanguageChange,
  selectedCategories,
  onCategoryChange
}: {
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}) => {
  return (
    <aside className="w-1/4 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      <LanguageFilter selectedLanguages={selectedLanguages} onChange={onLanguageChange} />
      <CategoryFilter selectedCategories={selectedCategories} onChange={onCategoryChange} />
      <UploadModal />
    </aside>
  );
};

export default Sidebar;
