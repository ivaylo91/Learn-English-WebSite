'use client';

import { useState } from 'react';
import { Plus, Check, X, BookMarked } from 'lucide-react';
import { addWordToStudyList, removeWordFromStudyList } from '@/lib/db/vocabulary';
import Link from 'next/link';

interface Props {
  wordId:       string;
  userId?:      string;
  initialAdded: boolean;
}

export default function WordActions({ wordId, userId, initialAdded }: Props) {
  const [added,   setAdded]   = useState(initialAdded);
  const [loading, setLoading] = useState(false);

  if (!userId) {
    return (
      <Link
        href="/login?next=/rechnik"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 text-sm font-semibold hover:bg-indigo-100 transition-colors"
      >
        <BookMarked className="w-4 h-4" />
        Влез за да добавиш
      </Link>
    );
  }

  const toggle = async () => {
    if (loading) return;
    setLoading(true);
    if (added) {
      await removeWordFromStudyList(userId, wordId);
      setAdded(false);
    } else {
      await addWordToStudyList(userId, wordId);
      setAdded(true);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[.97] disabled:opacity-60 ${
        added
          ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200'
      }`}
      title={added ? 'Премахни от учебния списък' : 'Добави към учебния списък'}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : added ? (
        <>
          <Check className="w-4 h-4 group-hover:hidden" />
          <X     className="w-4 h-4 hidden group-hover:block" />
        </>
      ) : (
        <Plus className="w-4 h-4" />
      )}
      {added ? (
        <>
          <span className="group-hover:hidden">Добавено</span>
          <span className="hidden group-hover:block">Премахни</span>
        </>
      ) : (
        'Добави за учене'
      )}
    </button>
  );
}
