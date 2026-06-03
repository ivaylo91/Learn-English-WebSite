'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookMarked, PenLine, Headphones, Target, X, ArrowRight } from 'lucide-react';

const DISMISS_KEY = 'onboarding_dismissed_v1';

const STEPS = [
  {
    href: '/test-za-nivo',
    icon: Target,
    label: 'Тест за ниво',
    sub: 'Открий своето ниво',
    bg: 'var(--peach)',
    color: 'var(--coral-ink)',
    primary: true,
  },
  {
    href: '/rechnik',
    icon: BookMarked,
    label: 'Речник',
    sub: 'Научи първите думи',
    bg: 'var(--coral-soft)',
    color: 'var(--coral-ink)',
    primary: false,
  },
  {
    href: '/gramatika',
    icon: PenLine,
    label: 'Граматика',
    sub: 'Прочети първия урок',
    bg: 'var(--lavender)',
    color: 'var(--lav-ink)',
    primary: false,
  },
  {
    href: '/slusham',
    icon: Headphones,
    label: 'Слушане',
    sub: 'Чуй A1 клип',
    bg: 'var(--sky)',
    color: 'var(--sky-ink)',
    primary: false,
  },
] as const;

export default function OnboardingBanner({ name }: { name: string }) {
  // Start hidden to prevent SSR flash — useEffect sets true visibility from localStorage
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) !== '1') {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--peach) 0%, var(--butter) 55%, #fde8d0 100%)',
        borderBottom: '1px solid #f4c8a8',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start gap-6">

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p
              className="text-[11px] font-semibold uppercase tracking-[.16em] mb-1"
              style={{ color: 'var(--coral-ink)' }}
            >
              Добре дошъл
            </p>
            <h2
              className="text-xl font-extrabold tracking-tight mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
            >
              Здравей, {name}!
            </h2>
            <p className="text-sm mb-5" style={{ color: 'var(--ink-2)' }}>
              Избери откъде да започнеш — първите минути са най-важни.
            </p>

            {/* Quick-start chips */}
            <div className="flex flex-wrap gap-3">
              {STEPS.map(({ href, icon: Icon, label, sub, bg, color, primary }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={dismiss}
                  className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
                  style={primary ? {
                    background: 'var(--coral)',
                    border: '1px solid var(--coral)',
                    boxShadow: '0 4px 12px -4px rgba(232,99,58,.5)',
                  } : {
                    background: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(255,255,255,0.9)',
                    boxShadow: '0 2px 8px -2px rgba(232,99,58,.1)',
                  }}
                >
                  <div
                    className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: primary ? 'rgba(255,255,255,0.2)' : bg, color: primary ? '#fff' : color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight" style={{ color: primary ? '#fff' : 'var(--ink)' }}>{label}</p>
                    <p className="text-[11px] leading-tight" style={{ color: primary ? 'rgba(255,255,255,0.8)' : 'var(--muted)' }}>{sub}</p>
                  </div>
                  <ArrowRight
                    className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: primary ? '#fff' : 'var(--coral)' }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Dismiss */}
          <button
            onClick={dismiss}
            className="shrink-0 p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-black/5 mt-0.5"
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
