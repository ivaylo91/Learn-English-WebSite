'use server';

import { createClient } from '@/lib/supabase/server';

export interface UnlockedAchievement {
  key:            string;
  title_bg:       string;
  description_bg: string;
  xp_reward:      number;
}

const LEVEL_RANK: Record<string, number> = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };

/** Compute the longest unbroken streak of daily-goal dates ending today or yesterday. */
function goalStreak(sortedDates: string[]): number {
  if (sortedDates.length === 0) return 0;
  const todayUTC     = new Date().toISOString().slice(0, 10);
  const yesterdayUTC = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  // Start from today if goal was hit today, otherwise yesterday
  const startDate = sortedDates.includes(todayUTC)
    ? todayUTC
    : sortedDates.includes(yesterdayUTC)
    ? yesterdayUTC
    : null;

  if (!startDate) return 0;

  let streak = 0;
  let cursor = new Date(startDate);
  while (true) {
    const d = cursor.toISOString().slice(0, 10);
    if (sortedDates.includes(d)) { streak++; cursor = new Date(cursor.getTime() - 86_400_000); }
    else break;
  }
  return streak;
}

export async function checkAndUnlockAchievements(userId: string): Promise<UnlockedAchievement[]> {
  try {
    const supabase = await createClient();

    // Auth guard
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) return [];

    // Already-unlocked keys
    const { data: existing } = await supabase
      .from('user_achievements')
      .select('achievement_key')
      .eq('user_id', userId);
    const unlockedKeys = new Set((existing ?? []).map(r => r.achievement_key));

    // ── Step 1: profile + unlocks (needed to compute rank in step 2) ────────
    const fortyAgoISO = new Date(Date.now() - 40 * 86_400_000).toISOString();

    const profileRes = await supabase
      .from('profiles')
      .select('xp, streak, level')
      .eq('id', userId)
      .single();

    const userXp = profileRes.data?.xp ?? 0;

    // ── Step 2: all other data in parallel ────────────────────────────────────
    const [
      wordProgressRes,
      studyActivityRes,
      lessonProgressRes,
      listeningProgressRes,
      readingProgressRes,
      writingProgressRes,
      placementRes,
      goalActivityRes,
      aboveXpRes,
    ] = await Promise.all([
      supabase.from('user_word_progress').select('status').eq('user_id', userId),
      supabase.from('user_activity').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('module', 'vocabulary').eq('action', 'study_session'),
      supabase.from('user_lesson_progress').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('completed', true),
      supabase.from('user_content_progress').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('content_type', 'listening').eq('completed', true),
      supabase.from('user_content_progress').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('content_type', 'reading').eq('completed', true),
      supabase.from('user_writing_progress').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('completed', true),
      supabase.from('user_activity').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('action', 'placement_complete'),
      supabase.from('user_activity').select('created_at')
        .eq('user_id', userId).eq('action', 'daily_goal_complete')
        .gte('created_at', fortyAgoISO)
        .order('created_at', { ascending: true }),
      // Count profiles with more XP → rank = count + 1
      supabase.from('profiles').select('id', { count: 'exact', head: true })
        .gt('xp', userXp),
    ]);

    const xp           = profileRes.data?.xp     ?? 0;
    const streak       = profileRes.data?.streak  ?? 0;
    const level        = profileRes.data?.level   ?? 'A1';
    const levelRank    = LEVEL_RANK[level] ?? 0;
    const wordRows     = wordProgressRes.data     ?? [];
    const wordCount    = wordRows.length;
    const knownCount   = wordRows.filter(r => r.status === 'known').length;
    const hasStudied   = (studyActivityRes.count  ?? 0) > 0;
    const grammarDone  = lessonProgressRes.count  ?? 0;
    const listDone     = listeningProgressRes.count ?? 0;
    const readDone     = readingProgressRes.count  ?? 0;
    const writingDone  = writingProgressRes.count  ?? 0;
    const hasPlacement = (placementRes.count       ?? 0) > 0;

    // Goal streak — unique dates, sorted
    const goalDates    = [...new Set(
      (goalActivityRes.data ?? []).map(r => r.created_at.slice(0, 10))
    )].sort();
    const gStreak      = goalStreak(goalDates);

    // Rank (1-based)
    const userRank     = (aboveXpRes.count ?? 0) + 1;

    // ── Evaluate conditions ──────────────────────────────────────────────────
    const earned: string[] = [];
    const check = (key: string, met: boolean) => {
      if (met && !unlockedKeys.has(key)) earned.push(key);
    };

    // Original 16
    check('first_word',      wordCount   > 0);
    check('first_study',     hasStudied);
    check('first_grammar',   grammarDone > 0);
    check('first_listening', listDone    > 0);
    check('first_reading',   readDone    > 0);
    check('streak_3',        streak      >= 3);
    check('streak_7',        streak      >= 7);
    check('streak_30',       streak      >= 30);
    check('words_10',        knownCount  >= 10);
    check('words_50',        knownCount  >= 50);
    check('words_100',       knownCount  >= 100);
    check('xp_100',          xp          >= 100);
    check('xp_500',          xp          >= 500);
    check('xp_1000',         xp          >= 1000);
    check('grammar_5',       grammarDone >= 5);
    check('grammar_10',      grammarDone >= 10);

    // Phase 35 — 9 new
    check('first_writing',   writingDone > 0);
    check('writing_5',       writingDone >= 5);
    check('writing_10',      writingDone >= 10);
    check('placement_done',  hasPlacement);
    check('reached_b1',      levelRank   >= LEVEL_RANK['B1']);
    check('reached_b2',      levelRank   >= LEVEL_RANK['B2']);
    check('reached_c1',      levelRank   >= LEVEL_RANK['C1']);
    check('goal_streak_7',   gStreak     >= 7);
    check('top_10',          userRank    <= 10);

    if (earned.length === 0) return [];

    // ── Batch-insert new unlocks ─────────────────────────────────────────────
    await supabase.from('user_achievements').upsert(
      earned.map(key => ({ user_id: userId, achievement_key: key })),
      { onConflict: 'user_id,achievement_key', ignoreDuplicates: true }
    );

    // Fetch full data for earned achievements (for toast display)
    const { data: rewardRows } = await supabase
      .from('achievements')
      .select('key, title_bg, description_bg, xp_reward')
      .in('key', earned)
      .order('sort_order');

    // Award bonus XP
    const bonusXp = (rewardRows ?? []).reduce((s, r) => s + (r.xp_reward ?? 0), 0);
    if (bonusXp > 0) {
      await supabase.rpc('record_activity', {
        p_user_id: userId,
        p_module:  'vocabulary',
        p_action:  'achievement_unlock',
        p_xp:      bonusXp,
        p_meta:    { achievement_keys: earned },
      });
    }

    return (rewardRows ?? []) as UnlockedAchievement[];
  } catch {
    return [];
  }
}
