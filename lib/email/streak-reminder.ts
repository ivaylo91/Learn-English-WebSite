import { createHmac } from 'crypto';

// ── Token helpers ─────────────────────────────────────────────────────────────

export function generateUnsubscribeToken(userId: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) throw new Error('Missing UNSUBSCRIBE_SECRET');
  return createHmac('sha256', secret).update(`${userId}:unsubscribe`).digest('hex');
}

export function verifyUnsubscribeToken(userId: string, token: string): boolean {
  try {
    const expected = generateUnsubscribeToken(userId);
    // Constant-time comparison to prevent timing attacks
    if (expected.length !== token.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
    return diff === 0;
  } catch {
    return false;
  }
}

// ── Email HTML ────────────────────────────────────────────────────────────────

export function buildStreakReminderHtml({
  name,
  streak,
  siteUrl,
  unsubscribeUrl,
}: {
  name: string;
  streak: number;
  siteUrl: string;
  unsubscribeUrl: string;
}): string {
  const streakLabel = streak === 1 ? '1 ден' : `${streak} дни`;

  return `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Серията ти е в риск!</title>
</head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#fffbf8;border-radius:20px;overflow:hidden;border:1px solid #e8d8c8;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#ffe0cc 0%,#fff3d6 100%);padding:32px 40px 24px;text-align:center;border-bottom:1px solid #f4c8a8;">
            <div style="font-size:40px;line-height:1;margin-bottom:12px;">🔥</div>
            <h1 style="margin:0;font-size:22px;font-weight:800;color:#1c1c1e;letter-spacing:-0.5px;">
              Серията ти е в риск!
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 16px;font-size:16px;color:#3c3c3e;line-height:1.6;">
              Здравей, <strong>${escapeHtml(name)}</strong>!
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#6b6b6b;line-height:1.6;">
              Поддържаш серия от <strong style="color:#e8633a;">${streakLabel}</strong> поред — но
              все още не си учил днес. Влез и реши поне едно упражнение, за да не загубиш прогреса си.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
              <tr>
                <td style="background:#e8633a;border-radius:12px;">
                  <a href="${siteUrl}/rechnik"
                     style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#fff;text-decoration:none;letter-spacing:-0.2px;">
                    Продължи да учиш →
                  </a>
                </td>
              </tr>
            </table>

            <!-- Streak badge -->
            <div style="background:#fff3e8;border:1px solid #f4c8a8;border-radius:12px;padding:16px 20px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#9a6040;font-weight:600;text-transform:uppercase;letter-spacing:.1em;">
                Текуща серия
              </p>
              <p style="margin:6px 0 0;font-size:28px;font-weight:800;color:#e8633a;">
                ${streakLabel}
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px 28px;border-top:1px solid #f0e8e0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#a0a0a0;line-height:1.6;">
              Получаваш това писмо, защото си включил напомняния за серия.<br/>
              <a href="${unsubscribeUrl}" style="color:#c87040;text-decoration:underline;">
                Изключи напомнянията
              </a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Send via Resend REST API ───────────────────────────────────────────────────

export async function sendStreakReminder({
  to,
  name,
  streak,
  userId,
}: {
  to: string;
  name: string;
  streak: number;
  userId: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey  = process.env.RESEND_API_KEY;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');
  const from    = process.env.RESEND_FROM_EMAIL ?? 'Учи Английски <noreply@uchangliiski.bg>';

  if (!apiKey)  return { ok: false, error: 'Missing RESEND_API_KEY' };
  if (!siteUrl) return { ok: false, error: 'Missing NEXT_PUBLIC_SITE_URL' };

  const token         = generateUnsubscribeToken(userId);
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?uid=${encodeURIComponent(userId)}&token=${token}`;

  const html = buildStreakReminderHtml({ name, streak, siteUrl, unsubscribeUrl });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `🔥 Серията ти (${streak} ${streak === 1 ? 'ден' : 'дни'}) е в риск — учи днес!`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, error: `Resend ${res.status}: ${body}` };
  }
  return { ok: true };
}
