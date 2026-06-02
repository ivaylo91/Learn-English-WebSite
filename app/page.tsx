import Link from "next/link";
import {
  BookOpen, Headphones, BookMarked, PenLine, Pencil,
  ArrowRight, CheckCircle2, TrendingUp,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import OnboardingBanner from "@/components/OnboardingBanner";
import StreakProtectionBanner from "@/components/StreakProtectionBanner";
import { createClient } from "@/lib/supabase/server";

/* ─── Flashcard hero visual ─── */
interface WordOfDay {
  word_en: string;
  word_bg: string;
  phonetic: string | null;
  level: string;
  category: string;
}

const LEVEL_BAR: Record<string, number> = {
  A1: 10, A2: 20, B1: 40, B2: 60, C1: 80, C2: 100,
};

function HeroCard({ word, wordCount }: { word: WordOfDay | null; wordCount: number }) {
  const w = word ?? {
    word_en: 'Resilient',
    word_bg: 'устойчив',
    phonetic: '/ rɪˈzɪliənt /',
    level: 'B2',
    category: 'прилагателно',
  };

  return (
    <div className="relative flex items-center justify-center py-10 md:py-0">
      {/* Ambient blobs */}
      <div className="absolute w-72 h-72 rounded-full opacity-50 blur-2xl" style={{ background: "var(--peach)" }} />
      <div className="absolute w-52 h-52 rounded-full opacity-60 blur-2xl -translate-x-12 translate-y-10" style={{ background: "var(--lavender)" }} />

      {/* Main flashcard */}
      <div
        className="animate-float relative z-10 rounded-3xl p-7 w-72"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          boxShadow: "0 24px 48px -12px rgba(232,99,58,.12), 0 0 0 1px rgba(232,99,58,.04)",
        }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[.14em] mb-5" style={{ color: "var(--muted)" }}>
          Дума на деня
        </p>
        <div className="flex items-start justify-between mb-1">
          <p className="text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            {w.word_en}
          </p>
          <div
            className="mt-1 px-2 py-0.5 rounded-lg text-xs font-bold shrink-0"
            style={{ background: "var(--coral-soft)", color: "var(--coral-ink)" }}
          >
            {w.level}
          </div>
        </div>
        {w.phonetic && (
          <p className="text-sm mb-4" style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}>{w.phonetic}</p>
        )}
        <div className="h-px mb-4" style={{ background: "var(--line)" }} />
        <p className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--coral)" }}>
          {w.word_bg}
        </p>
        <p className="text-xs mt-0.5 capitalize" style={{ color: "var(--muted)" }}>{w.category}</p>
        <div className="mt-5 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-2)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${LEVEL_BAR[w.level] ?? 60}%`, background: "var(--coral)" }}
          />
        </div>
        <div className="flex justify-between text-[11px] mt-1.5" style={{ color: "var(--muted)" }}>
          <span>Ниво {w.level}</span>
          <span>{LEVEL_BAR[w.level] ?? 60}%</span>
        </div>
      </div>

      {/* Floating word-count badge */}
      <div
        className="animate-float-alt absolute top-8 -right-2 md:right-0 rounded-2xl px-4 py-3 z-20"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)" }}
      >
        <p className="text-xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          {wordCount > 0 ? `${wordCount}+` : '✓'}
        </p>
        <p className="text-xs" style={{ color: "var(--muted)" }}>{wordCount > 0 ? 'думи' : 'безплатно'}</p>
      </div>

      {/* Free badge */}
      <div
        className="absolute -bottom-2 -left-2 md:left-0 rounded-2xl px-4 py-3 z-20"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--sage-ink)" }} />
          <span className="text-xs font-semibold" style={{ color: "var(--ink-2)" }}>100% безплатно</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Module card ─── */
interface ModuleCardProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  count: string;
  badge: string;
  badgeColor: "coral" | "sage" | "sky" | "lavender" | "butter";
  iconBg: string;
  iconColor: string;
  delay?: string;
  large?: boolean;
}

