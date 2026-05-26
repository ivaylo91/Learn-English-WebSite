'use client';

import { useState } from 'react';
import type { UserWordProgress } from '@/lib/types/database';
import { reviewWord } from '@/lib/db/vocabulary';
import { recordActivity } from '@/lib/db/activity';
import FlashCard from './FlashCard';
import { Trophy, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface StudySessionProps {
  userId: string;
  dueWords: UserWordProgress[];
}

export default function StudySession({ userId, dueWords }: StudySessionProps) {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<{ quality: number }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = dueWords[index];

  const handleRate = async (quality: 0 | 3 | 5) => {
    if (!current || submitting) return;
    setSubmitting(true);

    await reviewWord(userId, current.word_id, quality);
    const newResults = [...results, { quality }];
    setResults(newResults);

    if (index + 1 >= dueWords.length) {
      const xp = newResults.filter(r => r.quality >= 3).length * 5;
      await recordActivity(userId, 'vocabulary', 'study_session', xp, {
        words_reviewed: dueWords.length,
        passed: newResults.filter(r => r.quality >= 3).length,
      });
      setFinished(true);
    } else {
      setIndex(i => i + 1);
    }

    setSubmitting(false);
  };

  if (dueWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Всичко прегледано!</h2>
        <p className="text-gray-500 max-w-sm mb-8 text-sm leading-relaxed">
          Няма думи за повторение днес. Добави нови думи от речника или се върни утре.
        </p>
        <Link
          href="/rechnik"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-[.98] transition-all"
        >
          <BookOpen className="w-4 h-4" />
          Разгледай речника
        </Link>
      </div>
    );
  }

  if (finished) {
    const passed = results.filter(r => r.quality >= 3).length;
    const xp = passed * 5;
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center max-w-sm mx-auto">
        <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mb-6 shadow-[0_8px_30px_-8px_rgba(79,70,229,0.25)]">
          <Trophy className="w-10 h-10 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Сесията завършена!</h2>
        <p className="text-gray-500 mb-8 text-sm">Отлична работа — продължавай така.</p>

        <div className="w-full grid grid-cols-3 gap-3 mb-8">
          {[
            { value: dueWords.length, label: 'Прегледани', color: 'text-indigo-600' },
            { value: passed,          label: 'Правилно',   color: 'text-green-600'  },
            { value: `+${xp}`,        label: 'XP',         color: 'text-amber-600'  },
          ].map(({ value, label, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
              <p className={`text-3xl font-bold ${color} tabular-nums`}>{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/rechnik"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-[.98] transition-all w-full"
        >
          Обратно към речника
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (!current?.vocabulary_words) return null;

  return (
    <FlashCard
      word={current.vocabulary_words}
      cardNumber={index + 1}
      total={dueWords.length}
      loading={submitting}
      onRate={handleRate}
    />
  );
}
