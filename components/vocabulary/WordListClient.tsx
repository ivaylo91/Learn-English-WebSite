'use client';

import { useState, useMemo } from 'react';
import type { VocabularyWord, Level } from '@/lib/types/database';
import { useAuthStore } from '@/lib/stores/authStore';
import WordCard from './WordCard';
import { Search, SlidersHorizontal } from 'lucide-react';

interface WordListClientProps {
  words: VocabularyWord[];
  categories: string[];
  addedWordIds?: string[];
}

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function WordListClient({ words, categories, addedWordIds = [] }: WordListClientProps) {
  const { user } = useAuthStore();
  const addedSet = useMemo(() => new Set(addedWordIds), [addedWordIds]);
  const [query, setQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return words.filter(w => {
      if (activeLevel    && w.level    !== activeLevel)    return false;
      if (activeCategory && w.category !== activeCategory) return false;
      if (q) {
        return (
          w.word_en.toLowerCase().includes(q) ||
          w.word_bg.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [words, query, activeLevel, activeCategory]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted)" }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Търси на английски или български..."
          className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl focus:outline-none"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            boxShadow: "var(--shadow-sm)",
            color: "var(--ink)",
          }}
          onFocus={e => { e.currentTarget.style.borderColor = "var(--coral)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,99,58,.15)"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
        />
      </div>

      {/* Level filter */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <SlidersHorizontal className="w-4 h-4 shrink-0" style={{ color: "var(--muted)" }} />
        <button
          onClick={() => setActiveLevel(null)}
          className="px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          style={
            activeLevel === null
              ? { background: "var(--coral)", color: "#fff" }
              : { background: "var(--bg-2)", color: "var(--ink-2)" }
          }
        >
          Всички нива
        </button>
        {LEVELS.map(l => (
          <button
            key={l}
            onClick={() => setActiveLevel(activeLevel === l ? null : l)}
            className="px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            style={
              activeLevel === l
                ? { background: "var(--coral)", color: "#fff" }
                : { background: "var(--bg-2)", color: "var(--ink-2)" }
            }
          >
            {l}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap mb-8 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCategory(null)}
          className="shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          style={
            activeCategory === null
              ? { background: "var(--ink)", color: "var(--bg)" }
              : { background: "var(--bg-2)", color: "var(--ink-2)" }
          }
        >
          Всички теми
        </button>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(activeCategory === c ? null : c)}
            className="shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            style={
              activeCategory === c
                ? { background: "var(--ink)", color: "var(--bg)" }
                : { background: "var(--bg-2)", color: "var(--ink-2)" }
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs mb-4 tabular-nums" style={{ color: "var(--muted)" }}>
        {filtered.length} {filtered.length === 1 ? 'дума' : 'думи'}
        {!user && (
          <span className="ml-2" style={{ color: "var(--coral)" }}>— влез за да добавяш думи</span>
        )}
      </p>

      {/* Word grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm" style={{ color: "var(--muted)" }}>Няма намерени думи.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(word => (
            <WordCard
              key={word.id}
              word={word}
              userId={user?.id}
              alreadyAdded={addedSet.has(word.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
