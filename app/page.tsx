import Link from "next/link";
import {
  BookOpen, Headphones, BookMarked, PenLine,
  ArrowRight, CheckCircle2, TrendingUp, Volume2,
} from "lucide-react";
import Badge from "@/components/ui/Badge";

/* ─── Flashcard hero visual ─── */
function HeroCard() {
  return (
    <div className="relative flex items-center justify-center py-10 md:py-0">
      {/* Ambient blobs */}
      <div className="absolute w-72 h-72 rounded-full bg-green-100 opacity-50 blur-2xl" />
      <div className="absolute w-52 h-52 rounded-full bg-indigo-100 opacity-60 blur-2xl -translate-x-12 translate-y-10" />

      {/* Main flashcard */}
      <div
        className="animate-float relative z-10 bg-white rounded-3xl p-7 w-72 border border-zinc-100"
        style={{ boxShadow: "0 24px 48px -12px rgba(79,70,229,.14), 0 0 0 1px rgba(79,70,229,.05)" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-400 mb-5">
          Дума на деня
        </p>
        <div className="flex items-start justify-between mb-1">
          <p className="text-4xl font-extrabold text-zinc-900" style={{ fontFamily: "var(--font-heading)" }}>
            Resilient
          </p>
          <button className="mt-1 p-1.5 rounded-lg bg-zinc-100 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer">
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-zinc-400 mb-5 font-mono">/ rɪˈzɪliənt /</p>
        <div className="h-px bg-zinc-100 mb-4" />
        <p className="text-xl font-semibold text-indigo-700" style={{ fontFamily: "var(--font-heading)" }}>
          устойчив
        </p>
        <p className="text-xs text-zinc-400 mt-0.5">прилагателно &nbsp;·&nbsp; ниво B2</p>
        <div className="mt-5 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full" style={{ width: "62%" }} />
        </div>
        <div className="flex justify-between text-[11px] text-zinc-400 mt-1.5">
          <span>Напредък</span><span>62%</span>
        </div>
      </div>

      {/* Floating stat badge */}
      <div
        className="animate-float-alt absolute top-8 -right-2 md:right-0 bg-white rounded-2xl px-4 py-3 border border-zinc-100 z-20"
        style={{ boxShadow: "0 8px 24px -4px rgba(0,0,0,.08)" }}
      >
        <p className="text-xl font-extrabold text-zinc-900" style={{ fontFamily: "var(--font-heading)" }}>12k+</p>
        <p className="text-xs text-zinc-500">активни</p>
      </div>

      {/* Streak badge */}
      <div
        className="absolute -bottom-2 -left-2 md:left-0 bg-white rounded-2xl px-4 py-3 border border-zinc-100 z-20"
        style={{ boxShadow: "0 8px 24px -4px rgba(0,0,0,.08)", animationDelay: "1s" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-semibold text-zinc-700">онлайн сега</span>
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
  badgeColor: "indigo" | "green" | "purple" | "amber";
  accentFrom: string;
  accentTo: string;
  iconBg: string;
  iconColor: string;
  delay?: string;
  large?: boolean;
}

function ModuleCard({
  href, icon: Icon, title, description, count, badge, badgeColor,
  accentFrom, accentTo, iconBg, iconColor, delay = "0ms", large = false,
}: ModuleCardProps) {
  return (
    <Link
      href={href}
      className={`animate-fade-up group relative bg-white rounded-2xl border border-zinc-100 overflow-hidden cursor-pointer flex flex-col justify-between
        hover:-translate-y-1 hover:border-zinc-200 transition-all duration-300
        ${large ? "p-7" : "p-6"}`}
      style={{
        animationDelay: delay,
        boxShadow: "0 2px 8px rgba(0,0,0,.04)",
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Top gradient strip on hover */}
      <div
        className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accentFrom} ${accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <Badge color={badgeColor}>{badge}</Badge>
        </div>

        <h3
          className={`font-bold text-zinc-900 mb-2 ${large ? "text-xl" : "text-base"}`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-50">
        <span className="text-xs font-medium text-zinc-400">{count}</span>
        <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-1.5 transition-all duration-200">
          Започни <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

const modules: ModuleCardProps[] = [
  {
    href: "/rechnik", icon: BookMarked,
    title: "Речник", badge: "Флаш карти", badgeColor: "indigo",
    description: "Над 2 000 думи по теми и ниво. Умно повторение — системата запомня кое знаеш.",
    count: "2 000+ думи",
    accentFrom: "from-indigo-500", accentTo: "to-violet-500",
    iconBg: "bg-indigo-50", iconColor: "text-indigo-600",
  },
  {
    href: "/gramatika", icon: PenLine,
    title: "Граматика", badge: "Упражнения", badgeColor: "green",
    description: "120 урока с ясни обяснения на български и интерактивни тестове.",
    count: "120 урока",
    accentFrom: "from-emerald-500", accentTo: "to-teal-500",
    iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
  },
  {
    href: "/slusham", icon: Headphones,
    title: "Слушане", badge: "Аудио", badgeColor: "purple",
    description: "Автентични клипове с носители на езика и въпроси за разбиране.",
    count: "80+ клипа",
    accentFrom: "from-purple-500", accentTo: "to-pink-500",
    iconBg: "bg-purple-50", iconColor: "text-purple-600",
  },
  {
    href: "/chetene", icon: BookOpen,
    title: "Четене", badge: "Текстове", badgeColor: "amber",
    description: "Текстове от A1 до C1 с речник на непознати думи с едно кликване.",
    count: "150+ текста",
    accentFrom: "from-amber-500", accentTo: "to-orange-500",
    iconBg: "bg-amber-50", iconColor: "text-amber-600",
  },
];

const features = [
  "Персонализирани уроци",
  "Напредък в реално време",
  "Телефон, таблет, компютър",
  "Без реклами",
];

const stats = [
  { value: "12 847", label: "ученици" },
  { value: "4.9",    label: "оценка" },
  { value: "93%",    label: "завършват" },
  { value: "3×",     label: "по-бързо" },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">

      {/* ── Split-screen Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100dvh] flex flex-col justify-center py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — text */}
          <div>
            <p
              className="animate-fade-up text-[11px] font-semibold uppercase tracking-[.18em] text-indigo-500 mb-5"
              style={{ animationDelay: "0ms" }}
            >
              Безплатна платформа · На български
            </p>

            <h1
              className="animate-fade-up text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                color: "#1E1B4B",
                lineHeight: 1.08,
                animationDelay: "80ms",
              }}
            >
              Научи<br />
              английски.<br />
              <span className="text-green-600">Тук и сега.</span>
            </h1>

            <p
              className="animate-fade-up text-base text-zinc-500 max-w-[52ch] mb-8 leading-relaxed"
              style={{ animationDelay: "160ms" }}
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
                  background: "#22C55E",
                  boxShadow: "0 4px 14px rgba(34,197,94,.35)",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Започни безплатно
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 cursor-pointer"
              >
                Вече имам профил
              </Link>
            </div>

            <ul
              className="animate-fade-up flex flex-wrap gap-x-5 gap-y-2"
              style={{ animationDelay: "320ms" }}
            >
              {features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — flashcard visual */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <HeroCard />
          </div>
        </div>
      </section>

      {/* ── Inline stats strip ── */}
      <section className="border-y border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-100">
            {stats.map(({ value, label }) => (
              <div key={label} className="px-8 py-7 text-center">
                <p
                  className="text-3xl font-extrabold text-zinc-900 tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {value}
                </p>
                <p className="text-sm text-zinc-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Asymmetric module grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            style={{ fontFamily: "var(--font-heading)", color: "#1E1B4B" }}
          >
            Четири начина да учиш
          </h2>
          <p className="text-zinc-500 max-w-[50ch]">
            Всеки модул е проектиран за максимален резултат — избери откъде да започнеш.
          </p>
        </div>

        {/* Row 1: 3fr + 2fr */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="md:col-span-3">
            <ModuleCard {...modules[0]} delay="0ms" large />
          </div>
          <div className="md:col-span-2">
            <ModuleCard {...modules[1]} delay="80ms" />
          </div>
        </div>

        {/* Row 2: 2fr + 3fr */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <ModuleCard {...modules[2]} delay="160ms" />
          </div>
          <div className="md:col-span-3">
            <ModuleCard {...modules[3]} delay="240ms" large />
          </div>
        </div>
      </section>

      {/* ── CTA section — left-aligned, no gradient banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-3xl border border-zinc-100 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,.05)" }}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.15em] text-indigo-500 mb-3">
              Готов ли си?
            </p>
            <h2
              className="text-3xl font-extrabold tracking-tight mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "#1E1B4B" }}
            >
              Направи първата стъпка.
            </h2>
            <p className="text-zinc-500 max-w-[44ch] text-sm leading-relaxed">
              Присъедини се към над 12 000 ученици и започни да учиш английски по-бързо.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[.98] cursor-pointer whitespace-nowrap"
              style={{
                background: "#22C55E",
                boxShadow: "0 4px 14px rgba(34,197,94,.30)",
                transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              Създай профил безплатно
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rechnik"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-zinc-700 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-colors duration-200 cursor-pointer"
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
