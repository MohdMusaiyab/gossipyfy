// src/app/explore/CategoryFilter.tsx

const CategoryFilter = ({ selectedCategories, onChange }: { selectedCategories: string[]; onChange: (categories: string[]) => void }) => {
  const categories = ['MUSIC', 'PODCAST', 'CONVERSATION', 'NEWS', 'EDUCATION', 'OTHER'];

  const handleSelect = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onChange(updatedCategories);
  };

  return (
    <div>
      <h3 className="font-semibold">Filter by Category</h3>
      {categories.map(category => (
        <label key={category} className="block">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleSelect(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
