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

const levelColor: Record<string, 'green' | 'amber' | 'purple' | 'gray'> = {
  A1: 'green', A2: 'green',
  B1: 'amber', B2: 'amber',
  C1: 'purple', C2: 'purple',
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
          { label: 'Клипа',       value: `${clips.length}` },
          { label: 'Завършени',   value: `${completedCount}` },
          { label: 'Минути',      value: `${totalMinutes}` },
        ]}
      />

      {clips.length === 0 ? (
        <div className="py-16 text-center text-gray-400 text-sm">
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
                className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-[0_4px_20px_-4px_rgba(147,51,234,0.12)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${done ? 'bg-green-100' : 'bg-purple-600'}`}>
                    {done
                      ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                      : <Headphones  className="w-5 h-5 text-white" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">{clip.title}</h3>
                      <Badge color={levelColor[clip.level] ?? 'gray'}>{clip.level}</Badge>
                    </div>
                    <Badge color="gray">{clip.topic}</Badge>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-400">
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
                        <span className="font-semibold text-gray-500 tabular-nums">{p.score}%</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Waveform decoration */}
                <div className="mt-4 flex items-center gap-0.5 h-7">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-colors ${done ? 'bg-green-200' : 'bg-purple-100 group-hover:bg-purple-200'}`}
                      style={{ height: `${18 + Math.sin(i * 0.9) * 10}px` }}
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
