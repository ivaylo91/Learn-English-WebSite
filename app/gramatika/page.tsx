import { PenLine, ChevronRight, CheckCircle2, Clock } from "lucide-react";
import ModuleHero from "@/components/modules/ModuleHero";
import Badge from "@/components/ui/Badge";

const topics = [
  {
    title: "Present Simple",
    description: "Сегашно просто време — действия и факти.",
    lessons: 8,
    done: 5,
    level: "A1",
    color: "green" as const,
  },
  {
    title: "Present Continuous",
    description: "Действия, случващи се в момента.",
    lessons: 6,
    done: 2,
    level: "A2",
    color: "indigo" as const,
  },
  {
    title: "Past Simple",
    description: "Минало просто — завършени действия.",
    lessons: 10,
    done: 0,
    level: "A2",
    color: "amber" as const,
  },
  {
    title: "Conditionals",
    description: "Условни изречения — if/unless.",
    lessons: 12,
    done: 0,
    level: "B1",
    color: "purple" as const,
  },
  {
    title: "Passive Voice",
    description: "Страдателен залог — when & how.",
    lessons: 8,
    done: 0,
    level: "B2",
    color: "amber" as const,
  },
  {
    title: "Reported Speech",
    description: "Косвена реч — пряка към косвена.",
    lessons: 9,
    done: 0,
    level: "B2",
    color: "indigo" as const,
  },
];

export default function GramatikaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={PenLine}
        title="Граматика"
        description="120 урока, покриващи цялата английска граматика от A1 до C1. Всяка тема — кратко обяснение на български и интерактивни упражнения."
        badge="Упражнения"
        badgeColor="green"
        gradient="from-emerald-500 to-teal-600"
        bg="bg-emerald-50"
        iconColor="text-emerald-600"
        stats={[
          { label: "Урока общо", value: "120"  },
          { label: "Завършени", value: "0"     },
          { label: "Следващо",  value: "A1 →"  },
        ]}
      />

      <h2 className="text-lg font-bold text-gray-900 mb-4">Теми</h2>
      <div className="flex flex-col gap-3">
        {topics.map((t) => {
          const pct = t.lessons > 0 ? Math.round((t.done / t.lessons) * 100) : 0;
          const done = pct === 100;
          return (
            <button
              key={t.title}
              className="group flex items-center gap-5 bg-white rounded-2xl p-5 border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left w-full cursor-pointer"
            >
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${done ? "bg-emerald-100" : "bg-gray-100"}`}>
                {done
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  : <Clock className="w-5 h-5 text-gray-400" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-gray-900 text-sm">{t.title}</span>
                  <Badge color={t.color}>{t.level}</Badge>
                </div>
                <p className="text-xs text-gray-500 mb-2">{t.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{t.done}/{t.lessons}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
