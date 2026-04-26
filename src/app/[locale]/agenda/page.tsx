'use client';

import { useMemo, useState } from 'react';
import { generateIcs } from '@/lib/planner';
import { usePlannerState } from '@/lib/usePlannerState';

export default function AgendaPage() {
  const { state, patch, isReady } = usePlannerState();
  const [copied, setCopied] = useState(false);

  const feedUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const encoded = encodeURIComponent(JSON.stringify(state));
    return `${window.location.origin}/api/ical?s=${encoded}`;
  }, [state]);

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

  async function copyFeed() {
    await navigator.clipboard.writeText(feedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <h1 className="display-serif text-4xl leading-tight sm:text-5xl">System Settings</h1>
      <p className="mt-3 text-[#50564f]">Stel je boodschappenmoment in en sync je weekmenu via iCal.</p>

      <section className="mt-6 rounded-2xl border border-[#d6ddc8] bg-[#dfe8cf] p-5">
        <h2 className="display-serif text-3xl">iCal Sync</h2>
        <p className="mt-2 text-sm text-[#4d584a]">Gebruik de feed-link of download een kalenderbestand.</p>

        <label className="mt-4 block text-sm font-medium">Boodschappenmoment</label>
        <input
          type="datetime-local"
          value={state.shoppingMoment}
          onChange={(e) => patch({ shoppingMoment: e.target.value })}
          className="mt-1 w-full rounded-xl border border-[#c8cfba] bg-[#f6f8f0] px-3 py-2"
        />

        <label className="mt-4 block text-sm font-medium">Calendar Feed URL</label>
        <div className="mt-1 flex gap-2">
          <input readOnly value={feedUrl} className="w-full rounded-xl border border-[#c8cfba] bg-white px-3 py-2 text-sm" />
          <button onClick={copyFeed} className="rounded-xl border border-[#b4bca8] bg-white px-3 py-2 text-sm">
            {copied ? 'Gekopieerd' : 'Kopieer'}
          </button>
        </div>

        <button onClick={downloadIcs} className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white">
          Download .ics
        </button>
      </section>
    </div>
  );
}
