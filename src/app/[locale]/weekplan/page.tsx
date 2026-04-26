'use client';

import { bioRecipes } from '@/lib/bioRecipes';
import { weekdays } from '@/lib/planner';
import { usePlannerState } from '@/lib/usePlannerState';

export default function WeekPlanPage() {
  const { state, patch, isReady } = usePlannerState();

  if (!isReady) return <div className="p-6">Laden...</div>;

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-2xl font-semibold">Weekplanner</h1>
      <p className="mt-1 text-sm text-gray-600">Koppel per dag één gezond bio-recept.</p>

      <div className="mt-4 rounded-2xl border bg-white p-4">
        <label className="text-sm font-medium">Aantal personen</label>
        <input
          type="number"
          min={1}
          max={8}
          value={state.people}
          onChange={(e) => patch({ people: Number(e.target.value) || 1 })}
          className="mt-1 w-full rounded-xl border px-3 py-2"
        />
      </div>

      <div className="mt-4 space-y-3">
        {weekdays.map((day) => (
          <article key={day} className="rounded-2xl border bg-white p-4">
            <label className="text-sm font-medium">{day}</label>
            <select
              value={state.assignments[day] ?? ''}
              onChange={(e) =>
                patch({
                  assignments: {
                    ...state.assignments,
                    [day]: e.target.value || undefined,
                  },
                })
              }
              className="mt-1 w-full rounded-xl border px-3 py-2"
            >
              <option value="">Kies aanbevolen recept</option>
              {bioRecipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.title} ({recipe.minutes} min)
                </option>
              ))}
            </select>
          </article>
        ))}
      </div>
    </div>
  );
}
