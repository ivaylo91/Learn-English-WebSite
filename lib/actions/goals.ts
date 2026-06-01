'use server';

import { createClient } from '@/lib/supabase/server';

export type DailyGoal = 'light' | 'standard' | 'intensive';

export interface GoalTarget {
  label:    string;
  words:    number;
  items:    number;
  desc:     string;
}

export const GOAL_TARGETS: Record<DailyGoal, GoalTarget> = {
  light:     { label: 'Леко',        words: 5,  items: 1, desc: '5 думи · 1 активност' },
  standard:  { label: 'Стандарт',    words: 10, items: 2, desc: '10 думи · 2 активности' },
  intensive: { label: 'Интензивно',  words: 20, items: 3, desc: '20 думи · 3 активности' },
};

export interface TodayProgress {
  words: number;
  items: number;
}

/** Compute today's words reviewed and module completions from activity rows. */
export function computeTodayProgress(
  rows: { module: string; action: string; metadata: Record<string, unknown> }[]
): TodayProgress {
  let words = 0;
  let items = 0;

  for (const row of rows) {
    if (row.module === 'vocabulary' && row.action === 'study_session') {
      words += (row.metadata?.words_reviewed as number) ?? 0;
    }
    if (
      row.action === 'lesson_complete'  ||
      row.action === 'exercise_complete' ||
      row.action === 'quiz_complete'
    ) {
      items++;
    }
  }

  return { words, items };
}

/**
 * Fetch today's activity rows for a user (server-side).
 */
export async function getTodayActivity(userId: string) {
  const supabase  = await createClient();
  const todayUTC  = new Date().toISOString().slice(0, 10);

  const { data } = await supabase
    .from('user_activity')
    .select('module, action, metadata')
    .eq('user_id', userId)
    .gte('created_at', `${todayUTC}T00:00:00.000Z`);

  return (data ?? []) as { module: string; action: string; metadata: Record<string, unknown> }[];
}

/**
 * If today's goal is met and not yet logged, insert a daily_goal_complete activity.
 * Called server-side on the napredak page so the achievement checker can find it.
 */
export async function checkAndLogDailyGoal(userId: string): Promise<void> {
  const supabase = await createClient();
  const todayUTC = new Date().toISOString().slice(0, 10);

  const [profileRes, todayRows, alreadyLoggedRes] = await Promise.all([
    supabase.from('profiles').select('daily_goal').eq('id', userId).single(),
    getTodayActivity(userId),
    supabase.from('user_activity')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('action', 'daily_goal_complete')
      .gte('created_at', `${todayUTC}T00:00:00.000Z`),
  ]);

  // Already logged today — nothing to do
  if ((alreadyLoggedRes.count ?? 0) > 0) return;

  const goal    = ((profileRes.data?.daily_goal ?? 'standard') as DailyGoal);
  const target  = GOAL_TARGETS[goal];
  const today   = computeTodayProgress(todayRows);

  if (today.words >= target.words && today.items >= target.items) {
    await supabase.from('user_activity').insert({
      user_id:   userId,
      module:    'vocabulary',
      action:    'daily_goal_complete',
      xp_gained: 0,
      metadata:  { goal, words: today.words, items: today.items },
    });
  }
}
