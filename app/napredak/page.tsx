import { redirect } from 'next/navigation';
import { TrendingUp, Flame, Trophy, Target, BookMarked, PenLine, Headphones, BookOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Badge from '@/components/ui/Badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Моят напредък | Учи Английски',
  description: 'Проследявай прогреса си по речник, граматика, слушане и четене.',
};

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'Сега';
  if (mins < 60) return `Преди ${mins} мин.`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Преди ${hrs} ч.`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Вчера';
  return `Преди ${days} дни`;
}

const moduleIcon = {
  vocabulary: BookMarked,
  grammar:    PenLine,
  listening:  Headphones,
  reading:    BookOpen,
} as const;

const moduleLabel = {
  vocabulary: 'Речник',
  grammar:    'Граматика',
  listening:  'Слушане',
  reading:    'Четене',
} as const;

const moduleColor = {
  vocabulary: { color: 'text-indigo-600', bg: 'bg-indigo-100' },
  grammar:    { color: 'text-emerald-600', bg: 'bg-emerald-100' },
  listening:  { color: 'text-purple-600', bg: 'bg-purple-100' },
  reading:    { color: 'text-amber-600', bg: 'bg-amber-100' },
} as const;

const actionLabel: Record<string, string> = {
  study_session:   'учебна сесия',
  lesson_complete: 'урок завършен',
  quiz_complete:   'тест завършен',
};

export default async function NapredakPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login?next=/napredak');

  const [
    profileRes,
    vocabTotalRes,
    vocabProgressRes,
    grammarTotalRes,
    grammarProgressRes,
    listeningTotalRes,
    listeningProgressRes,
    readingTotalRes,
    readingProgressRes,
    activityRes,
  ] = await Promise.all([
    supabase.from('profiles').select('xp, streak, level').eq('id', user.id).single(),
    supabase.from('vocabulary_words').select('id', { count: 'exact', head: true }),
    supabase.from('user_word_progress').select('status').eq('user_id', user.id),
    supabase.from('grammar_lessons').select('id', { count: 'exact', head: true }),
    supabase.from('user_lesson_progress').select('completed').eq('user_id', user.id),
    supabase.from('listening_clips').select('id', { count: 'exact', head: true }),
    supabase.from('user_content_progress').select('completed').eq('user_id', user.id).eq('content_type', 'listening'),
    supabase.from('reading_texts').select('id', { count: 'exact', head: true }),
    supabase.from('user_content_progress').select('completed').eq('user_id', user.id).eq('content_type', 'reading'),
    supabase
      .from('user_activity')
      .select('module, action, xp_gained, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  const profile        = profileRes.data;
  const vocabTotal     = vocabTotalRes.count ?? 0;
  const vocabRows      = vocabProgressRes.data ?? [];
  const vocabStudied   = vocabRows.length;
  const vocabKnown     = vocabRows.filter(r => r.status === 'known').length;
  const grammarTotal   = grammarTotalRes.count ?? 0;
  const grammarDone    = (grammarProgressRes.data ?? []).filter(r => r.completed).length;
  const listeningTotal = listeningTotalRes.count ?? 0;
  const listeningDone  = (listeningProgressRes.data ?? []).filter(r => r.completed).length;
  const readingTotal   = readingTotalRes.count ?? 0;
  const readingDone    = (readingProgressRes.data ?? []).filter(r => r.completed).length;
  const activity       = activityRes.data ?? [];

  const totalDone = grammarDone + listeningDone + readingDone;

  const moduleStats = [
    {
      label: 'Речник',    icon: BookMarked,
      done: vocabKnown,   total: Math.max(vocabTotal, 1),
      subtitle: vocabStudied > 0 ? `${vocabKnown} от ${vocabStudied} в списъка` : 'Добави думи за начало',
      color: 'text-indigo-600',  bg: 'bg-indigo-50',  bar: 'bg-indigo-500',
    },
    {
      label: 'Граматика', icon: PenLine,
      done: grammarDone,  total: Math.max(grammarTotal, 1),
      subtitle: `${grammarDone} от ${grammarTotal} урока`,
      color: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-500',
    },
    {
      label: 'Слушане',   icon: Headphones,
      done: listeningDone, total: Math.max(listeningTotal, 1),
      subtitle: `${listeningDone} от ${listeningTotal} клипа`,
      color: 'text-purple-600',  bg: 'bg-purple-50',  bar: 'bg-purple-500',
    },
    {
      label: 'Четене',    icon: BookOpen,
      done: readingDone,  total: Math.max(readingTotal, 1),
      subtitle: `${readingDone} от ${readingTotal} текста`,
      color: 'text-amber-600',   bg: 'bg-amber-50',   bar: 'bg-amber-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Моят напредък</h1>
        <p className="text-gray-500">Проследявай обучението си и поддържай темпото.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Дни поред',  value: String(profile?.streak ?? 0),   icon: Flame,      color: 'text-orange-500', bg: 'bg-orange-50'  },
          { label: 'Точки общо', value: String(profile?.xp ?? 0),        icon: Trophy,     color: 'text-amber-600',  bg: 'bg-amber-50'   },
          { label: 'Завършени',  value: String(totalDone),               icon: Target,     color: 'text-indigo-600', bg: 'bg-indigo-50'  },
          { label: 'Ниво',       value: profile?.level ?? '—',           icon: TrendingUp, color: 'text-emerald-600',bg: 'bg-emerald-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Module progress */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Прогрес по модул</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {moduleStats.map(({ label, icon: Icon, done, total, subtitle, color, bg, bar }) => {
            const pct = Math.round((done / total) * 100);
            return (
              <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-gray-900">{label}</span>
                      <Badge color="gray">{pct}%</Badge>
                    </div>
                    <p className="text-xs text-gray-400">{subtitle}</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${bar} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Последна активност</h2>
        {activity.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-400 text-sm">
            Все още няма активност — започни да учиш!
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {activity.map((a, i) => {
              const mod = a.module as keyof typeof moduleIcon;
              const Icon = moduleIcon[mod] ?? BookMarked;
              const { color, bg } = moduleColor[mod] ?? { color: 'text-gray-600', bg: 'bg-gray-100' };
              const label = `${moduleLabel[mod] ?? mod} — ${actionLabel[a.action] ?? a.action}`;
              return (
                <div key={i} className="flex items-center gap-4 p-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${bg} ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    {a.xp_gained > 0 && (
                      <p className="text-xs text-gray-500">+{a.xp_gained} XP</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{relativeTime(a.created_at)}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}
