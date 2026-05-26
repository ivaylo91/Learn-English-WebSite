import { createClient } from '@/lib/supabase/client';
import type { ReadingText } from '@/lib/types/database';

export async function getTexts(): Promise<ReadingText[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('reading_texts')
    .select('*')
    .order('level')
    .order('created_at');
  return data ?? [];
}

export async function getText(slug: string): Promise<ReadingText | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from('reading_texts')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function saveReadingProgress(
  userId: string,
  textId: string,
  score: number
): Promise<void> {
  const supabase = createClient();
  await supabase.from('user_content_progress').upsert(
    {
      user_id:      userId,
      content_type: 'reading',
      content_id:   textId,
      score,
      completed:    score >= 60,
      completed_at: score >= 60 ? new Date().toISOString() : null,
    },
    { onConflict: 'user_id,content_type,content_id' }
  );
}

export async function getReadingProgress(
  userId: string
): Promise<{ content_id: string; score: number; completed: boolean }[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('user_content_progress')
    .select('content_id, score, completed')
    .eq('user_id', userId)
    .eq('content_type', 'reading');
  return data ?? [];
}
