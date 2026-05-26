import { BookOpen, Clock, ChevronRight } from "lucide-react";
import ModuleHero from "@/components/modules/ModuleHero";
import Badge from "@/components/ui/Badge";

const texts = [
  {
    title: "The Future of Electric Vehicles",
    excerpt: "Electric vehicles are rapidly transforming the global automotive industry, with major manufacturers pledging to phase out combustion engines by 2035...",
    level: "B2",
    topic: "Технологии",
    minutes: 4,
    questions: 6,
    topicColor: "purple" as const,
  },
  {
    title: "A Day in London",
    excerpt: "London is one of the world's most visited cities, attracting millions of tourists each year with its rich history and vibrant culture...",
    level: "A2",
    topic: "Пътувания",
    minutes: 2,
    questions: 4,
    topicColor: "green" as const,
  },
  {
    title: "Mindfulness at Work",
    excerpt: "More companies are introducing mindfulness programs as part of their employee wellness initiatives, citing improved focus and reduced stress...",
    level: "B1",
    topic: "Бизнес",
    minutes: 3,
    questions: 5,
    topicColor: "amber" as const,
  },
  {
    title: "Ocean Plastic Crisis",
    excerpt: "Scientists estimate that over 8 million tonnes of plastic enter our oceans every year, threatening marine ecosystems and human health alike...",
    level: "B2",
    topic: "Природа",
    minutes: 5,
    questions: 7,
    topicColor: "green" as const,
  },
];

const levelColors: Record<string, "green" | "indigo" | "amber" | "red" | "gray"> = {
  A1: "green", A2: "green", B1: "indigo", B2: "amber", C1: "red",
};

export default function ChetenePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={BookOpen}
        title="Четене"
        description="Текстове на различни нива — от A1 до C1. Кликни на непозната дума за превод. Отговори на въпроси след текста и провери разбирането си."
        badge="Текстове"
        badgeColor="amber"
        gradient="from-amber-500 to-orange-500"
        bg="bg-amber-50"
        iconColor="text-amber-600"
        stats={[
          { label: "Текста",    value: "150+" },
          { label: "Прочетени", value: "0"    },
          { label: "Думи",      value: "0"    },
        ]}
      />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Текстове</h2>
        <div className="flex gap-2">
          {["Всички", "A1-A2", "B1-B2", "C1"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${f === "Всички" ? "bg-amber-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {texts.map((t) => (
          <button
            key={t.title}
            className="group flex items-start gap-5 bg-white rounded-2xl p-6 border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left w-full cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900">{t.title}</h3>
                <Badge color={levelColors[t.level] ?? "gray"}>{t.level}</Badge>
                <Badge color={t.topicColor}>{t.topic}</Badge>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{t.excerpt}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />{t.minutes} мин четене
                </span>
                <span>{t.questions} въпроса</span>
              </div>
            </div>
            <ChevronRight className="shrink-0 w-5 h-5 text-gray-300 group-hover:text-gray-600 mt-1 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
