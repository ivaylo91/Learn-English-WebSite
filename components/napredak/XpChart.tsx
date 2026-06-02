'use client';

import { useState } from 'react';

export interface DayXp {
  date:    string; // YYYY-MM-DD
  xp:      number;
  isToday: boolean;
}

interface Props {
  data:    DayXp[]; // 30 entries, oldest → newest
  total:   number;  // sum of all xp in the period
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('bg-BG', {
    day: 'numeric', month: 'short',
  });
}

// ── Chart constants ───────────────────────────────────────────────────────────

const BARS       = 30;
const BAR_W      = 8;
const GAP        = 2;
const STEP       = BAR_W + GAP;          // 10px per bar
const VB_W       = BARS * STEP;          // 300
const VB_H       = 64;
const MAX_BAR_H  = VB_H - 6;            // leave a little top padding
const MIN_BAR_H  = 2;                    // always show a tiny stub

// ── Component ─────────────────────────────────────────────────────────────────

export default function XpChart({ data, total }: Props) {
  const [tooltip, setTooltip] = useState<{ idx: number; x: number; y: number } | null>(null);

  const maxXp   = Math.max(...data.map(d => d.xp), 1);
  const bestIdx = data.reduce((bi, d, i) => (d.xp > data[bi].xp ? i : bi), 0);
  const best    = data[bestIdx];

  const firstDate = data[0]?.date  ?? '';
  const lastDate  = data[BARS - 1]?.date ?? '';

  // Month-change labels (show month name when month changes)
  const monthLabels: { idx: number; label: string }[] = [];
  data.forEach((d, i) => {
    if (i === 0) return; // skip first
    const prev = data[i - 1].date.slice(5, 7);
    const cur  = d.date.slice(5, 7);
    if (cur !== prev) {
      const dt = new Date(d.date + 'T00:00:00');
      monthLabels.push({
        idx:   i,
        label: dt.toLocaleDateString('bg-BG', { month: 'short' }),
      });
    }
  });

  const hovered = tooltip ? data[tooltip.idx] : null;

  return (
    <div>
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>XP за 30 дни</h2>
          {best.xp > 0 && (
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
              Най-добър ден: <span className="font-semibold tabular-nums" style={{ color: 'var(--coral)' }}>+{best.xp} XP</span>
              {' '}· {fmtDate(best.date)}
            </p>
          )}
        </div>
        <div className="text-right">
          <p
            className="text-2xl font-extrabold tabular-nums leading-none"
            style={{ fontFamily: 'var(--font-display)', color: total > 0 ? 'var(--coral)' : 'var(--muted)' }}
          >
            +{total.toLocaleString('bg-BG')}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>XP общо</p>
        </div>
      </div>

      {/* SVG chart */}
      <div
        className="rounded-2xl px-4 pb-3 pt-4 relative"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        {total === 0 && (
          <p className="text-xs text-center pb-2" style={{ color: 'var(--muted)' }}>
            Все още няма активност. Започни да учиш, за да видиш графиката!
          </p>
        )}

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full overflow-visible"
          style={{ height: 64 }}
          onMouseLeave={() => setTooltip(null)}
        >
          {/* Subtle grid line at 50% */}
          <line
            x1={0} y1={VB_H / 2} x2={VB_W} y2={VB_H / 2}
            stroke="var(--line)" strokeWidth={0.5} strokeDasharray="2 3"
          />

          {/* Bars */}
          {data.map((d, i) => {
            const barH  = d.xp > 0
              ? Math.max(MIN_BAR_H + 2, (d.xp / maxXp) * MAX_BAR_H)
              : MIN_BAR_H;
            const x     = i * STEP;
            const y     = VB_H - barH;
            const fill  = d.xp > 0
              ? (d.isToday ? '#c4441a' : '#e8633a')
              : 'var(--line)';
            const opacity = d.xp > 0 ? 1 : 0.35;

            return (
              <g key={d.date}>
                <rect
                  x={x} y={y}
                  width={BAR_W} height={barH}
                  fill={fill} opacity={opacity}
                  rx={2}
                  style={{ cursor: 'default' }}
                  onMouseEnter={e => {
                    const svgEl = (e.target as SVGElement).closest('svg');
                    if (!svgEl) return;
                    const rect = svgEl.getBoundingClientRect();
                    const svgX = ((e.clientX - rect.left) / rect.width) * VB_W;
                    setTooltip({ idx: i, x: svgX, y });
                  }}
                />
                {/* Today marker — small dot above bar */}
                {d.isToday && d.xp > 0 && (
                  <circle cx={x + BAR_W / 2} cy={y - 4} r={2} fill="#c4441a" />
                )}
              </g>
            );
          })}

          {/* Tooltip */}
          {tooltip && hovered && (
            <g>
              {/* Vertical highlight */}
              <rect
                x={tooltip.idx * STEP - 1} y={0}
                width={BAR_W + 2} height={VB_H}
                fill="var(--coral)" opacity={0.07} rx={2}
              />
              {/* Tooltip box */}
              <rect
                x={Math.min(tooltip.x - 22, VB_W - 48)} y={0}
                width={46} height={22}
                fill="var(--ink)" rx={4} opacity={0.88}
              />
              <text
                x={Math.min(tooltip.x - 22, VB_W - 48) + 23}
                y={14}
                textAnchor="middle"
                fontSize={9}
                fill="#fff"
                fontWeight={600}
              >
                {hovered.xp > 0 ? `+${hovered.xp} XP` : 'Без активност'}
              </text>
            </g>
          )}
        </svg>

        {/* Date labels below chart */}
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{fmtDate(firstDate)}</span>
          {monthLabels.map(ml => (
            <span key={ml.idx} className="text-[10px] font-semibold" style={{ color: 'var(--muted)', position: 'relative', left: `${((ml.idx / (BARS - 1)) * 100) - 50}%` }}>
              {ml.label}
            </span>
          ))}
          <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{fmtDate(lastDate)}</span>
        </div>
      </div>
    </div>
  );
}
