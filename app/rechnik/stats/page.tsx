import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Badge from '@/components/ui/Badge';
import { BookMarked, ChevronLeft, TrendingUp, Star, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Статистика — Речник | Учи Английски',
  description: 'Виж колко думи знаеш по ниво и тема.',
};

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

const LEVEL_META: Record<string, {
  color: 'sage' | 'sky' | 'lavender';
  label: string;
  barBg: string;
  barFill: string;
}> = {
  A1: { color: 'sage',     label: 'Начинаещ',    barBg: 'var(--sage)',     barFill: 'var(--sage-ink)'   },
  A2: { color: 'sage',     label: 'Елементарен', barBg: 'var(--sage)',     barFill: 'var(--sage-ink)'   },
  B1: { color: 'sky',      label: 'Предсреден',  barBg: 'var(--sky)',      barFill: 'var(--sky-ink)'    },
  B2: { color: 'sky',      label: 'Среден',      barBg: 'var(--sky)',      barFill: 'var(--sky-ink)'    },
  C1: { color: 'lavender', label: 'Напреднал',   barBg: 'var(--lavender)', barFill: 'var(--lav-ink)'    },
  C2: { color: 'lavender', label: 'Владеещ',     barBg: 'var(--lavender)', barFill: 'var(--lav-ink)'    },
};

type ProgressCounts = { known: number; learning: number; new: number };

function emptyProgress(): ProgressCounts { return { known: 0, learning: 0, new: 0 }; }

function ProgressBar({ value, max, fill }: { value: number; max: number; fill: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-2)' }}>
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: fill }}
      />
    </div>
  );
}

