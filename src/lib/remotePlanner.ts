import { supabase } from './supabase';
import type { PlannerState } from './planner';

export type RemoteWeekRow = {
  week_key: string;
  people: number;
  shopping_moment: string | null;
  assignments: Record<string, string> | null;
};

export async function getSignedInUserId() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function getOrCreateFeedToken(userId: string) {
  if (!supabase) return null;

  const existing = await supabase
    .from('planner_profiles')
    .select('feed_token')
    .eq('user_id', userId)
    .maybeSingle();

  if (existing.data?.feed_token) return existing.data.feed_token as string;

  const inserted = await supabase
    .from('planner_profiles')
    .upsert({ user_id: userId }, { onConflict: 'user_id' })
    .select('feed_token')
    .single();

  return (inserted.data?.feed_token as string) ?? null;
}

export async function loadRemoteWeeks(userId: string) {
  if (!supabase) return { rows: [], error: null as string | null };

  const { data, error } = await supabase
    .from('weekly_plans')
    .select('week_key,people,shopping_moment,assignments')
    .eq('user_id', userId)
    .order('week_key', { ascending: true });

  return {
    rows: (data ?? []) as RemoteWeekRow[],
    error: error?.message ?? null,
  };
}

export async function saveRemoteWeek(input: {
  userId: string;
  weekKey: string;
  people: number;
  shoppingMoment: string;
  assignments: Record<string, string | undefined>;
}) {
  if (!supabase) return { error: 'No Supabase client' };

  const cleanedAssignments = Object.fromEntries(
    Object.entries(input.assignments).filter(([, value]) => Boolean(value)),
  );

  const { error } = await supabase.from('weekly_plans').upsert(
    {
      user_id: input.userId,
      week_key: input.weekKey,
      people: input.people,
      shopping_moment: input.shoppingMoment || null,
      assignments: cleanedAssignments,
    },
    { onConflict: 'user_id,week_key' },
  );

  return { error: error?.message ?? null };
}

export function mergeRemoteIntoState(state: PlannerState, rows: RemoteWeekRow[]): PlannerState {
  if (!rows.length) return state;

  const assignmentsByWeek = { ...state.assignmentsByWeek };
  const shoppingMomentByWeek = { ...state.shoppingMomentByWeek };
  let people = state.people;

  for (const row of rows) {
    assignmentsByWeek[row.week_key] = (row.assignments ?? {}) as PlannerState['assignmentsByWeek'][string];
    shoppingMomentByWeek[row.week_key] = row.shopping_moment ?? '';
    if (row.people) people = row.people;
  }

  return {
    ...state,
    people,
    assignmentsByWeek,
    shoppingMomentByWeek,
  };
}
