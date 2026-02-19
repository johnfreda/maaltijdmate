import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { Search, Clock, Users, Euro, Flame } from 'lucide-react';
import { recipes, estimateCost } from '@/lib/recipes';

export default function RecipesPage() {
  const t = useTranslations('recipes');
  const tc = useTranslations('common');
  const locale = useLocale();

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
        {recipes.map((recipe) => {
          const title = locale === 'nl' ? recipe.title_nl : recipe.title_en;
          const desc = locale === 'nl' ? recipe.description_nl : recipe.description_en;
          const cost = estimateCost(recipe);

          return (
            <Link
              key={recipe.id}
              href={`/recepten/${recipe.id}`}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-28 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-4xl relative">
                {recipe.emoji}
                {recipe.source.type === 'hellofresh' && (
                  <span className="absolute top-2 right-2 text-[8px] font-bold bg-green-600 text-white px-1.5 py-0.5 rounded-full">HF</span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{desc}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {recipe.prep_time}′
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {recipe.servings}
                  </span>
                  {cost > 0 && (
                    <span className="flex items-center gap-0.5 text-green-600 font-medium">
                      <Euro size={12} />
                      {cost.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
