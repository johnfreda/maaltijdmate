'use client';

import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { Share2, Copy, ShoppingCart, Check, Calendar, Euro, RotateCcw } from 'lucide-react';
import { useWeekPlan, useShoppingList, generateShoppingList, estimateShoppingCost } from '@/lib/store';
import { useState } from 'react';

const categoryIcons: Record<string, string> = {
  produce: '🥬',
  dairy: '🧀',
  meat: '🥩',
  bakery: '🍞',
  pantry: '🫙',
  canned: '🥫',
  frozen: '🧊',
  spices: '🌶️',
  drinks: '🥤',
  other: '📦',
};

export default function ShoppingListPage() {
  const t = useTranslations('shopping');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { plan, loaded: planLoaded } = useWeekPlan();
  const { checkedItems, loaded: checkLoaded, toggleItem, clearChecked } = useShoppingList();
  const [copied, setCopied] = useState(false);

  if (!planLoaded || !checkLoaded) {
    return <div className="flex items-center justify-center h-64 text-gray-400">{tc('loading')}</div>;
  }

  const items = generateShoppingList(plan);
  const totalCost = estimateShoppingCost(items);
  const checkedCount = items.filter(i => checkedItems[i.ingredientName_nl]).length;
  const hasItems = items.length > 0;

  // Group by category
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const copyList = () => {
    const text = items
      .map(i => {
        const name = locale === 'nl' ? i.ingredientName_nl : i.ingredientName_en;
        const check = checkedItems[i.ingredientName_nl] ? '✅' : '⬜';
        return `${check} ${formatAmount(i.totalAmount)} ${i.unit} ${name}${i.lidl_name ? ` (Lidl: ${i.lidl_name})` : ''}`;
      })
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between pt-6 pb-4">
        <h1 className="text-xl font-bold">{t('title')}</h1>
        <div className="flex items-center gap-1">
          {hasItems && (
            <>
              <button
                onClick={copyList}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title={copied ? t('listCopied') : t('copyList')}
              >
                {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="text-gray-500" />}
              </button>
              {checkedCount > 0 && (
                <button
                  onClick={clearChecked}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={t('uncheckAll')}
                >
                  <RotateCcw size={18} className="text-gray-500" />
                </button>
              )}
            </>
          )}
          <LanguageSwitcher />
        </div>
      </div>

      {!hasItems ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <ShoppingCart size={40} className="text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-600 mb-2">{t('empty')}</h2>
          <p className="text-sm text-gray-400 max-w-[250px] mb-6">{t('emptyHint')}</p>
          <Link
            href="/weekplan"
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            <Calendar size={16} />
            {tc('weekPlan')}
          </Link>
        </div>
      ) : (
        <>
          {/* Summary bar */}
          <div className="flex items-center justify-between bg-green-50 rounded-xl p-3 mb-4">
            <div className="text-sm text-green-700">
              <span className="font-bold">{items.length}</span> {locale === 'nl' ? 'producten' : 'items'}
              {checkedCount > 0 && (
                <span className="text-green-500 ml-1">({checkedCount} ✓)</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-green-700 font-bold text-sm">
              <Euro size={14} />
              ~{totalCost.toFixed(2)}
            </div>
          </div>

          {/* Grouped items */}
          <div className="space-y-4 pb-4">
            {Object.entries(grouped).map(([category, categoryItems]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-2">
                  <span>{categoryIcons[category] || '📦'}</span>
                  <h3 className="font-semibold text-sm text-gray-700">
                    {t(`categories.${category}` as any)}
                  </h3>
                  <span className="text-xs text-gray-400">({categoryItems.length})</span>
                </div>
                <div className="space-y-1">
                  {categoryItems.map(item => {
                    const name = locale === 'nl' ? item.ingredientName_nl : item.ingredientName_en;
                    const isChecked = !!checkedItems[item.ingredientName_nl];

                    return (
                      <button
                        key={item.ingredientName_nl}
                        onClick={() => toggleItem(item.ingredientName_nl)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                          isChecked ? 'bg-gray-50 opacity-60' : 'bg-white border border-gray-100 hover:border-green-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isChecked ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}>
                          {isChecked && <Check size={12} className="text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm ${isChecked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                            <span className="font-medium">{formatAmount(item.totalAmount)} {item.unit}</span>
                            {' '}{name}
                          </span>
                          {item.sources.length > 1 && (
                            <span className="text-xs text-gray-400 block truncate">
                              {item.sources.join(' + ')}
                            </span>
                          )}
                        </div>
                        {item.lidl_price && (
                          <span className={`text-xs font-medium flex-shrink-0 ${isChecked ? 'text-gray-400' : 'text-green-600'}`}>
                            €{item.lidl_price.toFixed(2)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function formatAmount(amount: number): string {
  if (amount === Math.floor(amount)) return amount.toString();
  if (amount === 0.5) return '½';
  return amount.toFixed(1);
}
