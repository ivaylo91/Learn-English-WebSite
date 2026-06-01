'use client';

import { useEffect } from 'react';

export default function ServiceWorkerProvider() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(reg => {
        // Check for updates when the page regains focus
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') reg.update();
        }, { once: false });
      })
      .catch(() => {
        // SW is a progressive enhancement — fail silently
      });
  }, []);

  return null;
}
