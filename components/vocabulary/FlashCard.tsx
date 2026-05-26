'use client';

import { useState, useEffect } from 'react';
import type { VocabularyWord } from '@/lib/types/database';
import Badge from '@/components/ui/Badge';
import { ChevronRight } from 'lucide-react';

interface FlashCardProps {
  word: VocabularyWord;
  cardNumber: number;
  total: number;
  loading?: boolean;
  onRate: (quality: 0 | 3 | 5) => void;
}

const levelColor: Record<string, 'green' | 'amber' | 'purple' | 'gray'> = {
  A1: 'green', A2: 'green',
  B1: 'amber', B2: 'amber',
  C1: 'purple', C2: 'purple',
};

export default function FlashCard({ word, cardNumber, total, loading, onRate }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [word.id]);

  const progress = ((cardNumber - 1) / total) * 100;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500 tabular-nums">{cardNumber} / {total}</span>
        <span className="text-sm font-semibold text-indigo-600 tabular-nums">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Flip card wrapper */}
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
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
            className="bg-white rounded-3xl border border-indigo-100 shadow-[0_8px_40px_-12px_rgba(79,70,229,0.18)] p-8 flex flex-col items-center justify-center select-none"
          >
            <div className="flex items-center gap-2 mb-5">
              <Badge color={levelColor[word.level] ?? 'gray'}>{word.level}</Badge>
              <span className="text-xs text-gray-400 uppercase tracking-wider">{word.category}</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-3 text-center tracking-tight">
              {word.word_en}
            </h2>
            {word.phonetic && (
              <p className="text-gray-400 font-mono text-base">{word.phonetic}</p>
            )}
            <div className="mt-8 flex items-center gap-1 text-indigo-400 text-sm">
              <ChevronRight className="w-4 h-4" />
              Натисни за превод
            </div>
          </div>

          {/* Back */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              position: 'absolute',
              inset: 0,
              transform: 'rotateY(180deg)',
            }}
            className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl shadow-[0_8px_40px_-12px_rgba(79,70,229,0.35)] p-8 flex flex-col items-center justify-center select-none"
          >
            <p className="text-indigo-200 text-xs uppercase tracking-widest mb-3">{word.word_en}</p>
            <h2 className="text-4xl font-bold text-white mb-6 text-center">{word.word_bg}</h2>
            {word.example_en && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] w-full">
                <p className="text-white/90 italic text-sm leading-relaxed">
                  &ldquo;{word.example_en}&rdquo;
                </p>
                {word.example_bg && (
                  <p className="text-white/60 text-xs mt-2 leading-relaxed">{word.example_bg}</p>
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
        <button
          disabled={loading}
          onClick={() => onRate(0)}
          className="flex flex-col items-center gap-1 py-3 px-4 rounded-2xl bg-red-50 border-2 border-red-100 hover:border-red-300 active:scale-[.98] transition-all duration-150 cursor-pointer disabled:opacity-50"
        >
          <span className="text-sm font-bold text-red-600">Трудно</span>
          <span className="text-xs text-red-400">повтори утре</span>
        </button>
        <button
          disabled={loading}
          onClick={() => onRate(3)}
          className="flex flex-col items-center gap-1 py-3 px-4 rounded-2xl bg-amber-50 border-2 border-amber-100 hover:border-amber-300 active:scale-[.98] transition-all duration-150 cursor-pointer disabled:opacity-50"
        >
          <span className="text-sm font-bold text-amber-600">Добре</span>
          <span className="text-xs text-amber-400">след 6 дни</span>
        </button>
        <button
          disabled={loading}
          onClick={() => onRate(5)}
          className="flex flex-col items-center gap-1 py-3 px-4 rounded-2xl bg-green-50 border-2 border-green-100 hover:border-green-300 active:scale-[.98] transition-all duration-150 cursor-pointer disabled:opacity-50"
        >
          <span className="text-sm font-bold text-green-600">Лесно</span>
          <span className="text-xs text-green-400">след 12 дни</span>
        </button>
      </div>
    </div>
  );
}
