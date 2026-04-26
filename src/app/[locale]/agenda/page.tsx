'use client';

import { generateIcs } from '@/lib/planner';
import { usePlannerState } from '@/lib/usePlannerState';

export default function AgendaPage() {
  const { state, patch, isReady } = usePlannerState();

  if (!isReady) return <div className="p-6">Laden...</div>;

  function downloadIcs() {
    const ics = generateIcs(state);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bio-weekplanner.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-2xl font-semibold">Agenda & iCal</h1>
      <p className="mt-1 text-sm text-gray-600">Plan je boodschappenmoment en exporteer je weekmenu naar je agenda.</p>

      <div className="mt-4 rounded-2xl border bg-white p-4">
        <label className="text-sm font-medium">Boodschappenmoment</label>
        <input
          type="datetime-local"
          value={state.shoppingMoment}
          onChange={(e) => patch({ shoppingMoment: e.target.value })}
          className="mt-1 w-full rounded-xl border px-3 py-2"
        />

        <button
          onClick={downloadIcs}
          className="mt-4 w-full rounded-xl bg-emerald-700 px-4 py-2 font-medium text-white"
        >
          Download iCal-bestand (.ics)
        </button>
      </div>
    </div>
  );
}
