import { BookMarked, Search, RotateCcw, TrendingUp } from "lucide-react";
import ModuleHero from "@/components/modules/ModuleHero";
import Badge from "@/components/ui/Badge";

const categories = [
  { label: "Ежедневие",  count: 320, color: "indigo" as const },
  { label: "Пътувания",  count: 180, color: "green"  as const },
  { label: "Бизнес",     count: 250, color: "amber"  as const },
  { label: "Технологии", count: 140, color: "purple" as const },
  { label: "Природа",    count: 110, color: "green"  as const },
  { label: "Спорт",      count: 95,  color: "indigo" as const },
];

const sampleWords = [
  { en: "Ambitious",  bg: "амбициозен",  level: "B2" },
  { en: "Persevere",  bg: "упорствам",   level: "C1" },
  { en: "Grateful",   bg: "благодарен",  level: "B1" },
  { en: "Negotiate",  bg: "преговарям",  level: "B2" },
  { en: "Eloquent",   bg: "красноречив", level: "C1" },
  { en: "Resilient",  bg: "устойчив",    level: "B2" },
];

export default function RechnikPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={BookMarked}
        title="Речник"
        description="Над 2 000 думи по теми и ниво. Учи с флаш карти и умно повторение — системата запомня кое знаеш и кое не."
        badge="Флаш карти"
        badgeColor="indigo"
        gradient="from-indigo-600 to-violet-600"
        bg="bg-indigo-50"
        iconColor="text-indigo-600"
        stats={[
          { label: "Думи общо",  value: "2 000+" },
          { label: "Категории", value: "24"      },
          { label: "Наученото", value: "0%"      },
        ]}
      />

      {/* Search */}
      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Търси дума на английски или български..."
          className="w-full pl-12 pr-4 py-3.5 text-sm bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Категории</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className="flex items-center justify-between bg-white rounded-xl p-4 border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left cursor-pointer"
            >
              <span className="font-medium text-gray-800 text-sm">{cat.label}</span>
              <Badge color={cat.color}>{cat.count}</Badge>
            </button>
          ))}
        </div>
      </section>

      {/* Sample words */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Думи за днес</h2>
          <button className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline">
            <RotateCcw className="w-3.5 h-3.5" />
            Обнови
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sampleWords.map((w) => (
            <div
              key={w.en}
              className="group bg-white rounded-xl p-5 border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{w.en}</span>
                <Badge color="gray">{w.level}</Badge>
              </div>
              <p className="text-sm text-gray-500 italic">{w.bg}</p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <TrendingUp className="w-3.5 h-3.5" />
                Добави към флаш карти
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
