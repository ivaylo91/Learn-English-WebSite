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
  return {
    title: `${data.title} (${data.level}) | Граматика`,
    description: `Урок по английска граматика: ${data.title}. Обяснение на български и интерактивно упражнение.`,
  };
}

const levelColor: Record<string, 'green' | 'amber' | 'purple' | 'gray'> = {
  A1: 'green', A2: 'green',
  B1: 'amber', B2: 'amber',
  C1: 'purple', C2: 'purple',
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

  // Server action — saves grammar lesson score + XP
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
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/gramatika" className="hover:text-indigo-600 transition-colors">
          Граматика
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-600 font-medium truncate">{lesson.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge color={levelColor[lesson.level] ?? 'gray'}>{lesson.level}</Badge>
          <span className="text-xs text-gray-400 uppercase tracking-wide">{lesson.category}</span>
          {progress?.completed && (
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              Завършен ✓
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{lesson.title}</h1>
        {progress?.score !== undefined && (
          <p className="text-sm text-gray-400 mt-2">
            Резултат: <span className="font-semibold text-gray-600">{progress.score}%</span>
          </p>
        )}
      </div>

      {/* Markdown content */}
      {lesson.content_md ? (
        <div className="prose prose-gray prose-sm sm:prose-base max-w-none mb-10
          prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-gray-600 prose-p:leading-relaxed
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-table:text-sm prose-th:text-gray-700 prose-th:font-semibold prose-th:bg-gray-50
          prose-td:text-gray-600 prose-tr:border-gray-100
          prose-blockquote:border-l-indigo-400 prose-blockquote:text-gray-500 prose-blockquote:bg-indigo-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
          prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded
          prose-hr:border-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lesson.content_md}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 text-sm text-amber-700">
          Съдържанието на този урок скоро ще бъде добавено.
        </div>
      )}

      {/* Quiz */}
      {lesson.questions?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Упражнение</h2>
          <Quiz
            questions={lesson.questions}
            previousScore={progress?.score}
            onComplete={saveScore}
          />
        </div>
      )}

      {/* Prev / Next */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-100">
        {prevLesson ? (
          <Link
            href={`/gramatika/${prevLesson.slug}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="truncate max-w-[200px]">{prevLesson.title}</span>
          </Link>
        ) : <div />}
        {nextLesson ? (
          <Link
            href={`/gramatika/${nextLesson.slug}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors group text-right"
          >
            <span className="truncate max-w-[200px]">{nextLesson.title}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
