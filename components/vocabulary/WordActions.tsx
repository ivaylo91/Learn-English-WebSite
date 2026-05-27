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
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        style={{
          border: "1px solid var(--line)",
          background: "var(--coral-soft)",
          color: "var(--coral-ink)",
        }}
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
      className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[.97] disabled:opacity-60"
      style={
        added
          ? { background: "var(--sage)", color: "var(--sage-ink)" }
          : { background: "var(--coral)", color: "#fff", boxShadow: "0 8px 16px -8px rgba(232,99,58,.6)" }
      }
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
