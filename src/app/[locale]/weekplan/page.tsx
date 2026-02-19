'use client';

import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { Plus, X, ShoppingCart, Trash2, Calendar, Clock, Users } from 'lucide-react';
import { useWeekPlan } from '@/lib/store';
import { recipes } from '@/lib/recipes';
import { useState } from 'react';

const days = [0, 1, 2, 3, 4, 5, 6] as const;
const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
const mealTypes = ['lunch', 'dinner'] as const;

export default function WeekPlanPage() {
  const t = useTranslations('weekplan');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { plan, loaded, setMeal, removeMeal, clearWeek, mealsPlanned } = useWeekPlan();
  const [picker, setPicker] = useState<{ day: number; meal: 'lunch' | 'dinner' } | null>(null);

  if (!loaded) return (
    <div className="max-w-lg mx-auto px-4 pt-20">
      <div className="flex items-center justify-center h-32 text-gray-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
          {tc('loading')}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <div className="flex items-center gap-3">
          <Calendar className="text-green-600" size={28} />
          <h1 className="text-2xl font-bold text-premium">{t('title')}</h1>
        </div>
        <div className="flex items-center gap-2">
          {mealsPlanned > 0 && (
            <button 
              onClick={clearWeek} 
              className="p-2.5 hover:bg-red-50 rounded-xl transition-premium text-red-400 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>

      {/* Stats */}
      {mealsPlanned > 0 ? (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800 font-semibold">
                {mealsPlanned} maaltijden gepland
              </p>
              <p className="text-green-600 text-sm">Klaar voor deze week!</p>
            </div>
            <Link 
              href="/boodschappen" 
              className="px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-premium shadow-card hover-lift flex items-center gap-2"
            >
              <ShoppingCart size={16} />
              Boodschappenlijst
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 mb-6">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Start je weekplanning</h2>
          <p className="text-sm text-gray-500">Voeg maaltijden toe om automatisch je boodschappenlijst te maken</p>
        </div>
      )}

      {/* Compact day cards */}
      <div className="space-y-4">
        {days.map((day) => (
          <div key={day} className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
            {/* Day header */}
            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">{tc(dayKeys[day] as any)}</h3>
            </div>
            
            {/* Meal slots */}
            <div className="p-4 space-y-3">
              {mealTypes.map((meal) => {
                const slot = plan[`${day}-${meal}`];
                const recipe = slot ? recipes.find(r => r.id === slot.recipeId) : null;
                const title = recipe ? (locale === 'nl' ? recipe.title_nl : recipe.title_en) : null;

                return (
                  <div key={meal}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        {meal === 'lunch' ? '🥗 Lunch' : '🍽️ Avondeten'}
                      </span>
                      {recipe && (
                        <button
                          onClick={() => removeMeal(day, meal)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-premium text-red-400 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    
                    {recipe ? (
                      <Link 
                        href={`/recepten/${recipe.id}`}
                        className="block group"
                      >
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl hover:from-green-100 hover:to-green-200 transition-premium">
                          {/* Recipe image placeholder */}
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl shadow-card">
                            {recipe.emoji}
                          </div>
                          
                          {/* Recipe info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-green-800 line-clamp-1">{title}</h4>
                            <div className="flex items-center gap-3 mt-1 text-sm text-green-600">
                              <div className="flex items-center gap-1">
                                <Users size={14} />
                                {slot!.servings}p
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {recipe.prep_time}min
                              </div>
                              <div className="px-2 py-0.5 bg-white/60 rounded-full text-xs font-medium">
                                {recipe.difficulty === 'easy' ? 'Makkelijk' : 
                                 recipe.difficulty === 'medium' ? 'Gemiddeld' : 'Moeilijk'}
                              </div>
                            </div>
                          </div>
                          
                          {/* Arrow indicator */}
                          <div className="text-green-600 group-hover:translate-x-1 transition-transform">
                            →
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <button
                        onClick={() => setPicker({ day, meal })}
                        className="w-full flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-premium"
                      >
                        <Plus size={20} />
                        <span className="font-medium">Maaltijd toevoegen</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Generate list button */}
      {mealsPlanned > 0 && (
        <div className="mt-8">
          <Link
            href="/boodschappen"
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-2xl hover-lift transition-premium shadow-premium text-lg"
          >
            <ShoppingCart size={24} />
            Boodschappenlijst maken
          </Link>
        </div>
      )}

      {/* Recipe picker modal */}
      {picker && (
        <RecipePicker
          onSelect={(recipeId, servings) => {
            setMeal(picker.day, picker.meal, recipeId, servings);
            setPicker(null);
          }}
          onClose={() => setPicker(null)}
          locale={locale}
        />
      )}
    </div>
  );
}

function RecipePicker({
  onSelect,
  onClose,
  locale,
}: {
  onSelect: (recipeId: string, servings: number) => void;
  onClose: () => void;
  locale: string;
}) {
  const tc = useTranslations('common');
  const [servings, setServings] = useState(2);

  const gradients = [
    'hero-gradient-1', 'hero-gradient-2', 'hero-gradient-3', 
    'hero-gradient-4', 'hero-gradient-5', 'hero-gradient-6'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden shadow-floating"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="glass border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-premium">Kies een recept</h3>
            <p className="text-sm text-gray-600">Selecteer wat je wilt maken</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-premium"
          >
            <X size={20} />
          </button>
        </div>

        {/* Servings selector */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-medium text-gray-700">Aantal porties:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-premium font-bold text-gray-600"
              >
                −
              </button>
              <span className="font-bold text-lg text-green-600 w-12 text-center">{servings}</span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-premium font-bold text-gray-600"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Recipe grid */}
        <div className="overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 p-4">
            {recipes.map((recipe, index) => {
              const title = locale === 'nl' ? recipe.title_nl : recipe.title_en;
              const gradientClass = gradients[Math.abs(recipe.id.charCodeAt(0)) % gradients.length];
              
              return (
                <button
                  key={recipe.id}
                  onClick={() => onSelect(recipe.id, servings)}
                  className="group block w-full"
                >
                  <div className="bg-white rounded-2xl shadow-card hover-scale transition-premium overflow-hidden">
                    {/* Image */}
                    <div className={`h-24 ${gradientClass} flex items-center justify-center relative`}>
                      <span className="text-3xl opacity-90">{recipe.emoji}</span>
                      
                      {/* Quick info badges */}
                      <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-white">
                        {recipe.prep_time}min
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-3">
                      <h4 className="font-semibold text-sm line-clamp-2 mb-2 text-gray-800 leading-tight">
                        {title}
                      </h4>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users size={12} />
                          <span>{recipe.servings}p</span>
                        </div>
                        <div className="px-2 py-0.5 bg-gray-100 rounded-full font-medium">
                          {recipe.difficulty === 'easy' ? 'Makkelijk' : 
                           recipe.difficulty === 'medium' ? 'Gemiddeld' : 'Moeilijk'}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}