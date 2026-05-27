import { PenLine, ChevronRight, CheckCircle2 } from 'lucide-react';
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

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
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

      {lessons.length === 0 ? (
        <div className="py-16 text-center text-sm" style={{ color: 'var(--muted)' }}>
          Уроците скоро ще бъдат достъпни.
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([category, categoryLessons]) => {
            const categoryDone = categoryLessons.filter(l => progressMap.get(l.id)?.completed).length;
            const pct = categoryLessons.length > 0 ? (categoryDone / categoryLessons.length) * 100 : 0;

            return (
              <section key={category}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-base font-bold" style={{ color: 'var(--ink)' }}>{category}</h2>
                    <Badge color={levelBadge[categoryLessons[0].level] ?? 'sage'}>
                      {categoryLessons[0].level}
                    </Badge>
                  </div>
                  <span className="text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
                    {categoryDone}/{categoryLessons.length}
                  </span>
                </div>

                <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: 'var(--line)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: 'var(--lav-ink)' }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  {categoryLessons.map((lesson, i) => {
                    const p    = progressMap.get(lesson.id);
                    const done = p?.completed ?? false;
                    const score = p?.score;

                    return (
                      <Link
                        key={lesson.id}
                        href={`/gramatika/${lesson.slug}`}
                        className="group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <div
                          className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                          style={
                            done
                              ? { background: 'var(--sage)', color: 'var(--sage-ink)' }
                              : { background: 'var(--bg-2)', color: 'var(--muted)' }
                          }
                        >
                          {done
                            ? <CheckCircle2 className="w-4 h-4" />
                            : <span>{i + 1}</span>
                          }
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--ink)' }}>
                            {lesson.title}
                          </p>
                          {score !== undefined && (
                            <p className="text-xs mt-0.5 tabular-nums" style={{ color: 'var(--muted)' }}>
                              Резултат: {score}%
                            </p>
                          )}
                        </div>

                        {lesson.questions?.length > 0 && (
                          <span className="shrink-0 text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
                            {lesson.questions.length} въпроса
                          </span>
                        )}

                        <ChevronRight
                          className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform"
                          style={{ color: 'var(--line-2)' }}
                        />
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
