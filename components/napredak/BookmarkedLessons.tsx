import Link from 'next/link';
import { Bookmark, PenLine, ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { BookmarkedLesson } from '@/lib/actions/grammar-bookmarks';

interface Props {
  lessons: BookmarkedLesson[];
}

const levelColor: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

export default function BookmarkedLessons({ lessons }: Props) {
  if (lessons.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4" style={{ color: 'var(--lav-ink)' }} />
          <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>
            Запазени уроци
          </h2>
        </div>
        <Link
          href="/gramatika"
          className="text-xs font-semibold transition-colors hover:opacity-70"
          style={{ color: 'var(--muted)' }}
        >
          Всички уроци →
        </Link>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
      >
        {lessons.map((lesson, i) => (
          <Link
            key={lesson.id}
            href={`/gramatika/${lesson.slug}`}
            className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[var(--bg-2)] group"
            style={{ borderBottom: i < lessons.length - 1 ? '1px solid var(--line)' : 'none' }}
          >
            <div
              className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--lavender)' }}
            >
              <PenLine className="w-4 h-4" style={{ color: 'var(--lav-ink)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>
                {lesson.title}
              </p>
            </div>
            <Badge color={levelColor[lesson.level] ?? 'sky'}>{lesson.level}</Badge>
            <ArrowRight
              className="shrink-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--muted)' }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
