import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const { endpoint, auth, p256dh } = body ?? {};

  if (!endpoint || !auth || !p256dh) {
    return NextResponse.json({ error: 'Missing subscription fields' }, { status: 400 });
  }

  // Upsert — same device can subscribe again after reinstall
  const { error } = await supabase
    .from('push_subscriptions')
    .upsert(
      { user_id: user.id, endpoint, auth, p256dh },
      { onConflict: 'user_id,endpoint' }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
