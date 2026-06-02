import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email/welcome';

function safeRedirect(next: string | null, origin: string): string {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return `${origin}/napredak`;
  return `${origin}${next}`;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? null;

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // ── Welcome email (first login only) ─────────────────────────────────
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('welcome_email_sent, name')
            .eq('id', user.id)
            .single();

          if (profile && !profile.welcome_email_sent) {
            const displayName =
              (profile.name as string | null)?.trim() ||
              user.user_metadata?.name ||
              user.email.split('@')[0];

            // Mark as sent first to prevent duplicates even if send fails
            await supabase
              .from('profiles')
              .update({ welcome_email_sent: true })
              .eq('id', user.id);

            // Send in background — don't block the redirect on email API latency
            sendWelcomeEmail({ to: user.email, name: displayName, userId: user.id })
              .catch(() => { /* silent — welcome email is non-critical */ });
          }
        }
      } catch {
        // Never break the auth flow because of email failures
      }

      return NextResponse.redirect(safeRedirect(next, origin));
    }
  }

  // Code missing or exchange failed — back to login with an error hint
  return NextResponse.redirect(`${origin}/login?error=link_expired`);
}
