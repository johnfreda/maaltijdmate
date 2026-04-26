import { NextRequest } from 'next/server';
import { defaultPlannerState, generateIcs, type PlannerState } from '@/lib/planner';

export async function GET(req: NextRequest) {
  const encoded = req.nextUrl.searchParams.get('s');

  let state: PlannerState = defaultPlannerState;
  if (encoded) {
    try {
      const parsed = JSON.parse(encoded) as PlannerState;
      state = { ...defaultPlannerState, ...parsed };
    } catch {
      state = defaultPlannerState;
    }
  }

  const ics = generateIcs(state);

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="bio-weekplanner.ics"',
      'Cache-Control': 'no-store',
    },
  });
}
