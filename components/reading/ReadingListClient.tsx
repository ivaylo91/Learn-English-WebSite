'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Level } from '@/lib/types/database';
import Badge from '@/components/ui/Badge';
import { Search, SlidersHorizontal, BookOpen, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ReadingItem {
  id: string;
  slug: string;
  title: string;
  level: Level;
  topic: string;
  reading_time_minutes: number;
  questions: { question: string }[];
}

interface ProgressEntry {
  content_id: string;
  completed: boolean;
  score?: number | null;
}

interface ReadingListClientProps {
  texts: ReadingItem[];
  progress: ProgressEntry[];
}

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

export default function ReadingListClient({ texts, progress }: ReadingListClientProps) {
  const [query, setQuery]             = useState('');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);

  const progMap = useMemo(
    () => new Map(progress.map(p => [p.content_id, p])),
    [progress],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return texts.filter(t => {
      if (activeLevel && t.level !== activeLevel) return false;
      if (q) return t.title.toLowerCase().includes(q) || t.topic.toLowerCase().includes(q);
      return true;
    });
  }, [texts, query, activeLevel]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Търси по заглавие или тема..."
          className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl focus:outline-none"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--ink)',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'var(--coral)';
            e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(232,99,58,.15)';
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'var(--line)';
            e.currentTarget.style.boxShadow   = 'var(--shadow-sm)';
          }}
        />
      </div>

      {/* Level filter */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <SlidersHorizontal className="w-4 h-4 shrink-0" style={{ color: 'var(--muted)' }} />
        <button
          onClick={() => setActiveLevel(null)}
          className="px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          style={
            activeLevel === null
              ? { background: 'var(--coral)', color: '#fff' }
              : { background: 'var(--bg-2)', color: 'var(--ink-2)' }
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
                ? { background: 'var(--coral)', color: '#fff' }
                : { background: 'var(--bg-2)', color: 'var(--ink-2)' }
            }
          >
            {l}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs mb-4 tabular-nums" style={{ color: 'var(--muted)' }}>
        {filtered.length} {filtered.length === 1 ? 'текст' : 'текста'}
      </p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Няма намерени текстове.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(text => {
            const p    = progMap.get(text.id);
            const done = p?.completed ?? false;

            return (
              <Link
                key={text.id}
                href={`/chetene/${text.slug}`}
                className="group flex items-center gap-5 rounded-2xl px-6 py-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={
                    done
                      ? { background: 'var(--sage)',   color: 'var(--sage-ink)' }
                      : { background: 'var(--butter)', color: 'var(--butter-ink)' }
                  }
                >
                  {done
                    ? <CheckCircle2 className="w-5 h-5" />
                    : <BookOpen     className="w-5 h-5" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="font-bold" style={{ color: 'var(--ink)' }}>{text.title}</h3>
                    <Badge color={levelBadge[text.level] ?? 'sage'}>{text.level}</Badge>
                    <Badge color="butter">{text.topic}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{text.reading_time_minutes} мин четене
                    </span>
                    {text.questions?.length > 0 && (
                      <span>{text.questions.length} въпроса</span>
                    )}
                    {p?.score != null && (
                      <span className="font-semibold tabular-nums" style={{ color: 'var(--ink-2)' }}>
                        {p.score}%
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight
                  className="shrink-0 w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: 'var(--line-2)' }}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
