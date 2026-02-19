import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Search, Filter, Clock, Users, ChefHat } from 'lucide-react';

// Placeholder recipes for demo
const demoRecipes = [
  {
    id: '1',
    title: { nl: 'Sabich', en: 'Sabich' },
    description: { nl: 'Israelisch straateten met aubergine, ei en tahini', en: 'Israeli street food with eggplant, egg and tahini' },
    prepTime: 35,
    servings: 4,
    difficulty: 'easy',
    tags: ['vegetarian', 'budget'],
    image: '🍆',
  },
  {
    id: '2',
    title: { nl: 'Pad Thai', en: 'Pad Thai' },
    description: { nl: 'Thaise roerbaknoedels met garnalen en pinda\'s', en: 'Thai stir-fried noodles with shrimp and peanuts' },
    prepTime: 25,
    servings: 2,
    difficulty: 'medium',
    tags: ['quick'],
    image: '🍜',
  },
  {
    id: '3',
    title: { nl: 'Shakshuka', en: 'Shakshuka' },
    description: { nl: 'Gepocheerde eieren in pittige tomatensaus', en: 'Poached eggs in spicy tomato sauce' },
    prepTime: 30,
    servings: 3,
    difficulty: 'easy',
    tags: ['vegetarian', 'budget', 'quick'],
    image: '🍳',
  },
  {
    id: '4',
    title: { nl: 'Pasta Carbonara', en: 'Pasta Carbonara' },
    description: { nl: 'Romige Italiaanse pasta met spek en ei', en: 'Creamy Italian pasta with bacon and egg' },
    prepTime: 20,
    servings: 4,
    difficulty: 'easy',
    tags: ['quick'],
    image: '🍝',
  },
];

export default function RecipesPage() {
  const t = useTranslations('recipes');
  const tc = useTranslations('common');

  return (
    <div className="max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between pt-6 pb-4">
        <h1 className="text-xl font-bold">{t('title')}</h1>
        <LanguageSwitcher />
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none text-sm"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {['vegetarian', 'vegan', 'quick', 'budget'].map((tag) => (
          <button
            key={tag}
            className="px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors whitespace-nowrap"
          >
            {tc(tag as any)}
          </button>
        ))}
      </div>

      {/* Recipe grid */}
      <div className="grid grid-cols-2 gap-3">
        {demoRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="h-28 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-4xl">
              {recipe.image}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1">{recipe.title.nl}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{recipe.description.nl}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {recipe.prepTime} {tc('minutes')}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {recipe.servings}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
