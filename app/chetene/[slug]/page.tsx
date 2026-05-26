import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createClient } from '@/lib/supabase/server';
import Quiz from '@/components/grammar/Quiz';
import Badge from '@/components/ui/Badge';
import { ChevronLeft, Clock, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase  = await createClient();
  const { data }  = await supabase.from('reading_texts').select('title, level, topic').eq('slug', slug).single();
  if (!data) return { title: 'Текст | Четене' };
  return {
    title: `${data.title} (${data.level}) | Четене`,
    description: `Текст за четене на ниво ${data.level} по темата „${data.topic}". Речник и въпроси за разбиране.`,
  };
}

const levelColor: Record<string, 'green' | 'amber' | 'purple' | 'gray'> = {
  A1: 'green', A2: 'green',
  B1: 'amber', B2: 'amber',
  C1: 'purple', C2: 'purple',
};

export default async function ReadingTextPage({ params }: Props) {
  const { slug }  = await params;
  const supabase  = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: text } = await supabase
    .from('reading_texts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!text) notFound();

  const progressRes = user
    ? await supabase
        .from('user_content_progress')
        .select('score, completed')
        .eq('user_id', user.id)
        .eq('content_type', 'reading')
        .eq('content_id', text.id)
        .maybeSingle()
    : { data: null };

  const progress = progressRes.data;

  async function saveScore(score: number) {
    'use server';
    if (!user) return;
    const sb = await createClient();
    await sb.from('user_content_progress').upsert(
      {
        user_id:      user.id,
        content_type: 'reading',
        content_id:   text.id,
        score,
        completed:    score >= 60,
        completed_at: score >= 60 ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id,content_type,content_id' }
    );
    if (score >= 60) {
      await sb.rpc('record_activity', {
        p_user_id: user.id,
        p_module:  'reading',
        p_action:  'quiz_complete',
        p_xp:      score >= 80 ? 15 : 8,
        p_meta:    { text_id: text.id, score },
      });
    }
  }

  const vocab: { en: string; bg: string }[] = text.vocabulary ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/chetene"
        className="inline-flex items-center gap-1.5 text-sm text-amber-600 hover:underline mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Обратно към четене
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge color={levelColor[text.level] ?? 'gray'}>{text.level}</Badge>
          <Badge color="amber">{text.topic}</Badge>
          {progress?.completed && (
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              Прочетен ✓
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">{text.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />{text.reading_time_minutes} мин четене
          </span>
          {text.questions?.length > 0 && (
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />{text.questions.length} въпроса
            </span>
          )}
          {progress?.score !== undefined && (
            <span>Резултат: <span className="font-semibold text-gray-600">{progress.score}%</span></span>
          )}
        </div>
      </div>

      {/* Vocabulary preview */}
      {vocab.length > 0 && (
        <details className="group mb-8 bg-amber-50 rounded-2xl border border-amber-100 overflow-hidden">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-amber-900 text-sm list-none">
            Ключови думи ({vocab.length})
            <span className="text-amber-500 group-open:rotate-180 transition-transform text-xs">▼</span>
          </summary>
          <div className="px-5 pb-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {vocab.map(v => (
              <div key={v.en} className="bg-white rounded-xl px-3 py-2 border border-amber-100 shadow-sm">
                <p className="font-semibold text-gray-900 text-sm">{v.en}</p>
                <p className="text-xs text-amber-700 italic mt-0.5">{v.bg}</p>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Reading text */}
      <div className="prose prose-gray prose-sm sm:prose-base max-w-none mb-10
        prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
        prose-p:text-gray-700 prose-p:leading-[1.85]
        prose-strong:text-gray-900
        prose-table:text-sm prose-th:bg-gray-50 prose-th:font-semibold
        prose-blockquote:border-l-amber-400 prose-blockquote:bg-amber-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
        prose-hr:border-gray-100">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text.body_md}
        </ReactMarkdown>
      </div>

      {/* Quiz */}
      {text.questions?.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Въпроси за разбиране</h2>
          <Quiz
            questions={text.questions}
            previousScore={progress?.score}
            onComplete={saveScore}
          />
        </div>
      )}
    </div>
  );
}
