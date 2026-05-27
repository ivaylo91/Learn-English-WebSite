import { Headphones, Clock, BarChart2, CheckCircle2 } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import Badge from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Слушане | Учи Английски',
  description: 'Автентични аудио клипове с транскрипт и въпроси за разбиране на английски.',
};

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

export default async function SlushamPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [clipsRes, progressRes] = await Promise.all([
    supabase.from('listening_clips').select('*').order('level').order('created_at'),
    user
      ? supabase
          .from('user_content_progress')
          .select('content_id, score, completed')
          .eq('user_id', user.id)
          .eq('content_type', 'listening')
      : Promise.resolve({ data: [] }),
  ]);

  const clips    = clipsRes.data ?? [];
  const progress = progressRes.data ?? [];
  const progMap  = new Map(progress.map(p => [p.content_id, p]));
  const completedCount = progress.filter(p => p.completed).length;
  const totalMinutes   = clips.reduce((sum, c) => sum + Math.round(c.duration_seconds / 60), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={Headphones}
        title="Слушане"
        description="Автентични аудио клипове с транскрипт. Слушай, разбирай от контекст и отговаряй на въпроси за разбиране."
        badge="Аудио"
        badgeColor="sky"
        gradient="from-purple-600 to-pink-600"
        bg="bg-purple-50"
        iconColor="text-purple-600"
        stats={[
          { label: 'Клипа',     value: `${clips.length}` },
          { label: 'Завършени', value: `${completedCount}` },
          { label: 'Минути',    value: `${totalMinutes}` },
        ]}
      />

      {clips.length === 0 ? (
        <div className="py-16 text-center text-sm" style={{ color: 'var(--muted)' }}>
          Аудио клиповете скоро ще бъдат достъпни.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clips.map(clip => {
            const p        = progMap.get(clip.id);
            const done     = p?.completed ?? false;
            const duration = formatDuration(clip.duration_seconds);

            return (
              <Link
                key={clip.id}
                href={`/slusham/${clip.id}`}
                className="group rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={
                      done
                        ? { background: 'var(--sage)', color: 'var(--sage-ink)' }
                        : { background: 'var(--sky-ink)', color: '#fff' }
                    }
                  >
                    {done
                      ? <CheckCircle2 className="w-5 h-5" />
                      : <Headphones   className="w-5 h-5" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm" style={{ color: 'var(--ink)' }}>{clip.title}</h3>
                      <Badge color={levelBadge[clip.level] ?? 'sage'}>{clip.level}</Badge>
                    </div>
                    <Badge color="sky">{clip.topic}</Badge>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs" style={{ color: 'var(--muted)' }}>
                      {duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{duration}
                        </span>
                      )}
                      {clip.questions?.length > 0 && (
                        <span className="flex items-center gap-1">
                          <BarChart2 className="w-3 h-3" />{clip.questions.length} въпроса
                        </span>
                      )}
                      {p?.score !== undefined && (
                        <span className="font-semibold tabular-nums" style={{ color: 'var(--ink-2)' }}>
                          {p.score}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Waveform decoration */}
                <div className="mt-4 flex items-center gap-0.5 h-7">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full transition-colors"
                      style={{
                        height: `${18 + Math.sin(i * 0.9) * 10}px`,
                        background: done ? 'var(--sage)' : 'var(--sky)',
                      }}
                    />
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
