import Link from 'next/link';
import { AlertCircle, ArrowRight, PenLine, Headphones, BookOpen, Pencil } from 'lucide-react';
import Badge from '@/components/ui/Badge';

// ── Types ─────────────────────────────────────────────────────────────────────

export type WeakModule = 'grammar' | 'listening' | 'reading' | 'writing';

export interface WeakItem {
  id:       string;
  title:    string;
  level:    string;
  score:    number;
  href:     string;
  module:   WeakModule;
  attempts?: number;
}

interface Props {
  items: WeakItem[];
}

// ── Module meta ───────────────────────────────────────────────────────────────

const MODULE_META: Record<WeakModule, {
  icon: React.ElementType; bg: string; color: string; label: string;
}> = {
  grammar:   { icon: PenLine,    bg: 'var(--lavender)',   color: 'var(--lav-ink)',    label: 'Граматика' },
  listening: { icon: Headphones, bg: 'var(--sky)',        color: 'var(--sky-ink)',    label: 'Слушане'   },
  reading:   { icon: BookOpen,   bg: 'var(--sage)',       color: 'var(--sage-ink)',   label: 'Четене'    },
  writing:   { icon: Pencil,     bg: 'var(--butter)',     color: 'var(--butter-ink)', label: 'Писане'    },
};

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender' | 'gray'> = {
  A1: 'sage', A2: 'sage', B1: 'sky', B2: 'sky', C1: 'lavender', C2: 'lavender',
};

// ── Score bar ─────────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const color = score >= 40 ? 'var(--butter-ink)' : 'var(--rose-ink)';
  const bg    = score >= 40 ? 'var(--butter)'     : 'var(--rose)';
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-xs font-bold tabular-nums shrink-0 px-1.5 py-0.5 rounded" style={{ background: bg, color }}>
        {score}%
      </span>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WeakAreasCard({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-4 h-4" style={{ color: 'var(--butter-ink)' }} />
        <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Подобри резултатите</h2>
        <span
          className="px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ background: 'var(--butter)', color: 'var(--butter-ink)' }}
        >
          {items.length}
        </span>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
      >
        {items.map((item, i) => {
          const meta = MODULE_META[item.module];
          const Icon = meta.icon;
          return (
            <Link
              key={`${item.module}-${item.id}`}
              href={item.href}
              className="group flex items-center gap-3 px-5 py-4 transition-all hover:bg-[var(--bg-2)]"
              style={{ borderBottom: i < items.length - 1 ? '1px solid var(--line)' : undefined }}
            >
              {/* Module icon */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: meta.bg }}
              >
                <Icon className="w-4 h-4" style={{ color: meta.color }} />
              </div>

              {/* Level badge */}
              <Badge color={levelBadge[item.level] ?? 'gray'} className="shrink-0">
                {item.level}
              </Badge>

              {/* Title + score bar */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>
                  {item.title}
                </p>
                <ScoreBar score={item.score} />
              </div>

              {/* Attempts (grammar only) + arrow */}
              <div className="shrink-0 text-right">
                {item.attempts !== undefined && (
                  <p className="text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
                    {item.attempts} {item.attempts === 1 ? 'опит' : 'опита'}
                  </p>
                )}
                <ArrowRight
                  className="w-4 h-4 mt-0.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--coral)' }}
                />
              </div>
            </Link>
          );
        })}

        {/* Footer */}
        <div
          className="px-5 py-3 text-xs"
          style={{ background: 'var(--butter)', color: 'var(--butter-ink)', borderTop: '1px solid #e8d8a8' }}
        >
          Упражнения и уроци с резултат под 60% — повтори ги, за да ги завършиш.
        </div>
      </div>
    </section>
  );
}
