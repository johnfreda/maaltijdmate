'use client';

import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { Share2, Copy, ShoppingCart, Check, Calendar, Euro, RotateCcw, TrendingDown, CheckCircle } from 'lucide-react';
import { useWeekPlan, useShoppingList, generateShoppingList, estimateShoppingCost } from '@/lib/store';
import { useState, useEffect } from 'react';

const categoryConfig: Record<string, { icon: string; color: string; bg: string }> = {
  produce: { icon: '🥬', color: 'text-green-600', bg: 'bg-green-100' },
  dairy: { icon: '🧀', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  meat: { icon: '🥩', color: 'text-red-600', bg: 'bg-red-100' },
  bakery: { icon: '🍞', color: 'text-orange-600', bg: 'bg-orange-100' },
  pantry: { icon: '🫙', color: 'text-blue-600', bg: 'bg-blue-100' },
  canned: { icon: '🥫', color: 'text-indigo-600', bg: 'bg-indigo-100' },
  frozen: { icon: '🧊', color: 'text-cyan-600', bg: 'bg-cyan-100' },
  spices: { icon: '🌶️', color: 'text-pink-600', bg: 'bg-pink-100' },
  drinks: { icon: '🥤', color: 'text-purple-600', bg: 'bg-purple-100' },
  other: { icon: '📦', color: 'text-gray-600', bg: 'bg-gray-100' },
};

export default function ShoppingListPage() {
  const t = useTranslations('shopping');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { plan, loaded: planLoaded, mealsPlanned } = useWeekPlan();
  const { checkedItems, loaded: checkLoaded, toggleItem, clearChecked } = useShoppingList();
  const [copied, setCopied] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  if (!planLoaded || !checkLoaded) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-20">
        <div className="flex items-center justify-center h-32 text-gray-400">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
            {tc('loading')}
          </div>
        </div>
      </div>
    );
  }

  const items = generateShoppingList(plan);
  const totalCost = estimateShoppingCost(items);
  const checkedCount = items.filter(i => checkedItems[i.ingredientName_nl]).length;
  const hasItems = items.length > 0;
  const progressPercent = hasItems ? (checkedCount / items.length) * 100 : 0;

  // Estimated HelloFresh cost (roughly €8-12 per serving)
  const hellofreshEstimate = mealsPlanned * 10; // €10 average per meal
  const savings = hellofreshEstimate - totalCost;

  // Group by category
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Animate progress bar
  useEffect(() => {
    if (hasItems) {
      setTimeout(() => setProgressWidth(progressPercent), 100);
    }
  }, [progressPercent, hasItems]);

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
    <div className="max-w-lg mx-auto px-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <div className="flex items-center gap-3">
          <ShoppingCart className="text-green-600" size={28} />
          <h1 className="text-2xl font-bold text-premium">{t('title')}</h1>
        </div>
        <div className="flex items-center gap-1">
          {hasItems && (
            <>
              <button
                onClick={copyList}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-premium"
                title={copied ? t('listCopied') : t('copyList')}
              >
                {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} className="text-gray-500" />}
              </button>
              {checkedCount > 0 && (
                <button
                  onClick={clearChecked}
                  className="p-2.5 hover:bg-gray-100 rounded-xl transition-premium"
                  title={t('uncheckAll')}
                >
                  <RotateCcw size={20} className="text-gray-500" />
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
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-3xl mb-6 shadow-card">
            <ShoppingCart size={48} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-600 mb-3">Je boodschappenlijst is leeg</h2>
          <p className="text-gray-500 max-w-[280px] mb-8 leading-relaxed">
            Plan eerst maaltijden in je weekplan om automatisch je boodschappenlijst te maken
          </p>
          <Link
            href="/weekplan"
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover-lift transition-premium shadow-premium"
          >
            <Calendar size={20} />
            Start met weekplan
          </Link>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-800">{items.length} producten</span>
                {checkedCount > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    {checkedCount} ✓
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">€{totalCost.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Geschatte kosten</div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="relative">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>
              {checkedCount === items.length && items.length > 0 && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="text-green-600 bg-white rounded-full" size={20} />
                </div>
              )}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{progressPercent.toFixed(0)}% voltooid</span>
              <span>{items.length - checkedCount} nog te halen</span>
            </div>
          </div>

          {/* Savings card */}
          {savings > 5 && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2.5 rounded-xl">
                  <TrendingDown className="text-amber-600" size={24} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-amber-800">€{savings.toFixed(2)} besparing</div>
                  <div className="text-sm text-amber-700">vs HelloFresh (~€{hellofreshEstimate})</div>
                </div>
                <div className="text-2xl">💰</div>
              </div>
            </div>
          )}

          {/* Category sections */}
          <div className="space-y-6">
            {Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, categoryItems]) => {
                const config = categoryConfig[category] || categoryConfig.other;
                const categoryChecked = categoryItems.filter(i => checkedItems[i.ingredientName_nl]).length;
                
                return (
                  <div key={category}>
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${config.bg} p-2.5 rounded-xl`}>
                        <span className="text-lg">{config.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${config.color} text-premium`}>
                          {t(`categories.${category}` as any)}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {categoryItems.length} producten
                          {categoryChecked > 0 && (
                            <span className="ml-1 text-green-600 font-medium">
                              • {categoryChecked} ✓
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {categoryItems.map(item => {
                        const name = locale === 'nl' ? item.ingredientName_nl : item.ingredientName_en;
                        const isChecked = !!checkedItems[item.ingredientName_nl];

                        return (
                          <button
                            key={item.ingredientName_nl}
                            onClick={() => toggleItem(item.ingredientName_nl)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-premium text-left group ${
                              isChecked 
                                ? 'bg-gray-50 opacity-70' 
                                : 'bg-white border border-gray-100 hover:border-green-200 hover:shadow-card hover-scale'
                            }`}
                          >
                            {/* Checkbox */}
                            <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-premium ${
                              isChecked 
                                ? 'bg-green-600 border-green-600 scale-110' 
                                : 'border-gray-300 group-hover:border-green-400'
                            }`}>
                              {isChecked && <Check size={14} className="text-white" />}
                            </div>

                            {/* Item details */}
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-semibold ${isChecked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {formatAmount(item.totalAmount)} {item.unit} {name}
                              </div>
                              
                              {item.sources.length > 1 && (
                                <div className="text-xs text-gray-400 mt-1 truncate">
                                  Voor: {item.sources.join(', ')}
                                </div>
                              )}
                              
                              {item.lidl_name && item.lidl_name !== name && (
                                <div className="text-xs text-blue-600 mt-1">
                                  Bij Lidl: {item.lidl_name}
                                </div>
                              )}
                            </div>

                            {/* Price */}
                            {item.lidl_price && (
                              <div className={`text-right flex-shrink-0 ${isChecked ? 'opacity-50' : ''}`}>
                                <div className="text-sm font-bold text-green-600">
                                  €{item.lidl_price.toFixed(2)}
                                </div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Completion message */}
          {checkedCount === items.length && items.length > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-3xl text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-lg font-bold text-green-800 mb-2">Boodschappen compleet!</h3>
              <p className="text-green-700 text-sm">
                Je hebt alle {items.length} producten verzameld. Geniet van het koken!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function formatAmount(amount: number): string {
  if (amount === Math.floor(amount)) return amount.toString();
  if (amount === 0.5) return '½';
  if (amount === 0.25) return '¼';
  if (amount === 0.75) return '¾';
  return amount.toFixed(1);
}