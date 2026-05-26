import { Headphones, Play, Clock, BarChart2 } from "lucide-react";
import ModuleHero from "@/components/modules/ModuleHero";
import Badge from "@/components/ui/Badge";

const clips = [
  { title: "At the Airport",       duration: "3:20", level: "A2", topic: "Пътувания",  color: "green"  as const },
  { title: "Job Interview Tips",   duration: "4:45", level: "B1", topic: "Бизнес",     color: "amber"  as const },
  { title: "Climate Change",       duration: "5:10", level: "B2", topic: "Природа",    color: "green"  as const },
  { title: "Tech Startup Stories", duration: "6:00", level: "B2", topic: "Технологии", color: "purple" as const },
  { title: "Daily Routines",       duration: "2:50", level: "A1", topic: "Ежедневие",  color: "indigo" as const },
  { title: "Negotiating a Deal",   duration: "4:30", level: "C1", topic: "Бизнес",     color: "amber"  as const },
];

export default function SlushamPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={Headphones}
        title="Слушане"
        description="Автентични аудио клипове с носители на езика. Слушай, разбирай от контекст и отговаряй на въпроси за разбиране."
        badge="Аудио"
        badgeColor="purple"
        gradient="from-purple-600 to-pink-600"
        bg="bg-purple-50"
        iconColor="text-purple-600"
        stats={[
          { label: "Клипа",       value: "80+"  },
          { label: "Изслушани",  value: "0"    },
          { label: "Минути",     value: "0"    },
        ]}
      />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Аудио упражнения</h2>
        <div className="flex gap-2">
          {(["Всички", "A1-A2", "B1-B2", "C1"] as const).map((f) => (
            <button
              key={f}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${f === "Всички" ? "bg-purple-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {clips.map((c) => (
          <div
            key={c.title}
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start gap-4">
              <button className="shrink-0 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{c.title}</h3>
                  <Badge color={c.color}>{c.level}</Badge>
                </div>
                <Badge color="gray" className="text-xs">{c.topic}</Badge>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
                  <span className="flex items-center gap-1"><BarChart2 className="w-3 h-3" />5 въпроса</span>
                </div>
              </div>
            </div>
            {/* Waveform placeholder */}
            <div className="mt-4 flex items-center gap-0.5 h-8">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-purple-100 group-hover:bg-purple-200 rounded-full transition-colors"
                  style={{ height: `${20 + Math.sin(i * 0.8) * 14}px` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
