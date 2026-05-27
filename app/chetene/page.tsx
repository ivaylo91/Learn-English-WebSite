import { BookOpen, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import Badge from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Четене | Учи Английски',
  description: 'Текстове на различни нива от A2 до C1 с речник на ключови думи и въпроси за разбиране.',
};

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

export default async function ChetenePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [textsRes, progressRes] = await Promise.all([
    supabase.from('reading_texts').select('id, slug, title, level, topic, reading_time_minutes, questions').order('level').order('created_at'),
    user
      ? supabase
          .from('user_content_progress')
          .select('content_id, score, completed')
          .eq('user_id', user.id)
          .eq('content_type', 'reading')
      : Promise.resolve({ data: [] }),
  ]);

  const texts    = textsRes.data ?? [];
  const progress = progressRes.data ?? [];
  const progMap  = new Map(progress.map(p => [p.content_id, p]));
  const completedCount = progress.filter(p => p.completed).length;
  const totalWords     = texts.reduce((sum, t) => sum + t.reading_time_minutes * 200, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={BookOpen}
        title="Четене"
        description="Текстове на различни нива от A2 до C1. Ключови думи с превод преди четенето, въпроси за разбиране след текста."
        badge="Текстове"
        badgeColor="sage"
        gradient="from-amber-500 to-orange-500"
        bg="bg-amber-50"
        iconColor="text-amber-600"
        stats={[
          { label: 'Текста',    value: `${texts.length}` },
          { label: 'Прочетени', value: `${completedCount}` },
          { label: 'Думи общо', value: `${totalWords.toLocaleString()}+` },
        ]}
      />

      {texts.length === 0 ? (
        <div className="py-16 text-center text-sm" style={{ color: 'var(--muted)' }}>
          Текстовете скоро ще бъдат достъпни.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {texts.map(text => {
            const p    = progMap.get(text.id);
            const done = p?.completed ?? false;

            return (
              <Link
                key={text.id}
                href={`/chetene/${text.slug}`}
                className="group flex items-center gap-5 rounded-2xl px-6 py-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={
                    done
                      ? { background: 'var(--sage)', color: 'var(--sage-ink)' }
                      : { background: 'var(--butter)', color: 'var(--butter-ink)' }
                  }
                >
                  {done
                    ? <CheckCircle2 className="w-5 h-5" />
                    : <BookOpen     className="w-5 h-5" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="font-bold" style={{ color: 'var(--ink)' }}>{text.title}</h3>
                    <Badge color={levelBadge[text.level] ?? 'sage'}>{text.level}</Badge>
                    <Badge color="butter">{text.topic}</Badge>
                    {done && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--sage)', color: 'var(--sage-ink)' }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{text.reading_time_minutes} мин четене
                    </span>
                    {text.questions?.length > 0 && (
                      <span>{text.questions.length} въпроса</span>
                    )}
                    {p?.score !== undefined && (
                      <span className="font-semibold tabular-nums" style={{ color: 'var(--ink-2)' }}>
                        {p.score}%
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight
                  className="shrink-0 w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: 'var(--line-2)' }}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
