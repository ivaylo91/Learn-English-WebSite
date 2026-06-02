'use client';

import Link from 'next/link';
import { CheckCircle2, BookMarked, PenLine, Settings } from 'lucide-react';
import { GOAL_TARGETS, type DailyGoal, type TodayProgress } from '@/lib/goals-utils';

interface Props {
  goal:  DailyGoal;
  today: TodayProgress;
}

// ── SVG ring ─────────────────────────────────────────────────────────────────

function Ring({ pct, color }: { pct: number; color: string }) {
  const r     = 40;
  const circ  = 2 * Math.PI * r;
  const fill  = Math.min(1, pct / 100) * circ;

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden>
      {/* Track */}
      <circle cx="48" cy="48" r={r} fill="none"
        stroke="var(--line)" strokeWidth="7" />
      {/* Progress */}
      <circle cx="48" cy="48" r={r} fill="none"
        stroke={color} strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${fill} ${circ - fill}`}
        transform="rotate(-90 48 48)"
      />
      {/* Percentage text */}
      <text x="48" y="53" textAnchor="middle"
        fontSize="17" fontWeight="800"
        fill="var(--ink)" fontFamily="var(--font-display)">
        {pct}%
      </text>
    </svg>
  );
}

// ── Progress bar row ─────────────────────────────────────────────────────────

function ProgressRow({
  icon: Icon, label, done, target, color,
}: {
  icon:   React.ElementType;
  label:  string;
  done:   number;
  target: number;
  color:  string;
}) {
  const pct = Math.min(100, Math.round((done / target) * 100));
  const met = done >= target;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5" style={{ color: met ? 'var(--sage-ink)' : 'var(--muted)' }} />
          <span className="text-xs font-semibold" style={{ color: 'var(--ink-2)' }}>{label}</span>
        </div>
        <span className="text-xs tabular-nums font-bold"
          style={{ color: met ? 'var(--sage-ink)' : 'var(--ink-2)' }}>
          {done} / {target}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: met ? 'var(--sage-ink)' : color }}
        />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DailyGoalCard({ goal, today }: Props) {
  const target = GOAL_TARGETS[goal];

  const wordPct    = Math.min(100, Math.round((today.words / target.words) * 100));
  const itemPct    = Math.min(100, Math.round((today.items / target.items) * 100));
  const overallPct = Math.round((wordPct + itemPct) / 2);
  const done       = today.words >= target.words && today.items >= target.items;

  const ringColor = done ? 'var(--sage-ink)' : 'var(--coral)';

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background:   'var(--surface)',
        border:       '1px solid var(--line)',
        boxShadow:    'var(--shadow-sm)',
      }}
    >
      {/* Done banner */}
      {done && (
        <div
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold"
          style={{ background: 'var(--sage)', color: 'var(--sage-ink)', borderBottom: '1px solid #b5d8be' }}
        >
          <CheckCircle2 className="w-4 h-4" />
          Дневната цел е изпълнена!
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-bold" style={{ color: 'var(--ink)' }}>
              Днешна цел
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{target.desc}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-bold"
              style={{
                background: done ? 'var(--sage)' : 'var(--coral-soft)',
                color:      done ? 'var(--sage-ink)' : 'var(--coral-ink)',
              }}
            >
              {target.label}
            </span>
            <Link href="/profil" title="Промени целта"
              className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-[var(--bg-2)]"
              style={{ color: 'var(--muted)' }}>
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Ring + bars */}
        <div className="flex items-center gap-6">
          {/* Ring */}
          <div className="shrink-0">
            <Ring pct={overallPct} color={ringColor} />
          </div>

          {/* Progress bars */}
          <div className="flex-1 flex flex-col gap-4">
            <ProgressRow
              icon={BookMarked}
              label="Думи"
              done={today.words}
              target={target.words}
              color="var(--coral)"
            />
            <ProgressRow
              icon={PenLine}
              label="Активности"
              done={today.items}
              target={target.items}
              color="var(--lav-ink)"
            />
          </div>
        </div>

        {/* CTA */}
        {!done && (
          <div className="flex gap-2 mt-5 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
            {today.words < target.words && (
              <Link
                href="/rechnik/study"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white active:scale-[.98] transition-all cursor-pointer"
                style={{ background: 'var(--coral)' }}
              >
                <BookMarked className="w-3.5 h-3.5" />
                Учи думи
              </Link>
            )}
            {today.items < target.items && (
              <Link
                href="/gramatika"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold active:scale-[.98] transition-all cursor-pointer"
                style={{
                  color:      'var(--lav-ink)',
                  background: 'var(--lavender)',
                  border:     '1px solid #c9bce4',
                }}
              >
                <PenLine className="w-3.5 h-3.5" />
                Граматика
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
