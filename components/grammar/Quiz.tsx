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

  if (finished) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${passed ? 'bg-green-100' : 'bg-amber-100'}`}>
          <Trophy className={`w-8 h-8 ${passed ? 'text-green-600' : 'text-amber-600'}`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{passed ? 'Браво!' : 'Опитай пак'}</h3>
        <p className="text-gray-500 text-sm mb-6">
          {passed ? 'Завършено успешно.' : 'Трябва минимум 60% за да завършиш.'}
        </p>
        <div className="flex items-center justify-center gap-8 mb-8">
          <div>
            <p className={`text-4xl font-bold tabular-nums ${passed ? 'text-green-600' : 'text-amber-600'}`}>{finalScore}%</p>
            <p className="text-xs text-gray-400 mt-0.5">Резултат</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900 tabular-nums">{totalCorrect}/{questions.length}</p>
            <p className="text-xs text-gray-400 mt-0.5">Правилни</p>
          </div>
        </div>
        {!passed && (
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-[.98] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Опитай отново
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-sm">Упражнение</h3>
        <div className="flex items-center gap-3">
          {previousScore !== undefined && (
            <span className="text-xs text-gray-400">
              Предишен: <span className="font-semibold text-gray-600">{previousScore}%</span>
            </span>
          )}
          <span className="text-xs text-gray-400 tabular-nums">{qIndex + 1} / {questions.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 bg-gray-50 overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${(qIndex / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-6">
        <p className="font-semibold text-gray-900 mb-5 leading-snug">{current.question}</p>

        <div className="flex flex-col gap-2.5">
          {current.options.map((opt, i) => {
            let style = 'border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer';
            if (revealed) {
              if (i === current.correct)                    style = 'border-green-400 bg-green-50 text-green-800';
              else if (i === selected)                      style = 'border-red-300 bg-red-50 text-red-700';
              else                                          style = 'border-gray-100 text-gray-400';
            } else if (selected === i) {
              style = 'border-indigo-400 bg-indigo-50 text-indigo-800';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={revealed}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 active:scale-[.99] disabled:cursor-default ${style}`}
              >
                <span className="shrink-0 w-6 h-6 rounded-lg border border-current flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
                {revealed && i === current.correct && (
                  <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto shrink-0" />
                )}
                {revealed && i === selected && i !== current.correct && (
                  <XCircle className="w-4 h-4 text-red-500 ml-auto shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-5 flex items-center justify-between">
            <p className={`text-sm font-semibold ${selected === current.correct ? 'text-green-600' : 'text-red-600'}`}>
              {selected === current.correct ? 'Правилно!' : 'Грешно — правилният отговор е маркиран.'}
            </p>
            <button
              onClick={handleNext}
              disabled={saving}
              className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-[.98] transition-all disabled:opacity-60 cursor-pointer"
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
