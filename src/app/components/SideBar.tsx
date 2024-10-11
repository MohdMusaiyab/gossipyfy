// src/app/explore/Sidebar.tsx

import LanguageFilter from './Filters/LanguageFilter';
import CategoryFilter from './Filters/CategoryFilter';
import UploadModal from './UploadModal';
import Link from 'next/link';

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
      <Link href="/explore/my-followings">My Followings</Link>
      
    </aside>
  );
};

export default Sidebar;
