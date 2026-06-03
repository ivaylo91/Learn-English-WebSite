'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Apply a streak freeze: set last_active_at to "yesterday 23:59" so the
 * next activity today counts as a consecutive day and the streak survives.
 * Decrements streak_freeze_count by 1.
 */
export async function applyStreakFreeze(): Promise<{ applied: boolean; remaining: number }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { applied: false, remaining: 0 };

  const todayUTC = new Date().toISOString().slice(0, 10);

  const { data: profile } = await supabase
    .from('profiles')
    .select('streak, streak_freeze_count, last_active_at')
    .eq('id', user.id)
    .single();

  if (!profile) return { applied: false, remaining: 0 };

  const freezes    = (profile.streak_freeze_count as number) ?? 0;
  const lastActive = (profile.last_active_at as string | null)?.slice(0, 10) ?? '';

  // Guards
  if ((profile.streak as number) <= 0) return { applied: false, remaining: freezes };
  if (freezes <= 0)                    return { applied: false, remaining: 0 };
  if (lastActive >= todayUTC)          return { applied: false, remaining: freezes }; // already active today

  // Apply: set last_active_at to yesterday 23:59 so record_activity later today
  // sees v_last_active = v_today - 1 and increments the streak (not resets).
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const { error } = await supabase
    .from('profiles')
    .update({
      last_active_at:      `${yesterday}T23:59:59.000Z`,
      streak_freeze_count: freezes - 1,
    })
    .eq('id', user.id);

  if (error) return { applied: false, remaining: freezes };
  return { applied: true, remaining: freezes - 1 };
}
