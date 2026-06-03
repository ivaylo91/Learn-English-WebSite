'use server';

import { createClient } from '@/lib/supabase/server';

const MODULES = ['vocabulary', 'grammar', 'listening', 'reading', 'writing'] as const;
export type ChallengeModule = typeof MODULES[number];
export const CHALLENGE_XP = 25;

// Stable integer that increments once per UTC day
function dayIndex() {
  return Math.floor(Date.now() / 86_400_000);
}

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

export type DailyChallenge = {
  module:    ChallengeModule;
  title:     string;
  subtitle:  string;
  href:      string;
  contentId: string;
  xpBonus:   number;
  completed: boolean;
};

export async function getDailyChallenge(): Promise<DailyChallenge | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const day    = dayIndex();
  const module = MODULES[day % MODULES.length];

  let title = '', subtitle = '', href = '', contentId = '';

  if (module === 'vocabulary') {
    const { count } = await supabase
      .from('vocabulary_words')
      .select('*', { count: 'exact', head: true });
    const idx = day % (count || 1);
    const { data } = await supabase
      .from('vocabulary_words')
      .select('id, word_en, word_bg, level')
      .range(idx, idx)
      .single();
    if (!data) return null;
    title = data.word_en; subtitle = `${data.word_bg} · ${data.level}`; href = `/rechnik/${data.id}`; contentId = data.id;

  } else if (module === 'grammar') {
    const { count } = await supabase
      .from('grammar_lessons')
      .select('*', { count: 'exact', head: true });
    const idx = day % (count || 1);
    const { data } = await supabase
      .from('grammar_lessons')
      .select('id, slug, title, level')
      .range(idx, idx)
      .single();
    if (!data) return null;
    title = data.title; subtitle = `Граматика · ${data.level}`; href = `/gramatika/${data.slug}`; contentId = data.id;

  } else if (module === 'listening') {
    const { count } = await supabase
      .from('listening_clips')
      .select('*', { count: 'exact', head: true });
    const idx = day % (count || 1);
    const { data } = await supabase
      .from('listening_clips')
      .select('id, title, level')
      .range(idx, idx)
      .single();
    if (!data) return null;
    title = data.title; subtitle = `Слушане · ${data.level}`; href = `/slusham/${data.id}`; contentId = data.id;

  } else if (module === 'reading') {
    const { count } = await supabase
      .from('reading_texts')
      .select('*', { count: 'exact', head: true });
    const idx = day % (count || 1);
    const { data } = await supabase
      .from('reading_texts')
      .select('id, slug, title, level')
      .range(idx, idx)
      .single();
    if (!data) return null;
    title = data.title; subtitle = `Четене · ${data.level}`; href = `/chetene/${data.slug}`; contentId = data.id;

  } else {
    // writing
    const { count } = await supabase
      .from('writing_exercises')
      .select('*', { count: 'exact', head: true });
    const idx = day % (count || 1);
    const { data } = await supabase
      .from('writing_exercises')
      .select('id, slug, title, level')
      .range(idx, idx)
      .single();
    if (!data) return null;
    title = data.title; subtitle = `Писане · ${data.level}`; href = `/pisane/${data.slug}`; contentId = data.id;
  }

  let completed = false;
  if (user) {
    const { data: done } = await supabase
      .from('daily_challenge_completions')
      .select('id')
      .eq('user_id', user.id)
      .eq('challenge_date', todayUTC())
      .maybeSingle();
    completed = !!done;
  }

  return { module, title, subtitle, href, contentId, xpBonus: CHALLENGE_XP, completed };
}

export async function completeDailyChallenge(
  module: string,
  contentId: string,
): Promise<{ success: boolean; xpEarned: number }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, xpEarned: 0 };

  const today = todayUTC();

  const { error } = await supabase
    .from('daily_challenge_completions')
    .insert({ user_id: user.id, challenge_date: today, module, content_id: contentId, xp_earned: CHALLENGE_XP });

  // Duplicate (already completed today) — not an error for the user
  if (error) return { success: false, xpEarned: 0 };

  // Award XP via record_activity (handles streak + XP atomically)
  await supabase.rpc('record_activity', {
    p_user_id: user.id,
    p_module:  'daily_challenge',
    p_action:  'completed',
    p_xp:      CHALLENGE_XP,
    p_meta:    { module, content_id: contentId },
  });

  return { success: true, xpEarned: CHALLENGE_XP };
}
