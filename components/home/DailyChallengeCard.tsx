'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookMarked, PenLine, Headphones, BookOpen, Pencil,
  Star, CheckCircle2, ArrowRight, Zap,
} from 'lucide-react';
import { completeDailyChallenge } from '@/lib/actions/daily-challenge';
import type { DailyChallenge } from '@/lib/daily-challenge-utils';

const MODULE_META = {
  vocabulary: { icon: BookMarked, bg: 'var(--coral-soft)', color: 'var(--coral-ink)', label: 'Речник' },
  grammar:    { icon: PenLine,    bg: 'var(--lavender)',   color: 'var(--lav-ink)',   label: 'Граматика' },
  listening:  { icon: Headphones, bg: 'var(--sky)',        color: 'var(--sky-ink)',   label: 'Слушане' },
  reading:    { icon: BookOpen,   bg: 'var(--sage)',       color: 'var(--sage-ink)',  label: 'Четене' },
  writing:    { icon: Pencil,     bg: 'var(--butter)',     color: 'var(--butter-ink)',label: 'Писане' },
} as const;

export default function DailyChallengeCard({ challenge }: { challenge: DailyChallenge }) {
  const router = useRouter();
  const [done, setDone] = useState(challenge.completed);
  const [isPending, startTransition] = useTransition();

  const meta = MODULE_META[challenge.module];
  const Icon = meta.icon;

  function handleStart() {
    if (done) { router.push(challenge.href); return; }
    startTransition(async () => {
      const { success } = await completeDailyChallenge(challenge.module, challenge.contentId);
      if (success) setDone(true);
      router.push(challenge.href);
    });
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Header stripe */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: done
            ? 'linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%)'
            : 'linear-gradient(90deg, #fff3ee 0%, #ffe4d6 100%)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4" style={{ color: done ? '#059669' : 'var(--coral)' }} />
          <span
            className="text-xs font-bold uppercase tracking-[.1em]"
            style={{ color: done ? '#065f46' : 'var(--coral-ink)' }}
          >
            Предизвикателство на деня
          </span>
        </div>
        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold"
          style={{
            background: done ? '#d1fae5' : 'var(--coral)',
            color:      done ? '#065f46' : '#fff',
          }}
        >
          <Zap className="w-3 h-3" />
          {done ? 'Завършено!' : `+${challenge.xpBonus} XP`}
        </span>
      </div>

      {/* Body */}
      <div className="flex items-center gap-4 px-5 py-4">
        {/* Module icon */}
        <div
          className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: meta.bg }}
        >
          {done
            ? <CheckCircle2 className="w-6 h-6" style={{ color: '#059669' }} />
            : <Icon className="w-6 h-6" style={{ color: meta.color }} />
          }
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          {/* Module chip */}
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold mb-1"
            style={{ background: meta.bg, color: meta.color }}
          >
            {meta.label}
          </span>
          <p
            className="text-sm font-bold leading-snug truncate"
            style={{ color: 'var(--ink)' }}
          >
            {challenge.title}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            {challenge.subtitle}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          disabled={isPending}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-px active:scale-[.97] disabled:opacity-60 cursor-pointer"
          style={
            done
              ? { background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }
              : { background: 'var(--coral)', color: '#fff', boxShadow: '0 8px 16px -8px rgba(232,99,58,.6)' }
          }
        >
          {isPending ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : done ? (
            <>Учи пак <ArrowRight className="w-3.5 h-3.5" /></>
          ) : (
            <>Започни <ArrowRight className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>
    </div>
  );
}
