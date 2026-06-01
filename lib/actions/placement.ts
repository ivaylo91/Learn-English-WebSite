'use server';

import { createClient } from '@/lib/supabase/server';
import type { Level } from '@/lib/types/database';

export async function savePlacementLevel(level: Level): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Не си влязъл в профила си.' };

  const { error } = await supabase
    .from('profiles')
    .update({ level })
    .eq('id', user.id);

  if (error) return { error: 'Грешка при запазване. Опитай отново.' };
  return {};
}
