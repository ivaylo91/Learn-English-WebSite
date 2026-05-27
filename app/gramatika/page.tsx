import { PenLine, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import Badge from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { GrammarLesson, UserLessonProgress } from '@/lib/types/database';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Граматика | Учи Английски',
  description: 'Уроци по английска граматика от A1 до C1 с обяснения на български и интерактивни упражнения.',
};

const levelColor: Record<string, 'green' | 'amber' | 'purple' | 'gray'> = {
  A1: 'green', A2: 'green',
  B1: 'amber', B2: 'amber',
  C1: 'purple', C2: 'purple',
};

export default async function GramatikaPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [lessonsRes, progressRes] = await Promise.all([
    supabase.from('grammar_lessons').select('*').order('level').order('order_index'),
    user
      ? supabase.from('user_lesson_progress').select('*').eq('user_id', user.id)
      : Promise.resolve({ data: [] }),
  ]);

  const lessons: GrammarLesson[] = lessonsRes.data ?? [];
  const progress: UserLessonProgress[] = (progressRes.data ?? []) as UserLessonProgress[];

  const progressMap = new Map(progress.map(p => [p.lesson_id, p]));
  const completedCount = progress.filter(p => p.completed).length;

  // Group lessons by category preserving order
  const grouped = lessons.reduce<Record<string, GrammarLesson[]>>((acc, lesson) => {
    if (!acc[lesson.category]) acc[lesson.category] = [];
    acc[lesson.category].push(lesson);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={PenLine}
        title="Граматика"
        description="Уроци от A1 до C1, всеки с обяснение на български и интерактивни упражнения. Системата следи напредъка ти автоматично."
        badge="Упражнения"
        badgeColor="lavender"
        gradient="from-emerald-500 to-teal-600"
        bg="bg-emerald-50"
        iconColor="text-emerald-600"
        stats={[
          { label: 'Урока общо', value: `${lessons.length}` },
          { label: 'Завършени',  value: `${completedCount}`  },
          { label: 'Прогрес',    value: lessons.length > 0 ? `${Math.round((completedCount / lessons.length) * 100)}%` : '0%' },
        ]}
      />

      <div className="flex flex-col gap-10">
        {Object.entries(grouped).map(([category, categoryLessons]) => {
          const categoryDone = categoryLessons.filter(l => progressMap.get(l.id)?.completed).length;

          return (
            <section key={category}>
              {/* Category header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-bold text-gray-900">{category}</h2>
                  <Badge color={levelColor[categoryLessons[0].level] ?? 'gray'}>
                    {categoryLessons[0].level}
                  </Badge>
                </div>
                <span className="text-xs text-gray-400 tabular-nums">
                  {categoryDone}/{categoryLessons.length}
                </span>
              </div>

              {/* Progress bar for category */}
              <div className="h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${categoryLessons.length > 0 ? (categoryDone / categoryLessons.length) * 100 : 0}%` }}
                />
              </div>

              {/* Lesson list */}
              <div className="flex flex-col gap-2">
                {categoryLessons.map((lesson, i) => {
                  const p = progressMap.get(lesson.id);
                  const done = p?.completed ?? false;
                  const score = p?.score;

                  return (
                    <Link
                      key={lesson.id}
                      href={`/gramatika/${lesson.slug}`}
                      className="group flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-gray-100 hover:border-emerald-200 hover:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.12)] hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {/* Step indicator */}
                      <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                        done
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {done
                          ? <CheckCircle2 className="w-4 h-4" />
                          : <span>{i + 1}</span>
                        }
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm leading-tight">{lesson.title}</p>
                        {score !== undefined && (
                          <p className="text-xs text-gray-400 mt-0.5 tabular-nums">
                            Резултат: {score}%
                          </p>
                        )}
                      </div>

                      {lesson.questions?.length > 0 && (
                        <span className="shrink-0 text-xs text-gray-400 tabular-nums">
                          {lesson.questions.length} въпроса
                        </span>
                      )}

                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
