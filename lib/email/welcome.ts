import { generateUnsubscribeToken } from './streak-reminder';

// ── Email HTML ────────────────────────────────────────────────────────────────

export function buildWelcomeHtml({
  name,
  siteUrl,
  unsubscribeUrl,
}: {
  name:           string;
  siteUrl:        string;
  unsubscribeUrl: string;
}): string {
  const step = (num: string, emoji: string, title: string, desc: string, href: string, btnLabel: string) => `
    <tr>
      <td style="padding:0 0 20px 0;">
        <table width="100%" cellpadding="0" cellspacing="0"
          style="background:#fffbf8;border:1px solid #e8d8c8;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="padding:18px 20px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:top;padding-right:14px;">
                    <div style="width:36px;height:36px;background:#e8633a;border-radius:10px;
                      display:flex;align-items:center;justify-content:center;
                      font-size:18px;line-height:36px;text-align:center;">
                      ${emoji}
                    </div>
                  </td>
                  <td style="vertical-align:top;">
                    <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#1c1c1e;">
                      Стъпка ${num} — ${title}
                    </p>
                    <p style="margin:0 0 10px;font-size:13px;color:#6b6b6b;line-height:1.5;">
                      ${desc}
                    </p>
                    <a href="${href}"
                      style="display:inline-block;background:#e8633a;color:#fff;font-size:12px;
                        font-weight:700;text-decoration:none;border-radius:8px;
                        padding:7px 16px;">
                      ${btnLabel} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Добре дошъл в Учи Английски!</title>
</head>
<body style="margin:0;padding:0;background:#f5f0eb;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0"
    style="background:#f5f0eb;padding:40px 16px;">
    <tr><td align="center">
    <table width="100%" style="max-width:520px;">

      <!-- Logo bar -->
      <tr>
        <td style="padding:0 0 24px 0;" align="center">
          <div style="display:inline-flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;background:#e8633a;border-radius:10px;
              font-size:18px;font-weight:800;color:#fff;line-height:36px;text-align:center;">
              У
            </div>
            <span style="font-size:16px;font-weight:700;color:#1c1c1e;">Учи Английски</span>
          </div>
        </td>
      </tr>

      <!-- Hero card -->
      <tr>
        <td style="background:linear-gradient(135deg,#ffe0cc 0%,#fff3d6 100%);
          border:1px solid #f4c8a8;border-radius:20px;padding:32px 36px 28px;
          text-align:center;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:28px;">🎉</p>
          <h1 style="margin:0 0 10px;font-size:22px;font-weight:800;
            color:#1c1c1e;letter-spacing:-0.4px;">
            Добре дошъл, ${escapeHtml(name)}!
          </h1>
          <p style="margin:0;font-size:15px;color:#4a3a2e;line-height:1.6;max-width:360px;margin:0 auto;">
            Профилът ти е готов. Ето 3 стъпки, с които да започнеш да учиш ефективно.
          </p>
        </td>
      </tr>

      <tr><td style="height:24px;"></td></tr>

      <!-- Steps -->
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${step('1','🎯','Тест за ниво',
              'Реши 20 въпроса и системата ще определи нивото ти автоматично — от A1 до C2.',
              `${siteUrl}/test-za-nivo`, 'Вземи теста')}
            ${step('2','📖','Добави думи',
              'Разгледай речника и добави думи, които искаш да научиш. Системата ще ти ги показва с умно повторение.',
              `${siteUrl}/rechnik`, 'Отвори речника')}
            ${step('3','✏️','Започни урок',
              'Разгледай граматичните уроци с обяснения на български и интерактивни упражнения.',
              `${siteUrl}/gramatika`, 'Към граматиката')}
          </table>
        </td>
      </tr>

      <!-- Tip banner -->
      <tr>
        <td>
          <div style="background:#fffbf8;border:1px solid #e8d8c8;border-radius:14px;
            padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#e8633a;
              text-transform:uppercase;letter-spacing:.1em;">
              Съвет
            </p>
            <p style="margin:0;font-size:13px;color:#4a3a2e;line-height:1.6;">
              Задай си <strong>дневна цел</strong> от профила си — дори 5 думи и 1 урок
              на ден за 6 месеца правят голяма разлика!
            </p>
          </div>
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td align="center" style="padding-bottom:32px;">
          <a href="${siteUrl}/napredak"
            style="display:inline-block;background:#e8633a;color:#fff;font-size:15px;
              font-weight:700;text-decoration:none;border-radius:12px;
              padding:14px 32px;
              box-shadow:0 8px 16px -8px rgba(232,99,58,.5);">
            Виж напредъка ми
          </a>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="border-top:1px solid #e8d8c8;padding-top:20px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#a0a0a0;line-height:1.6;">
            Получаваш това писмо, защото се регистрира в Учи Английски.<br/>
            <a href="${unsubscribeUrl}" style="color:#c87040;text-decoration:underline;">
              Отпиши се от имейли
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

// ── Send via Resend ───────────────────────────────────────────────────────────

export async function sendWelcomeEmail({
  to,
  name,
  userId,
}: {
  to:     string;
  name:   string;
  userId: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey  = process.env.RESEND_API_KEY;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');
  const from    = process.env.RESEND_FROM_EMAIL ?? 'Учи Английски <noreply@uchangliiski.bg>';

  if (!apiKey)  return { ok: false, error: 'Missing RESEND_API_KEY' };
  if (!siteUrl) return { ok: false, error: 'Missing NEXT_PUBLIC_SITE_URL' };

  const token          = generateUnsubscribeToken(userId);
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?uid=${encodeURIComponent(userId)}&token=${token}`;
  const html           = buildWelcomeHtml({ name, siteUrl, unsubscribeUrl });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to:      [to],
      subject: `Добре дошъл в Учи Английски, ${name}! 🎉`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, error: `Resend ${res.status}: ${body}` };
  }
  return { ok: true };
}
