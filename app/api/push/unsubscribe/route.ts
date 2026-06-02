import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const { endpoint } = body ?? {};

  if (!endpoint) {
    // No endpoint means remove ALL subscriptions for this user
    await supabase.from('push_subscriptions').delete().eq('user_id', user.id);
  } else {
    await supabase
      .from('push_subscriptions')
      .delete()
      .eq('user_id', user.id)
      .eq('endpoint', endpoint);
  }

  return NextResponse.json({ ok: true });
}
