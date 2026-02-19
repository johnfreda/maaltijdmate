import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

export default function WeekPlanPage() {
  const t = useTranslations('weekplan');
  const tc = useTranslations('common');

  return (
    <div className="max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between pt-6 pb-4">
        <h1 className="text-xl font-bold">{t('title')}</h1>
        <LanguageSwitcher />
      </div>

      {/* Week navigation */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-3 border border-gray-100">
        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft size={20} className="text-gray-500" />
        </button>
        <span className="font-medium text-sm">
          {tc('weekOf')} 17 feb 2026
        </span>
        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronRight size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Day slots */}
      <div className="space-y-3">
        {days.map((day) => (
          <div key={day} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
              <span className="font-semibold text-sm">{tc(day as any)}</span>
            </div>
            <div className="p-3 space-y-2">
              {/* Lunch slot */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-20">{tc('lunch')}</span>
                <button className="flex-1 flex items-center gap-2 px-3 py-2.5 border border-dashed border-gray-200 rounded-lg text-sm text-gray-400 hover:border-green-300 hover:text-green-600 transition-colors">
                  <Plus size={14} />
                  {t('emptySlot')}
                </button>
              </div>
              {/* Dinner slot */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-20">{tc('dinner')}</span>
                <button className="flex-1 flex items-center gap-2 px-3 py-2.5 border border-dashed border-gray-200 rounded-lg text-sm text-gray-400 hover:border-green-300 hover:text-green-600 transition-colors">
                  <Plus size={14} />
                  {t('emptySlot')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Generate list button */}
      <button className="w-full mt-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
        {tc('generateList')}
      </button>
    </div>
  );
}
