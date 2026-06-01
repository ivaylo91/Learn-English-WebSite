import Link from 'next/link';
import { WifiOff, RefreshCw } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Без интернет | Учи Английски',
};

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70dvh] px-4 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
        style={{ background: 'var(--bg-2)' }}
      >
        <WifiOff className="w-9 h-9" style={{ color: 'var(--muted)' }} />
      </div>

      <h1
        className="text-3xl font-extrabold mb-3 tracking-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
      >
        Без интернет
      </h1>
      <p className="text-sm leading-relaxed mb-10 max-w-xs" style={{ color: 'var(--muted)' }}>
        Не можем да се свържем с мрежата. Провери интернет връзката си и опитай отново.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Reload — JS needed, so use a plain button that refreshes */}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white cursor-pointer active:scale-[.98] transition-all"
          style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
        >
          <RefreshCw className="w-4 h-4" />
          Опитай отново
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all active:scale-[.98]"
          style={{ color: 'var(--ink-2)', background: 'var(--surface)', border: '1px solid var(--line)' }}
        >
          Начало
        </Link>
      </div>
    </div>
  );
}
