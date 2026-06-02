import { Headphones } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import ListeningListClient from '@/components/listening/ListeningListClient';
import ContinueBanner from '@/components/modules/ContinueBanner';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Слушане | Учи Английски',
  description: 'Автентични аудио клипове с транскрипт и въпроси за разбиране на английски.',
};

export default async function SlushamPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [clipsRes, progressRes] = await Promise.all([
    supabase.from('listening_clips').select('*').order('level').order('created_at'),
    user
      ? supabase
          .from('user_content_progress')
          .select('content_id, score, completed')
          .eq('user_id', user.id)
          .eq('content_type', 'listening')
      : Promise.resolve({ data: [] }),
  ]);

  const clips    = clipsRes.data ?? [];
  const progress = progressRes.data ?? [];
  const completedCount = progress.filter(p => p.completed).length;
  const totalMinutes   = clips.reduce((sum, c) => sum + Math.round(c.duration_seconds / 60), 0);

  // Continue banner
  let continueClip: typeof clips[0] | null = null;
  if (user && progress.length > 0) {
    const doneIds    = new Set(progress.filter(p => p.completed).map(p => p.content_id));
    const startedIds = new Set(progress.filter(p => !p.completed).map(p => p.content_id));
    continueClip = clips.find(c => startedIds.has(c.id)) ?? null;
    if (!continueClip && doneIds.size > 0) {
      const doneList = clips.filter(c => doneIds.has(c.id));
      const lastIdx  = clips.indexOf(doneList[doneList.length - 1]);
      continueClip   = clips[lastIdx + 1] ?? null;
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={Headphones}
        title="Слушане"
        description="Автентични аудио клипове с транскрипт. Слушай, разбирай от контекст и отговаряй на въпроси за разбиране."
        badge="Аудио"
        badgeColor="sky"
        gradient="from-purple-600 to-pink-600"
        bg="bg-purple-50"
        iconColor="text-purple-600"
        stats={[
          { label: 'Клипа',     value: `${clips.length}` },
          { label: 'Завършени', value: `${completedCount}` },
          { label: 'Минути',    value: `${totalMinutes}` },
        ]}
      />

      {continueClip && (
        <ContinueBanner
          href={`/slusham/${continueClip.id}`}
          title={continueClip.title}
          level={continueClip.level}
          badgeColor="sky"
        />
      )}

      {clips.length === 0 ? (
        <div className="py-16 text-center text-sm" style={{ color: 'var(--muted)' }}>
          Аудио клиповете скоро ще бъдат достъпни.
        </div>
      ) : (
        <ListeningListClient clips={clips} progress={progress} />
      )}
    </div>
  );
}
