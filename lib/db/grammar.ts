import { createClient } from "@/lib/supabase/client";
import type { GrammarLesson, UserLessonProgress } from "@/lib/types/database";

export async function getLessons(): Promise<GrammarLesson[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("grammar_lessons")
    .select("*")
    .order("level")
    .order("order_index");
  return data ?? [];
}

export async function getLesson(slug: string): Promise<GrammarLesson | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("grammar_lessons")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getUserLessonProgress(
  userId: string
): Promise<UserLessonProgress[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("user_lesson_progress")
    .select("*")
    .eq("user_id", userId);
  return data ?? [];
}

export async function saveLessonScore(
  userId: string,
  lessonId: string,
  score: number
): Promise<void> {
  const supabase = createClient();
  await supabase.from("user_lesson_progress").upsert(
    {
      user_id:      userId,
      lesson_id:    lessonId,
      score,
      completed:    score >= 60,
      completed_at: score >= 60 ? new Date().toISOString() : null,
    },
    { onConflict: "user_id,lesson_id" }
  );
}
