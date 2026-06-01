import { Pencil } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import WritingListClient from '@/components/writing/WritingListClient';
import { createClient } from '@/lib/supabase/server';
import type { WritingExercise, UserWritingProgress } from '@/lib/types/database';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Писане | Учи Английски',
  description: 'Упражнения по писане — попълни пропуска, преведи изречение и завърши текст. Всичко с моментална проверка.',
};

export default async function PisanePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [exercisesRes, progressRes] = await Promise.all([
    supabase.from('writing_exercises').select('*').order('level').order('created_at'),
    user
      ? supabase.from('user_writing_progress').select('*').eq('user_id', user.id)
      : Promise.resolve({ data: [] }),
  ]);

  const exercises: WritingExercise[]       = exercisesRes.data ?? [];
  const progress: UserWritingProgress[]    = (progressRes.data ?? []) as UserWritingProgress[];
  const completedCount = progress.filter(p => p.completed).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={Pencil}
        title="Писане"
        description="Попълни пропуска, преведи изречение или завърши текст — системата проверява отговора ти веднага и следи напредъка."
        badge="Упражнения"
        badgeColor="butter"
        gradient="from-yellow-400 to-amber-500"
        bg="bg-yellow-50"
        iconColor="text-yellow-600"
        stats={[
          { label: 'Упражнения',  value: `${exercises.length}` },
          { label: 'Завършени',   value: `${completedCount}` },
          { label: 'Прогрес',     value: exercises.length > 0 ? `${Math.round((completedCount / exercises.length) * 100)}%` : '0%' },
        ]}
      />

      {exercises.length === 0 ? (
        <div className="py-16 text-center text-sm" style={{ color: 'var(--muted)' }}>
          Упражненията скоро ще бъдат достъпни.
        </div>
      ) : (
        <WritingListClient exercises={exercises} progress={progress} />
      )}
    </div>
  );
}
