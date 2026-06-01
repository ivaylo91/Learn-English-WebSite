import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Badge from '@/components/ui/Badge';
import WritingExercise from '@/components/writing/WritingExercise';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender' | 'gray'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase  = await createClient();
  const { data }  = await supabase.from('writing_exercises').select('title, level').eq('slug', slug).single();
  if (!data) return { title: 'Упражнение | Писане' };
  return {
    title: `${data.title} (${data.level}) | Писане`,
    description: `Упражнение по английско писане: ${data.title}.`,
    alternates: { canonical: `/pisane/${slug}` },
  };
}

export default async function WritingExercisePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: exercise } = await supabase
    .from('writing_exercises')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!exercise) notFound();

  const [progressRes, siblingsRes] = await Promise.all([
    user
      ? supabase
          .from('user_writing_progress')
          .select('score, completed')
          .eq('user_id', user.id)
          .eq('exercise_id', exercise.id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    supabase
      .from('writing_exercises')
      .select('slug, title')
      .eq('level', exercise.level)
      .order('created_at'),
  ]);

  const progress  = progressRes.data;
  const siblings  = siblingsRes.data ?? [];
  const curIdx    = siblings.findIndex(s => s.slug === slug);
  const prevEx    = siblings[curIdx - 1] ?? null;
  const nextEx    = siblings[curIdx + 1] ?? null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--muted)' }}>
        <Link href="/pisane" className="transition-colors hover:underline" style={{ color: 'var(--butter-ink)' }}>
          Писане
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-medium truncate" style={{ color: 'var(--ink-2)' }}>{exercise.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge color={levelBadge[exercise.level] ?? 'gray'}>{exercise.level}</Badge>
          <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--muted)' }}>{exercise.topic}</span>
          {progress?.completed && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--sage)', color: 'var(--sage-ink)' }}>
              Завършено ✓
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
          {exercise.title}
        </h1>
        {progress?.score !== undefined && (
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Последен резултат: <span className="font-semibold" style={{ color: 'var(--ink-2)' }}>{progress.score}%</span>
          </p>
        )}
      </div>

      {/* Exercise */}
      {exercise.prompts?.length > 0 ? (
        <div className="mb-10">
          <WritingExercise
            exerciseId={exercise.id}
            prompts={exercise.prompts}
            userId={user?.id ?? null}
            prevScore={progress?.score}
          />
        </div>
      ) : (
        <div
          className="rounded-2xl p-6 mb-10 text-sm"
          style={{ background: 'var(--butter)', border: '1px solid #e8d8a8', color: 'var(--butter-ink)' }}
        >
          Въпросите за това упражнение скоро ще бъдат добавени.
        </div>
      )}

      {/* Prev / Next */}
      <div className="flex items-center justify-between gap-4 pt-6" style={{ borderTop: '1px solid var(--line)' }}>
        {prevEx ? (
          <Link
            href={`/pisane/${prevEx.slug}`}
            className="flex items-center gap-2 text-sm group"
            style={{ color: 'var(--muted)' }}
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="truncate max-w-[200px]">{prevEx.title}</span>
          </Link>
        ) : <div />}
        {nextEx ? (
          <Link
            href={`/pisane/${nextEx.slug}`}
            className="flex items-center gap-2 text-sm text-right group"
            style={{ color: 'var(--muted)' }}
          >
            <span className="truncate max-w-[200px]">{nextEx.title}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
