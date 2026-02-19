'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { BookOpen, Calendar, ShoppingCart, ChefHat } from 'lucide-react';
import { useWeekPlan, generateShoppingList } from '@/lib/store';

export default function HomePage() {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const { plan, loaded, mealsPlanned } = useWeekPlan();

  const itemCount = loaded ? generateShoppingList(plan).length : 0;

  return (
    <div className="max-w-lg mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-6 pb-4">
        <div className="flex items-center gap-2">
          <ChefHat className="text-green-600" size={28} />
          <h1 className="text-xl font-bold text-green-600">MaaltijdMate</h1>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">{t('welcome')}</h2>
        <p className="text-green-100 text-sm">{t('subtitle')}</p>
        <div className="flex gap-4 mt-4">
          <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
            <span className="text-2xl font-bold">{loaded ? mealsPlanned : '-'}</span>
            <p className="text-xs text-green-100">{t('mealsPlanned')}</p>
          </div>
          <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
            <span className="text-2xl font-bold">{loaded ? itemCount : '-'}</span>
            <p className="text-xs text-green-100">{t('itemsToBuy')}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="text-lg font-semibold mb-3">{t('quickActions')}</h3>
      <div className="grid grid-cols-1 gap-3">
        <Link
          href="/recepten"
          className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
        >
          <div className="bg-green-50 p-3 rounded-xl">
            <BookOpen className="text-green-600" size={24} />
          </div>
          <div>
            <span className="font-semibold">{t('browseRecipes')}</span>
            <p className="text-sm text-gray-500">{tc('allRecipes')}</p>
          </div>
        </Link>

        <Link
          href="/weekplan"
          className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
        >
          <div className="bg-blue-50 p-3 rounded-xl">
            <Calendar className="text-blue-600" size={24} />
          </div>
          <div>
            <span className="font-semibold">{t('planWeek')}</span>
            <p className="text-sm text-gray-500">{tc('weekPlan')}</p>
          </div>
        </Link>

        <Link
          href="/boodschappen"
          className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
        >
          <div className="bg-orange-50 p-3 rounded-xl">
            <ShoppingCart className="text-orange-600" size={24} />
          </div>
          <div>
            <span className="font-semibold">{t('viewList')}</span>
            <p className="text-sm text-gray-500">{tc('shoppingList')}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
