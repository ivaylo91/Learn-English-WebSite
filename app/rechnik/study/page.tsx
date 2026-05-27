'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/authStore';
import { getDueWords } from '@/lib/db/vocabulary';
import type { UserWordProgress } from '@/lib/types/database';
import StudySession from '@/components/vocabulary/StudySession';
import { BookMarked, ChevronLeft } from 'lucide-react';

function LoadingState() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 animate-pulse">
      <div className="h-2 rounded-full mb-8" style={{ background: 'var(--bg-2)' }} />
      <div className="h-80 rounded-3xl mb-8" style={{ background: 'var(--bg-2)' }} />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-16 rounded-2xl" style={{ background: 'var(--bg-2)' }} />
        <div className="h-16 rounded-2xl" style={{ background: 'var(--bg-2)' }} />
        <div className="h-16 rounded-2xl" style={{ background: 'var(--bg-2)' }} />
      </div>
    </div>
  );
}

export default function StudyPage() {
  const { user, authLoading } = useAuthStore();
  const [dueWords, setDueWords] = useState<UserWordProgress[]>([]);
  const [wordsLoading, setWordsLoading] = useState(false);

  useEffect(() => {
    if (authLoading || !user) return;
    setWordsLoading(true);
    getDueWords(user.id).then(words => {
      setDueWords(words);
      setWordsLoading(false);
    });
  }, [user, authLoading]);

  if (authLoading || wordsLoading) return <LoadingState />;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'var(--coral-soft)' }}
        >
          <BookMarked className="w-8 h-8" style={{ color: 'var(--coral)' }} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Влез в профила си</h2>
        <p className="mb-6 text-sm" style={{ color: 'var(--muted)' }}>
          Трябва да си влязъл за да учиш с флаш карти.
        </p>
        <Link
          href="/login?next=/rechnik/study"
          className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white active:scale-[.98] transition-all"
          style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
        >
          Вход
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link
          href="/rechnik"
          className="inline-flex items-center gap-1 text-sm hover:underline transition-colors mb-3"
          style={{ color: 'var(--coral)' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Обратно към речника
        </Link>
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
        >
          Сесия за учене
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          SM-2 умно повторение — системата знае кое трябва да повториш.
        </p>
      </div>

      <StudySession userId={user.id} dueWords={dueWords} />
    </div>
  );
}
