'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { GrammarLesson, Level } from '@/lib/types/database';
import Badge from '@/components/ui/Badge';
import { Search, SlidersHorizontal, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProgressEntry {
  lesson_id: string;
  completed: boolean;
  score?: number | null;
}

interface GrammarListClientProps {
  lessons: GrammarLesson[];
  progress: ProgressEntry[];
}

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

function LessonRow({
  lesson,
  index,
  done,
  score,
  showCategory,
  isNext,
}: {
  lesson: GrammarLesson;
  index: number;
  done: boolean;
  score?: number | null;
  showCategory?: boolean;
  isNext?: boolean;
}) {
  return (
    <Link
      href={`/gramatika/${lesson.slug}`}
      className="group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 relative overflow-hidden"
      style={{
        background: isNext ? 'var(--coral-soft)' : 'var(--surface)',
        border: isNext ? '1px solid #f4c8a8' : '1px solid var(--line)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Left accent bar for "next" lesson */}
      {isNext && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{ background: 'var(--coral)' }}
        />
      )}
      <div
        className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
        style={
          done
            ? { background: 'var(--sage)', color: 'var(--sage-ink)' }
            : { background: 'var(--bg-2)', color: 'var(--muted)' }
        }
      >
        {done ? <CheckCircle2 className="w-4 h-4" /> : <span>{index + 1}</span>}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--ink)' }}>
            {lesson.title}
          </p>
          {isNext && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: 'var(--coral)', color: '#fff' }}
            >
              <ArrowRight className="w-2.5 h-2.5" />
              Следващ
            </span>
          )}
          {showCategory && (
            <Badge color={levelBadge[lesson.level] ?? 'sage'}>{lesson.level}</Badge>
          )}
        </div>
        {showCategory && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{lesson.category}</p>
        )}
        {score != null && (
          <p className="text-xs mt-0.5 tabular-nums" style={{ color: 'var(--muted)' }}>
            Резултат: {score}%
          </p>
        )}
      </div>

      {lesson.questions?.length > 0 && (
        <span className="shrink-0 text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
          {lesson.questions.length} въпроса
        </span>
      )}

      <ChevronRight
        className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform"
        style={{ color: 'var(--line-2)' }}
      />
    </Link>
  );
}

export default function GrammarListClient({ lessons, progress }: GrammarListClientProps) {
  const [query, setQuery]           = useState('');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);

  const progMap = useMemo(
    () => new Map(progress.map(p => [p.lesson_id, p])),
    [progress],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return lessons.filter(l => {
      if (activeLevel && l.level !== activeLevel) return false;
      if (q) return l.title.toLowerCase().includes(q) || l.category.toLowerCase().includes(q);
      return true;
    });
  }, [lessons, query, activeLevel]);

  const isFiltering = query.trim() !== '' || activeLevel !== null;

  const grouped = useMemo(() => {
    if (isFiltering) return null;
    return filtered.reduce<Record<string, GrammarLesson[]>>((acc, l) => {
      if (!acc[l.category]) acc[l.category] = [];
      acc[l.category].push(l);
      return acc;
    }, {});
  }, [filtered, isFiltering]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Търси урок..."
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

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Няма намерени уроци.</p>
        </div>
      ) : isFiltering ? (
        /* Flat list when searching / filtering by level */
        <div className="flex flex-col gap-2">
          {filtered.map((lesson, i) => {
            const p = progMap.get(lesson.id);
            return (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                index={i}
                done={p?.completed ?? false}
                score={p?.score}
                showCategory
              />
            );
          })}
        </div>
      ) : (
        /* Grouped by category when no filter */
        <div className="flex flex-col gap-10">
          {Object.entries(grouped!).map(([category, categoryLessons]) => {
            const doneLessons = categoryLessons.filter(l => progMap.get(l.id)?.completed);
            const doneCount   = doneLessons.length;
            const allDone     = doneCount === categoryLessons.length && categoryLessons.length > 0;
            const anyStarted  = doneCount > 0 || categoryLessons.some(l => progMap.has(l.id));
            const pct         = categoryLessons.length > 0 ? (doneCount / categoryLessons.length) * 100 : 0;

            // Index of the first incomplete lesson (to mark as "next")
            const nextIdx = anyStarted
              ? categoryLessons.findIndex(l => !progMap.get(l.id)?.completed)
              : -1;

            return (
              <section key={category}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-base font-bold" style={{ color: 'var(--ink)' }}>{category}</h2>
                    <Badge color={levelBadge[categoryLessons[0].level] ?? 'sage'}>
                      {categoryLessons[0].level}
                    </Badge>
                  </div>

                  {allDone ? (
                    <span
                      className="flex items-center gap-1 text-xs font-semibold"
                      style={{ color: 'var(--sage-ink)' }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Завършено
                    </span>
                  ) : (
                    <span className="text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
                      {doneCount}/{categoryLessons.length} урока
                    </span>
                  )}
                </div>

                <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: 'var(--line)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width:      `${pct}%`,
                      background: allDone ? 'var(--sage-ink)' : 'var(--lav-ink)',
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  {categoryLessons.map((lesson, i) => {
                    const p = progMap.get(lesson.id);
                    return (
                      <LessonRow
                        key={lesson.id}
                        lesson={lesson}
                        index={i}
                        done={p?.completed ?? false}
                        score={p?.score}
                        isNext={i === nextIdx}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
