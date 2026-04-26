'use client';

import { bioRecipes } from '@/lib/bioRecipes';
import { getWeekLabel, weekdays } from '@/lib/planner';
import { usePlannerState } from '@/lib/usePlannerState';

export default function WeekPlanPage() {
  const {
    isReady,
    selectedWeekKey,
    weekAssignments,
    state,
    stepWeek,
    setPeople,
    setAssignment,
    clearSelectedWeek,
  } = usePlannerState();

  if (!isReady) return <div className="p-6">Laden...</div>;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="display-serif text-4xl leading-tight sm:text-5xl">Weekly Canvas</h1>
      <p className="mt-3 text-[#50564f]">Plan vooruit per week — onbeperkt jaren vooruit.</p>

      <div className="mt-5 rounded-2xl border border-[#deddd6] bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <button onClick={() => stepWeek(-1)} className="rounded-lg border border-[#d5d5ce] px-3 py-2 text-sm">←</button>
            <div className="rounded-lg bg-[#f2f4ee] px-3 py-2 text-sm font-medium">{getWeekLabel(selectedWeekKey)}</div>
            <button onClick={() => stepWeek(1)} className="rounded-lg border border-[#d5d5ce] px-3 py-2 text-sm">→</button>
          </div>

          <div>
            <label className="text-sm font-medium">Aantal personen</label>
            <input
              type="number"
              min={1}
              max={8}
              value={state.people}
              onChange={(e) => setPeople(Number(e.target.value) || 1)}
              className="mt-1 block w-28 rounded-xl border border-[#dbdbd2] bg-[#fafaf6] px-3 py-2"
            />
          </div>

          <button onClick={clearSelectedWeek} className="rounded-xl border border-[#d5d5ce] bg-[#f8f8f3] px-3 py-2 text-xs text-[#50564f]">
            Leeg deze week
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {weekdays.map((day) => {
          const selected = weekAssignments[day];
          const recipe = bioRecipes.find((r) => r.id === selected);

          return (
            <article key={day} className="rounded-2xl border border-[#e0dfd8] bg-white p-4">
              <p className="text-sm font-medium text-[#3f473e]">{day}</p>

              <select
                value={selected ?? ''}
                onChange={(e) => setAssignment(day, e.target.value || undefined)}
                className="mt-2 w-full rounded-xl border border-[#dcdcd3] bg-[#fbfbf7] px-3 py-2 text-sm"
              >
                <option value="">Kies recept</option>
                {bioRecipes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>

              {recipe ? (
                <div className="mt-3 rounded-xl bg-[#eef3e8] p-3">
                  <p className="font-medium">{recipe.title}</p>
                  <p className="mt-1 text-xs text-[#4f584e]">{recipe.minutes} min • {state.people} personen</p>
                </div>
              ) : (
                <div className="mt-3 rounded-xl border border-dashed border-[#d7d6ce] p-3 text-sm text-[#6a7068]">Nog niets gepland</div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
