import { redirect } from 'next/navigation';
import { TrendingUp, Flame, Trophy, Target, BookMarked, PenLine, Headphones, BookOpen, Pencil } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Badge from '@/components/ui/Badge';
import StreakCalendar from '@/components/napredak/StreakCalendar';
import StreakProtectionBanner from '@/components/StreakProtectionBanner';
import AchievementShelf from '@/components/achievements/AchievementShelf';
import DailyGoalCard from '@/components/goals/DailyGoalCard';
import ShareCard from '@/components/napredak/ShareCard';
import WeakAreasCard, { type WeakItem } from '@/components/napredak/WeakAreasCard';
import XpChart, { type DayXp } from '@/components/napredak/XpChart';
import { checkAndUnlockAchievements } from '@/lib/actions/achievements';
import { checkAndLogDailyGoal } from '@/lib/actions/goals';
import { computeTodayProgress, type DailyGoal } from '@/lib/goals-utils';
import Link from 'next/link';
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
  writing:    Pencil,
} as const;

const moduleLabel = {
  vocabulary: 'Речник',
  grammar:    'Граматика',
  listening:  'Слушане',
  reading:    'Четене',
  writing:    'Писане',
} as const;

const moduleTheme = {
  vocabulary: { bg: 'var(--coral-soft)', color: 'var(--coral-ink)', bar: 'var(--coral)' },
  grammar:    { bg: 'var(--lavender)',   color: 'var(--lav-ink)',   bar: 'var(--lav-ink)' },
  listening:  { bg: 'var(--sky)',        color: 'var(--sky-ink)',   bar: 'var(--sky-ink)' },
  reading:    { bg: 'var(--sage)',       color: 'var(--sage-ink)',  bar: 'var(--sage-ink)' },
  writing:    { bg: 'var(--butter)',     color: 'var(--butter-ink)', bar: 'var(--butter-ink)' },
} as const;

