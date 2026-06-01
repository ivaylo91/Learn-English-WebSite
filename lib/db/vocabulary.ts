import { createClient } from "@/lib/supabase/client";
import type { Level, VocabularyWord, UserWordProgress } from "@/lib/types/database";

/** All words, optionally filtered by level or category */
export async function getWords(filters?: {
  level?: Level;
  category?: string;
}): Promise<VocabularyWord[]> {
  const supabase = createClient();
  let query = supabase.from("vocabulary_words").select("*").order("level").order("word_en");
  if (filters?.level)    query = query.eq("level", filters.level);
  if (filters?.category) query = query.eq("category", filters.category);
  const { data } = await query;
  return data ?? [];
}

/** Words due for review today for a user (spaced repetition queue) */
export async function getDueWords(userId: string): Promise<UserWordProgress[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("user_word_progress")
    .select("*, vocabulary_words(*)")
    .eq("user_id", userId)
    .lte("next_review_at", new Date().toISOString())
    .neq("status", "known")
    .order("next_review_at")
    .limit(20);
  return data ?? [];
}

/** Add a word to the user's study list */
export async function addWordToStudyList(userId: string, wordId: string): Promise<void> {
  const supabase = createClient();
  await supabase
    .from("user_word_progress")
    .upsert({ user_id: userId, word_id: wordId }, { onConflict: "user_id,word_id" });
}

/** Remove a word from the user's study list */
export async function removeWordFromStudyList(userId: string, wordId: string): Promise<void> {
  const supabase = createClient();
  await supabase
    .from("user_word_progress")
    .delete()
    .eq("user_id", userId)
    .eq("word_id", wordId);
}

/**
 * SM-2 spaced repetition update.
 * quality: 0-5  (0-2 = fail, 3-5 = pass)
 */
export async function reviewWord(
  userId: string,
  wordId: string,
  quality: number
): Promise<void> {
  const supabase = createClient();

  const { data: existing } = await supabase
    .from("user_word_progress")
    .select("ease_factor, interval_days, repetitions")
    .eq("user_id", userId)
    .eq("word_id", wordId)
    .single();

  if (!existing) return;

  const { ease_factor: ef, interval_days: interval, repetitions: reps } = existing;
  let newEf       = ef;
  let newInterval = interval;
  let newReps     = reps;

  if (quality >= 3) {
    newReps = reps + 1;
    newInterval = reps === 0 ? 1 : reps === 1 ? 6 : Math.round(interval * ef);
    newEf = Math.max(1.3, ef + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  } else {
    newReps     = 0;
    newInterval = 1;
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  const status = newReps >= 5 ? "known" : newReps >= 1 ? "learning" : "new";

  await supabase
    .from("user_word_progress")
    .update({
      ease_factor:      newEf,
      interval_days:    newInterval,
      repetitions:      newReps,
      status,
      next_review_at:   nextReview.toISOString(),
      last_reviewed_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("word_id", wordId);
}

/** ISO timestamp of the next word due for review (ignores 'known' words) */
export async function getNextDueDate(userId: string): Promise<string | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from('user_word_progress')
    .select('next_review_at')
    .eq('user_id', userId)
    .neq('status', 'known')
    .gt('next_review_at', new Date().toISOString())
    .order('next_review_at')
    .limit(1)
    .maybeSingle();
  return data?.next_review_at ?? null;
}

/** Distinct categories from vocabulary table */
export async function getCategories(): Promise<string[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("vocabulary_words")
    .select("category")
    .order("category");
  const unique = [...new Set((data ?? []).map((r) => r.category))];
  return unique;
}

/** Count of words per status for a user */
export async function getWordStats(userId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("user_word_progress")
    .select("status")
    .eq("user_id", userId);
  const counts = { new: 0, learning: 0, known: 0 };
  (data ?? []).forEach((r) => { counts[r.status as keyof typeof counts]++; });
  return counts;
}
