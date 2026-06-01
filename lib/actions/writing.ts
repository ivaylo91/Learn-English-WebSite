'use server';

import { createClient } from '@/lib/supabase/server';

export async function saveWritingProgress(
  exerciseId: string,
  score: number,
): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const completed = score >= 60;

  await supabase.from('user_writing_progress').upsert(
    {
      user_id:      user.id,
      exercise_id:  exerciseId,
      score,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    },
    { onConflict: 'user_id,exercise_id' },
  );

  if (completed) {
    await supabase.rpc('record_activity', {
      p_user_id: user.id,
      p_module:  'writing',
      p_action:  'exercise_complete',
      p_xp:      score === 100 ? 20 : 10,
      p_meta:    { exercise_id: exerciseId, score },
    });
  }
}
