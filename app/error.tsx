'use client';

import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: 'var(--rose)' }}
      >
        <AlertCircle className="w-8 h-8" style={{ color: 'var(--rose-ink)' }} />
      </div>

      <h2
        className="text-xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
      >
        Нещо се обърка
      </h2>

      <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
        Възникна неочаквана грешка. Опитай пак или се върни към началото.
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold active:scale-[.98] transition-all cursor-pointer"
          style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
        >
          <RotateCcw className="w-4 h-4" />
          Опитай пак
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold active:scale-[.98] transition-all"
          style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
        >
          <Home className="w-4 h-4" />
          Начало
        </Link>
      </div>
    </div>
  );
}