export default async function StatsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [wordsRes, progressRes] = await Promise.all([
    supabase.from('vocabulary_words').select('level, category'),
    user
      ? supabase
          .from('user_word_progress')
          .select('status, vocabulary_words!inner(level, category)')
          .eq('user_id', user.id)
      : Promise.resolve({ data: [] as unknown[] }),
  ]);

  // ── Aggregate totals ──────────────────────────────────────────────────────
  const levelTotals: Record<string, number>    = {};
  const categoryTotals: Record<string, number> = {};

  for (const w of wordsRes.data ?? []) {
    levelTotals[w.level]       = (levelTotals[w.level]       ?? 0) + 1;
    categoryTotals[w.category] = (categoryTotals[w.category] ?? 0) + 1;
  }

  const totalWords = (wordsRes.data ?? []).length;

  // ── Aggregate user progress ───────────────────────────────────────────────
  type ProgressRow = { status: string; vocabulary_words: { level: string; category: string } };
  const rows = (progressRes.data ?? []) as ProgressRow[];

  const levelProgress:    Record<string, ProgressCounts> = {};
  const categoryProgress: Record<string, ProgressCounts> = {};

  for (const row of rows) {
    const status   = row.status as keyof ProgressCounts;
    const { level, category } = row.vocabulary_words;
    if (!levelProgress[level])       levelProgress[level]    = emptyProgress();
    if (!categoryProgress[category]) categoryProgress[category] = emptyProgress();
    if (status in levelProgress[level]) {
      levelProgress[level][status]++;
      categoryProgress[category][status]++;
    }
  }

  const totalKnown    = rows.filter(r => r.status === 'known').length;
  const totalLearning = rows.filter(r => r.status === 'learning').length;
  const totalStudying = rows.length;

  // Sort categories by total words desc
  const sortedCategories = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-10">

      {/* Back link */}
      <Link
        href="/rechnik"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors hover:opacity-70"
        style={{ color: 'var(--muted)' }}
      >
        <ChevronLeft className="w-4 h-4" />
        Речник
      </Link>

      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: 'var(--coral-soft)' }}
        >
          <TrendingUp className="w-5 h-5" style={{ color: 'var(--coral-ink)' }} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
            Статистика на речника
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {totalWords.toLocaleString('bg')} думи общо в платформата
          </p>
        </div>
      </div>

      {/* ── Overall summary (logged-in only) ── */}
      {user ? (
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
        >
          <h2 className="text-xs font-bold uppercase tracking-[.12em] mb-4" style={{ color: 'var(--muted)' }}>
            Твоят напредък
          </h2>

          {/* Summary chips */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: 'var(--sage)', border: '1px solid #b5d8be' }}>
              <Star className="w-4 h-4" style={{ color: 'var(--sage-ink)' }} />
              <div>
                <p className="text-lg font-extrabold leading-none" style={{ color: 'var(--sage-ink)' }}>{totalKnown}</p>
                <p className="text-[11px] font-semibold" style={{ color: 'var(--sage-ink)' }}>знам</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: 'var(--butter)', border: '1px solid #efd884' }}>
              <BookMarked className="w-4 h-4" style={{ color: 'var(--butter-ink)' }} />
              <div>
                <p className="text-lg font-extrabold leading-none" style={{ color: 'var(--butter-ink)' }}>{totalLearning}</p>
                <p className="text-[11px] font-semibold" style={{ color: 'var(--butter-ink)' }}>уча</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
              <BookOpen className="w-4 h-4" style={{ color: 'var(--muted)' }} />
              <div>
                <p className="text-lg font-extrabold leading-none" style={{ color: 'var(--ink)' }}>{totalStudying}</p>
                <p className="text-[11px] font-semibold" style={{ color: 'var(--muted)' }}>в списъка</p>
              </div>
            </div>
          </div>

          {/* Overall mastery bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs" style={{ color: 'var(--muted)' }}>
              <span>Усвоени от всички думи</span>
              <span className="font-bold" style={{ color: 'var(--ink)' }}>
                {totalWords > 0 ? `${Math.round((totalKnown / totalWords) * 100)}%` : '0%'}
              </span>
            </div>
            <ProgressBar value={totalKnown} max={totalWords} fill="var(--sage-ink)" />
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, #fff3ee 0%, #ffe4d6 100%)', border: '1px solid #f4c0a0' }}
        >
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--coral-ink)' }}>
              Влез, за да следиш напредъка си
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--ink-2)' }}>
              Системата запомня кои думи знаеш и кога трябва да ги повториш.
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-px"
            style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.6)' }}
          >
            Регистрирай се
          </Link>
        </div>
      )}

      {/* ── By level ── */}
      <section className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-[.12em] mb-4" style={{ color: 'var(--muted)' }}>
          По ниво
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LEVELS.map(level => {
            const meta    = LEVEL_META[level];
            const total   = levelTotals[level]  ?? 0;
            const prog    = levelProgress[level] ?? emptyProgress();
            const known   = prog.known;
            const learning= prog.learning;
            const knownPct= total > 0 ? Math.round((known / total) * 100) : 0;

            return (
              <Link
                key={level}
                href={`/rechnik?level=${level}`}
                className="group block rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge color={meta.color}>{level}</Badge>
                    <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{meta.label}</span>
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
                    {total} думи
                  </span>
                </div>

                {/* Progress bar */}
                <ProgressBar value={known} max={total} fill={meta.barFill} />

                {/* Stats row */}
                <div className="flex items-center justify-between mt-2.5">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 text-xs">
                        <span style={{ color: 'var(--sage-ink)' }}>
                          <span className="font-bold">{known}</span> знам
                        </span>
                        <span style={{ color: 'var(--butter-ink)' }}>
                          <span className="font-bold">{learning}</span> уча
                        </span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: meta.barFill }}>
                        {knownPct}%
                      </span>
                    </>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>
                      Влез за да видиш прогрес
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── By category ── */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-[.12em] mb-4" style={{ color: 'var(--muted)' }}>
          По тема
        </h2>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
        >
          {sortedCategories.map(([category, total], i) => {
            const prog     = categoryProgress[category] ?? emptyProgress();
            const known    = prog.known;
            const learning = prog.learning;
            const knownPct = total > 0 ? Math.round((known / total) * 100) : 0;
            const isLast   = i === sortedCategories.length - 1;

            return (
              <Link
                key={category}
                href={`/rechnik?category=${encodeURIComponent(category)}`}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[var(--bg-2)]"
                style={{ borderBottom: isLast ? 'none' : '1px solid var(--line)' }}
              >
                {/* Category name + count */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>
                      {category}
                    </span>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      {user && (
                        <span className="text-xs" style={{ color: 'var(--muted)' }}>
                          <span className="font-bold" style={{ color: 'var(--sage-ink)' }}>{known}</span>
                          {' / '}
                          {total}
                        </span>
                      )}
                      {!user && (
                        <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{total}</span>
                      )}
                    </div>
                  </div>
                  <ProgressBar value={known} max={total} fill="var(--coral)" />
                </div>

                {/* Percent chip — only when logged in */}
                {user && (
                  <span
                    className="shrink-0 w-10 text-center text-xs font-bold py-0.5 rounded-lg"
                    style={{
                      background: knownPct >= 80 ? 'var(--sage)' : knownPct >= 40 ? 'var(--butter)' : 'var(--bg-2)',
                      color:      knownPct >= 80 ? 'var(--sage-ink)' : knownPct >= 40 ? 'var(--butter-ink)' : 'var(--muted)',
                    }}
                  >
                    {knownPct}%
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA to study */}
      {user && totalStudying > 0 && (
        <div className="mt-8 text-center">
          <Link
            href="/rechnik/study"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-px active:scale-[.98]"
            style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.6)' }}
          >
            <BookMarked className="w-4 h-4" />
            Учи думите си
          </Link>
        </div>
      )}
    </div>
  );
}
