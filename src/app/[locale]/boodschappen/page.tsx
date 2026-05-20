'use client';

import { getWeekLabel } from '@/lib/planner';
import { usePlannerState } from '@/lib/usePlannerState';
import { useTranslations } from 'next-intl';

function getCategory(name: string) {
  const n = name.toLowerCase();
  if (n.includes('olie') || n.includes('zout') || n.includes('tahini')) return 'pantry';
  if (n.includes('zalm') || n.includes('kip') || n.includes('yoghurt')) return 'dairyProtein';
  return 'produce';
}

export default function ShoppingPage() {
  const t = useTranslations('shopping');
  const {
    isReady,
    selectedWeekKey,
    shoppingList,
    checkedItems,
    toggleCheckedItem,
    resetCheckedItems,
    stepWeek,
  } = usePlannerState();

  if (!isReady) return <div className="p-6">{t('loading')}</div>;

  const grouped = shoppingList.reduce<Record<string, typeof shoppingList>>((acc, item) => {
    const category = getCategory(item.name);
    acc[category] = [...(acc[category] ?? []), item];
    return acc;
  }, {});

  const checkedCount = checkedItems.length;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="display-serif text-4xl leading-tight sm:text-5xl">{t('title')}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[#50564f]">
        <button onClick={() => stepWeek(-1)} className="rounded-lg border border-[#d5d5ce] px-2 py-1 text-xs">←</button>
        <span className="rounded-lg bg-[#eef2e8] px-2 py-1 text-xs font-medium">{getWeekLabel(selectedWeekKey)}</span>
        <button onClick={() => stepWeek(1)} className="rounded-lg border border-[#d5d5ce] px-2 py-1 text-xs">→</button>
        <p className="ml-1">{t('checkedProgress', { checked: checkedCount, total: shoppingList.length })}</p>
        <button onClick={resetCheckedItems} className="rounded-xl border border-[#d5d5ce] bg-[#f8f8f3] px-3 py-1.5 text-xs">{t('resetChecks')}</button>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="rounded-2xl border border-[#e1e0d9] bg-white p-4">
            <p className="inline-flex rounded-full bg-[#eef2e7] px-3 py-1 text-sm text-[#435040]">{t(`categories.${category}`)}</p>
            <ul className="mt-4 space-y-3">
              {items.map((item) => {
                const isChecked = checkedItems.includes(item.key);
                return (
                  <li key={item.key} className="flex items-start justify-between gap-3 text-sm">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => toggleCheckedItem(item.key, e.target.checked)}
                        className="mt-1"
                      />
                      <span className={isChecked ? 'line-through text-[#a0a39a]' : ''}>{item.name}</span>
                    </label>
                    <span className="text-[#666c64]">{item.amount} {item.unit}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {shoppingList.length === 0 ? (
        <p className="mt-4 rounded-xl bg-[#f2efe3] p-3 text-sm text-[#756f58]">{t('empty')}</p>
      ) : null}
    </div>
  );
}
