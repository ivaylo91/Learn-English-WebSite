import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createClient } from '@/lib/supabase/server';
import Quiz from '@/components/grammar/Quiz';
import Badge from '@/components/ui/Badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase  = await createClient();
  const { data }  = await supabase.from('grammar_lessons').select('title, level').eq('slug', slug).single();
  if (!data) return { title: 'Урок | Граматика' };
  const title = `${data.title} (${data.level}) | Граматика`;
  const description = `Урок по английска граматика: ${data.title}. Обяснение на български и интерактивно упражнение.`;
  return {
    title,
    description,
    alternates: { canonical: `/gramatika/${slug}` },
    openGraph:  { title, description, url: `/gramatika/${slug}` },
  };
}

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: lesson } = await supabase
    .from('grammar_lessons')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!lesson) notFound();

  const BASE = 'https://uchi-angliyski.vercel.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type':    'LearningResource',
    name:        lesson.title,
    description: `Урок по английска граматика: ${lesson.title}. Обяснение на български с интерактивно упражнение. Ниво ${lesson.level}.`,
    url:         `${BASE}/gramatika/${lesson.slug}`,
    educationalLevel:     lesson.level,
    learningResourceType: 'Lesson',
    teaches:     'English grammar',
    inLanguage:  'bg',
    provider: { '@type': 'Organization', name: 'Учи Английски', url: BASE },
  };

  const [progressRes, siblingsRes] = await Promise.all([
    user
      ? supabase
          .from('user_lesson_progress')
          .select('score, completed')
          .eq('user_id', user.id)
          .eq('lesson_id', lesson.id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    supabase
      .from('grammar_lessons')
      .select('slug, title, order_index')
      .eq('category', lesson.category)
      .order('order_index'),
  ]);

  const progress   = progressRes.data;
  const siblings   = siblingsRes.data ?? [];
  const currentIdx = siblings.findIndex(s => s.slug === slug);
  const prevLesson = siblings[currentIdx - 1] ?? null;
  const nextLesson = siblings[currentIdx + 1] ?? null;

  async function saveScore(score: number) {
    'use server';
    if (!user) return;
    const sb = await createClient();
    await sb.from('user_lesson_progress').upsert(
      {
        user_id:      user.id,
        lesson_id:    lesson.id,
        score,
        completed:    score >= 60,
        completed_at: score >= 60 ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id,lesson_id' }
    );
    if (score >= 60) {
      await sb.rpc('record_activity', {
        p_user_id: user.id,
        p_module:  'grammar',
        p_action:  'lesson_complete',
        p_xp:      score >= 80 ? 20 : 10,
        p_meta:    { lesson_id: lesson.id, score },
      });
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--muted)' }}>
        <Link href="/gramatika" className="transition-colors hover:underline" style={{ color: 'var(--lav-ink)' }}>
          Граматика
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span style={{ color: 'var(--ink-2)' }} className="font-medium truncate">{lesson.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge color={levelBadge[lesson.level] ?? 'sage'}>{lesson.level}</Badge>
          <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--muted)' }}>{lesson.category}</span>
          {progress?.completed && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'var(--sage)', color: 'var(--sage-ink)' }}
            >
              Завършен ✓
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>{lesson.title}</h1>
        {progress?.score !== undefined && (
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>
            Резултат: <span className="font-semibold" style={{ color: 'var(--ink-2)' }}>{progress.score}%</span>
          </p>
        )}
      </div>

      {/* Markdown content */}
      {lesson.content_md ? (
        <div className="prose prose-sm sm:prose-base max-w-none prose-warm mb-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lesson.content_md}
          </ReactMarkdown>
        </div>
      ) : (
        <div
          className="rounded-2xl p-6 mb-10 text-sm"
          style={{ background: 'var(--butter)', border: '1px solid #e8d8a8', color: 'var(--butter-ink)' }}
        >
          Съдържанието на този урок скоро ще бъде добавено.
        </div>
      )}

      {/* Quiz */}
      {lesson.questions?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--ink)' }}>Упражнение</h2>
          <Quiz
            questions={lesson.questions}
            previousScore={progress?.score}
            onComplete={saveScore}
          />
        </div>
      )}

      {/* Prev / Next */}
      <div
        className="flex items-center justify-between gap-4 pt-6"
        style={{ borderTop: '1px solid var(--line)' }}
      >
        {prevLesson ? (
          <Link
            href={`/gramatika/${prevLesson.slug}`}
            className="flex items-center gap-2 text-sm transition-colors group"
            style={{ color: 'var(--muted)' }}
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="truncate max-w-[200px]">{prevLesson.title}</span>
          </Link>
        ) : <div />}
        {nextLesson ? (
          <Link
            href={`/gramatika/${nextLesson.slug}`}
            className="flex items-center gap-2 text-sm transition-colors group text-right"
            style={{ color: 'var(--muted)' }}
          >
            <span className="truncate max-w-[200px]">{nextLesson.title}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
