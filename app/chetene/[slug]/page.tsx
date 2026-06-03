import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createClient } from '@/lib/supabase/server';
import { getCachedReadingText, getCachedReadingSlugs } from '@/lib/db/static-cache';
import Quiz from '@/components/grammar/Quiz';
import Badge from '@/components/ui/Badge';
import { ChevronLeft, Clock, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getCachedReadingSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase  = await createClient();
  const { data }  = await supabase.from('reading_texts').select('title, level, topic').eq('slug', slug).single();
  if (!data) return { title: 'Текст | Четене' };
  const title = `${data.title} (${data.level}) | Четене`;
  const description = `Текст за четене на ниво ${data.level} по темата „${data.topic}". Речник и въпроси за разбиране.`;
  return {
    title,
    description,
    alternates: { canonical: `/chetene/${slug}` },
    openGraph:  { title, description, url: `/chetene/${slug}` },
  };
}

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

export default async function ReadingTextPage({ params }: Props) {
  const { slug }  = await params;
  // Text content + siblings: cached for 1h across all users
  const cached = await getCachedReadingText(slug);
  if (!cached) notFound();
  const { text } = cached;

  const supabase  = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const BASE = 'https://uchi-angliyski.vercel.app';
  const jsonLd = {
    '@context':  'https://schema.org',
    '@type':     'Article',
    headline:    text.title,
    description: `Текст за четене на английски ниво ${text.level} по темата „${text.topic}". Речник и въпроси за разбиране.`,
    url:         `${BASE}/chetene/${text.slug}`,
    inLanguage:  'en',
    educationalLevel:     text.level,
    learningResourceType: 'Reading',
    author:   { '@type': 'Organization', name: 'Учи Английски', url: BASE },
    provider: { '@type': 'Organization', name: 'Учи Английски', url: BASE },
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link
        href="/chetene"
        className="inline-flex items-center gap-1.5 text-sm mb-6 hover:underline transition-colors"
        style={{ color: 'var(--butter-ink)' }}
      >
        <ChevronLeft className="w-4 h-4" />
        Обратно към четене
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge color={levelBadge[text.level] ?? 'sage'}>{text.level}</Badge>
          <Badge color="butter">{text.topic}</Badge>
          {progress?.completed && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'var(--sage)', color: 'var(--sage-ink)' }}
            >
              Прочетен ✓
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3" style={{ color: 'var(--ink)' }}>
          {text.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />{text.reading_time_minutes} мин четене
          </span>
          {text.questions?.length > 0 && (
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />{text.questions.length} въпроса
            </span>
          )}
          {progress?.score !== undefined && (
            <span>
              Резултат:{' '}
              <span className="font-semibold" style={{ color: 'var(--ink-2)' }}>{progress.score}%</span>
            </span>
          )}
        </div>
      </div>

      {/* Vocabulary panel */}
      {vocab.length > 0 && (
        <details
          className="group mb-8 rounded-2xl overflow-hidden"
          style={{ background: 'var(--butter)', border: '1px solid #e8d8a8' }}
        >
          <summary
            className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-sm list-none"
            style={{ color: 'var(--butter-ink)' }}
          >
            Ключови думи ({vocab.length})
            <span className="group-open:rotate-180 transition-transform text-xs" style={{ color: 'var(--butter-ink)' }}>▼</span>
          </summary>
          <div className="px-5 pb-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {vocab.map(v => (
              <div
                key={v.en}
                className="rounded-xl px-3 py-2"
                style={{ background: 'var(--surface)', border: '1px solid #e8d8a8' }}
              >
                <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{v.en}</p>
                <p className="text-xs italic mt-0.5" style={{ color: 'var(--butter-ink)' }}>{v.bg}</p>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Reading text */}
      <div className="prose prose-sm sm:prose-base max-w-none prose-warm mb-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text.body_md}
        </ReactMarkdown>
      </div>

      {/* Quiz */}
      {text.questions?.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--ink)' }}>Въпроси за разбиране</h2>
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