function ModuleCard({
  href, icon: Icon, title, description, count, badge, badgeColor,
  iconBg, iconColor, delay = "0ms", large = false,
}: ModuleCardProps) {
  return (
    <Link
      href={href}
      className={`animate-fade-up group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between
        hover:-translate-y-1 transition-all duration-300
        ${large ? "p-7" : "p-6"}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        boxShadow: "var(--shadow-sm)",
        animationDelay: delay,
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Top accent strip on hover */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "var(--coral)" }}
      />

      <div>
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center`}
            style={{ background: iconBg }}
          >
            <Icon className="w-5 h-5" style={{ color: iconColor }} />
          </div>
          <Badge color={badgeColor}>{badge}</Badge>
        </div>

        <h3
          className={`font-bold mb-2 ${large ? "text-xl" : "text-base"}`}
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{description}</p>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid var(--line)" }}>
        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{count}</span>
        <span
          className="flex items-center gap-1 text-xs font-semibold group-hover:gap-1.5 transition-all duration-200"
          style={{ color: "var(--coral)" }}
        >
          Започни <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

const features = [
  "Персонализирани уроци",
  "Напредък в реално време",
  "Телефон, таблет, компютър",
  "Без реклами",
];

// stats built dynamically in HomePage

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch auth + all content counts in parallel
  const [
    { data: { user } },
    vocabRes,
    grammarRes,
    listeningRes,
    readingRes,
    writingRes,
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from('vocabulary_words') .select('id', { count: 'exact', head: true }),
    supabase.from('grammar_lessons')  .select('id', { count: 'exact', head: true }),
    supabase.from('listening_clips')  .select('id', { count: 'exact', head: true }),
    supabase.from('reading_texts')    .select('id', { count: 'exact', head: true }),
    supabase.from('writing_exercises').select('id', { count: 'exact', head: true }),
  ]);

  // Deterministic daily word: days-since-epoch % total
  const wordCount     = vocabRes.count     ?? 0;
  const grammarCount  = grammarRes.count   ?? 0;
  const listeningCount= listeningRes.count ?? 0;
  const readingCount  = readingRes.count   ?? 0;
  const writingCount  = writingRes.count   ?? 0;

  // ── Dynamic module cards ───────────────────────────────────────────────────
  const modules: ModuleCardProps[] = [
    {
      href: "/rechnik", icon: BookMarked,
      title: "Речник", badge: "Флаш карти", badgeColor: "coral",
      description: "Думи по теми и ниво с умно SM-2 повторение — системата запомня кое знаеш.",
      count: `${wordCount} ${wordCount === 1 ? 'дума' : 'думи'}`,
      iconBg: "var(--coral-soft)", iconColor: "var(--coral-ink)",
    },
    {
      href: "/gramatika", icon: PenLine,
      title: "Граматика", badge: "Упражнения", badgeColor: "lavender",
      description: "Уроци с ясни обяснения на български, примери и интерактивни тестове.",
      count: `${grammarCount} ${grammarCount === 1 ? 'урок' : 'урока'}`,
      iconBg: "var(--lavender)", iconColor: "var(--lav-ink)",
    },
    {
      href: "/slusham", icon: Headphones,
      title: "Слушане", badge: "Аудио", badgeColor: "sky",
      description: "Клипове с носители на езика и въпроси за разбиране.",
      count: `${listeningCount} ${listeningCount === 1 ? 'клип' : 'клипа'}`,
      iconBg: "var(--sky)", iconColor: "var(--sky-ink)",
    },
    {
      href: "/chetene", icon: BookOpen,
      title: "Четене", badge: "Текстове", badgeColor: "sage",
      description: "Текстове от A1 до C1 с речник на непознати думи с едно кликване.",
      count: `${readingCount} ${readingCount === 1 ? 'текст' : 'текста'}`,
      iconBg: "var(--sage)", iconColor: "var(--sage-ink)",
    },
    {
      href: "/pisane", icon: Pencil,
      title: "Писане", badge: "Упражнения", badgeColor: "butter",
      description: "Попълни пропуска, преведи изречение или завърши текст — с моментална проверка.",
      count: `${writingCount} ${writingCount === 1 ? 'задача' : 'задачи'}`,
      iconBg: "var(--butter)", iconColor: "var(--butter-ink)",
    },
  ];

  // ── Dynamic stats strip ────────────────────────────────────────────────────
  const totalContent = grammarCount + listeningCount + readingCount + writingCount;
  const stats = [
    { value: `${wordCount}+`,      label: 'думи в речника'      },
    { value: `${grammarCount}+`,   label: 'граматични урока'    },
    { value: `${totalContent}+`,   label: 'упражнения и текста' },
    { value: '100%',               label: 'безплатно'           },
  ];
  const dayNumber = Math.floor(Date.now() / 86_400_000);
  const offset    = wordCount > 0 ? dayNumber % wordCount : 0;

  // Fetch profile (if logged in) + word of the day in parallel
  const [profileRes, wordRes] = await Promise.all([
    user
      ? supabase.from('profiles').select('name, xp, streak, last_active_at').eq('id', user.id).single()
      : Promise.resolve({ data: null }),
    wordCount > 0
      ? supabase
          .from('vocabulary_words')
          .select('word_en, word_bg, phonetic, level, category')
          .order('created_at', { ascending: true })
          .range(offset, offset)
          .single()
      : Promise.resolve({ data: null }),
  ]);

  const wordOfDay = wordRes.data as WordOfDay | null;

  let onboardingName: string | null = null;
  let streakAtRisk = false;
  if (user) {
    const profile = profileRes.data as { name: string | null; xp: number; streak: number; last_active_at: string | null } | null;
    if (profile) {
      if (profile.xp === 0) {
        onboardingName =
          profile.name ||
          user.user_metadata?.name ||
          user.email?.split('@')[0] ||
          'приятел';
      }
      const todayUTC = new Date().toISOString().slice(0, 10);
      streakAtRisk =
        profile.streak > 0 &&
        (profile.last_active_at?.slice(0, 10) ?? '') < todayUTC;
    }
  }

  return (
    <div className="overflow-hidden">
      {onboardingName && <OnboardingBanner name={onboardingName} />}
      {streakAtRisk && profileRes.data && (
        <StreakProtectionBanner streak={(profileRes.data as { streak: number }).streak} />
      )}

      {/* ── Split-screen Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100dvh] flex flex-col justify-center py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — text */}
          <div>
            <p
              className="animate-fade-up text-[11px] font-semibold uppercase tracking-[.18em] mb-5"
              style={{ color: "var(--coral)", animationDelay: "0ms" }}
            >
              Безплатна платформа · На български
            </p>

            <h1
              className="animate-fade-up text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink)",
                lineHeight: 1.08,
                animationDelay: "80ms",
              }}
            >
              Научи<br />
              английски.<br />
              <span style={{ color: "var(--coral)" }}>Тук и сега.</span>
            </h1>

            <p
              className="animate-fade-up text-base max-w-[52ch] mb-8 leading-relaxed"
              style={{ color: "var(--muted)", animationDelay: "160ms" }}
            >
              Речник с флаш карти, граматика, слушане и четене — всичко на едно място
              с интерфейс на български.
            </p>

            <div
              className="animate-fade-up flex flex-wrap gap-3 mb-10"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[.98] cursor-pointer"
                style={{
                  background: "var(--coral)",
                  boxShadow: "0 8px 16px -8px rgba(232,99,58,.6)",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Започни безплатно
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
                style={{
                  color: "var(--ink-2)",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
              >
                Вече имам профил
              </Link>
            </div>

            <ul
              className="animate-fade-up flex flex-wrap gap-x-5 gap-y-2"
              style={{ animationDelay: "320ms" }}
            >
              {features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--muted)" }}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--sage-ink)" }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — flashcard visual */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <HeroCard word={wordOfDay} wordCount={wordCount} />
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderLeft: "1px solid var(--line)" }}>
            {stats.map(({ value, label }) => (
              <div key={label} className="px-8 py-7 text-center" style={{ borderRight: "1px solid var(--line)" }}>
                <p
                  className="text-3xl font-extrabold tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {value}
                </p>
                <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Module grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Четири начина да учиш
          </h2>
          <p className="max-w-[50ch]" style={{ color: "var(--muted)" }}>
            Всеки модул е проектиран за максимален резултат — избери откъде да започнеш.
          </p>
        </div>

        {/* Row 1: 3fr + 2fr */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="md:col-span-3"><ModuleCard {...modules[0]} delay="0ms" large /></div>
          <div className="md:col-span-2"><ModuleCard {...modules[1]} delay="80ms" /></div>
        </div>

        {/* Row 2: 2fr + 3fr */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="md:col-span-2"><ModuleCard {...modules[2]} delay="160ms" /></div>
          <div className="md:col-span-3"><ModuleCard {...modules[3]} delay="240ms" large /></div>
        </div>

        {/* Row 3: full-width writing */}
        <div className="grid grid-cols-1">
          <ModuleCard {...modules[4]} delay="320ms" />
        </div>
      </section>

      {/* ── CTA section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div
          className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{
            background: "linear-gradient(135deg, var(--peach) 0%, var(--butter) 100%)",
            border: "1px solid #f4c8a8",
          }}
        >
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[.15em] mb-3"
              style={{ color: "var(--coral-ink)" }}
            >
              Готов ли си?
            </p>
            <h2
              className="text-3xl font-extrabold tracking-tight mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Направи първата стъпка.
            </h2>
            <p className="max-w-[44ch] text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              Започни да учиш английски с флаш карти, граматика и упражнения — всичко безплатно.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[.98] cursor-pointer whitespace-nowrap"
              style={{
                background: "var(--coral)",
                boxShadow: "0 8px 16px -8px rgba(232,99,58,.5)",
                transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              Създай профил безплатно
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rechnik"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer transition-colors duration-200"
              style={{
                color: "var(--ink-2)",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid var(--line)",
              }}
            >
              <TrendingUp className="w-4 h-4" />
              Разгледай речника
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
