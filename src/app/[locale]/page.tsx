'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Clock, Users, Star, TrendingUp } from 'lucide-react';
import { useWeekPlan, generateShoppingList } from '@/lib/store';
import { recipes } from '@/lib/recipes';
import { useEffect, useState } from 'react';

function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Goedemorgen';
  if (hour < 17) return 'Goedemiddag';
  return 'Goedenavond';
}

function RecipeCard({ recipe, size = 'normal' }: { recipe: any, size?: 'normal' | 'large' }) {
  const t = useTranslations();
  const locale = 'nl'; // or get from context
  
  const gradients = [
    'hero-gradient-1', 'hero-gradient-2', 'hero-gradient-3', 
    'hero-gradient-4', 'hero-gradient-5', 'hero-gradient-6'
  ];
  
  const gradientClass = gradients[Math.abs(recipe.id.charCodeAt(0)) % gradients.length];
  
  return (
    <Link href={`/recepten/${recipe.id}`} className="block group">
      <div className={`relative overflow-hidden rounded-3xl shadow-card hover-scale transition-premium ${
        size === 'large' ? 'h-72' : 'h-48 w-64 flex-shrink-0'
      }`}>
        {/* Hero image with gradient placeholder */}
        <div className={`absolute inset-0 ${gradientClass} flex items-center justify-center`}>
          <span className="text-6xl opacity-90">{recipe.emoji}</span>
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 recipe-overlay" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          {/* Top badges */}
          <div className="flex items-start justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="tag-time px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <Clock size={12} />
                {recipe.prep_time}min
              </div>
              <div className="tag-difficulty px-3 py-1.5 rounded-full text-xs font-semibold capitalize">
                {recipe.difficulty === 'easy' ? '🟢 Makkelijk' : 
                 recipe.difficulty === 'medium' ? '🟡 Gemiddeld' : '🔴 Moeilijk'}
              </div>
            </div>
          </div>
          
          {/* Bottom content */}
          <div className="text-white">
            <h3 className={`font-bold text-premium mb-2 line-clamp-2 ${
              size === 'large' ? 'text-2xl' : 'text-lg'
            }`}>
              {locale === 'nl' ? recipe.title_nl : recipe.title_en}
            </h3>
            <p className={`text-white/80 line-clamp-2 ${
              size === 'large' ? 'text-base' : 'text-sm'
            }`}>
              {locale === 'nl' ? recipe.description_nl : recipe.description_en}
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{recipe.servings} porties</span>
              </div>
              {recipe.calories_per_serving && (
                <div className="flex items-center gap-1">
                  <span>🔥</span>
                  <span>{recipe.calories_per_serving} kcal</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const { plan, loaded, mealsPlanned } = useWeekPlan();
  const [greeting, setGreeting] = useState('Goedemiddag');

  useEffect(() => {
    setGreeting(getTimeBasedGreeting());
  }, []);

  const itemCount = loaded ? generateShoppingList(plan).length : 0;
  
  // Featured recipe (let's pick one)
  const featuredRecipe = recipes[0];
  
  // Quick recipes (≤30 minutes)
  const quickRecipes = recipes.filter(r => r.prep_time <= 30).slice(0, 6);
  
  // Popular recipes (let's use ones with shorter prep time and easy difficulty as popularity indicators)
  const popularRecipes = recipes
    .filter(r => r.difficulty === 'easy')
    .sort((a, b) => a.prep_time - b.prep_time)
    .slice(0, 6);

  return (
    <div className="max-w-lg mx-auto px-4 pb-24">
      {/* Header with greeting */}
      <div className="flex items-center justify-between pt-8 pb-2">
        <div>
          <p className="text-gray-600 text-sm">{greeting}</p>
          <h1 className="text-2xl font-bold text-premium text-gray-900">Wat gaan we vandaag maken?</h1>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Stats integrated naturally */}
      <div className="flex gap-3 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl px-4 py-3 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-green-700 text-sm font-medium">{loaded ? mealsPlanned : '-'} maaltijden</span>
          </div>
          <p className="text-green-600 text-xs">Deze week gepland</p>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl px-4 py-3 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-amber-700 text-sm font-medium">{loaded ? itemCount : '-'} producten</span>
          </div>
          <p className="text-amber-600 text-xs">Op boodschappenlijst</p>
        </div>
      </div>

      {/* Featured recipe of the day */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="text-amber-500" size={20} />
          Recept van de dag
        </h2>
        <RecipeCard recipe={featuredRecipe} size="large" />
      </section>

      {/* Quick recipes carousel */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="text-green-600" size={20} />
          Snel klaar
        </h2>
        <div className="flex gap-4 overflow-x-auto custom-scroll pb-2">
          {quickRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Popular recipes carousel */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="text-purple-600" size={20} />
          Populair
        </h2>
        <div className="flex gap-4 overflow-x-auto custom-scroll pb-2">
          {popularRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Quick action to browse all */}
      <Link 
        href="/recepten" 
        className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-4 rounded-2xl font-semibold shadow-premium hover-lift transition-premium"
      >
        Alle recepten ontdekken →
      </Link>
    </div>
  );
}