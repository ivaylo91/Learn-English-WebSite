import { PenLine } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import GrammarListClient from '@/components/grammar/GrammarListClient';
import ContinueBanner from '@/components/modules/ContinueBanner';
import { createClient } from '@/lib/supabase/server';
import type { GrammarLesson, UserLessonProgress } from '@/lib/types/database';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Граматика | Учи Английски',
  description: 'Уроци по английска граматика от A1 до C1 с обяснения на български и интерактивни упражнения.',
};

export default async function GramatikaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [lessonsRes, progressRes] = await Promise.all([
    supabase.from('grammar_lessons').select('*').order('level').order('order_index'),
    user
      ? supabase.from('user_lesson_progress').select('lesson_id, completed, score').eq('user_id', user.id)
      : Promise.resolve({ data: [] }),
  ]);

  const lessons: GrammarLesson[]        = lessonsRes.data ?? [];
  const progress: UserLessonProgress[]  = (progressRes.data ?? []) as UserLessonProgress[];
  const completedCount = progress.filter(p => p.completed).length;

  // ── "Continue" banner logic ──────────────────────────────────────────────
  let continueLesson: GrammarLesson | null = null;
  if (user && progress.length > 0) {
    const doneIds    = new Set(progress.filter(p => p.completed).map(p => p.lesson_id));
    const startedIds = new Set(progress.filter(p => !p.completed).map(p => p.lesson_id));
    // Prefer a started-but-not-done lesson
    continueLesson = lessons.find(l => startedIds.has(l.id)) ?? null;
    if (!continueLesson && doneIds.size > 0) {
      // Next lesson after the last completed one
      const doneList    = lessons.filter(l => doneIds.has(l.id));
      const lastDoneIdx = lessons.indexOf(doneList[doneList.length - 1]);
      continueLesson    = lessons[lastDoneIdx + 1] ?? null;
    }
  }

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
          { label: 'Завършени',  value: `${completedCount}` },
          { label: 'Прогрес',    value: lessons.length > 0 ? `${Math.round((completedCount / lessons.length) * 100)}%` : '0%' },
        ]}
      />

      {continueLesson && (
        <ContinueBanner
          href={`/gramatika/${continueLesson.slug}`}
          title={continueLesson.title}
          level={continueLesson.level}
          badgeColor="lavender"
        />
      )}

      {lessons.length === 0 ? (
        <div className="py-16 text-center text-sm" style={{ color: 'var(--muted)' }}>
          Уроците скоро ще бъдат достъпни.
        </div>
      ) : (
        <GrammarListClient lessons={lessons} progress={progress} />
      )}
    </div>
  );
}
