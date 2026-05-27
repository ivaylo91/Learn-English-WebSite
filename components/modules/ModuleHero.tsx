import Badge from "@/components/ui/Badge";
import { type LucideIcon } from "lucide-react";

type BadgeColor = "coral" | "indigo" | "green" | "amber" | "red" | "gray" | "purple" | "sage" | "sky" | "lavender" | "butter";

interface ModuleHeroProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  badgeColor: BadgeColor;
  gradient: string;
  bg: string;
  iconColor: string;
  stats: { label: string; value: string }[];
}

/* Maps the legacy gradient/bg/iconColor props to our warm palette tokens */
const sectionThemes: Record<string, { heroBg: string; heroBorder: string; iconBg: string; iconColor: string; statBg: string; textColor: string; mutedColor: string }> = {
  /* Речник */
  "from-indigo-600 to-violet-600": {
    heroBg: "linear-gradient(135deg, var(--peach) 0%, var(--coral-soft) 100%)",
    heroBorder: "#f4c8a8",
    iconBg: "rgba(255,255,255,0.8)",
    iconColor: "var(--coral-ink)",
    statBg: "rgba(255,255,255,0.5)",
    textColor: "var(--ink)",
    mutedColor: "var(--coral-ink)",
  },
  /* Граматика */
  "from-emerald-500 to-teal-600": {
    heroBg: "linear-gradient(135deg, var(--lavender) 0%, #d4c5f0 100%)",
    heroBorder: "#c9bce4",
    iconBg: "rgba(255,255,255,0.8)",
    iconColor: "var(--lav-ink)",
    statBg: "rgba(255,255,255,0.5)",
    textColor: "var(--ink)",
    mutedColor: "var(--lav-ink)",
  },
  /* Слушане */
  "from-purple-600 to-pink-600": {
    heroBg: "linear-gradient(135deg, var(--sky) 0%, #bcd6ec 100%)",
    heroBorder: "#b4cfe4",
    iconBg: "rgba(255,255,255,0.8)",
    iconColor: "var(--sky-ink)",
    statBg: "rgba(255,255,255,0.5)",
    textColor: "var(--ink)",
    mutedColor: "var(--sky-ink)",
  },
  /* Четене */
  "from-amber-500 to-orange-500": {
    heroBg: "linear-gradient(135deg, var(--sage) 0%, #c5e3cc 100%)",
    heroBorder: "#b5d8be",
    iconBg: "rgba(255,255,255,0.8)",
    iconColor: "var(--sage-ink)",
    statBg: "rgba(255,255,255,0.5)",
    textColor: "var(--ink)",
    mutedColor: "var(--sage-ink)",
  },
  /* Напредък */
  "from-violet-600 to-purple-600": {
    heroBg: "linear-gradient(135deg, var(--butter) 0%, #f6dc92 100%)",
    heroBorder: "#efd884",
    iconBg: "rgba(255,255,255,0.8)",
    iconColor: "var(--butter-ink)",
    statBg: "rgba(255,255,255,0.5)",
    textColor: "var(--ink)",
    mutedColor: "var(--butter-ink)",
  },
};

const DEFAULT_THEME = sectionThemes["from-indigo-600 to-violet-600"];

export default function ModuleHero({
  icon: Icon,
  title,
  description,
  badge,
  badgeColor,
  gradient,
  stats,
}: ModuleHeroProps) {
  const theme = sectionThemes[gradient] ?? DEFAULT_THEME;

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-8 sm:p-12 mb-10"
      style={{
        background: theme.heroBg,
        border: `1px solid ${theme.heroBorder}`,
      }}
    >
      <div aria-hidden className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div
          className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ background: theme.iconBg }}
        >
          <Icon className="w-8 h-8" style={{ color: theme.iconColor }} />
        </div>
        <div className="flex-1">
          <Badge color={badgeColor} className="mb-3 text-xs">{badge}</Badge>
          <h1
            className="text-3xl font-extrabold mb-2"
            style={{ fontFamily: "var(--font-display)", color: theme.textColor }}
          >
            {title}
          </h1>
          <p className="max-w-lg text-sm leading-relaxed" style={{ color: theme.mutedColor }}>
            {description}
          </p>
        </div>
      </div>

      <div className="relative mt-8 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-3 text-center backdrop-blur-sm"
            style={{ background: theme.statBg, border: `1px solid ${theme.heroBorder}` }}
          >
            <p className="text-xl font-bold" style={{ color: theme.textColor }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: theme.mutedColor }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
