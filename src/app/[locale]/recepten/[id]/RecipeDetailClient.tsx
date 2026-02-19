'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { estimateCost } from '@/lib/recipes';
import { ArrowLeft, Clock, Users, Euro, ChefHat, ShoppingCart, ExternalLink, Flame, Calendar, Hash } from 'lucide-react';
import { useState } from 'react';

export default function RecipeDetailClient({ recipe }: { recipe: any }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps'>('ingredients');

  const title = locale === 'nl' ? recipe.title_nl : recipe.title_en;
  const desc = locale === 'nl' ? recipe.description_nl : recipe.description_en;
  const steps = locale === 'nl' ? recipe.steps_nl : recipe.steps_en;
  const cost = estimateCost(recipe);

  const gradients = [
    'hero-gradient-1', 'hero-gradient-2', 'hero-gradient-3', 
    'hero-gradient-4', 'hero-gradient-5', 'hero-gradient-6'
  ];
  
  const gradientClass = gradients[Math.abs(recipe.id.charCodeAt(0)) % gradients.length];

  const difficultyLabel = recipe.difficulty === 'easy' ? 'Makkelijk' : 
                          recipe.difficulty === 'medium' ? 'Gemiddeld' : 'Moeilijk';

  return (
    <div className="max-w-lg mx-auto relative">
      {/* Full-bleed hero image */}
      <div className="relative h-80 -mx-4">
        <div className={`h-full ${gradientClass} flex items-center justify-center relative`}>
          <span className="text-8xl opacity-90">{recipe.emoji}</span>
          
          {/* Floating back button */}
          <Link 
            href="/recepten" 
            className="floating-btn absolute top-8 left-4 p-3 rounded-full transition-premium hover-lift"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </Link>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content card overlapping hero */}
      <div className="-mt-12 mx-4 bg-white rounded-t-3xl relative z-10 shadow-floating">
        <div className="p-6">
          {/* Recipe title and description */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-premium mb-3 leading-tight">{title}</h1>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
          </div>

          {/* Nutrition info pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="tag-time px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2">
              <Clock size={16} />
              {recipe.prep_time} min
            </div>
            <div className="tag-servings px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2">
              <Users size={16} />
              {recipe.servings} porties
            </div>
            <div className="tag-difficulty px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2">
              <ChefHat size={16} />
              {difficultyLabel}
            </div>
            {recipe.calories_per_serving && (
              <div className="tag-calories px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2">
                <Flame size={16} />
                {recipe.calories_per_serving} kcal
              </div>
            )}
            {cost > 0 && (
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2">
                <Euro size={16} />
                €{cost.toFixed(2)}
              </div>
            )}
          </div>

          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1.5 text-xs font-medium rounded-xl bg-green-50 text-green-700 border border-green-100">
                  #{t(tag as any)}
                </span>
              ))}
            </div>
          )}

          {/* Tab bar */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-premium ${
                activeTab === 'ingredients'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Ingrediënten ({recipe.ingredients.length})
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-premium ${
                activeTab === 'steps'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Bereiding ({steps.length} stappen)
            </button>
          </div>

          {/* Tab content */}
          <div className="min-h-[300px]">
            {activeTab === 'ingredients' ? (
              <div className="space-y-4">
                {recipe.ingredients.map((ri: any, i: number) => {
                  const name = locale === 'nl' ? ri.ingredient.name_nl : ri.ingredient.name_en;
                  const notes = locale === 'nl' ? ri.notes_nl : ri.notes_en;
                  return (
                    <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                      <div className="bg-green-600 text-white rounded-xl px-3 py-1.5 text-sm font-bold min-w-[70px] text-center">
                        {ri.amount} {ri.unit}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{name}</p>
                        {notes && <p className="text-sm text-gray-500 mt-1">({notes})</p>}
                        {ri.ingredient.lidl_price && !ri.ingredient.is_common && (
                          <p className="text-xs text-green-600 font-medium mt-1">€{ri.ingredient.lidl_price.toFixed(2)} bij Lidl</p>
                        )}
                        {ri.optional && (
                          <span className="inline-block text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mt-1">
                            optioneel
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                {steps.map((step: string, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-green-600 text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-gray-800 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Source attribution card */}
          <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Receptbron</p>
                <p className="font-semibold text-gray-800">{recipe.source.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {recipe.source.type === 'hellofresh' && 'Geïnspireerd op HelloFresh, aangepast voor Lidl'}
                  {recipe.source.type === 'blog' && 'Van receptblog, aangepast voor Lidl'}
                  {recipe.source.type === 'book' && 'Uit kookboek'}
                  {recipe.source.type === 'traditional' && 'Traditioneel recept'}
                  {recipe.source.type === 'original' && 'Origineel MaaltijdMate recept'}
                </p>
              </div>
              {recipe.source.url && (
                <a
                  href={recipe.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-premium shadow-sm"
                >
                  <ExternalLink size={16} />
                  Origineel
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar with safe area */}
      <div className="sticky bottom-0 left-0 right-0 z-50">
        <div className="glass border-t border-white/20 safe-area-bottom">
          <div className="p-4">
            <button className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-2xl hover-lift transition-premium shadow-premium flex items-center justify-center gap-3 text-lg">
              <Calendar size={24} />
              Toevoegen aan weekplan
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              Ingrediënten worden automatisch toegevoegd aan je boodschappenlijst
            </p>
          </div>
        </div>
      </div>

      {/* Spacer to account for sticky bottom bar */}
      <div className="h-32" />
    </div>
  );
}