import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import AudioPlayer from '@/components/listening/AudioPlayer';
import Quiz from '@/components/grammar/Quiz';
import Badge from '@/components/ui/Badge';
import { ChevronLeft, Clock, BarChart2, Headphones, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id }   = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('listening_clips').select('title, level, topic').eq('id', id).single();
  if (!data) return { title: 'Клип | Слушане' };
  const title = `${data.title} (${data.level}) | Слушане`;
  const description = `Аудио клип на ниво ${data.level} по темата „${data.topic}". Транскрипт и въпроси за разбиране.`;
  return {
    title,
    description,
    alternates: { canonical: `/slusham/${id}` },
    openGraph:  { title, description, url: `/slusham/${id}` },
  };
}

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

function formatDuration(secs: number) {
  if (!secs) return null;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default async function ListeningClipPage({ params }: Props) {
  const { id }    = await params;
  const supabase  = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: clip } = await supabase
    .from('listening_clips')
    .select('*')
    .eq('id', id)
    .single();

  if (!clip) notFound();

  const [progressRes, nextClipRes] = await Promise.all([
    user
      ? supabase
          .from('user_content_progress')
          .select('score, completed')
          .eq('user_id', user.id)
          .eq('content_type', 'listening')
          .eq('content_id', id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    // Next clip: same level, different id, ordered by created_at
    supabase
      .from('listening_clips')
      .select('id, title, level, topic, duration_seconds')
      .eq('level', clip.level)
      .neq('id', id)
      .order('created_at')
      .limit(1)
      .maybeSingle(),
  ]);

  const progress = progressRes.data;
  const nextClip = nextClipRes.data;
  const duration = formatDuration(clip.duration_seconds);

  async function saveScore(score: number) {
    'use server';
    if (!user) return;
    const sb = await createClient();
    await sb.from('user_content_progress').upsert(
      {
        user_id:      user.id,
        content_type: 'listening',
        content_id:   id,
        score,
        completed:    score >= 60,
        completed_at: score >= 60 ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id,content_type,content_id' }
    );
    if (score >= 60) {
      await sb.rpc('record_activity', {
        p_user_id: user.id,
        p_module:  'listening',
        p_action:  'quiz_complete',
        p_xp:      score >= 80 ? 15 : 8,
        p_meta:    { clip_id: id, score },
      });
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/slusham"
        className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:underline"
        style={{ color: 'var(--sky-ink)' }}
      >
        <ChevronLeft className="w-4 h-4" />
        Обратно към слушане
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge color={levelBadge[clip.level] ?? 'sage'}>{clip.level}</Badge>
          <Badge color="sky">{clip.topic}</Badge>
          {progress?.completed && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'var(--sage)', color: 'var(--sage-ink)' }}
            >
              Завършен ✓
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3" style={{ color: 'var(--ink)' }}>
          {clip.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
          {duration && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />{duration}
            </span>
          )}
          {clip.questions?.length > 0 && (
            <span className="flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4" />{clip.questions.length} въпроса
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

      <div className="mb-10">
        <AudioPlayer audioUrl={clip.audio_url} transcript={clip.transcript} />
      </div>

      {clip.questions?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--ink)' }}>Въпроси за разбиране</h2>
          <Quiz
            questions={clip.questions}
            previousScore={progress?.score}
            onComplete={saveScore}
          />
        </div>
      )}

      {/* Next clip card */}
      {nextClip && (
        <Link
          href={`/slusham/${nextClip.id}`}
          className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 group"
          style={{ background: 'var(--sky)', border: '1px solid var(--sky-ink)20', boxShadow: 'var(--shadow-sm)' }}
        >
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(31,77,119,.12)' }}
          >
            <Headphones className="w-5 h-5" style={{ color: 'var(--sky-ink)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[.1em] mb-0.5" style={{ color: 'var(--sky-ink)' }}>
              Следващ клип
            </p>
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>
              {nextClip.title}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              {nextClip.level} · {nextClip.topic}
              {nextClip.duration_seconds ? ` · ${formatDuration(nextClip.duration_seconds)}` : ''}
            </p>
          </div>
          <ArrowRight
            className="shrink-0 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: 'var(--sky-ink)' }}
          />
        </Link>
      )}
    </div>
  );
}
