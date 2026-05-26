'use client';

import { useState } from 'react';
import type { VocabularyWord } from '@/lib/types/database';
import Badge from '@/components/ui/Badge';
import { addWordToStudyList } from '@/lib/db/vocabulary';
import { Plus, Check } from 'lucide-react';

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
  const [added, setAdded] = useState(alreadyAdded);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId || added || loading) return;
    setLoading(true);
    await addWordToStudyList(userId, word.id);
    setAdded(true);
    setLoading(false);
  };

  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-indigo-200 hover:shadow-[0_4px_20px_-4px_rgba(79,70,229,0.12)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge color={levelColor[word.level] ?? 'gray'}>{word.level}</Badge>
          <span className="text-xs text-gray-400 uppercase tracking-wide">{word.category}</span>
        </div>
        {userId && (
          <button
            onClick={handleAdd}
            disabled={added || loading}
            className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 ${
              added
                ? 'bg-green-100 text-green-600 cursor-default'
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 cursor-pointer active:scale-90'
            } disabled:opacity-70`}
            title={added ? 'Вече добавена' : 'Добави към флаш карти'}
          >
            {loading ? (
              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : added ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>

      <p className="font-bold text-gray-900 text-lg leading-tight">{word.word_en}</p>
      {word.phonetic && (
        <p className="text-xs text-gray-400 font-mono mt-0.5">{word.phonetic}</p>
      )}
      <p className="text-sm text-gray-500 italic mt-2">{word.word_bg}</p>

      {word.example_en && (
        <p className="mt-3 text-xs text-gray-400 leading-relaxed line-clamp-2 border-t border-gray-50 pt-2.5">
          {word.example_en}
        </p>
      )}
    </div>
  );
}
