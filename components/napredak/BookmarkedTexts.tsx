import Link from 'next/link';
import { Bookmark, BookOpen, ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { BookmarkedText } from '@/lib/actions/reading-bookmarks';

interface Props {
  texts: BookmarkedText[];
}

const levelColor: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

export default function BookmarkedTexts({ texts }: Props) {
  if (texts.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4" style={{ color: 'var(--butter-ink)' }} />
          <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>
            Запазени текстове
          </h2>
        </div>
        <Link
          href="/chetene"
          className="text-xs font-semibold transition-colors hover:opacity-70"
          style={{ color: 'var(--muted)' }}
        >
          Всички текстове →
        </Link>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
      >
        {texts.map((text, i) => (
          <Link
            key={text.id}
            href={`/chetene/${text.slug}`}
            className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[var(--bg-2)] group"
            style={{ borderBottom: i < texts.length - 1 ? '1px solid var(--line)' : 'none' }}
          >
            <div
              className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--butter)' }}
            >
              <BookOpen className="w-4 h-4" style={{ color: 'var(--butter-ink)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>
                {text.title}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{text.topic}</p>
            </div>
            <Badge color={levelColor[text.level] ?? 'sky'}>{text.level}</Badge>
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
