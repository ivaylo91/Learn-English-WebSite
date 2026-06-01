'use server';

import { createClient } from '@/lib/supabase/server';
import type { Level } from '@/lib/types/database';

export async function savePlacementLevel(level: Level): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Не си влязъл в профила си.' };

  const [updateResult] = await Promise.all([
    supabase.from('profiles').update({ level }).eq('id', user.id),
    // Log placement completion so the achievement checker can detect it.
    // Uses direct insert (no XP/streak side-effects via record_activity).
    supabase.from('user_activity').insert({
      user_id:   user.id,
      module:    'vocabulary',
      action:    'placement_complete',
      xp_gained: 0,
      metadata:  { level },
    }),
  ]);

  if (updateResult.error) return { error: 'Грешка при запазване. Опитай отново.' };
  return {};
}
