'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, BellRing } from 'lucide-react';

// Convert base64url VAPID key to Uint8Array for pushManager.subscribe
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64  = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw     = atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

type PermState = 'unsupported' | 'loading' | 'denied' | 'subscribed' | 'unsubscribed';

export default function PushToggle() {
  const [state,   setState]   = useState<PermState>('loading');
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      setState('unsupported');
      return;
    }
    if (Notification.permission === 'denied') { setState('denied'); return; }

    // Check if already subscribed
    navigator.serviceWorker.ready.then(reg =>
      reg.pushManager.getSubscription()
    ).then(sub => {
      setState(sub ? 'subscribed' : 'unsubscribed');
    }).catch(() => setState('unsubscribed'));
  }, []);

  async function enable() {
    setWorking(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') { setState('denied'); return; }

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) { console.error('NEXT_PUBLIC_VAPID_PUBLIC_KEY not set'); return; }

      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly:      true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const json     = sub.toJSON();
      const endpoint = json.endpoint ?? '';
      const auth     = json.keys?.auth    ?? '';
      const p256dh   = json.keys?.p256dh  ?? '';

      if (!endpoint || !auth || !p256dh) {
        console.error('Push subscription missing required keys');
        return;
      }

      await fetch('/api/push/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ endpoint, auth, p256dh }),
      });

      setState('subscribed');
    } catch (err) {
      console.error('Push subscribe error:', err);
    } finally {
      setWorking(false);
    }
  }

  async function disable() {
    setWorking(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();

      if (sub) {
        await fetch('/api/push/unsubscribe', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }

      setState('unsubscribed');
    } catch (err) {
      console.error('Push unsubscribe error:', err);
    } finally {
      setWorking(false);
    }
  }

  // Don't render anything if push is not supported
  if (state === 'unsupported') return null;

  const subscribed = state === 'subscribed';

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
    >
      <h3 className="text-base font-bold mb-1" style={{ color: 'var(--ink)' }}>Push напомняния</h3>
      <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
        Получавай известия директно на устройството си когато серията ти е в риск.
      </p>

      {state === 'denied' ? (
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ background: 'var(--rose)', border: '1px solid #ecb9b9', color: 'var(--rose-ink)' }}
        >
          <BellOff className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Известията са блокирани от браузъра. За да ги включиш, разреши ги от настройките на браузъра
            и презареди страницата.
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: subscribed ? 'var(--peach)' : 'var(--bg-2)' }}
            >
              {subscribed
                ? <BellRing className="w-4 h-4" style={{ color: 'var(--coral-ink)' }} />
                : <Bell     className="w-4 h-4" style={{ color: 'var(--muted)' }} />
              }
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
              {state === 'loading' ? 'Зарежда…'
                : subscribed ? 'Известията са включени'
                : 'Известията са изключени'}
            </span>
          </div>

          {state !== 'loading' && (
            <button
              role="switch"
              aria-checked={subscribed}
              onClick={subscribed ? disable : enable}
              disabled={working}
              className="relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-60"
              style={{ background: subscribed ? 'var(--coral)' : 'var(--line)' }}
            >
              {working
                ? <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </span>
                : <span
                    className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200"
                    style={{ transform: subscribed ? 'translateX(20px)' : 'translateX(0)' }}
                  />
              }
            </button>
          )}
        </div>
      )}
    </div>
  );
}
