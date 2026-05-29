'use server';

import { createClient } from '@/lib/supabase/server';

export interface UnlockedAchievement {
  key: string;
  title_bg: string;
  description_bg: string;
  xp_reward: number;
}

export async function checkAndUnlockAchievements(userId: string): Promise<UnlockedAchievement[]> {
  try {
  const supabase = await createClient();

  // Verify caller owns this userId
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.id !== userId) return [];

  // Already-unlocked keys
  const { data: existing } = await supabase
    .from('user_achievements')
    .select('achievement_key')
    .eq('user_id', userId);
  const unlockedKeys = new Set((existing ?? []).map(r => r.achievement_key));

  // All conditions checked in parallel
  const [profileRes, wordProgressRes, studyActivityRes, lessonProgressRes, listeningProgressRes, readingProgressRes] =
    await Promise.all([
      supabase.from('profiles').select('xp, streak').eq('id', userId).single(),
      supabase.from('user_word_progress').select('status').eq('user_id', userId),
      supabase.from('user_activity').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('module', 'vocabulary').eq('action', 'study_session'),
      supabase.from('user_lesson_progress').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('completed', true),
      supabase.from('user_content_progress').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('content_type', 'listening').eq('completed', true),
      supabase.from('user_content_progress').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('content_type', 'reading').eq('completed', true),
    ]);

  const xp           = profileRes.data?.xp     ?? 0;
  const streak       = profileRes.data?.streak  ?? 0;
  const wordRows     = wordProgressRes.data     ?? [];
  const wordCount    = wordRows.length;
  const knownCount   = wordRows.filter(r => r.status === 'known').length;
  const hasStudied   = (studyActivityRes.count  ?? 0) > 0;
  const grammarDone  = lessonProgressRes.count  ?? 0;
  const listDone     = listeningProgressRes.count ?? 0;
  const readDone     = readingProgressRes.count  ?? 0;

  const earned: string[] = [];
  const check = (key: string, met: boolean) => {
    if (met && !unlockedKeys.has(key)) earned.push(key);
  };

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

  if (earned.length === 0) return [];

  // Batch insert new unlocks (ignore conflicts — race condition safety)
  await supabase.from('user_achievements').upsert(
    earned.map(key => ({ user_id: userId, achievement_key: key })),
    { onConflict: 'user_id,achievement_key', ignoreDuplicates: true }
  );

  // Fetch full data for the earned ones to return to client
  const { data: rewardRows } = await supabase
    .from('achievements')
    .select('key, title_bg, description_bg, xp_reward')
    .in('key', earned)
    .order('sort_order');

  // Award bonus XP for achievements that carry XP
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
    // Tables not yet created (migration pending) — fail silently
    return [];
  }
}
