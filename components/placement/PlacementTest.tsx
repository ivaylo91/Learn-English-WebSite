'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, RotateCcw, TrendingUp } from 'lucide-react';
import { PLACEMENT_QUESTIONS, assignLevel } from '@/lib/data/placement-questions';
import { savePlacementLevel } from '@/lib/actions/placement';
import type { Level } from '@/lib/types/database';

const LEVEL_META: Record<Level, { label: string; color: string; bg: string; description: string }> = {
  A1: { label: 'A1 — Начинаещ',      color: 'var(--sage-ink)',    bg: 'var(--sage)',      description: 'Познаваш основни думи и фрази. Идеално начало!' },
  A2: { label: 'A2 — Елементарен',   color: 'var(--sage-ink)',    bg: 'var(--sage)',      description: 'Разбираш прости изречения в ежедневни ситуации.' },
  B1: { label: 'B1 — Средно ниво',   color: 'var(--sky-ink)',     bg: 'var(--sky)',       description: 'Справяш се с повечето ситуации при пътуване.' },
  B2: { label: 'B2 — Средно-напред.', color: 'var(--lav-ink)',    bg: 'var(--lavender)',  description: 'Комуникираш свободно по широк кръг теми.' },
  C1: { label: 'C1 — Напреднал',      color: 'var(--coral-ink)',  bg: 'var(--coral-soft)', description: 'Изразяваш се гладко и точно в сложни ситуации.' },
  C2: { label: 'C2 — Владееш отлично', color: 'var(--butter-ink)', bg: 'var(--butter)',   description: 'Разбираш и говориш на практически ниво на носител.' },
};

export default function PlacementTest() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [qIndex,   setQIndex]   = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers,  setAnswers]  = useState<boolean[]>([]);
  const [result,   setResult]   = useState<Level | null>(null);
  const [saveErr,  setSaveErr]  = useState<string | null>(null);

  const total   = PLACEMENT_QUESTIONS.length;
  const current = PLACEMENT_QUESTIONS[qIndex];
  const pct     = Math.round((qIndex / total) * 100);

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
  }

  function handleNext() {
    if (selected === null) return;

    const isCorrect  = selected === current.correct;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (qIndex + 1 >= total) {
      const level = assignLevel(newAnswers);
      startTransition(async () => {
        const { error } = await savePlacementLevel(level);
        if (error) setSaveErr(error);
        else setResult(level);
      });
    } else {
      setQIndex(i => i + 1);
      setSelected(null);
    }
  }

  function handleRetake() {
    setQIndex(0);
    setSelected(null);
    setAnswers([]);
    setResult(null);
    setSaveErr(null);
  }

  // ── Result screen ──────────────────────────────────────────────────────────
  if (result) {
    const meta = LEVEL_META[result];
    return (
      <div
        className="rounded-3xl p-8 md:p-12 text-center max-w-md mx-auto"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-md)' }}
      >
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{ background: meta.bg }}
        >
          <TrendingUp className="w-9 h-9" style={{ color: meta.color }} />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[.16em] mb-2" style={{ color: 'var(--muted)' }}>
          Твоето ниво
        </p>
        <h2 className="text-3xl font-extrabold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          {meta.label}
        </h2>
        <p className="text-sm leading-relaxed mb-8 max-w-[36ch] mx-auto" style={{ color: 'var(--muted)' }}>
          {meta.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => startTransition(() => { router.push('/onboarding'); })}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98] disabled:opacity-60 cursor-pointer"
            style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
          >
            Виж плана ми
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleRetake}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[.98] cursor-pointer"
            style={{ color: 'var(--ink-2)', background: 'var(--bg-2)', border: '1px solid var(--line)' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Повтори теста
          </button>
        </div>

        {saveErr && (
          <p className="text-xs mt-4" style={{ color: 'var(--rose-ink)' }}>{saveErr}</p>
        )}
      </div>
    );
  }

  // ── Saving spinner (between last answer and result) ────────────────────────
  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <span className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--line)', borderTopColor: 'var(--coral)' }} />
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Изчисляване на нивото…</p>
      </div>
    );
  }

  // ── Band label shown above progress bar ───────────────────────────────────
  const band = current.level;

  // ── Quiz screen ───────────────────────────────────────────────────────────
  return (
    <div
      className="rounded-3xl overflow-hidden max-w-xl mx-auto"
      style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--line)' }}>
        <span className="text-sm font-bold" style={{ color: 'var(--ink)' }}>Тест за ниво</span>
        <div className="flex items-center gap-3">
          <span
            className="px-2 py-0.5 rounded-lg text-xs font-bold"
            style={{ background: 'var(--coral-soft)', color: 'var(--coral-ink)' }}
          >
            {band}
          </span>
          <span className="text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
            {qIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 overflow-hidden" style={{ background: 'var(--bg-2)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'var(--coral)' }}
        />
      </div>

      <div className="p-6">
        <p className="font-semibold leading-snug mb-5" style={{ color: 'var(--ink)' }}>
          {current.question}
        </p>

        <div className="flex flex-col gap-2.5">
          {current.options.map((opt, i) => {
            let style: React.CSSProperties = { borderColor: 'var(--line)', color: 'var(--ink-2)' };
            if (selected === i) style = { borderColor: 'var(--coral)', background: 'var(--coral-soft)', color: 'var(--coral-ink)' };
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 active:scale-[.99] disabled:cursor-default cursor-pointer"
                style={style}
              >
                <span
                  className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ border: '1px solid currentColor' }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm text-white active:scale-[.98] transition-all cursor-pointer"
              style={{ background: 'var(--coral)' }}
            >
              {qIndex + 1 >= total ? 'Завърши' : 'Следващ'}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
