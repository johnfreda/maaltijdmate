'use client';

import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight, Plus, X, ShoppingCart, Trash2 } from 'lucide-react';
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

  if (!loaded) return <div className="flex items-center justify-center h-64 text-gray-400">{tc('loading')}</div>;

  return (
    <div className="max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between pt-6 pb-4">
        <h1 className="text-xl font-bold">{t('title')}</h1>
        <div className="flex items-center gap-2">
          {mealsPlanned > 0 && (
            <button onClick={clearWeek} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-600">
              <Trash2 size={18} />
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>

      {/* Stats */}
      {mealsPlanned > 0 && (
        <div className="flex items-center justify-between bg-green-50 rounded-xl p-3 mb-4">
          <span className="text-sm text-green-700 font-medium">
            {mealsPlanned} {tc('lunch').toLowerCase()}/{tc('dinner').toLowerCase()} {locale === 'nl' ? 'gepland' : 'planned'}
          </span>
          <Link href="/boodschappen" className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors">
            <ShoppingCart size={14} />
            {tc('shoppingList')}
          </Link>
        </div>
      )}

      {/* Day slots */}
      <div className="space-y-3">
        {days.map((day) => (
          <div key={day} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
              <span className="font-semibold text-sm">{tc(dayKeys[day] as any)}</span>
            </div>
            <div className="p-3 space-y-2">
              {mealTypes.map((meal) => {
                const slot = plan[`${day}-${meal}`];
                const recipe = slot ? recipes.find(r => r.id === slot.recipeId) : null;
                const title = recipe ? (locale === 'nl' ? recipe.title_nl : recipe.title_en) : null;

                return (
                  <div key={meal} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-20">{tc(meal as any)}</span>
                    {recipe ? (
                      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-lg">{recipe.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-green-800 truncate block">{title}</span>
                          <span className="text-xs text-green-600">{slot!.servings} {tc('servings')}</span>
                        </div>
                        <button
                          onClick={() => removeMeal(day, meal)}
                          className="p-1 hover:bg-green-100 rounded transition-colors"
                        >
                          <X size={14} className="text-green-600" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setPicker({ day, meal })}
                        className="flex-1 flex items-center gap-2 px-3 py-2.5 border border-dashed border-gray-200 rounded-lg text-sm text-gray-400 hover:border-green-300 hover:text-green-600 transition-colors"
                      >
                        <Plus size={14} />
                        {t('emptySlot')}
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
        <Link
          href="/boodschappen"
          className="w-full mt-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          {tc('generateList')}
        </Link>
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

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-2xl">
          <h3 className="font-bold">{tc('allRecipes')}</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                -
              </button>
              <span className="font-medium w-12 text-center">{servings}p</span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="p-3 space-y-1">
          {recipes.map(recipe => {
            const title = locale === 'nl' ? recipe.title_nl : recipe.title_en;
            const desc = locale === 'nl' ? recipe.description_nl : recipe.description_en;
            return (
              <button
                key={recipe.id}
                onClick={() => onSelect(recipe.id, servings)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors text-left"
              >
                <span className="text-2xl">{recipe.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm block">{title}</span>
                  <span className="text-xs text-gray-500 truncate block">{desc}</span>
                </div>
                <span className="text-xs text-gray-400">{recipe.prep_time}′</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
