'use client';

import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { Search, Clock, Users, Euro, ChefHat, Filter } from 'lucide-react';
import { recipes, estimateCost } from '@/lib/recipes';
import { useState, useMemo } from 'react';

export default function RecipesPage() {
  const t = useTranslations('recipes');
  const tc = useTranslations('common');
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const gradients = [
    'hero-gradient-1', 'hero-gradient-2', 'hero-gradient-3', 
    'hero-gradient-4', 'hero-gradient-5', 'hero-gradient-6'
  ];

  // Filter counts
  const filterCounts = useMemo(() => {
    return {
      vegetarian: recipes.filter(r => r.tags.includes('vegetarian')).length,
      quick: recipes.filter(r => r.prep_time <= 30).length,
      budget: recipes.filter(r => estimateCost(r) < 8).length,
      easy: recipes.filter(r => r.difficulty === 'easy').length,
    };
  }, []);

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(recipe => {
        const title = locale === 'nl' ? recipe.title_nl : recipe.title_en;
        const description = locale === 'nl' ? recipe.description_nl : recipe.description_en;
        return title.toLowerCase().includes(query) || 
               description.toLowerCase().includes(query) ||
               recipe.tags.some(tag => tag.toLowerCase().includes(query));
      });
    }

    // Apply category filter
    if (selectedFilter) {
      switch (selectedFilter) {
        case 'vegetarian':
          filtered = filtered.filter(r => r.tags.includes('vegetarian'));
          break;
        case 'quick':
          filtered = filtered.filter(r => r.prep_time <= 30);
          break;
        case 'budget':
          filtered = filtered.filter(r => estimateCost(r) < 8);
          break;
        case 'easy':
          filtered = filtered.filter(r => r.difficulty === 'easy');
          break;
      }
    }

    return filtered;
  }, [searchQuery, selectedFilter, locale]);

  const filterOptions = [
    { key: 'vegetarian', label: 'Vegetarisch', count: filterCounts.vegetarian, emoji: '🌱' },
    { key: 'quick', label: 'Snel klaar', count: filterCounts.quick, emoji: '⚡' },
    { key: 'budget', label: 'Budget', count: filterCounts.budget, emoji: '💰' },
    { key: 'easy', label: 'Makkelijk', count: filterCounts.easy, emoji: '👍' },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <div className="flex items-center gap-3">
          <ChefHat className="text-green-600" size={28} />
          <h1 className="text-2xl font-bold text-premium">{t('title')}</h1>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Search with animation */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-gray-400 transition-smooth" size={20} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 outline-none text-sm shadow-card transition-premium text-premium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-smooth"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter chips with counts */}
      <div className="flex gap-3 mb-8 overflow-x-auto custom-scroll pb-2">
        <button
          onClick={() => setSelectedFilter(null)}
          className={`px-4 py-2.5 text-sm font-semibold rounded-2xl transition-premium whitespace-nowrap flex items-center gap-2 ${
            selectedFilter === null
              ? 'bg-green-600 text-white shadow-card'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Filter size={16} />
          Alle recepten
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
            {recipes.length}
          </span>
        </button>
        
        {filterOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setSelectedFilter(selectedFilter === option.key ? null : option.key)}
            className={`px-4 py-2.5 text-sm font-semibold rounded-2xl transition-premium whitespace-nowrap flex items-center gap-2 ${
              selectedFilter === option.key
                ? 'bg-green-600 text-white shadow-card'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{option.emoji}</span>
            {option.label}
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedFilter === option.key 
                ? 'bg-white/20' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {option.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recept' : 'recepten'} gevonden
        </p>
      </div>

      {/* Recipe cards - full width */}
      <div className="space-y-6">
        {filteredRecipes.map((recipe, index) => {
          const title = locale === 'nl' ? recipe.title_nl : recipe.title_en;
          const desc = locale === 'nl' ? recipe.description_nl : recipe.description_en;
          const cost = estimateCost(recipe);
          const gradientClass = gradients[Math.abs(recipe.id.charCodeAt(0)) % gradients.length];

          return (
            <Link
              key={recipe.id}
              href={`/recepten/${recipe.id}`}
              className="block group"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-card hover-lift transition-premium">
                {/* Hero image with gradient */}
                <div className={`h-48 ${gradientClass} flex items-center justify-center relative`}>
                  <span className="text-7xl opacity-90">{recipe.emoji}</span>
                  
                  {/* HelloFresh badge */}
                  {recipe.source.type === 'hellofresh' && (
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-white border border-white/30">
                      HelloFresh
                    </div>
                  )}
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 recipe-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {/* Top badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="tag-time px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Clock size={12} />
                      {recipe.prep_time}min
                    </div>
                    <div className="tag-difficulty px-3 py-1.5 rounded-full text-xs font-semibold">
                      {recipe.difficulty === 'easy' ? '🟢 Makkelijk' : 
                       recipe.difficulty === 'medium' ? '🟡 Gemiddeld' : '🔴 Moeilijk'}
                    </div>
                    {cost > 0 && (
                      <div className="tag-servings px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Euro size={12} />
                        €{cost.toFixed(2)}
                      </div>
                    )}
                  </div>
                  
                  {/* Recipe info */}
                  <h3 className="text-2xl font-bold mb-2 text-premium line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {desc}
                  </p>
                  
                  {/* Bottom stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Users size={16} />
                        <span>{recipe.servings} porties</span>
                      </div>
                      {recipe.calories_per_serving && (
                        <div className="flex items-center gap-1.5">
                          <span>🔥</span>
                          <span>{recipe.calories_per_serving} kcal</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Tags */}
                    <div className="flex gap-1">
                      {recipe.tags.includes('vegetarian') && <span className="text-green-300">🌱</span>}
                      {recipe.prep_time <= 20 && <span className="text-yellow-300">⚡</span>}
                      {cost > 0 && cost < 6 && <span className="text-blue-300">💰</span>}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* No results */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Geen recepten gevonden</h3>
          <p className="text-sm text-gray-500">Probeer een andere zoekterm of filter</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter(null);
            }}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-2xl font-semibold hover-lift transition-premium"
          >
            Alle recepten tonen
          </button>
        </div>
      )}
    </div>
  );
}