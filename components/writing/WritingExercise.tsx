'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, CheckCircle2, XCircle, Trophy, RotateCcw, Lightbulb } from 'lucide-react';
import { saveWritingProgress } from '@/lib/actions/writing';
import type { WritingPrompt } from '@/lib/types/database';

interface Props {
  exerciseId: string;
  prompts:    WritingPrompt[];
  userId:     string | null;
  prevScore?: number;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[.,!?;:]+$/, '').replace(/\s+/g, ' ');
}

function isCorrect(input: string, answers: string[]): boolean {
  const n = normalize(input);
  return answers.some(a => normalize(a) === n);
}

export default function WritingExercise({ exerciseId, prompts, userId, prevScore }: Props) {
  const router = useRef(useRouter());
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const [index,    setIndex]    = useState(0);
  const [value,    setValue]    = useState('');
  const [checked,  setChecked]  = useState(false);
  const [correct,  setCorrect]  = useState(false);
  const [passed,   setPassed]   = useState<boolean[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const total   = prompts.length;
  const current = prompts[index];
  const pct     = Math.round((index / total) * 100);

  useEffect(() => {
    if (!checked) setTimeout(() => inputRef.current?.focus(), 30);
  }, [index, checked]);

  function handleCheck() {
    if (!value.trim() || checked) return;
    const ok = isCorrect(value, current.answers);
    setChecked(true);
    setCorrect(ok);
  }

  function handleNext() {
    const newPassed = [...passed, correct];
    setPassed(newPassed);

    if (index + 1 >= total) {
      const score = Math.round((newPassed.filter(Boolean).length / total) * 100);
      startTransition(async () => {
        if (userId) await saveWritingProgress(exerciseId, score);
        setFinished(true);
      });
    } else {
      setIndex(i => i + 1);
      setValue('');
      setChecked(false);
      setCorrect(false);
      setShowHint(false);
    }
  }

  function handleRetry() {
    setIndex(0);
    setValue('');
    setChecked(false);
    setCorrect(false);
    setPassed([]);
    setShowHint(false);
    setFinished(false);
  }

  // ── Result screen ──────────────────────────────────────────────────────────
  if (finished) {
    const score       = Math.round((passed.filter(Boolean).length / total) * 100);
    const passedCount = passed.filter(Boolean).length;
    const xp          = score === 100 ? 20 : score >= 60 ? 10 : 0;
    const succeeded   = score >= 60;

    return (
      <div
        className="rounded-3xl p-8 text-center"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div
          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
          style={{ background: succeeded ? 'var(--sage)' : 'var(--butter)' }}
        >
          <Trophy className="w-8 h-8" style={{ color: succeeded ? 'var(--sage-ink)' : 'var(--butter-ink)' }} />
        </div>
        <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--ink)' }}>
          {succeeded ? 'Браво!' : 'Продължавай!'}
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {succeeded ? 'Упражнението е завършено.' : 'Трябват поне 60% за завършване.'}
        </p>

        <div className="flex items-center justify-center gap-8 mb-8">
          <div>
            <p className="text-4xl font-bold tabular-nums" style={{ color: succeeded ? 'var(--sage-ink)' : 'var(--butter-ink)' }}>
              {score}%
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Резултат</p>
          </div>
          <div>
            <p className="text-4xl font-bold tabular-nums" style={{ color: 'var(--ink)' }}>
              {passedCount}/{total}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Правилни</p>
          </div>
          {xp > 0 && (
            <div>
              <p className="text-4xl font-bold tabular-nums" style={{ color: 'var(--butter-ink)' }}>
                +{xp}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>XP</p>
            </div>
          )}
        </div>

        {prevScore !== undefined && (
          <p className="text-xs mb-6" style={{ color: 'var(--muted)' }}>
            Предишен резултат: <strong style={{ color: 'var(--ink-2)' }}>{prevScore}%</strong>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => startTransition(() => { router.current.push('/pisane'); })}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 active:scale-[.98] disabled:opacity-60 cursor-pointer"
            style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
          >
            Към упражненията
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm active:scale-[.98] cursor-pointer"
            style={{ color: 'var(--ink-2)', background: 'var(--bg-2)', border: '1px solid var(--line)' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Опитай отново
          </button>
        </div>
      </div>
    );
  }

  // ── Exercise screen ────────────────────────────────────────────────────────
  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--line)' }}
      >
        <span className="text-sm font-bold" style={{ color: 'var(--ink)' }}>Упражнение</span>
        <div className="flex items-center gap-3">
          {prevScore !== undefined && (
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              Предишен: <span className="font-semibold" style={{ color: 'var(--ink-2)' }}>{prevScore}%</span>
            </span>
          )}
          <span className="text-xs tabular-nums" style={{ color: 'var(--muted)' }}>{index + 1} / {total}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 overflow-hidden" style={{ background: 'var(--bg-2)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'var(--coral)' }}
        />
      </div>

      <div className="p-6">
        {/* Prompt */}
        <p className="font-semibold mb-5 leading-snug text-base" style={{ color: 'var(--ink)' }}>
          {current.prompt}
        </p>

        {/* Input */}
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') { e.preventDefault(); if (checked) { handleNext(); } else { handleCheck(); } }
          }}
          disabled={checked}
          placeholder="Въведи отговора си тук…"
          autoComplete="off"
          spellCheck={false}
          className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
          style={{
            border: checked
              ? `2px solid ${correct ? '#b5d8be' : '#e8c4c4'}`
              : '2px solid var(--line)',
            background: checked
              ? correct ? 'var(--sage)' : 'var(--rose)'
              : 'var(--bg)',
            color: 'var(--ink)',
          }}
        />

        {/* Feedback */}
        {checked && (
          <div className="mt-4 flex items-start gap-2">
            {correct
              ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--sage-ink)' }} />
              : <XCircle      className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--rose-ink)' }} />
            }
            <div>
              <p className="text-sm font-semibold" style={{ color: correct ? 'var(--sage-ink)' : 'var(--rose-ink)' }}>
                {correct ? 'Правилно!' : 'Грешно'}
              </p>
              {!correct && (
                <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
                  Правилен отговор: <strong style={{ color: 'var(--ink-2)' }}>{current.answers[0]}</strong>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Hint */}
        {!checked && current.hint && (
          <div className="mt-3">
            {showHint ? (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                style={{ background: 'var(--butter)', color: 'var(--butter-ink)', border: '1px solid #e8d8a8' }}
              >
                <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                {current.hint}
              </div>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                className="inline-flex items-center gap-1.5 text-xs cursor-pointer hover:underline"
                style={{ color: 'var(--muted)' }}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                Покажи подсказка
              </button>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            {checked ? '' : 'Enter за проверка'}
          </span>
          {!checked ? (
            <button
              onClick={handleCheck}
              disabled={!value.trim()}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm text-white active:scale-[.98] transition-all disabled:opacity-40 cursor-pointer disabled:cursor-default"
              style={{ background: 'var(--coral)' }}
            >
              Провери
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm text-white active:scale-[.98] transition-all disabled:opacity-60 cursor-pointer"
              style={{ background: 'var(--coral)' }}
            >
              {isPending
                ? <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <>{index + 1 >= total ? 'Завърши' : 'Следващ'}<ChevronRight className="w-3.5 h-3.5" /></>
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
