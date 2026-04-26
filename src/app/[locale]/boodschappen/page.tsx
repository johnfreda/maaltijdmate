'use client';

import { usePlannerState } from '@/lib/usePlannerState';

export default function ShoppingPage() {
  const { state, patch, shoppingList, isReady } = usePlannerState();

  if (!isReady) return <div className="p-6">Laden...</div>;

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-2xl font-semibold">Boodschappenlijst</h1>
      <p className="mt-1 text-sm text-gray-600">Automatisch samengesteld op basis van je weekmenu.</p>

      <ul className="mt-4 space-y-2">
        {shoppingList.map((item) => {
          const isChecked = state.checkedItems.includes(item.key);
          return (
            <li key={item.key} className="rounded-2xl border bg-white p-4">
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
                <span className={isChecked ? 'line-through text-gray-400' : ''}>
                  <span className="block font-medium">{item.name}</span>
                  <span className="text-sm text-gray-600">
                    {item.amount} {item.unit}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {shoppingList.length === 0 ? (
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
          Nog leeg: koppel eerst recepten in je weekplanner.
        </p>
      ) : null}
    </div>
  );
}
