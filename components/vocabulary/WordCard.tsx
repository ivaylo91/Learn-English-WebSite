'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { VocabularyWord } from '@/lib/types/database';
import Badge from '@/components/ui/Badge';
import { addWordToStudyList, removeWordFromStudyList } from '@/lib/db/vocabulary';
import { Plus, Check, X } from 'lucide-react';

interface WordCardProps {
  word: VocabularyWord;
  userId?: string;
  alreadyAdded?: boolean;
}

const levelColor: Record<string, 'green' | 'amber' | 'purple' | 'gray'> = {
  A1: 'green', A2: 'green',
  B1: 'amber', B2: 'amber',
  C1: 'purple', C2: 'purple',
};

export default function WordCard({ word, userId, alreadyAdded = false }: WordCardProps) {
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
    <div className="group/card bg-white rounded-2xl p-5 border border-gray-100 hover:border-indigo-200 hover:shadow-[0_4px_20px_-4px_rgba(79,70,229,0.12)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge color={levelColor[word.level] ?? 'gray'}>{word.level}</Badge>
          <span className="text-xs text-gray-400 uppercase tracking-wide">{word.category}</span>
        </div>

        {userId && (
          <button
            onClick={toggle}
            disabled={loading}
            title={added ? 'Премахни от флаш карти' : 'Добави към флаш карти'}
            className={`group/btn shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-70 ${
              added
                ? 'bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600'
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
            }`}
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
        <p className="font-bold text-gray-900 text-lg leading-tight hover:text-indigo-700 transition-colors">
          {word.word_en}
        </p>
        {word.phonetic && (
          <p className="text-xs text-gray-400 font-mono mt-0.5">{word.phonetic}</p>
        )}
        <p className="text-sm text-gray-500 italic mt-2">{word.word_bg}</p>
        {word.example_en && (
          <p className="mt-3 text-xs text-gray-400 leading-relaxed line-clamp-2 border-t border-gray-50 pt-2.5">
            {word.example_en}
          </p>
        )}
      </Link>
    </div>
  );
}
