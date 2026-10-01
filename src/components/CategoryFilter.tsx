import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {categories.map((category) => {
        const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all uppercase border ${
              isSelected
                ? 'bg-sage text-cream border-sage shadow-md'
                : 'bg-white text-slate-dark/70 border-sage/10 hover:border-sage/40 hover:text-sage'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
