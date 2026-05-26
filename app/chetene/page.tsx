import { BookOpen, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import Badge from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const levelColor: Record<string, 'green' | 'amber' | 'purple' | 'gray'> = {
  A1: 'green', A2: 'green',
  B1: 'amber', B2: 'amber',
  C1: 'purple', C2: 'purple',
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
        badgeColor="amber"
        gradient="from-amber-500 to-orange-500"
        bg="bg-amber-50"
        iconColor="text-amber-600"
        stats={[
          { label: 'Текста',     value: `${texts.length}` },
          { label: 'Прочетени',  value: `${completedCount}` },
          { label: 'Думи общо',  value: `${totalWords.toLocaleString()}+` },
        ]}
      />

      {texts.length === 0 ? (
        <div className="py-16 text-center text-gray-400 text-sm">
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
                className="group flex items-center gap-5 bg-white rounded-2xl px-6 py-5 border border-gray-100 hover:border-amber-200 hover:shadow-[0_4px_20px_-4px_rgba(245,158,11,0.12)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${done ? 'bg-green-100' : 'bg-amber-100'}`}>
                  {done
                    ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                    : <BookOpen    className="w-5 h-5 text-amber-600" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="font-bold text-gray-900">{text.title}</h3>
                    <Badge color={levelColor[text.level] ?? 'gray'}>{text.level}</Badge>
                    <Badge color="amber">{text.topic}</Badge>
                    {done && (
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✓</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{text.reading_time_minutes} мин четене
                    </span>
                    {text.questions?.length > 0 && (
                      <span>{text.questions.length} въпроса</span>
                    )}
                    {p?.score !== undefined && (
                      <span className="font-semibold text-gray-500 tabular-nums">{p.score}%</span>
                    )}
                  </div>
                </div>

                <ChevronRight className="shrink-0 w-4 h-4 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
