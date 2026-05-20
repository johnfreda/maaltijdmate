import { NextRequest } from 'next/server';
import {
  defaultPlannerState,
  generateIcsForAll,
  generateIcsForWeek,
  type PlannerState,
} from '@/lib/planner';

export async function GET(req: NextRequest) {
  const encoded = req.nextUrl.searchParams.get('s');
  const week = req.nextUrl.searchParams.get('week') ?? defaultPlannerState.currentWeekKey;
  const all = req.nextUrl.searchParams.get('all') === '1';

  let state: PlannerState = defaultPlannerState;
  if (encoded) {
    try {
      const parsed = JSON.parse(encoded) as PlannerState;
      state = { ...defaultPlannerState, ...parsed };
    } catch {
      state = defaultPlannerState;
    }
  }

  const ics = all ? generateIcsForAll(state) : generateIcsForWeek(state, week);

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="${all ? 'bio-weekplanner-all' : `bio-weekplanner-${week}`}.ics"`,
      'Cache-Control': 'no-store',
    },
  });
}
