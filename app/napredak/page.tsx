import { TrendingUp, Flame, Trophy, Target, BookMarked, PenLine, Headphones, BookOpen } from "lucide-react";
import Badge from "@/components/ui/Badge";

const moduleStats = [
  { label: "Речник",    icon: BookMarked, done: 0,   total: 2000, color: "text-indigo-600", bg: "bg-indigo-50",  bar: "bg-indigo-500" },
  { label: "Граматика", icon: PenLine,    done: 7,   total: 120,  color: "text-emerald-600",bg: "bg-emerald-50", bar: "bg-emerald-500" },
  { label: "Слушане",   icon: Headphones, done: 0,   total: 80,   color: "text-purple-600", bg: "bg-purple-50",  bar: "bg-purple-500" },
  { label: "Четене",    icon: BookOpen,   done: 2,   total: 150,  color: "text-amber-600",  bg: "bg-amber-50",   bar: "bg-amber-500" },
];

const recentActivity = [
  { action: "Завърши урок",  detail: "Present Simple — Упражнение 3", time: "Преди 2 ч.",  icon: PenLine,    color: "bg-emerald-100 text-emerald-600" },
  { action: "Нова дума",     detail: "Resilient (устойчив) — B2",      time: "Преди 3 ч.",  icon: BookMarked, color: "bg-indigo-100 text-indigo-600"   },
  { action: "Прочете текст", detail: "A Day in London — A2",           time: "Вчера",       icon: BookOpen,   color: "bg-amber-100 text-amber-600"     },
];

export default function NapredakPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Моят напредък</h1>
        <p className="text-gray-500">Проследявай обучението си и поддържай темпото.</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Дни поред",    value: "3",    icon: Flame,      color: "text-orange-500", bg: "bg-orange-50"  },
          { label: "Точки общо",   value: "140",  icon: Trophy,     color: "text-amber-600",  bg: "bg-amber-50"   },
          { label: "Урока общо",   value: "9",    icon: Target,     color: "text-indigo-600", bg: "bg-indigo-50"  },
          { label: "Нива завърш.", value: "A1",   icon: TrendingUp, color: "text-emerald-600",bg: "bg-emerald-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Module progress */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Прогрес по модул</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {moduleStats.map(({ label, icon: Icon, done, total, color, bg, bar }) => {
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            return (
              <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-gray-900">{label}</span>
                      <Badge color="gray">{pct}%</Badge>
                    </div>
                    <p className="text-xs text-gray-400">{done} от {total}</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${bar} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Последна активност</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {recentActivity.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.detail} className="flex items-center gap-4 p-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${a.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{a.action}</p>
                  <p className="text-xs text-gray-500 truncate">{a.detail}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{a.time}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
