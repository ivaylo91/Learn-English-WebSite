'use server';

import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function deleteAccount(): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Не си влязъл в профила си.' };

  // Service client needed to call auth.admin.deleteUser
  const db = createServiceClient();
  const { error } = await db.auth.admin.deleteUser(user.id);
  if (error) return { error: error.message };

  // Invalidate the current session
  await supabase.auth.signOut();
  return {};
}
