import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { sendPush, type PushSub } from '@/lib/push/send';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = createServiceClient();
  const todayUTC = new Date().toISOString().slice(0, 10);

  // Users with active streak who haven't been active today
  const { data: atRisk } = await db
    .from('profiles')
    .select('id, streak')
    .gt('streak', 0)
    .lt('last_active_at', todayUTC);

  if (!atRisk || atRisk.length === 0) {
    return NextResponse.json({ pushed: 0, message: 'No at-risk users' });
  }

  const userIds = atRisk.map(u => u.id);

  // Get all push subscriptions for these users
  const { data: subs } = await db
    .from('push_subscriptions')
    .select('user_id, endpoint, auth, p256dh')
    .in('user_id', userIds);

  if (!subs || subs.length === 0) {
    return NextResponse.json({ pushed: 0, message: 'No push subscriptions' });
  }

  const streakMap = new Map(atRisk.map(u => [u.id, u.streak as number]));
  const expiredEndpoints: string[] = [];
  let pushed = 0;
  let failed = 0;

  for (const sub of subs) {
    const streak = streakMap.get(sub.user_id) ?? 1;
    const label  = streak === 1 ? '1 ден' : `${streak} дни`;

    const result = await sendPush(sub as PushSub, {
      title: '🔥 Серията ти е в риск!',
      body:  `Имаш ${label} поред. Учи поне 5 минути и запази серията си.`,
      url:   '/rechnik/study',
      tag:   'streak-reminder',
    });

    if (result.ok) {
      pushed++;
    } else {
      failed++;
      if (result.expired) expiredEndpoints.push(sub.endpoint);
    }
  }

  // Clean up expired subscriptions
  if (expiredEndpoints.length > 0) {
    await db
      .from('push_subscriptions')
      .delete()
      .in('endpoint', expiredEndpoints);
  }

  return NextResponse.json({ pushed, failed, expiredRemoved: expiredEndpoints.length });
}
