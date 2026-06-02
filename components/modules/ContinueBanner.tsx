import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';

type BadgeColor = 'coral' | 'sage' | 'sky' | 'lavender' | 'butter';

interface Props {
  href:       string;
  title:      string;
  level:      string;
  badgeColor: BadgeColor;
  label?:     string;  // defaults to "Продължи от"
  sublabel?:  string;  // e.g. "наполовина завършен"
}

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender' | 'gray'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

export default function ContinueBanner({
  href, title, level, badgeColor, label = 'Продължи от', sublabel,
}: Props) {
  const accent: Record<BadgeColor, { bg: string; ink: string; border: string }> = {
    coral:    { bg: 'var(--coral-soft)', ink: 'var(--coral-ink)',  border: '#f4c8a8' },
    sage:     { bg: 'var(--sage)',       ink: 'var(--sage-ink)',   border: '#b5d8be' },
    sky:      { bg: 'var(--sky)',        ink: 'var(--sky-ink)',    border: '#b4cfe4' },
    lavender: { bg: 'var(--lavender)',   ink: 'var(--lav-ink)',    border: '#c9bce4' },
    butter:   { bg: 'var(--butter)',     ink: 'var(--butter-ink)', border: '#e8d8a8' },
  };
  const a = accent[badgeColor];

  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl mb-6 group transition-all hover:-translate-y-0.5 active:scale-[.99]"
      style={{ background: a.bg, border: `1px solid ${a.border}` }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Animated play dot */}
        <div
          className="shrink-0 w-2 h-2 rounded-full animate-pulse"
          style={{ background: a.ink }}
        />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[.13em] mb-0.5" style={{ color: a.ink, opacity: 0.7 }}>
            {label}
          </p>
          <p className="text-sm font-bold truncate" style={{ color: 'var(--ink)' }}>
            {title}
          </p>
          {sublabel && (
            <p className="text-xs mt-0.5" style={{ color: a.ink, opacity: 0.7 }}>{sublabel}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Badge color={levelBadge[level] ?? 'gray'}>{level}</Badge>
        <ArrowRight
          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
          style={{ color: a.ink }}
        />
      </div>
    </Link>
  );
}
