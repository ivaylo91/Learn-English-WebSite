'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { VocabularyWord, Level, WordStatus } from '@/lib/types/database';
import { useAuthStore } from '@/lib/stores/authStore';
import WordCard from './WordCard';
import { Search, BookMarked, ArrowUpDown } from 'lucide-react';

interface Props {
  words:       VocabularyWord[];
  categories:  string[];
  progressMap: Record<string, string>; // word_id → WordStatus
}

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const LEVEL_CHIP: Record<string, React.CSSProperties> = {
  A1: { background: 'var(--sage)',     color: 'var(--sage-ink)' },
  A2: { background: 'var(--sage)',     color: 'var(--sage-ink)' },
  B1: { background: 'var(--sky)',      color: 'var(--sky-ink)' },
  B2: { background: 'var(--sky)',      color: 'var(--sky-ink)' },
  C1: { background: 'var(--lavender)', color: 'var(--lav-ink)' },
  C2: { background: 'var(--lavender)', color: 'var(--lav-ink)' },
};

const STATUS_FILTER_LABELS: { value: WordStatus | 'all'; label: string }[] = [
  { value: 'all',      label: 'Всички' },
  { value: 'new',      label: 'Нови' },
  { value: 'learning', label: 'Учим' },
  { value: 'known',    label: 'Познати' },
];

type SortKey = 'az' | 'level' | 'status';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'az',     label: 'А–Я' },
  { value: 'level',  label: 'По ниво' },
  { value: 'status', label: 'По статус' },
];

const STATUS_ORDER: Record<string, number> = { new: 0, learning: 1, known: 2 };

