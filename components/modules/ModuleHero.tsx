import Badge from "@/components/ui/Badge";
import { type LucideIcon } from "lucide-react";

interface ModuleHeroProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  badgeColor: "indigo" | "green" | "purple" | "amber";
  gradient: string;
  bg: string;
  iconColor: string;
  stats: { label: string; value: string }[];
}

export default function ModuleHero({
  icon: Icon,
  title,
  description,
  badge,
  badgeColor,
  gradient,
  bg,
  iconColor,
  stats,
}: ModuleHeroProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-8 sm:p-12 text-white mb-10`}>
      <div aria-hidden className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className={`shrink-0 w-16 h-16 ${bg} rounded-2xl flex items-center justify-center shadow-lg`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <Badge color={badgeColor} className="mb-3 text-xs">{badge}</Badge>
          <h1 className="text-3xl font-extrabold mb-2">{title}</h1>
          <p className="text-white/80 max-w-lg text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="relative mt-8 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs text-white/70 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
