'use client';

import { useMemo, useState } from 'react';
import { generateIcsForAll, generateIcsForWeek, getWeekLabel } from '@/lib/planner';
import { usePlannerState } from '@/lib/usePlannerState';
import { useTranslations } from 'next-intl';

export default function AgendaPage() {
  const t = useTranslations('agenda');
  const { state, isReady, selectedWeekKey, shoppingMoment, setShoppingMoment, stepWeek } = usePlannerState();
  const [copied, setCopied] = useState(false);

  const encodedState = useMemo(() => encodeURIComponent(JSON.stringify(state)), [state]);

  const feedUrlWeek = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/api/ical?s=${encodedState}&week=${selectedWeekKey}`;
  }, [encodedState, selectedWeekKey]);

  const feedUrlAll = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/api/ical?s=${encodedState}&all=1`;
  }, [encodedState]);

  if (!isReady) return <div className="p-6">{t('loading')}</div>;

  function downloadWeekIcs() {
    const ics = generateIcsForWeek(state, selectedWeekKey);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bio-weekplanner-${selectedWeekKey}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadAllIcs() {
    const ics = generateIcsForAll(state);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bio-weekplanner-all.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function copyFeed(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <h1 className="display-serif text-4xl leading-tight sm:text-5xl">{t('title')}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[#50564f]">
        <button onClick={() => stepWeek(-1)} className="rounded-lg border border-[#d5d5ce] px-2 py-1 text-xs">←</button>
        <span className="rounded-lg bg-[#eef2e8] px-2 py-1 text-xs font-medium">{getWeekLabel(selectedWeekKey)}</span>
        <button onClick={() => stepWeek(1)} className="rounded-lg border border-[#d5d5ce] px-2 py-1 text-xs">→</button>
      </div>

      <section className="mt-6 rounded-2xl border border-[#d6ddc8] bg-[#dfe8cf] p-5">
        <h2 className="display-serif text-3xl">{t('syncTitle')}</h2>
        <p className="mt-2 text-sm text-[#4d584a]">{t('syncSubtitle')}</p>

        <label className="mt-4 block text-sm font-medium">{t('shoppingMoment')}</label>
        <input
          type="datetime-local"
          value={shoppingMoment}
          onChange={(e) => setShoppingMoment(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[#c8cfba] bg-[#f6f8f0] px-3 py-2"
        />

        <label className="mt-4 block text-sm font-medium">{t('weekFeed')}</label>
        <div className="mt-1 flex gap-2">
          <input readOnly value={feedUrlWeek} className="w-full rounded-xl border border-[#c8cfba] bg-white px-3 py-2 text-sm" />
          <button onClick={() => copyFeed(feedUrlWeek)} className="rounded-xl border border-[#b4bca8] bg-white px-3 py-2 text-sm">{copied ? t('copied') : t('copy')}</button>
        </div>

        <label className="mt-4 block text-sm font-medium">{t('allFeed')}</label>
        <div className="mt-1 flex gap-2">
          <input readOnly value={feedUrlAll} className="w-full rounded-xl border border-[#c8cfba] bg-white px-3 py-2 text-sm" />
          <button onClick={() => copyFeed(feedUrlAll)} className="rounded-xl border border-[#b4bca8] bg-white px-3 py-2 text-sm">{copied ? t('copied') : t('copy')}</button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={downloadWeekIcs} className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white">{t('downloadWeek')}</button>
          <button onClick={downloadAllIcs} className="rounded-xl border border-[#b4bca8] bg-white px-4 py-2 text-sm font-medium">{t('downloadAll')}</button>
        </div>
      </section>
    </div>
  );
}
