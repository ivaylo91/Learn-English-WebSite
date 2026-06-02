import { BookOpen } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import ReadingListClient from '@/components/reading/ReadingListClient';
import ContinueBanner from '@/components/modules/ContinueBanner';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Четене | Учи Английски',
  description: 'Текстове на различни нива от A2 до C1 с речник на ключови думи и въпроси за разбиране.',
};

export default async function ChetenePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [textsRes, progressRes] = await Promise.all([
    supabase.from('reading_texts').select('id, slug, title, level, topic, reading_time_minutes, questions').order('level').order('created_at'),
    user
      ? supabase
          .from('user_content_progress')
          .select('content_id, score, completed')
          .eq('user_id', user.id)
          .eq('content_type', 'reading')
      : Promise.resolve({ data: [] }),
  ]);

  const texts    = textsRes.data ?? [];
  const progress = progressRes.data ?? [];
  const completedCount = progress.filter(p => p.completed).length;
  const totalWords     = texts.reduce((sum, t) => sum + t.reading_time_minutes * 200, 0);

  // Continue banner
  let continueText: typeof texts[0] | null = null;
  if (user && progress.length > 0) {
    const doneIds    = new Set(progress.filter(p => p.completed).map(p => p.content_id));
    const startedIds = new Set(progress.filter(p => !p.completed).map(p => p.content_id));
    continueText = texts.find(t => startedIds.has(t.id)) ?? null;
    if (!continueText && doneIds.size > 0) {
      const doneList = texts.filter(t => doneIds.has(t.id));
      const lastIdx  = texts.indexOf(doneList[doneList.length - 1]);
      continueText   = texts[lastIdx + 1] ?? null;
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={BookOpen}
        title="Четене"
        description="Текстове на различни нива от A2 до C1. Ключови думи с превод преди четенето, въпроси за разбиране след текста."
        badge="Текстове"
        badgeColor="sage"
        gradient="from-amber-500 to-orange-500"
        bg="bg-amber-50"
        iconColor="text-amber-600"
        stats={[
          { label: 'Текста',    value: `${texts.length}` },
          { label: 'Прочетени', value: `${completedCount}` },
          { label: 'Думи общо', value: `${totalWords.toLocaleString()}+` },
        ]}
      />

      {continueText && (
        <ContinueBanner
          href={`/chetene/${continueText.slug}`}
          title={continueText.title}
          level={continueText.level}
          badgeColor="sage"
        />
      )}

      {texts.length === 0 ? (
        <div className="py-16 text-center text-sm" style={{ color: 'var(--muted)' }}>
          Текстовете скоро ще бъдат достъпни.
        </div>
      ) : (
        <ReadingListClient texts={texts} progress={progress} />
      )}
    </div>
  );
}
