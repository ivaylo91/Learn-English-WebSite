'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, X, BookMarked, PenLine, Headphones } from 'lucide-react';

// Dismiss key resets daily — user sees it again tomorrow if still at risk
const getDismissKey = () => `streak_banner_${new Date().toISOString().slice(0, 10)}`;

const QUICK_LINKS = [
  { href: '/rechnik/study', icon: BookMarked, label: 'Речник' },
  { href: '/gramatika',     icon: PenLine,    label: 'Граматика' },
  { href: '/slusham',       icon: Headphones, label: 'Слушане' },
] as const;

export default function StreakProtectionBanner({ streak }: { streak: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(getDismissKey()) !== '1') {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(getDismissKey(), '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #fff3ee 0%, var(--peach) 100%)',
        borderBottom: '1px solid #f4c0a0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4 flex-wrap">

          {/* Flame + text */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--coral)', boxShadow: '0 4px 12px -4px rgba(232,99,58,.5)' }}
            >
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-tight" style={{ color: 'var(--ink)' }}>
                Серията ти от{' '}
                <span style={{ color: 'var(--coral)' }}>{streak} {streak === 1 ? 'ден' : 'дни'}</span>{' '}
                е в опасност!
              </p>
              <p className="text-xs" style={{ color: 'var(--ink-2)' }}>
                Не си учил днес — завърши поне 1 упражнение преди полунощ.
              </p>
            </div>
          </div>

          {/* Quick-action chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {QUICK_LINKS.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={dismiss}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
                style={{
                  background: 'var(--coral)',
                  color: '#fff',
                  boxShadow: '0 4px 8px -4px rgba(232,99,58,.5)',
                }}
              >
                <Icon className="w-3 h-3" />
                {label}
              </Link>
            ))}
          </div>

          {/* Dismiss */}
          <button
            onClick={dismiss}
            className="shrink-0 p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-black/5"
            style={{ color: 'var(--muted)' }}
            aria-label="Затвори"
          >
            <X className="w-4 h-4" />
          </button>

        </div>
      </div>
    </div>
  );
}
