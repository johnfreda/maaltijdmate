'use client';

import { useState } from 'react';

type ShoppingItem = {
  name: string;
  note: string;
};

export function ShoppingListClient({ items }: { items: ShoppingItem[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const done = checked[item.name] ?? false;
        return (
          <li key={item.name} className="rounded-2xl border bg-white p-4 shadow-sm">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={done}
                onChange={(e) =>
                  setChecked((prev) => ({
                    ...prev,
                    [item.name]: e.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4"
              />
              <span className={done ? 'line-through text-gray-400' : ''}>
                <span className="block font-medium">{item.name}</span>
                <span className="text-sm text-gray-500">{item.note}</span>
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
