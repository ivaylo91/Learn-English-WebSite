'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/lib/types/database';
import { CheckCircle2, XCircle, Trophy, ChevronRight, RotateCcw } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  previousScore?: number;
  onComplete: (score: number) => Promise<void>;
}

export default function Quiz({ questions, previousScore, onComplete }: QuizProps) {
  const [qIndex,   setQIndex]   = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers,  setAnswers]  = useState<boolean[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) return null;

  const current      = questions[qIndex];
  const totalCorrect = answers.filter(Boolean).length;
  const finalScore   = Math.round((totalCorrect / questions.length) * 100);
  const passed       = finalScore >= 60;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  };

  const handleNext = async () => {
    const correct    = selected === current.correct;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);

    if (qIndex + 1 >= questions.length) {
      const score = Math.round((newAnswers.filter(Boolean).length / questions.length) * 100);
      setSaving(true);
      await onComplete(score);
      setSaving(false);
      setFinished(true);
    } else {
      setQIndex(i => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const handleRetry = () => {
    setQIndex(0);
    setSelected(null);
    setAnswers([]);
    setRevealed(false);
    setFinished(false);
  };

  function optionStyle(i: number): React.CSSProperties {
    if (revealed) {
      if (i === current.correct)     return { borderColor: '#b5d8be', background: 'var(--sage)',   color: 'var(--sage-ink)' };
      if (i === selected)            return { borderColor: '#e8c4c4', background: 'var(--rose)',   color: 'var(--rose-ink)' };
      return { borderColor: 'var(--line)', color: 'var(--muted)', opacity: 0.6 };
    }
    if (selected === i) return { borderColor: 'var(--coral)', background: 'var(--coral-soft)', color: 'var(--coral-ink)' };
    return { borderColor: 'var(--line)', color: 'var(--ink-2)' };
  }

  if (finished) {
    return (
      <div
        className="rounded-3xl p-8 text-center"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div
          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
          style={{ background: passed ? 'var(--sage)' : 'var(--butter)' }}
        >
          <Trophy className="w-8 h-8" style={{ color: passed ? 'var(--sage-ink)' : 'var(--butter-ink)' }} />
        </div>
        <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--ink)' }}>
          {passed ? 'Браво!' : 'Опитай пак'}
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {passed ? 'Завършено успешно.' : 'Трябва минимум 60% за да завършиш.'}
        </p>
        <div className="flex items-center justify-center gap-8 mb-8">
          <div>
            <p className="text-4xl font-bold tabular-nums" style={{ color: passed ? 'var(--sage-ink)' : 'var(--butter-ink)' }}>
              {finalScore}%
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Резултат</p>
          </div>
          <div>
            <p className="text-4xl font-bold tabular-nums" style={{ color: 'var(--ink)' }}>
              {totalCorrect}/{questions.length}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Правилни</p>
          </div>
        </div>
        {!passed && (
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white active:scale-[.98] transition-all cursor-pointer"
            style={{ background: 'var(--coral)' }}
          >
            <RotateCcw className="w-4 h-4" />
            Опитай отново
          </button>
        )}
      </div>
    );
  }

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
        <h3 className="font-bold text-sm" style={{ color: 'var(--ink)' }}>Упражнение</h3>
        <div className="flex items-center gap-3">
          {previousScore !== undefined && (
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              Предишен: <span className="font-semibold" style={{ color: 'var(--ink-2)' }}>{previousScore}%</span>
            </span>
          )}
          <span className="text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
            {qIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 overflow-hidden" style={{ background: 'var(--bg-2)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${(qIndex / questions.length) * 100}%`, background: 'var(--coral)' }}
        />
      </div>

      <div className="p-6">
        <p className="font-semibold mb-5 leading-snug" style={{ color: 'var(--ink)' }}>
          {current.question}
        </p>

        <div className="flex flex-col gap-2.5">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={`quiz-opt flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 active:scale-[.99] disabled:cursor-default`}
              style={optionStyle(i)}
            >
              <span
                className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ border: '1px solid currentColor' }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
              {revealed && i === current.correct && (
                <CheckCircle2 className="w-4 h-4 ml-auto shrink-0" style={{ color: 'var(--sage-ink)' }} />
              )}
              {revealed && i === selected && i !== current.correct && (
                <XCircle className="w-4 h-4 ml-auto shrink-0" style={{ color: 'var(--rose-ink)' }} />
              )}
            </button>
          ))}
        </div>

        {revealed && (
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm font-semibold" style={{ color: selected === current.correct ? 'var(--sage-ink)' : 'var(--rose-ink)' }}>
              {selected === current.correct ? 'Правилно!' : 'Грешно — правилният отговор е маркиран.'}
            </p>
            <button
              onClick={handleNext}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm text-white active:scale-[.98] transition-all disabled:opacity-60 cursor-pointer"
              style={{ background: 'var(--coral)' }}
            >
              {saving ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {qIndex + 1 >= questions.length ? 'Завърши' : 'Следващ'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