const actionLabel: Record<string, string> = {
  study_session:    'учебна сесия',
  lesson_complete:  'урок завършен',
  quiz_complete:    'тест завършен',
  exercise_complete: 'упражнение завършено',
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
    writingTotalRes,
    writingProgressRes,
    activityRes,
    activityDatesRes,
    todayActivityRes,
    xpActivityRes,
    weakAreasRes,
  ] = await Promise.all([
    supabase.from('profiles').select('name, xp, streak, level, last_active_at, daily_goal, streak_freeze_count').eq('id', user.id).single(),
    supabase.from('vocabulary_words').select('id', { count: 'exact', head: true }),
    supabase.from('user_word_progress').select('status').eq('user_id', user.id),
    supabase.from('grammar_lessons').select('id', { count: 'exact', head: true }),
    supabase.from('user_lesson_progress').select('completed').eq('user_id', user.id),
    supabase.from('listening_clips').select('id', { count: 'exact', head: true }),
    supabase.from('user_content_progress').select('content_id, score, completed').eq('user_id', user.id).eq('content_type', 'listening'),
    supabase.from('reading_texts').select('id', { count: 'exact', head: true }),
    supabase.from('user_content_progress').select('content_id, score, completed').eq('user_id', user.id).eq('content_type', 'reading'),
    supabase.from('writing_exercises').select('id', { count: 'exact', head: true }),
    supabase.from('user_writing_progress').select('exercise_id, score, completed').eq('user_id', user.id),
    supabase
      .from('user_activity')
      .select('module, action, xp_gained, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('user_activity')
      .select('created_at')
      .eq('user_id', user.id)
      .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true }),
    // Today's activity for daily goal progress
    supabase
      .from('user_activity')
      .select('module, action, metadata')
      .eq('user_id', user.id)
      .gte('created_at', `${new Date().toISOString().slice(0, 10)}T00:00:00.000Z`),
    // Last 30 days XP for the progress chart
    supabase
      .from('user_activity')
      .select('created_at, xp_gained')
      .eq('user_id', user.id)
      .gt('xp_gained', 0)
      .gte('created_at', new Date(Date.now() - 30 * 86_400_000).toISOString())
      .order('created_at', { ascending: true }),
    // Lessons with score < 60% — shown in weak areas card
    supabase
      .from('user_lesson_progress')
      .select('lesson_id, score, attempts, grammar_lessons(title, level, slug, category)')
      .eq('user_id', user.id)
      .lt('score', 60)
      .order('score', { ascending: true })
      .limit(5),
  ]);

  // Unique activity dates (YYYY-MM-DD, UTC) for streak calendar
  const activeDates = [...new Set(
    (activityDatesRes.data ?? []).map(r => r.created_at.slice(0, 10))
  )].sort();

  // Longest streak from sorted unique dates
  function longestStreak(dates: string[]): number {
    if (dates.length === 0) return 0;
    let best = 1, cur = 1;
    for (let i = 1; i < dates.length; i++) {
      const diff = (new Date(dates[i]).getTime() - new Date(dates[i - 1]).getTime()) / 86_400_000;
      if (diff === 1) { best = Math.max(best, ++cur); }
      else if (diff > 1) { cur = 1; }
    }
    return best;
  }
  const bestStreak = longestStreak(activeDates);

  // Log daily goal completion if met (must run before achievement check)
  await checkAndLogDailyGoal(user.id);

  // Check & unlock any newly earned achievements (silent — no toast on this page)
  await checkAndUnlockAchievements(user.id);

  const profile        = profileRes.data as { name?: string; xp: number; streak: number; level: string; last_active_at: string | null; daily_goal?: string; streak_freeze_count?: number } | null;
  const todayUTC       = new Date().toISOString().slice(0, 10);
  const streakAtRisk   = (profile?.streak ?? 0) > 0 && (profile?.last_active_at?.slice(0, 10) ?? '') < todayUTC;
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
  const writingTotal   = writingTotalRes.count ?? 0;
  const writingDone    = (writingProgressRes.data ?? []).filter(r => r.completed).length;
  const activity       = activityRes.data ?? [];
  const totalDone      = grammarDone + listeningDone + readingDone + writingDone;
  // ── XP chart data (30-day bar chart) ────────────────────────────────────────
  const todayUTCStr = new Date().toISOString().slice(0, 10);
  const xpByDay: Record<string, number> = {};
  for (const row of (xpActivityRes.data ?? [])) {
    const day = row.created_at.slice(0, 10);
    xpByDay[day] = (xpByDay[day] ?? 0) + (row.xp_gained as number);
  }
  const chartData: DayXp[] = Array.from({ length: 30 }, (_, i) => {
    const d    = new Date(Date.now() - (29 - i) * 86_400_000);
    const date = d.toISOString().slice(0, 10);
    return { date, xp: xpByDay[date] ?? 0, isToday: date === todayUTCStr };
  });
  const chartTotal = Object.values(xpByDay).reduce((s, v) => s + v, 0);

  // ── Weak areas — all modules with score < 60% ────────────────────────────────

  // Grammar weak items (already fetched with join)
  const grammarWeakItems: WeakItem[] = (weakAreasRes.data ?? [])
    .filter(r => r.grammar_lessons !== null)
    .map(r => ({
      id:       r.lesson_id,
      title:    (r.grammar_lessons as { title: string }).title,
      level:    (r.grammar_lessons as { level: string }).level,
      score:    r.score as number,
      href:     `/gramatika/${(r.grammar_lessons as { slug: string }).slug}`,
      module:   'grammar' as const,
      attempts: (r.attempts as number | null) ?? 1,
    }));

  // Listening/reading/writing: find IDs with score < 60 from existing data
  type ProgressWithScore = { content_id: string; score: number | null; completed: boolean };
  type WritingProgressWithScore = { exercise_id: string; score: number | null; completed: boolean };

  const listeningRows  = (listeningProgressRes.data ?? []) as ProgressWithScore[];
  const readingRows    = (readingProgressRes.data   ?? []) as ProgressWithScore[];
  const writingRows    = (writingProgressRes.data   ?? []) as WritingProgressWithScore[];

  const listeningWeakIds = listeningRows.filter(r => (r.score ?? 0) > 0 && (r.score ?? 0) < 60).map(r => r.content_id).slice(0, 5);
  const readingWeakIds   = readingRows.filter(r   => (r.score ?? 0) > 0 && (r.score ?? 0) < 60).map(r => r.content_id).slice(0, 5);
  const writingWeakIds   = writingRows.filter(r   => (r.score ?? 0) > 0 && (r.score ?? 0) < 60).map(r => r.exercise_id).slice(0, 5);

  // Secondary lookup for titles (only runs when there are weak items)
  const [weakClipsRes, weakTextsRes, weakExRes] = await Promise.all([
    listeningWeakIds.length > 0
      ? supabase.from('listening_clips').select('id, title, level').in('id', listeningWeakIds)
      : Promise.resolve({ data: [] as { id: string; title: string; level: string }[] }),
    readingWeakIds.length > 0
      ? supabase.from('reading_texts').select('id, slug, title, level').in('id', readingWeakIds)
      : Promise.resolve({ data: [] as { id: string; slug: string; title: string; level: string }[] }),
    writingWeakIds.length > 0
      ? supabase.from('writing_exercises').select('id, slug, title, level').in('id', writingWeakIds)
      : Promise.resolve({ data: [] as { id: string; slug: string; title: string; level: string }[] }),
  ]);

  const listeningWeakItems: WeakItem[] = (weakClipsRes.data ?? []).map(clip => ({
    id: clip.id, title: clip.title, level: clip.level,
    score: listeningRows.find(r => r.content_id === clip.id)?.score ?? 0,
    href:   `/slusham/${clip.id}`,
    module: 'listening' as const,
  }));
  const readingWeakItems: WeakItem[] = (weakTextsRes.data ?? []).map(text => ({
    id: text.id, title: text.title, level: text.level,
    score: readingRows.find(r => r.content_id === text.id)?.score ?? 0,
    href:   `/chetene/${(text as { slug: string }).slug}`,
    module: 'reading' as const,
  }));
  const writingWeakItems: WeakItem[] = (weakExRes.data ?? []).map(ex => ({
    id: ex.id, title: ex.title, level: ex.level,
    score: writingRows.find(r => r.exercise_id === ex.id)?.score ?? 0,
    href:   `/pisane/${(ex as { slug: string }).slug}`,
    module: 'writing' as const,
  }));

  // Merge and sort by score (worst first), max 8 items
  const allWeakItems: WeakItem[] = [
    ...grammarWeakItems, ...listeningWeakItems, ...readingWeakItems, ...writingWeakItems,
  ].sort((a, b) => a.score - b.score).slice(0, 8);

  const dailyGoal      = ((profile?.daily_goal ?? 'standard') as DailyGoal);
  const todayProgress  = computeTodayProgress(
    (todayActivityRes.data ?? []) as { module: string; action: string; metadata: Record<string, unknown> }[]
  );

  const kpis = [
    { label: 'Дни поред',  value: String(profile?.streak ?? 0), icon: Flame,      bg: 'var(--peach)',       color: 'var(--coral-ink)' },
    { label: 'Точки общо', value: String(profile?.xp ?? 0),     icon: Trophy,     bg: 'var(--butter)',      color: 'var(--butter-ink)' },
    { label: 'Завършени',  value: String(totalDone),             icon: Target,     bg: 'var(--lavender)',    color: 'var(--lav-ink)' },
    { label: 'Ниво',       value: profile?.level ?? '—',         icon: TrendingUp, bg: 'var(--sage)',        color: 'var(--sage-ink)' },
  ];

  const moduleStats = [
    {
      label: 'Речник',    icon: BookMarked, module: 'vocabulary' as const,
      done: vocabKnown,   total: Math.max(vocabTotal, 1),
      subtitle: vocabStudied > 0 ? `${vocabKnown} от ${vocabStudied} в списъка` : 'Добави думи за начало',
    },
    {
      label: 'Граматика', icon: PenLine,    module: 'grammar' as const,
      done: grammarDone,  total: Math.max(grammarTotal, 1),
      subtitle: `${grammarDone} от ${grammarTotal} урока`,
    },
    {
      label: 'Слушане',   icon: Headphones, module: 'listening' as const,
      done: listeningDone, total: Math.max(listeningTotal, 1),
      subtitle: `${listeningDone} от ${listeningTotal} клипа`,
    },
    {
      label: 'Четене',    icon: BookOpen,   module: 'reading' as const,
      done: readingDone,  total: Math.max(readingTotal, 1),
      subtitle: `${readingDone} от ${readingTotal} текста`,
    },
    {
      label: 'Писане',    icon: Pencil,     module: 'writing' as const,
      done: writingDone,  total: Math.max(writingTotal, 1),
      subtitle: `${writingDone} от ${writingTotal} упражнения`,
    },
  ];

  return (
    <>
    {streakAtRisk && profile && <StreakProtectionBanner streak={profile.streak} freezeCount={profile.streak_freeze_count ?? 0} />}
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
            Моят напредък
          </h1>
          <p style={{ color: 'var(--muted)' }}>Проследявай обучението си и поддържай темпото.</p>
        </div>
        <Link
          href="/napredak/toplista"
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: 'var(--butter)', color: 'var(--butter-ink)', border: '1px solid #e8d8a8' }}
        >
          <Trophy className="w-3.5 h-3.5" />
          Класация
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {kpis.map(({ label, value, icon: Icon, bg, color }) => (
          <div
            key={label}
            className="rounded-2xl p-5 text-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: bg }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <p className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
              {value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Weak areas — all modules needing practice */}
      <WeakAreasCard items={allWeakItems} />

      {/* Share card */}
      <ShareCard
        streak={profile?.streak ?? 0}
        level={profile?.level  ?? 'A1'}
        xp={profile?.xp        ?? 0}
        name={profile?.name?.trim() || 'Потребител'}
      />

      {/* Daily goal */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Дневна цел</h2>
        </div>
        <DailyGoalCard goal={dailyGoal} today={todayProgress} />
      </section>

      {/* XP chart */}
      <section className="mb-10">
        <XpChart data={chartData} total={chartTotal} />
      </section>

      {/* Streak calendar */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Активност</h2>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
            <span>
              Текущ серия:&nbsp;
              <span className="font-bold tabular-nums" style={{ color: 'var(--coral)' }}>
                {profile?.streak ?? 0} {(profile?.streak ?? 0) === 1 ? 'ден' : 'дни'}
              </span>
            </span>
            <span>
              Най-дълъг:&nbsp;
              <span className="font-bold tabular-nums" style={{ color: 'var(--ink-2)' }}>
                {bestStreak} {bestStreak === 1 ? 'ден' : 'дни'}
              </span>
            </span>
          </div>
        </div>
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
        >
          <StreakCalendar activeDates={activeDates} />
        </div>
      </section>

      {/* Module progress */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--ink)' }}>Прогрес по модул</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {moduleStats.map(({ label, icon: Icon, done, total, subtitle, module }) => {
            const pct = Math.round((done / total) * 100);
            const theme = moduleTheme[module];
            return (
              <div
                key={label}
                className="rounded-2xl p-5"
                style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: theme.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: theme.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{label}</span>
                      <Badge color="sage">{pct}%</Badge>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{subtitle}</p>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: theme.bar }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Achievements */}
      <section className="mb-10">
        <AchievementShelf userId={user.id} />
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--ink)' }}>Последна активност</h2>
        {activity.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center text-sm"
            style={{ background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--muted)' }}
          >
            Все още няма активност — започни да учиш!
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
          >
            {activity.map((a, i) => {
              const mod = a.module as keyof typeof moduleIcon;
              const Icon = moduleIcon[mod] ?? BookMarked;
              const theme = moduleTheme[mod] ?? moduleTheme.vocabulary;
              const label = `${moduleLabel[mod] ?? mod} — ${actionLabel[a.action] ?? a.action}`;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4"
                  style={{ borderBottom: i < activity.length - 1 ? '1px solid var(--line)' : undefined }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: theme.bg, color: theme.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{label}</p>
                    {a.xp_gained > 0 && (
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>+{a.xp_gained} XP</p>
                    )}
                  </div>
                  <span className="text-xs shrink-0" style={{ color: 'var(--muted)' }}>
                    {relativeTime(a.created_at)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
    </>
  );
}
