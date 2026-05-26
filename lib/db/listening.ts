import { createClient } from '@/lib/supabase/client';
import type { ListeningClip } from '@/lib/types/database';

export async function getClips(): Promise<ListeningClip[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('listening_clips')
    .select('*')
    .order('level')
    .order('created_at');
  return data ?? [];
}

export async function getClip(id: string): Promise<ListeningClip | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from('listening_clips')
    .select('*')
    .eq('id', id)
    .single();
  return data;
}

export async function saveListeningProgress(
  userId: string,
  clipId: string,
  score: number
): Promise<void> {
  const supabase = createClient();
  await supabase.from('user_content_progress').upsert(
    {
      user_id:      userId,
      content_type: 'listening',
      content_id:   clipId,
      score,
      completed:    score >= 60,
      completed_at: score >= 60 ? new Date().toISOString() : null,
    },
    { onConflict: 'user_id,content_type,content_id' }
  );
}

export async function getListeningProgress(
  userId: string
): Promise<{ content_id: string; score: number; completed: boolean }[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('user_content_progress')
    .select('content_id, score, completed')
    .eq('user_id', userId)
    .eq('content_type', 'listening');
  return data ?? [];
}
