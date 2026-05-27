'use client';

import { useState, useEffect } from 'react';
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

export default function FlashCard({ word, cardNumber, total, loading, onRate }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => { setFlipped(false); }, [word.id]);

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
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: 'var(--muted)' }}
              >
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
              Натисни за превод →
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

      {/* Rating buttons — appear after flip */}
      <div
        className="mt-8 grid grid-cols-3 gap-3 transition-all duration-300"
        style={{ opacity: flipped ? 1 : 0, pointerEvents: flipped ? 'auto' : 'none' }}
      >
        {[
          {
            quality: 0 as const,
            label: 'Трудно',
            sub: 'повтори утре',
            bg: 'var(--rose)',
            color: 'var(--rose-ink)',
            border: '#e8c4c4',
          },
          {
            quality: 3 as const,
            label: 'Добре',
            sub: 'след 6 дни',
            bg: 'var(--butter)',
            color: 'var(--butter-ink)',
            border: '#e8d8a8',
          },
          {
            quality: 5 as const,
            label: 'Лесно',
            sub: 'след 12 дни',
            bg: 'var(--sage)',
            color: 'var(--sage-ink)',
            border: '#b5d8be',
          },
        ].map(({ quality, label, sub, bg, color, border }) => (
          <button
            key={quality}
            disabled={loading}
            onClick={() => onRate(quality)}
            className="flex flex-col items-center gap-1 py-3 px-4 rounded-2xl border-2 active:scale-[.98] transition-all duration-150 cursor-pointer disabled:opacity-50"
            style={{ background: bg, color, borderColor: border }}
          >
            <span className="text-sm font-bold">{label}</span>
            <span className="text-xs opacity-70">{sub}</span>
          </button>
        ))}
      </div>

      {/* Flip-back hint once revealed */}
      {flipped && (
        <button
          onClick={() => setFlipped(false)}
          className="mt-4 mx-auto flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
          style={{ color: 'var(--muted)', display: 'flex' }}
        >
          <RotateCcw className="w-3 h-3" />
          Виж отново
        </button>
      )}
    </div>
  );
}
