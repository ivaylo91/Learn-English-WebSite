'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { VocabularyWord, WordStatus } from '@/lib/types/database';
import Badge from '@/components/ui/Badge';
import { addWordToStudyList, removeWordFromStudyList } from '@/lib/db/vocabulary';
import { Plus, Check, X } from 'lucide-react';

const STATUS_LABEL: Record<WordStatus, string> = {
  new:      'Нова',
  learning: 'Учим',
  known:    'Позната',
};
const STATUS_STYLE: Record<WordStatus, React.CSSProperties> = {
  new:      { background: 'var(--coral-soft)', color: 'var(--coral-ink)', border: '1px solid #f4c8a8' },
  learning: { background: 'var(--butter)',     color: 'var(--butter-ink)', border: '1px solid #e8d8a8' },
  known:    { background: 'var(--sage)',        color: 'var(--sage-ink)',   border: '1px solid #b5d8be' },
};

interface WordCardProps {
  word:         VocabularyWord;
  userId?:      string;
  alreadyAdded?: boolean;
  studyStatus?: WordStatus;
}

const levelColor: Record<string, 'sage' | 'sky' | 'lavender' | 'gray'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

export default function WordCard({ word, userId, alreadyAdded = false, studyStatus }: WordCardProps) {
  const [added,   setAdded]   = useState(alreadyAdded);
  const [loading, setLoading] = useState(false);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId || loading) return;
    setLoading(true);
    if (added) {
      await removeWordFromStudyList(userId, word.id);
      setAdded(false);
    } else {
      await addWordToStudyList(userId, word.id);
      setAdded(true);
    }
    setLoading(false);
  };

  return (
    <div
      className="group/card rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge color={levelColor[word.level] ?? 'gray'}>{word.level}</Badge>
          <span className="text-xs uppercase tracking-wide" style={{ color: "var(--muted)" }}>
            {word.category}
          </span>
          {studyStatus && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={STATUS_STYLE[studyStatus]}>
              {STATUS_LABEL[studyStatus]}
            </span>
          )}
        </div>

        {userId && (
          <button
            onClick={toggle}
            disabled={loading}
            title={added ? 'Премахни от флаш карти' : 'Добави към флаш карти'}
            className="group/btn shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-70"
            style={
              added
                ? { background: "var(--sage)", color: "var(--sage-ink)" }
                : { background: "var(--coral-soft)", color: "var(--coral-ink)" }
            }
          >
            {loading ? (
              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : added ? (
              <>
                <Check className="w-3.5 h-3.5 group-hover/btn:hidden" />
                <X    className="w-3.5 h-3.5 hidden group-hover/btn:block" />
              </>
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>

      <Link href={`/rechnik/${word.id}`} className="block">
        <p
          className="font-bold text-lg leading-tight transition-colors"
          style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}
        >
          {word.word_en}
        </p>
        {word.phonetic && (
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}>
            {word.phonetic}
          </p>
        )}
        <p className="text-sm italic mt-2" style={{ color: "var(--ink-2)" }}>{word.word_bg}</p>
        {word.example_en && (
          <p
            className="mt-3 text-xs leading-relaxed line-clamp-2 pt-2.5"
            style={{ color: "var(--muted)", borderTop: "1px solid var(--line)" }}
          >
            {word.example_en}
          </p>
        )}
      </Link>
    </div>
  );
}
