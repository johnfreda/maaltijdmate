import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  defaultPlannerState,
  generateIcsForAll,
  generateIcsForWeek,
  type PlannerState,
} from '@/lib/planner';

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const week = req.nextUrl.searchParams.get('week') ?? null;

  const supabase = getServerSupabase();
  if (!supabase) {
    return new Response('Supabase server env missing', { status: 503 });
  }

  const profile = await supabase
    .from('planner_profiles')
    .select('user_id')
    .eq('feed_token', token)
    .maybeSingle();

  if (!profile.data?.user_id) {
    return new Response('Feed not found', { status: 404 });
  }

  const plans = await supabase
    .from('weekly_plans')
    .select('week_key,people,shopping_moment,assignments')
    .eq('user_id', profile.data.user_id)
    .order('week_key', { ascending: true });

  const rows = plans.data ?? [];

  const state: PlannerState = {
    ...defaultPlannerState,
    assignmentsByWeek: {},
    shoppingMomentByWeek: {},
    checkedItemsByWeek: {},
  };

  for (const row of rows as Array<{ week_key: string; people: number; shopping_moment: string | null; assignments: Record<string, string> | null }>) {
    state.assignmentsByWeek[row.week_key] = row.assignments ?? {};
    state.shoppingMomentByWeek[row.week_key] = row.shopping_moment ?? '';
    if (row.people) state.people = row.people;
  }

  const ics = week ? generateIcsForWeek(state, week) : generateIcsForAll(state);

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="bio-weekplanner-feed.ics"`,
      'Cache-Control': 'no-store',
    },
  });
}
