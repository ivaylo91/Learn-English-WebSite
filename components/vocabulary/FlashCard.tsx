'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { VocabularyWord } from '@/lib/types/database';
import Badge from '@/components/ui/Badge';
import PronounceButton from './PronounceButton';
import { RotateCcw, SkipForward } from 'lucide-react';

export interface SrsState {
  ease_factor:   number;
  interval_days: number;
  repetitions:   number;
}

interface FlashCardProps {
  word:       VocabularyWord;
  cardNumber: number;
  total:      number;
  loading?:   boolean;
  srsState?:  SrsState;
  onRate:     (quality: 0 | 3 | 5) => void;
  onSkip?:    () => void;
  skipped?:   boolean; // true when this word was previously skipped
}

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

// Mirror the SM-2 formula from lib/db/vocabulary.ts to predict next interval
function predictDays(quality: 0 | 3 | 5, s: SrsState): number {
  if (quality < 3) return 1;
  const { ease_factor: ef, interval_days: iv, repetitions: reps } = s;
  if (reps === 0) return 1;
  if (reps === 1) return 6;
  // Apply the quality-dependent ef change before computing next interval
  const newEf = Math.max(1.3, ef + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  return Math.max(1, Math.round(iv * newEf));
}

function daysLabel(days: number): string {
  if (days === 1) return 'утре';
  if (days < 7)   return `след ${days} дни`;
  if (days < 30)  return `след ${Math.round(days / 7)} сед.`;
  return `след ${Math.round(days / 30)} мес.`;
}

const RATING_BASES = [
  { quality: 0 as const, label: 'Трудно', fallback: 'повтори утре',  key: '1', bg: 'var(--rose)',   color: 'var(--rose-ink)',   border: '#e8c4c4' },
  { quality: 3 as const, label: 'Добре',  fallback: 'след 3 дни',    key: '2', bg: 'var(--butter)', color: 'var(--butter-ink)', border: '#e8d8a8' },
  { quality: 5 as const, label: 'Лесно',  fallback: 'след 7 дни',    key: '3', bg: 'var(--sage)',   color: 'var(--sage-ink)',   border: '#b5d8be' },
];

export default function FlashCard({ word, cardNumber, total, loading, srsState, onRate, onSkip, skipped }: FlashCardProps) {
  const ratings = RATING_BASES.map(r => ({
    ...r,
    sub: srsState ? daysLabel(predictDays(r.quality, srsState)) : r.fallback,
  }));
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
            <div className="flex items-center justify-center gap-3 mb-3">
              <h2
                className="text-5xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
              >
                {word.word_en}
              </h2>
              <PronounceButton word={word.word_en} size="md" />
            </div>
            {word.phonetic && (
              <p className="font-mono text-base" style={{ color: 'var(--muted)' }}>{word.phonetic}</p>
            )}
            <div className="mt-8 flex items-center justify-between w-full">
              <p className="text-sm" style={{ color: 'var(--coral)' }}>
                Натисни или <kbd
                  className="px-1.5 py-0.5 rounded text-xs font-mono mx-0.5"
                  style={{ background: 'var(--coral-soft)', color: 'var(--coral-ink)', border: '1px solid #f4c8a8' }}
                >Space</kbd> за превод
              </p>
              {onSkip && (
                <button
                  onClick={e => { e.stopPropagation(); onSkip(); }}
                  className="flex items-center gap-1 text-xs cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--muted)' }}
                  title="Пропусни — ще се върне в края"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  Пропусни
                </button>
              )}
            </div>
            {skipped && (
              <p className="mt-2 text-[11px]" style={{ color: 'var(--coral)', opacity: 0.7 }}>
                ↩ Пропусната дума
              </p>
            )}
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
            {/* Level + category on back */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
              >
                {word.level}
              </span>
              <span className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {word.category}
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
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
        {ratings.map(({ quality, label, sub, key, bg, color, border }) => (
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

        <div className="flex items-center gap-3">
          {flipped && (
            <Link
              href={`/rechnik/${word.id}`}
              onClick={e => e.stopPropagation()}
              className="text-xs hover:underline"
              style={{ color: 'var(--coral)' }}
            >
              → Виж в речника
            </Link>
          )}
          {/* Keyboard shortcut legend — desktop only */}
          <p className="hidden sm:block text-xs" style={{ color: 'var(--muted)' }}>
            {flipped ? 'Клавиши: 1 · 2 · 3' : 'Клавиш: Space'}
          </p>
        </div>
      </div>
    </div>
  );
}
