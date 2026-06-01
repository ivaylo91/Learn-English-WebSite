import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { sendStreakReminder } from '@/lib/email/streak-reminder';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Verify this was called by Vercel Cron (or a trusted internal caller)
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();

  // Users with an active streak who haven't been active today and want reminders
  const todayUTC = new Date().toISOString().slice(0, 10);

  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, name, streak, last_active_at, email_reminders')
    .gt('streak', 0)
    .eq('email_reminders', true)
    .lt('last_active_at', todayUTC); // cast: date comparison works on timestamptz prefix

  if (error) {
    console.error('[streak-reminder] query error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!users || users.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No at-risk users' });
  }

  // Fetch email addresses from auth.users via service role
  const userIds = users.map(u => u.id);
  const { data: authUsers, error: authErr } = await supabase.auth.admin.listUsers();

  if (authErr) {
    console.error('[streak-reminder] auth.admin.listUsers error:', authErr.message);
    return NextResponse.json({ error: authErr.message }, { status: 500 });
  }

  const emailMap = new Map(
    (authUsers.users ?? [])
      .filter(u => userIds.includes(u.id) && !!u.email)
      .map(u => [u.id, u.email!])
  );

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const user of users) {
    const email = emailMap.get(user.id);
    if (!email) continue;

    const displayName =
      (user.name as string | null)?.trim() || email.split('@')[0];

    const { ok, error: sendErr } = await sendStreakReminder({
      to:     email,
      name:   displayName,
      streak: user.streak as number,
      userId: user.id,
    });

    if (ok) {
      sent++;
    } else {
      failed++;
      errors.push(`${email}: ${sendErr}`);
      console.error(`[streak-reminder] failed for ${user.id}:`, sendErr);
    }
  }

  console.log(`[streak-reminder] done — sent: ${sent}, failed: ${failed}`);
  return NextResponse.json({ sent, failed, errors });
}
