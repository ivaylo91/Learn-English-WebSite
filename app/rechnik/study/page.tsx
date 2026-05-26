'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/authStore';
import { getDueWords } from '@/lib/db/vocabulary';
import type { UserWordProgress } from '@/lib/types/database';
import StudySession from '@/components/vocabulary/StudySession';
import { BookOpen } from 'lucide-react';

function LoadingState() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 animate-pulse">
      <div className="h-2 bg-gray-100 rounded-full mb-8" />
      <div className="h-80 bg-gray-100 rounded-3xl mb-8" />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-16 bg-gray-100 rounded-2xl" />
        <div className="h-16 bg-gray-100 rounded-2xl" />
        <div className="h-16 bg-gray-100 rounded-2xl" />
      </div>
    </div>
  );
}

export default function StudyPage() {
  const { user, authLoading } = useAuthStore();
  const [dueWords, setDueWords] = useState<UserWordProgress[]>([]);
  const [wordsLoading, setWordsLoading] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;
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
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Влез в профила си</h2>
        <p className="text-gray-500 mb-6 text-sm">Трябва да си влязъл за да учиш с флаш карти.</p>
        <Link
          href="/login?next=/rechnik/study"
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-[.98] transition-all"
        >
          Вход
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/rechnik" className="text-sm text-indigo-600 hover:underline">
          ← Обратно към речника
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-3 tracking-tight">Сесия за учене</h1>
        <p className="text-gray-500 text-sm mt-1">
          SM-2 умно повторение — системата знае кое трябва да повториш.
        </p>
      </div>

      <StudySession userId={user.id} dueWords={dueWords} />
    </div>
  );
}
