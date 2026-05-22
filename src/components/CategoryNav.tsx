import { Category } from '../types';
import { getCategoryIcon } from '../utils/categoryIcons';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  primaryColor?: string;
}

export default function CategoryNav({ categories, activeCategory, onCategoryChange, primaryColor = '#dc2626' }: CategoryNavProps) {
  const allCategories = [{ id: 'all', name: 'Todos', icon: 'all' }, ...categories];

  return (
    <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={isActive ? { backgroundColor: primaryColor } : undefined}
              >
                {getCategoryIcon(cat.icon)}
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
