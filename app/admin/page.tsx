import Link from 'next/link';
import {
  BookMarked, PenLine, Headphones, BookOpen, Pencil,
  Users, Zap, Flame, TrendingUp, ArrowRight, Activity,
  VolumeX, FileX, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import { createServiceClient } from '@/lib/supabase/service';

export const metadata = { title: 'Админ табло | Учи Английски' };

// ── Helpers ───────────────────────────────────────────────────────────────────

function ago(days: number) {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

function StatCard({
  label, value, sub, icon: Icon, bg, color,
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; bg: string; color: string;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <p
        className="text-3xl font-extrabold tracking-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
      >
        {value}
      </p>
      <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--ink-2)' }}>{label}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{sub}</p>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminDashboard() {
  const db = createServiceClient();

  // ── Content counts ────────────────────────────────────────────────────────
  const [vocabC, grammarC, listeningC, readingC, writingC] = await Promise.all([
    db.from('vocabulary_words') .select('id', { count: 'exact', head: true }),
    db.from('grammar_lessons')  .select('id', { count: 'exact', head: true }),
    db.from('listening_clips')  .select('id', { count: 'exact', head: true }),
    db.from('reading_texts')    .select('id', { count: 'exact', head: true }),
    db.from('writing_exercises').select('id', { count: 'exact', head: true }),
  ]);

  // ── User analytics ────────────────────────────────────────────────────────
  const [
    totalUsersRes,
    activeWeekRes,
    newWeekRes,
    totalXpRes,
    avgStreakRes,
    activeTodayRes,
    clipsNoAudioRes,
    lessonsNoContentRes,
    contentNoQuestionsRes,
  ] = await Promise.all([
    db.from('profiles').select('id', { count: 'exact', head: true }),
    // Active in last 7 days: distinct users with activity
    db.from('user_activity')
      .select('user_id')
      .gte('created_at', ago(7))
      .limit(10000),                 // get rows, dedupe in JS
    db.from('profiles')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', ago(7)),
    db.from('profiles').select('xp'),
    db.from('profiles')
      .select('streak')
      .gt('streak', 0),
    // Active today
    db.from('user_activity')
      .select('user_id')
      .gte('created_at', ago(1))
      .limit(10000),
    // Quality: clips without audio
    db.from('listening_clips')
      .select('id', { count: 'exact', head: true })
      .or('audio_url.is.null,audio_url.eq.'),
    // Quality: grammar lessons without content
    db.from('grammar_lessons')
      .select('id', { count: 'exact', head: true })
      .or('content_md.is.null,content_md.eq.'),
    // Quality: any content type without questions
    db.from('grammar_lessons')
      .select('id', { count: 'exact', head: true })
      .eq('questions', '[]'),
  ]);

  const clipsNoAudio      = clipsNoAudioRes.count    ?? 0;
  const lessonsNoContent  = lessonsNoContentRes.count ?? 0;
  const contentNoQuestions = contentNoQuestionsRes.count ?? 0;
  const totalQualityIssues = clipsNoAudio + lessonsNoContent + contentNoQuestions;

  const totalUsers   = totalUsersRes.count ?? 0;
  const newThisWeek  = newWeekRes.count     ?? 0;
  const activeWeek   = new Set((activeWeekRes.data ?? []).map(r => r.user_id)).size;
  const activeToday  = new Set((activeTodayRes.data ?? []).map(r => r.user_id)).size;
  const totalXp      = (totalXpRes.data ?? []).reduce((s, r) => s + (r.xp ?? 0), 0);
  const streaks      = (avgStreakRes.data ?? []).map(r => r.streak ?? 0);
  const avgStreak    = streaks.length > 0
    ? Math.round(streaks.reduce((a, b) => a + b, 0) / streaks.length)
    : 0;

  // ── Top grammar lessons by completion count ───────────────────────────────
  const topLessonsRes = await db
    .from('user_lesson_progress')
    .select('lesson_id')
    .eq('completed', true)
    .limit(5000);

  // Count completions per lesson
  const lessonMap: Record<string, number> = {};
  for (const r of topLessonsRes.data ?? []) {
    lessonMap[r.lesson_id] = (lessonMap[r.lesson_id] ?? 0) + 1;
  }
  const topLessonIds = Object.entries(lessonMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id]) => id);

  const topLessonsDetail = topLessonIds.length > 0
    ? await db.from('grammar_lessons').select('id, title, level').in('id', topLessonIds)
    : { data: [] };

  const topLessons = topLessonIds
    .map(id => ({
      id,
      completions: lessonMap[id],
      ...(topLessonsDetail.data ?? []).find(l => l.id === id),
    }))
    .filter(l => l.title);

  // ── Recent signups (last 5) ───────────────────────────────────────────────
  const recentRes = await db
    .from('profiles')
    .select('id, name, level, xp, created_at')
    .order('created_at', { ascending: false })
    .limit(5);
  const recent = recentRes.data ?? [];

  // ── Content rows config ───────────────────────────────────────────────────
  const contentModules = [
    { href: '/admin/rechnik',   label: 'Речник',    icon: BookMarked, count: vocabC.count     ?? 0, color: 'var(--coral-soft)', ink: 'var(--coral-ink)', border: '#f4c8a8' },
    { href: '/admin/gramatika', label: 'Граматика', icon: PenLine,    count: grammarC.count   ?? 0, color: 'var(--lavender)',   ink: 'var(--lav-ink)',   border: '#c9bce4' },
    { href: '/admin/slusham',   label: 'Слушане',   icon: Headphones, count: listeningC.count ?? 0, color: 'var(--sky)',        ink: 'var(--sky-ink)',   border: '#b4cfe4' },
    { href: '/admin/chetene',   label: 'Четене',    icon: BookOpen,   count: readingC.count   ?? 0, color: 'var(--sage)',       ink: 'var(--sage-ink)',  border: '#b5d8be' },
    { href: '/admin/pisane',    label: 'Писане',    icon: Pencil,     count: writingC.count   ?? 0, color: 'var(--butter)',     ink: 'var(--butter-ink)',border: '#e8d8a8' },
  ];

  const levelColors: Record<string, { bg: string; color: string }> = {
    A1: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
    A2: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
    B1: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
    B2: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
    C1: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
    C2: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-extrabold mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            Табло
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Преглед на съдържанието и активността.
          </p>
        </div>
      </div>

      {/* ── User KPIs ────────────────────────────────────────────────────── */}
      <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
        Потребители
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard label="Общо"           value={totalUsers}  icon={Users}      bg="var(--lavender)"   color="var(--lav-ink)"    />
        <StatCard label="Нови тази седм."value={newThisWeek} icon={TrendingUp}  bg="var(--sage)"       color="var(--sage-ink)"   />
        <StatCard label="Активни днес"   value={activeToday} icon={Activity}   bg="var(--coral-soft)" color="var(--coral-ink)"  />
        <StatCard label="Активни (7 дни)"value={activeWeek}  icon={Zap}        bg="var(--sky)"        color="var(--sky-ink)"    />
        <StatCard label="Общо XP"        value={totalXp.toLocaleString('bg-BG')} icon={TrendingUp} bg="var(--butter)" color="var(--butter-ink)" />
        <StatCard label="Ср. серия"      value={`${avgStreak} дни`} sub="сред активните" icon={Flame} bg="var(--peach)" color="var(--coral-ink)" />
      </div>

      {/* ── Content counts ───────────────────────────────────────────────── */}
      <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
        Съдържание
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {contentModules.map(({ href, label, icon: Icon, count, color, border, ink }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl p-5 flex flex-col gap-4 hover:-translate-y-0.5 transition-all"
            style={{ background: color, border: `1px solid ${border}` }}
          >
            <div className="flex items-center justify-between">
              <Icon className="w-5 h-5" style={{ color: ink }} />
              <ArrowRight className="w-3.5 h-3.5" style={{ color: ink, opacity: 0.5 }} />
            </div>
            <div>
              <p className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: ink }}>
                {count}
              </p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: ink }}>{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Top lessons + Recent signups ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top grammar lessons */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
            Топ граматически уроци
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
          >
            {topLessons.length === 0 ? (
              <div className="py-10 text-center text-sm" style={{ color: 'var(--muted)' }}>
                Все още няма завършени уроци.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                    <th className="text-left px-4 py-2.5 font-semibold text-xs" style={{ color: 'var(--ink-2)' }}>Урок</th>
                    <th className="text-right px-4 py-2.5 font-semibold text-xs" style={{ color: 'var(--ink-2)' }}>Завършили</th>
                  </tr>
                </thead>
                <tbody>
                  {topLessons.map((l, i) => {
                    const lc = levelColors[l.level ?? 'A1'] ?? levelColors.A1;
                    return (
                      <tr key={l.id} style={{ borderBottom: i < topLessons.length - 1 ? '1px solid var(--line)' : undefined }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0" style={{ background: lc.bg, color: lc.color }}>
                              {l.level}
                            </span>
                            <Link
                              href={`/admin/gramatika/${l.id}`}
                              className="font-medium hover:underline truncate"
                              style={{ color: 'var(--ink)' }}
                            >
                              {l.title}
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums font-semibold" style={{ color: 'var(--coral)' }}>
                          {l.completions}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent signups */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
            Последни регистрации
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
          >
            {recent.length === 0 ? (
              <div className="py-10 text-center text-sm" style={{ color: 'var(--muted)' }}>
                Няма потребители.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                    <th className="text-left px-4 py-2.5 font-semibold text-xs" style={{ color: 'var(--ink-2)' }}>Потребител</th>
                    <th className="text-right px-4 py-2.5 font-semibold text-xs" style={{ color: 'var(--ink-2)' }}>XP</th>
                    <th className="text-right px-4 py-2.5 font-semibold text-xs" style={{ color: 'var(--ink-2)' }}>Регистрация</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((u, i) => {
                    const lc = levelColors[u.level ?? 'A1'] ?? levelColors.A1;
                    const joined = new Date(u.created_at).toLocaleDateString('bg-BG', {
                      day: 'numeric', month: 'short',
                    });
                    return (
                      <tr key={u.id} style={{ borderBottom: i < recent.length - 1 ? '1px solid var(--line)' : undefined }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                              style={{ background: 'var(--lavender)', color: 'var(--lav-ink)' }}
                            >
                              {((u.name as string | null) ?? '?')[0]?.toUpperCase() ?? '?'}
                            </span>
                            <div className="min-w-0">
                              <p className="font-medium truncate" style={{ color: 'var(--ink)' }}>
                                {(u.name as string | null) || 'Без име'}
                              </p>
                              <span className="px-1 py-0.5 rounded text-[10px] font-bold" style={{ background: lc.bg, color: lc.color }}>
                                {u.level}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-xs font-semibold" style={{ color: 'var(--butter-ink)' }}>
                          {(u.xp as number ?? 0).toLocaleString('bg-BG')}
                        </td>
                        <td className="px-4 py-3 text-right text-xs" style={{ color: 'var(--muted)' }}>
                          {joined}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

      {/* ── Content quality ──────────────────────────────────────────────── */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          {totalQualityIssues > 0
            ? <AlertTriangle className="w-4 h-4" style={{ color: 'var(--butter-ink)' }} />
            : <CheckCircle2  className="w-4 h-4" style={{ color: 'var(--sage-ink)' }} />
          }
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Качество на съдържанието
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
        >
          {[
            {
              label:  'Клипове без аудио',
              count:  clipsNoAudio,
              total:  vocabC.count ?? 0, // reuse content count; show raw count
              href:   '/admin/slusham',
              icon:   VolumeX,
            },
            {
              label:  'Уроци без съдържание',
              count:  lessonsNoContent,
              total:  grammarC.count ?? 0,
              href:   '/admin/gramatika',
              icon:   FileX,
            },
            {
              label:  'Граматични уроци без въпроси',
              count:  contentNoQuestions,
              total:  grammarC.count ?? 0,
              href:   '/admin/gramatika',
              icon:   AlertTriangle,
            },
          ].map(({ label, count, href, icon: Icon }, i, arr) => (
            <div
              key={label}
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : undefined }}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className="w-4 h-4 shrink-0"
                  style={{ color: count > 0 ? 'var(--butter-ink)' : 'var(--sage-ink)' }}
                />
                <span className="text-sm" style={{ color: 'var(--ink-2)' }}>{label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: count > 0 ? 'var(--butter-ink)' : 'var(--sage-ink)' }}
                >
                  {count > 0 ? count : '✓'}
                </span>
                {count > 0 && (
                  <Link
                    href={href}
                    className="text-xs font-semibold hover:underline"
                    style={{ color: 'var(--coral)' }}
                  >
                    Виж →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
    </div>
  );
}
