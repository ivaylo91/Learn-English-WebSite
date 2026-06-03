import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { sendWeeklySummary, type WeeklyStats } from '@/lib/email/weekly-summary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = createServiceClient();

  // Only email users who have opted in AND were active in the last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86_400_000).toISOString();
  const sevenDaysAgo  = new Date(Date.now() -  7 * 86_400_000).toISOString();

  const { data: profiles, error: profilesErr } = await db
    .from('profiles')
    .select('id, name, xp, streak, level')
    .eq('email_reminders', true)
    .gte('last_active_at', thirtyDaysAgo); // skip fully churned users

  if (profilesErr) {
    return NextResponse.json({ error: profilesErr.message }, { status: 500 });
  }
  if (!profiles || profiles.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No eligible users' });
  }

  const userIds = profiles.map(p => p.id);

  // ── Batch fetch weekly data ───────────────────────────────────────────────
  const [activityRes, achievementsRes, authRes] = await Promise.all([
    // XP earned per user in the last 7 days
    db.from('user_activity')
      .select('user_id, xp_gained')
      .in('user_id', userIds)
      .gt('xp_gained', 0)
      .gte('created_at', sevenDaysAgo),

    // Achievements unlocked this week — join with achievements for title
    db.from('user_achievements')
      .select('user_id, achievement_key, achievements(title_bg)')
      .in('user_id', userIds)
      .gte('unlocked_at', sevenDaysAgo),

    // Auth emails
    db.auth.admin.listUsers({ perPage: 1000 }),
  ]);

  if (authRes.error) {
    return NextResponse.json({ error: authRes.error.message }, { status: 500 });
  }

  // Build lookup maps
  const emailMap = new Map(
    (authRes.data?.users ?? [])
      .filter(u => userIds.includes(u.id) && !!u.email)
      .map(u => [u.id, u.email!])
  );

  const weekXpMap = new Map<string, number>();
  for (const row of activityRes.data ?? []) {
    const prev = weekXpMap.get(row.user_id) ?? 0;
    weekXpMap.set(row.user_id, prev + (row.xp_gained ?? 0));
  }

  const weekAchievementsMap = new Map<string, string[]>();
  for (const row of achievementsRes.data ?? []) {
    const title = (row.achievements as { title_bg: string } | null)?.title_bg;
    if (!title) continue;
    const arr = weekAchievementsMap.get(row.user_id) ?? [];
    arr.push(title);
    weekAchievementsMap.set(row.user_id, arr);
  }

  // ── Send emails ───────────────────────────────────────────────────────────
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const profile of profiles) {
    const email = emailMap.get(profile.id);
    if (!email) continue;

    const displayName = (profile.name as string | null)?.trim() || email.split('@')[0];

    const stats: WeeklyStats = {
      weekXp:       weekXpMap.get(profile.id) ?? 0,
      streak:       profile.streak  as number,
      level:        profile.level   as string,
      achievements: weekAchievementsMap.get(profile.id) ?? [],
    };

    const { ok, error: sendErr } = await sendWeeklySummary({
      to:   email,
      name: displayName,
      stats,
      userId: profile.id,
    });

    if (ok) {
      sent++;
    } else {
      failed++;
      errors.push(`${email}: ${sendErr}`);
      console.error(`[weekly-summary] failed for ${profile.id}:`, sendErr);
    }
  }

  console.log(`[weekly-summary] done — sent: ${sent}, failed: ${failed}`);
  return NextResponse.json({ sent, failed, errors });
}
