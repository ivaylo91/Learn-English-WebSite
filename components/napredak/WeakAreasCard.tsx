import Link from 'next/link';
import { AlertCircle, ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export interface WeakLesson {
  lesson_id: string;
  score:     number;
  attempts:  number;
  lesson:    { title: string; level: string; slug: string; category: string };
}

interface Props {
  lessons: WeakLesson[];
}

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender' | 'gray'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 60  ? 'var(--sage-ink)' :
    score >= 40  ? 'var(--butter-ink)' :
                   'var(--rose-ink)';
  const bg =
    score >= 60  ? 'var(--sage)' :
    score >= 40  ? 'var(--butter)' :
                   'var(--rose)';

  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span
        className="text-xs font-bold tabular-nums shrink-0 px-1.5 py-0.5 rounded"
        style={{ background: bg, color }}
      >
        {score}%
      </span>
    </div>
  );
}

export default function WeakAreasCard({ lessons }: Props) {
  if (lessons.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-4 h-4" style={{ color: 'var(--butter-ink)' }} />
        <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Подобри резултатите</h2>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
      >
        {lessons.map((item, i) => (
          <Link
            key={item.lesson_id}
            href={`/gramatika/${item.lesson.slug}`}
            className="group flex items-center gap-4 px-5 py-4 transition-all hover:bg-[var(--bg-2)]"
            style={{ borderBottom: i < lessons.length - 1 ? '1px solid var(--line)' : undefined }}
          >
            {/* Level badge */}
            <Badge color={levelBadge[item.lesson.level] ?? 'gray'} className="shrink-0">
              {item.lesson.level}
            </Badge>

            {/* Title + score bar */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>
                {item.lesson.title}
              </p>
              <ScoreBar score={item.score} />
            </div>

            {/* Attempts + arrow */}
            <div className="shrink-0 text-right">
              <p className="text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
                {item.attempts} {item.attempts === 1 ? 'опит' : 'опита'}
              </p>
              <ArrowRight
                className="w-4 h-4 mt-0.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--coral)' }}
              />
            </div>
          </Link>
        ))}

        {/* Footer hint */}
        <div
          className="px-5 py-3 text-xs"
          style={{ background: 'var(--butter)', color: 'var(--butter-ink)', borderTop: '1px solid #e8d8a8' }}
        >
          Уроците с резултат под 60% са показани тук. Повтори ги, за да ги завършиш.
        </div>
      </div>
    </section>
  );
}
