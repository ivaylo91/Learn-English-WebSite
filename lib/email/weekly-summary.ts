import { generateUnsubscribeToken } from './streak-reminder';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WeeklyStats {
  weekXp:        number;
  streak:        number;
  level:         string;
  achievements:  string[]; // title_bg strings of achievements unlocked this week
}

// ── HTML builder ─────────────────────────────────────────────────────────────

export function buildWeeklySummaryHtml({
  name,
  stats,
  siteUrl,
  unsubscribeUrl,
}: {
  name:           string;
  stats:          WeeklyStats;
  siteUrl:        string;
  unsubscribeUrl: string;
}): string {
  const { weekXp, streak, level, achievements } = stats;

  const hasActivity    = weekXp > 0;
  const streakLabel    = streak === 1 ? '1 ден' : `${streak} дни`;
  const xpLabel        = weekXp.toLocaleString('bg-BG');

  const statCards = [
    { value: `+${xpLabel}`,  label: 'XP тази седмица', color: '#e8633a' },
    { value: streakLabel,     label: 'Текуща серия',    color: '#e8633a' },
    { value: level,           label: 'Ниво',            color: '#4a3a80' },
  ];

  const achievementsHtml = achievements.length > 0
    ? `
      <tr><td style="height:20px"></td></tr>
      <tr>
        <td style="background:#fffbf8;border:1px solid #e8d8c8;border-radius:14px;padding:18px 20px;">
          <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#e8633a;
            text-transform:uppercase;letter-spacing:.1em;">
            🏆 Постижения тази седмица
          </p>
          ${achievements.map(a => `
            <p style="margin:0 0 6px;font-size:14px;color:#1c1c1e;">
              ✓&nbsp; ${escapeHtml(a)}
            </p>
          `).join('')}
        </td>
      </tr>`
    : '';

  const bodyText = hasActivity
    ? `Учи ${name}! Тази седмица спечели <strong style="color:#e8633a;">+${xpLabel} XP</strong>.
       Продължавай така — всеки ден те приближава към следващото ниво.`
    : `Здравей, ${escapeHtml(name)}! Тази седмица не видяхме активност от теб.
       Дори 5 минути учене на ден правят голяма разлика — хайде да продължим!`;

  return `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Седмичен отчет | Учи Английски</title>
</head>
<body style="margin:0;padding:0;background:#f5f0eb;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0"
    style="background:#f5f0eb;padding:40px 16px;">
    <tr><td align="center">
    <table width="100%" style="max-width:520px;">

      <!-- Logo -->
      <tr>
        <td style="padding:0 0 24px;" align="center">
          <div style="display:inline-flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;background:#e8633a;border-radius:10px;
              font-size:18px;font-weight:800;color:#fff;line-height:36px;text-align:center;">
              У
            </div>
            <span style="font-size:16px;font-weight:700;color:#1c1c1e;">Учи Английски</span>
          </div>
        </td>
      </tr>

      <!-- Hero -->
      <tr>
        <td style="background:linear-gradient(135deg,#ffe0cc 0%,#fff3d6 100%);
          border:1px solid #f4c8a8;border-radius:20px;padding:28px 32px;
          text-align:center;margin-bottom:20px;">
          <p style="margin:0 0 6px;font-size:13px;font-weight:700;
            color:#e8633a;text-transform:uppercase;letter-spacing:.1em;">
            Седмичен отчет
          </p>
          <h1 style="margin:0;font-size:22px;font-weight:800;color:#1c1c1e;
            letter-spacing:-0.4px;">
            ${hasActivity ? '📈' : '👋'}&nbsp; Здравей, ${escapeHtml(name)}!
          </h1>
        </td>
      </tr>

      <tr><td style="height:20px"></td></tr>

      <!-- Stats row -->
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              ${statCards.map(s => `
                <td width="33%" style="padding:0 4px 0 0;text-align:center;">
                  <div style="background:#fffbf8;border:1px solid #e8d8c8;
                    border-radius:14px;padding:14px 8px;">
                    <p style="margin:0 0 4px;font-size:22px;font-weight:800;
                      color:${s.color};font-family:-apple-system,sans-serif;">
                      ${s.value}
                    </p>
                    <p style="margin:0;font-size:11px;color:#6b6b6b;">${s.label}</p>
                  </div>
                </td>
              `).join('')}
            </tr>
          </table>
        </td>
      </tr>

      ${achievementsHtml}

      <tr><td style="height:20px"></td></tr>

      <!-- Body text -->
      <tr>
        <td style="background:#fffbf8;border:1px solid #e8d8c8;border-radius:14px;
          padding:18px 20px;font-size:14px;color:#3c3c3e;line-height:1.6;">
          ${bodyText}
        </td>
      </tr>

      <tr><td style="height:24px"></td></tr>

      <!-- CTA -->
      <tr>
        <td align="center">
          <a href="${siteUrl}/napredak"
            style="display:inline-block;background:#e8633a;color:#fff;font-size:15px;
              font-weight:700;text-decoration:none;border-radius:12px;
              padding:14px 32px;box-shadow:0 8px 16px -8px rgba(232,99,58,.5);">
            Продължи да учиш →
          </a>
        </td>
      </tr>

      <tr><td style="height:32px"></td></tr>

      <!-- Footer -->
      <tr>
        <td style="border-top:1px solid #e8d8c8;padding-top:20px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#a0a0a0;line-height:1.6;">
            Получаваш този имейл, защото си включил напомняния в Учи Английски.<br/>
            <a href="${unsubscribeUrl}" style="color:#c87040;text-decoration:underline;">
              Отпиши се
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
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Send ──────────────────────────────────────────────────────────────────────

export async function sendWeeklySummary({
  to,
  name,
  stats,
  userId,
}: {
  to:     string;
  name:   string;
  stats:  WeeklyStats;
  userId: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey  = process.env.RESEND_API_KEY;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');
  const from    = process.env.RESEND_FROM_EMAIL ?? 'Учи Английски <noreply@uchangliiski.bg>';

  if (!apiKey)  return { ok: false, error: 'Missing RESEND_API_KEY' };
  if (!siteUrl) return { ok: false, error: 'Missing NEXT_PUBLIC_SITE_URL' };

  const token          = generateUnsubscribeToken(userId);
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?uid=${encodeURIComponent(userId)}&token=${token}`;
  const html           = buildWeeklySummaryHtml({ name, stats, siteUrl, unsubscribeUrl });

  const subjectXp = stats.weekXp > 0
    ? `+${stats.weekXp.toLocaleString('bg-BG')} XP тази седмица — продължавай!`
    : 'Твоят седмичен отчет от Учи Английски';

  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject: subjectXp, html }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, error: `Resend ${res.status}: ${body}` };
  }
  return { ok: true };
}
