'use server';

import { createClient } from '@/lib/supabase/server';
import {
  computeTodayProgress,
  GOAL_TARGETS,
  type DailyGoal,
} from '@/lib/goals-utils';

/** Fetch today's activity rows for a user (server-side). */
export async function getTodayActivity(userId: string) {
  const supabase = await createClient();
  const todayUTC = new Date().toISOString().slice(0, 10);

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
    supabase
      .from('user_activity')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('action', 'daily_goal_complete')
      .gte('created_at', `${todayUTC}T00:00:00.000Z`),
  ]);

  if ((alreadyLoggedRes.count ?? 0) > 0) return;

  const goal   = ((profileRes.data?.daily_goal ?? 'standard') as DailyGoal);
  const target = GOAL_TARGETS[goal];
  const today  = computeTodayProgress(todayRows);

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
