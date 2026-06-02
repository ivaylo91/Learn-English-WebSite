import Link from 'next/link';
import {
  Flame, Trophy, TrendingUp, BookMarked, PenLine,
  Headphones, BookOpen, Pencil, ArrowRight, Zap, CheckCircle2,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface Props {
  name:      string;
  level:     string;
  xp:        number;
  streak:    number;
  dueCount:  number;
  todayXp:   number;
}

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender' | 'gray'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

const MODULES = [
  { href: '/rechnik',   icon: BookMarked, label: 'Речник',    bg: 'var(--coral-soft)', color: 'var(--coral-ink)' },
  { href: '/gramatika', icon: PenLine,    label: 'Граматика', bg: 'var(--lavender)',   color: 'var(--lav-ink)'   },
  { href: '/slusham',   icon: Headphones, label: 'Слушане',   bg: 'var(--sky)',        color: 'var(--sky-ink)'   },
  { href: '/chetene',   icon: BookOpen,   label: 'Четене',    bg: 'var(--sage)',       color: 'var(--sage-ink)'  },
  { href: '/pisane',    icon: Pencil,     label: 'Писане',    bg: 'var(--butter)',     color: 'var(--butter-ink)'},
] as const;

export default function PersonalHero({ name, level, xp, streak, dueCount, todayXp }: Props) {
  const dueLabel   = dueCount === 1 ? '1 дума' : `${dueCount} думи`;
  const hasDue     = dueCount > 0;
  const hasStreak  = streak > 0;
  const displayName = name.split(' ')[0] || name; // first name only

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* ── Greeting + stat chips ─────────────────────────────────────────── */}
      <div className="mb-8">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1.1 }}
        >
          Здравей, {displayName}!
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <Badge color={levelBadge[level] ?? 'gray'}>{level}</Badge>

          {hasStreak && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'var(--peach)', color: 'var(--coral-ink)', border: '1px solid #f4c8a8' }}
            >
              <Flame className="w-3.5 h-3.5" />
              {streak} {streak === 1 ? 'ден' : 'дни'} поред
            </span>
          )}

          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'var(--butter)', color: 'var(--butter-ink)', border: '1px solid #e8d8a8' }}
          >
            <Trophy className="w-3.5 h-3.5" />
            {xp.toLocaleString('bg-BG')} XP
          </span>

          {todayXp > 0 && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'var(--sage)', color: 'var(--sage-ink)', border: '1px solid #b5d8be' }}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              +{todayXp} XP днес
            </span>
          )}
        </div>
      </div>

      {/* ── Primary action card ──────────────────────────────────────────────── */}
      <div
        className="rounded-3xl p-7 mb-8"
        style={{
          background: hasDue
            ? 'linear-gradient(135deg, var(--coral-soft) 0%, #ffe8de 100%)'
            : 'linear-gradient(135deg, var(--sage) 0%, #d4edd8 100%)',
          border: `1px solid ${hasDue ? '#f4c8a8' : '#b5d8be'}`,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
          <div>
            {hasDue ? (
              <>
                <p
                  className="text-2xl font-extrabold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
                >
                  🔥 {dueLabel} за повторение
                </p>
                <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
                  SM-2 умно повторение — системата знае точно кое трябва да прегледаш.
                </p>
              </>
            ) : (
              <>
                <p
                  className="text-2xl font-extrabold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
                >
                  ✓ Всичко прегледано!
                </p>
                <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
                  Нямаш думи за повторение в момента. Добави нови или продължи с урок.
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            {hasDue && (
              <Link
                href="/rechnik/study"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white cursor-pointer hover:-translate-y-0.5 transition-all active:scale-[.98]"
                style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
              >
                <Zap className="w-4 h-4" />
                Учи {dueLabel}
              </Link>
            )}
            <Link
              href="/napredak"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer hover:-translate-y-0.5 transition-all active:scale-[.98]"
              style={{
                background: hasDue ? 'rgba(255,255,255,0.7)' : 'var(--sage-ink)',
                color:      hasDue ? 'var(--ink-2)' : '#fff',
                border:     hasDue ? '1px solid rgba(255,255,255,0.8)' : 'none',
              }}
            >
              {hasDue ? (
                <>Виж напредъка <ArrowRight className="w-4 h-4" /></>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> Напредък</>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Module quick-access ──────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.15em] mb-3" style={{ color: 'var(--muted)' }}>
          Модули
        </p>
        <div className="grid grid-cols-5 gap-2">
          {MODULES.map(({ href, icon: Icon, label, bg, color }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl text-center transition-all hover:-translate-y-0.5 active:scale-[.97] group"
              style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: bg }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--ink-2)' }}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}
