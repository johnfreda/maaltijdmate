'use client';

import { usePlannerState } from '@/lib/usePlannerState';

function getCategory(name: string) {
  const n = name.toLowerCase();
  if (n.includes('olie') || n.includes('zout') || n.includes('tahini')) return 'Pantry';
  if (n.includes('zalm') || n.includes('kip') || n.includes('yoghurt')) return 'Dairy & Protein';
  return 'Produce';
}

export default function ShoppingPage() {
  const { state, patch, shoppingList, isReady } = usePlannerState();

  if (!isReady) return <div className="p-6">Laden...</div>;

  const grouped = shoppingList.reduce<Record<string, typeof shoppingList>>((acc, item) => {
    const category = getCategory(item.name);
    acc[category] = [...(acc[category] ?? []), item];
    return acc;
  }, {});

  const checkedCount = state.checkedItems.length;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Grocery List</h1>
      <p className="mt-3 text-[#50564f]">Prepared for this week. {checkedCount}/{shoppingList.length} afgevinkt.</p>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="rounded-2xl border border-[#e1e0d9] bg-white p-4">
            <p className="inline-flex rounded-full bg-[#eef2e7] px-3 py-1 text-sm text-[#435040]">{category}</p>
            <ul className="mt-4 space-y-3">
              {items.map((item) => {
                const isChecked = state.checkedItems.includes(item.key);
                return (
                  <li key={item.key} className="flex items-start justify-between gap-3 text-sm">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...state.checkedItems, item.key]
                            : state.checkedItems.filter((key) => key !== item.key);
                          patch({ checkedItems: next });
                        }}
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
        <p className="mt-4 rounded-xl bg-[#f2efe3] p-3 text-sm text-[#756f58]">Nog leeg: plan eerst je weekmenu.</p>
      ) : null}
    </div>
  );
}
