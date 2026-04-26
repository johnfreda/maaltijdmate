'use client';

import { bioRecipes } from '@/lib/bioRecipes';
import { getWeekLabel, weekdays, type Weekday } from '@/lib/planner';
import { usePlannerState } from '@/lib/usePlannerState';

export default function AanbevolenPage() {
  const { isReady, selectedWeekKey, weekAssignments, setAssignments, stepWeek } = usePlannerState();

  if (!isReady) return <div className="p-6">Laden...</div>;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="display-serif text-4xl leading-tight sm:text-5xl">Recipe Library</h1>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[#50564f]">
        <p>Koppel recepten direct aan je vooruitplanning.</p>
        <button onClick={() => stepWeek(-1)} className="rounded-lg border border-[#d5d5ce] px-2 py-1 text-xs">←</button>
        <span className="rounded-lg bg-[#eef2e8] px-2 py-1 text-xs font-medium">{getWeekLabel(selectedWeekKey)}</span>
        <button onClick={() => stepWeek(1)} className="rounded-lg border border-[#d5d5ce] px-2 py-1 text-xs">→</button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {bioRecipes.map((recipe) => {
          const assignedDay = weekdays.find((day) => weekAssignments[day] === recipe.id) ?? '';

          return (
            <article key={recipe.id} className="rounded-2xl border border-[#e2e1da] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
              <div className="rounded-xl bg-gradient-to-br from-[#b7d0ab] via-[#ccdcb7] to-[#efe5c8] p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/70 px-2 py-1 text-xs text-[#405043]">{recipe.minutes} min prep</span>
                  <span className="rounded-full bg-white/70 px-2 py-1 text-xs text-[#405043]">Bio</span>
                </div>
                <h2 className="mt-5 text-xl font-medium">{recipe.title}</h2>
                <p className="mt-1 text-sm text-[#4b514a]">{recipe.subtitle}</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {recipe.bioTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#f0f3ea] px-2 py-1 text-xs text-[#4b584a]">
                    {tag}
                  </span>
                ))}
              </div>

              <label className="mt-4 block text-sm font-medium">Koppel aan dag</label>
              <select
                value={assignedDay}
                onChange={(e) => {
                  const newDay = e.target.value as Weekday | '';
                  const nextAssignments: Record<string, string | undefined> = { ...weekAssignments };

                  for (const day of weekdays) {
                    if (nextAssignments[day] === recipe.id) delete nextAssignments[day];
                  }

                  if (newDay) nextAssignments[newDay] = recipe.id;

                  setAssignments(nextAssignments);
                }}
                className="mt-1 w-full rounded-xl border border-[#ddddd5] bg-[#fbfbf7] px-3 py-2"
              >
                <option value="">Niet ingepland</option>
                {weekdays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </article>
          );
        })}
      </div>
    </div>
  );
}
