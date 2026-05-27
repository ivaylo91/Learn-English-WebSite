'use client';

import { useState, useEffect, useCallback } from 'react';
import type { VocabularyWord } from '@/lib/types/database';
import Badge from '@/components/ui/Badge';
import { RotateCcw } from 'lucide-react';

interface FlashCardProps {
  word: VocabularyWord;
  cardNumber: number;
  total: number;
  loading?: boolean;
  onRate: (quality: 0 | 3 | 5) => void;
}

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

const RATINGS = [
  { quality: 0 as const, label: 'Трудно', sub: 'повтори утре',  key: '1', bg: 'var(--rose)',   color: 'var(--rose-ink)',   border: '#e8c4c4' },
  { quality: 3 as const, label: 'Добре',  sub: 'след 6 дни',    key: '2', bg: 'var(--butter)', color: 'var(--butter-ink)', border: '#e8d8a8' },
  { quality: 5 as const, label: 'Лесно',  sub: 'след 12 дни',   key: '3', bg: 'var(--sage)',   color: 'var(--sage-ink)',   border: '#b5d8be' },
] as const;

export default function FlashCard({ word, cardNumber, total, loading, onRate }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  // Reset to front face whenever the word changes
  useEffect(() => { setFlipped(false); }, [word.id]);

  // Keyboard shortcuts:
  //   Space / Enter  → flip card (front only)
  //   1 / 2 / 3      → rate Hard / Good / Easy (back only, not while submitting)
  const handleKey = useCallback((e: KeyboardEvent) => {
    // Don't steal keys from inputs / textareas
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (!flipped) {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        setFlipped(true);
      }
    } else if (!loading) {
      if (e.key === '1') onRate(0);
      if (e.key === '2') onRate(3);
      if (e.key === '3') onRate(5);
    }
  }, [flipped, loading, onRate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const progress = ((cardNumber - 1) / total) * 100;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm tabular-nums" style={{ color: 'var(--muted)' }}>{cardNumber} / {total}</span>
        <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--coral)' }}>{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 rounded-full mb-8 overflow-hidden" style={{ background: 'var(--bg-2)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: 'var(--coral)' }}
        />
      </div>

      {/* 3D flip card */}
      <div
        style={{ perspective: '1200px' }}
        onClick={() => !flipped && setFlipped(true)}
        className="cursor-pointer"
      >
        <div
          style={{
            position: 'relative',
            height: '320px',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              position: 'absolute',
              inset: 0,
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              boxShadow: '0 8px 40px -12px rgba(232,99,58,0.15)',
            }}
            className="rounded-3xl p-8 flex flex-col items-center justify-center select-none"
          >
            <div className="flex items-center gap-2 mb-5">
              <Badge color={levelBadge[word.level] ?? 'sage'}>{word.level}</Badge>
              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                {word.category}
              </span>
            </div>
            <h2
              className="text-5xl font-bold text-center tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
            >
              {word.word_en}
            </h2>
            {word.phonetic && (
              <p className="font-mono text-base" style={{ color: 'var(--muted)' }}>{word.phonetic}</p>
            )}
            <p className="mt-8 text-sm" style={{ color: 'var(--coral)' }}>
              Натисни или <kbd
                className="px-1.5 py-0.5 rounded text-xs font-mono mx-0.5"
                style={{ background: 'var(--coral-soft)', color: 'var(--coral-ink)', border: '1px solid #f4c8a8' }}
              >Space</kbd> за превод
            </p>
          </div>

          {/* Back */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              position: 'absolute',
              inset: 0,
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, var(--coral) 0%, var(--coral-ink) 100%)',
              boxShadow: '0 8px 40px -12px rgba(232,99,58,0.35)',
            }}
            className="rounded-3xl p-8 flex flex-col items-center justify-center select-none"
          >
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {word.word_en}
            </p>
            <h2 className="text-4xl font-bold text-white mb-6 text-center">
              {word.word_bg}
            </h2>
            {word.example_en && (
              <div
                className="rounded-2xl p-4 text-center w-full"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
              >
                <p className="italic text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  &ldquo;{word.example_en}&rdquo;
                </p>
                {word.example_bg && (
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {word.example_bg}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating buttons — shown after flip */}
      <div
        className="mt-8 grid grid-cols-3 gap-3 transition-all duration-300"
        style={{ opacity: flipped ? 1 : 0, pointerEvents: flipped ? 'auto' : 'none' }}
      >
        {RATINGS.map(({ quality, label, sub, key, bg, color, border }) => (
          <button
            key={quality}
            disabled={loading}
            onClick={() => onRate(quality)}
            className="flex flex-col items-center gap-1 py-3 px-4 rounded-2xl border-2 active:scale-[.98] transition-all duration-150 cursor-pointer disabled:opacity-50 relative"
            style={{ background: bg, color, borderColor: border }}
          >
            {/* Keyboard shortcut badge */}
            <kbd
              className="absolute top-1.5 right-1.5 w-4 h-4 rounded text-[9px] font-mono flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.12)', color: 'inherit' }}
            >
              {key}
            </kbd>
            <span className="text-sm font-bold">{label}</span>
            <span className="text-xs opacity-70">{sub}</span>
          </button>
        ))}
      </div>

      {/* Bottom hint row */}
      <div className="mt-4 flex items-center justify-between">
        {flipped ? (
          <button
            onClick={() => setFlipped(false)}
            className="flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
            style={{ color: 'var(--muted)' }}
          >
            <RotateCcw className="w-3 h-3" />
            Виж отново
          </button>
        ) : (
          <span />
        )}

        {/* Keyboard shortcut legend — desktop only */}
        <p className="hidden sm:block text-xs" style={{ color: 'var(--muted)' }}>
          {flipped
            ? 'Клавиши: 1 · 2 · 3'
            : 'Клавиш: Space'}
        </p>
      </div>
    </div>
  );
}