export default function WordListClient({ words, categories, progressMap }: Props) {
  const { user } = useAuthStore();

  const [tab,            setTab]            = useState<'all' | 'mine'>('all');
  const [query,          setQuery]          = useState('');
  const [activeLevel,    setActiveLevel]    = useState<Level | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [statusFilter,   setStatusFilter]   = useState<WordStatus | 'all'>('all');
  const [sortBy,         setSortBy]         = useState<SortKey>('level');

  const addedIds = useMemo(() => new Set(Object.keys(progressMap)), [progressMap]);

  // Word counts per level (for the chips)
  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const w of words) counts[w.level] = (counts[w.level] ?? 0) + 1;
    return counts;
  }, [words]);

  // "My Words" summary stats
  const myStats = useMemo(() => {
    let known = 0, learning = 0, newCount = 0;
    for (const status of Object.values(progressMap)) {
      if (status === 'known')    known++;
      else if (status === 'learning') learning++;
      else newCount++;
    }
    return { total: addedIds.size, known, learning, new: newCount };
  }, [progressMap, addedIds]);

  const filtered = useMemo(() => {
    const basePool = tab === 'mine' ? words.filter(w => addedIds.has(w.id)) : words;
    const q = query.toLowerCase().trim();

    let result = basePool.filter(w => {
      if (activeLevel    && w.level    !== activeLevel)    return false;
      if (activeCategory && w.category !== activeCategory) return false;
      if (tab === 'mine' && statusFilter !== 'all') {
        if (progressMap[w.id] !== statusFilter) return false;
      }
      if (q) return w.word_en.toLowerCase().includes(q) || w.word_bg.toLowerCase().includes(q);
      return true;
    });

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'az')    return a.word_en.localeCompare(b.word_en);
      if (sortBy === 'status') {
        const sa = STATUS_ORDER[progressMap[a.id] ?? 'new'] ?? 0;
        const sb = STATUS_ORDER[progressMap[b.id] ?? 'new'] ?? 0;
        if (sa !== sb) return sa - sb;
        return a.word_en.localeCompare(b.word_en);
      }
      // default: level order
      const li = LEVELS.indexOf(a.level as Level);
      const lj = LEVELS.indexOf(b.level as Level);
      if (li !== lj) return li - lj;
      return a.word_en.localeCompare(b.word_en);
    });

    return result;
  }, [words, tab, query, activeLevel, activeCategory, statusFilter, sortBy, addedIds, progressMap]);

  return (
    <div>
      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-1 p-1 rounded-2xl mb-6 w-fit"
        style={{ background: 'var(--bg-2)', border: '1px solid var(--line)' }}
      >
        {([['all', 'Всички думи'], ['mine', 'Моите думи']] as const).map(([value, label]) => (
          <button
            key={value}
            onClick={() => { setTab(value); setStatusFilter('all'); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            style={
              tab === value
                ? { background: 'var(--surface)', color: 'var(--ink)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)' }
                : { color: 'var(--muted)' }
            }
          >
            {value === 'mine' && <BookMarked className="w-3.5 h-3.5" />}
            {label}
            {value === 'mine' && addedIds.size > 0 && (
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: 'var(--coral-soft)', color: 'var(--coral-ink)' }}
              >
                {addedIds.size}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── "My Words" summary ───────────────────────────────────────────── */}
      {tab === 'mine' && myStats.total > 0 && (
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-1.5 px-5 py-3.5 rounded-2xl mb-5 text-sm"
          style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
        >
          <span className="font-semibold" style={{ color: 'var(--ink)' }}>
            {myStats.total} {myStats.total === 1 ? 'дума' : 'думи'} в списъка
          </span>
          <span style={{ color: 'var(--sage-ink)' }}>✓ {myStats.known} познати</span>
          <span style={{ color: 'var(--butter-ink)' }}>◎ {myStats.learning} учим</span>
          <span style={{ color: 'var(--coral-ink)' }}>○ {myStats.new} нови</span>
        </div>
      )}

      {/* ── Empty "My Words" ─────────────────────────────────────────────── */}
      {tab === 'mine' && myStats.total === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
            Все още нямаш думи в списъка.
          </p>
          <button
            onClick={() => setTab('all')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
            style={{ background: 'var(--coral)' }}
          >
            <BookMarked className="w-4 h-4" />
            Разгледай речника
          </button>
        </div>
      )}

      {/* ── Filters (show when there's something to filter) ─────────────── */}
      {(tab === 'all' || myStats.total > 0) && (
        <>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Търси на английски или български…"
              className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl focus:outline-none"
              style={{
                background: 'var(--surface)',
                border:     '1px solid var(--line)',
                boxShadow:  'var(--shadow-sm)',
                color:      'var(--ink)',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,99,58,.15)'; }}
              onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--line)';  e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            />
          </div>

          {/* Level chips with counts */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <button
              onClick={() => setActiveLevel(null)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              style={
                activeLevel === null
                  ? { background: 'var(--coral)', color: '#fff' }
                  : { background: 'var(--bg-2)', color: 'var(--muted)', border: '1px solid var(--line)' }
              }
            >
              Всички нива
            </button>
            {LEVELS.map(l => {
              const count = levelCounts[l] ?? 0;
              if (count === 0) return null;
              const active = activeLevel === l;
              return (
                <button
                  key={l}
                  onClick={() => setActiveLevel(active ? null : l)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  style={
                    active
                      ? { ...LEVEL_CHIP[l], outline: '2px solid var(--coral)', outlineOffset: '2px' }
                      : { background: 'var(--bg-2)', color: 'var(--muted)', border: '1px solid var(--line)' }
                  }
                >
                  {l}
                  <span
                    className="text-[10px] font-normal opacity-75"
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category + sort row */}
          <div className="flex items-start justify-between gap-3 mb-6 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory(null)}
                className="px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                style={
                  activeCategory === null
                    ? { background: 'var(--ink)', color: 'var(--bg)' }
                    : { background: 'var(--bg-2)', color: 'var(--ink-2)' }
                }
              >
                Всички теми
              </button>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(activeCategory === c ? null : c)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  style={
                    activeCategory === c
                      ? { background: 'var(--ink)', color: 'var(--bg)' }
                      : { background: 'var(--bg-2)', color: 'var(--ink-2)' }
                  }
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
              {SORT_OPTIONS.map(o => (
                <button
                  key={o.value}
                  onClick={() => setSortBy(o.value)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  style={
                    sortBy === o.value
                      ? { background: 'var(--coral-soft)', color: 'var(--coral-ink)' }
                      : { background: 'var(--bg-2)', color: 'var(--muted)' }
                  }
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status filter (My Words only) */}
          {tab === 'mine' && (
            <div className="flex items-center gap-2 flex-wrap mb-5">
              {STATUS_FILTER_LABELS.map(s => (
                <button
                  key={s.value}
                  onClick={() => setStatusFilter(s.value)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  style={
                    statusFilter === s.value
                      ? { background: 'var(--coral)', color: '#fff' }
                      : { background: 'var(--bg-2)', color: 'var(--muted)' }
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Results count ─────────────────────────────────────────────────── */}
      {filtered.length > 0 && (
        <p className="text-xs mb-4 tabular-nums" style={{ color: 'var(--muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'дума' : 'думи'}
          {!user && tab === 'all' && (
            <span className="ml-2" style={{ color: 'var(--coral)' }}>
              —{' '}
              <Link href="/login" className="underline">влез</Link>
              {' '}за да добавяш думи
            </span>
          )}
        </p>
      )}

      {/* ── Word grid ─────────────────────────────────────────────────────── */}
      {filtered.length === 0 && (tab === 'all' || myStats.total > 0) ? (
        <div className="py-16 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Няма намерени думи.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(word => (
            <WordCard
              key={word.id}
              word={word}
              userId={user?.id}
              alreadyAdded={addedIds.has(word.id)}
              studyStatus={tab === 'mine' ? (progressMap[word.id] as WordStatus | undefined) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
