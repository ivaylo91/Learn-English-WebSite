'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import type { WritingExercise, UserWritingProgress } from '@/lib/types/database';

interface Props {
  exercises: WritingExercise[];
  progress:  UserWritingProgress[];
}

const LEVEL_COLORS: Record<string, { bg: string; color: string }> = {
  A1: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  A2: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  B1: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  B2: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  C1: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
  C2: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
};

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function WritingListClient({ exercises, progress }: Props) {
  const [filter, setFilter] = useState<string>('');

  const progressMap = new Map(progress.map(p => [p.exercise_id, p]));

  const filtered = filter
    ? exercises.filter(e => e.level === filter)
    : exercises;

  return (
    <div>
      {/* Level filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('')}
          className="px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
          style={
            filter === ''
              ? { background: 'var(--coral)', color: '#fff' }
              : { background: 'var(--bg-2)', color: 'var(--muted)', border: '1px solid var(--line)' }
          }
        >
          Всички
        </button>
        {LEVELS.map(l => {
          const lc = LEVEL_COLORS[l];
          return (
            <button
              key={l}
              onClick={() => setFilter(filter === l ? '' : l)}
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
              style={
                filter === l
                  ? { background: lc.bg, color: lc.color, border: `1px solid ${lc.bg}` }
                  : { background: 'var(--bg-2)', color: 'var(--muted)', border: '1px solid var(--line)' }
              }
            >
              {l}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-sm" style={{ color: 'var(--muted)' }}>
          Няма упражнения за ниво {filter}.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(ex => {
            const prog   = progressMap.get(ex.id);
            const done   = prog?.completed ?? false;
            const score  = prog?.score;
            const lc     = LEVEL_COLORS[ex.level] ?? LEVEL_COLORS.A1;
            const count  = Array.isArray(ex.prompts) ? ex.prompts.length : 0;

            return (
              <Link
                key={ex.id}
                href={`/pisane/${ex.slug}`}
                className="group relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Hover accent */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"
                  style={{ background: 'var(--coral)' }}
                />

                <div>
                  {/* Level + done badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: lc.bg, color: lc.color }}
                    >
                      {ex.level}
                    </span>
                    {done && (
                      <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--sage-ink)' }}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Завършено
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold mb-1 leading-snug" style={{ color: 'var(--ink)' }}>
                    {ex.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>
                    {ex.topic} · {count} {count === 1 ? 'въпрос' : 'въпроса'}
                  </p>
                </div>

                <div
                  className="flex items-center justify-between mt-4 pt-3"
                  style={{ borderTop: '1px solid var(--line)' }}
                >
                  {score !== undefined
                    ? <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{score}% последно</span>
                    : <span className="text-xs" style={{ color: 'var(--muted)' }}>Не е опитвано</span>
                  }
                  <span
                    className="flex items-center gap-1 text-xs font-semibold group-hover:gap-1.5 transition-all"
                    style={{ color: 'var(--coral)' }}
                  >
                    {done ? 'Повтори' : 'Започни'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
