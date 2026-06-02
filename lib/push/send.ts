import webpush from 'web-push';

// Lazily configure VAPID so the module can be imported even when env vars
// are not set (they may be missing in local dev before setup).
function configure() {
  const subject    = process.env.VAPID_SUBJECT;
  const publicKey  = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!subject || !publicKey || !privateKey) return false;
  webpush.setVapidDetails(subject, publicKey, privateKey);
  return true;
}

export interface PushPayload {
  title: string;
  body:  string;
  url?:  string;
  tag?:  string;
}

export interface PushSub {
  endpoint: string;
  auth:     string;
  p256dh:   string;
}

export interface SendResult {
  ok:       boolean;
  expired?: boolean; // 404/410 — subscription no longer valid
  error?:   string;
}

export async function sendPush(sub: PushSub, payload: PushPayload): Promise<SendResult> {
  if (!configure()) return { ok: false, error: 'VAPID keys not configured' };

  try {
    await webpush.sendNotification(
      {
        endpoint: sub.endpoint,
        keys:     { auth: sub.auth, p256dh: sub.p256dh },
      },
      JSON.stringify(payload),
      { TTL: 86400 }, // keep for up to 24 hours if device is offline
    );
    return { ok: true };
  } catch (err: unknown) {
    const status = (err as { statusCode?: number }).statusCode;
    if (status === 404 || status === 410) {
      return { ok: false, expired: true, error: `Subscription expired (${status})` };
    }
    return { ok: false, error: String(err) };
  }
}
