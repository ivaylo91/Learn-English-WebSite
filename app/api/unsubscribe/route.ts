import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { verifyUnsubscribeToken } from '@/lib/email/streak-reminder';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uid   = searchParams.get('uid')   ?? '';
  const token = searchParams.get('token') ?? '';

  if (!uid || !token || !verifyUnsubscribeToken(uid, token)) {
    return new NextResponse(errorPage('Невалиден или изтекъл линк.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from('profiles')
    .update({ email_reminders: false })
    .eq('id', uid);

  if (error) {
    return new NextResponse(errorPage('Грешка при обработката. Опитай отново.'), {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return new NextResponse(successPage(), {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

// ── Minimal inline pages ──────────────────────────────────────────────────────

function shell(title: string, icon: string, heading: string, body: string, extra = '') {
  return `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} | Учи Английски</title>
  <style>
    *{box-sizing:border-box}
    body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
         background:#f5f0eb;display:flex;align-items:center;justify-content:center;
         min-height:100dvh;padding:24px}
    .card{background:#fffbf8;border:1px solid #e8d8c8;border-radius:20px;
          padding:40px 36px;max-width:400px;width:100%;text-align:center}
    .icon{font-size:48px;line-height:1;margin-bottom:20px}
    h1{margin:0 0 12px;font-size:22px;font-weight:800;color:#1c1c1e;letter-spacing:-.4px}
    p{margin:0 0 24px;font-size:15px;color:#6b6b6b;line-height:1.6}
    a.btn{display:inline-block;background:#e8633a;color:#fff;font-weight:700;font-size:14px;
          text-decoration:none;border-radius:12px;padding:12px 28px}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${heading}</h1>
    <p>${body}</p>
    ${extra}
  </div>
</body>
</html>`;
}

function successPage() {
  return shell(
    'Отписан',
    '✅',
    'Отписан успешно',
    'Вече няма да получаваш напомняния за серия. Можеш да ги включиш отново от профила си.',
    '<a class="btn" href="/profil">Обратно към профила</a>',
  );
}

function errorPage(msg: string) {
  return shell(
    'Грешка',
    '❌',
    'Нещо се обърка',
    msg,
    '<a class="btn" href="/">Начало</a>',
  );
}
