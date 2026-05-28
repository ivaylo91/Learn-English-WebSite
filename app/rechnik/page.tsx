import { BookMarked, Zap } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import WordListClient from '@/components/vocabulary/WordListClient';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Речник | Учи Английски',
  description: 'Над 2 000 думи с флаш карти и умно SM-2 повторение по теми и ниво.',
};

export default async function RechnikPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: words }, { data: catRows }, { data: progressRows }] = await Promise.all([
    supabase.from('vocabulary_words').select('*').order('level').order('word_en'),
    supabase.from('vocabulary_words').select('category').order('category'),
    user
      ? supabase.from('user_word_progress').select('word_id').eq('user_id', user.id)
      : Promise.resolve({ data: [] }),
  ]);

  const allWords      = words ?? [];
  const categories    = [...new Set((catRows ?? []).map(r => r.category))] as string[];
  const addedWordIds  = (progressRows ?? []).map(r => r.word_id) as string[];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={BookMarked}
        title="Речник"
        description="Над 2 000 думи по теми и ниво. Учи с флаш карти и умно повторение — системата запомня кое знаеш и кое не."
        badge="Флаш карти"
        badgeColor="coral"
        gradient="from-indigo-600 to-violet-600"
        bg="bg-indigo-50"
        iconColor="text-indigo-600"
        stats={[
          { label: 'Думи общо',  value: `${allWords.length}+` },
          { label: 'Категории', value: `${categories.length}` },
          { label: 'SM-2 метод', value: '✓'                   },
        ]}
      />

      {/* Study CTA */}
      <div
        className="flex items-center justify-between mb-8 p-5 rounded-2xl"
        style={{ background: "var(--coral-soft)", border: "1px solid var(--line)" }}
      >
        <div>
          <p className="font-bold text-sm" style={{ color: "var(--ink)" }}>Готов ли си за повторение?</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--coral-ink)" }}>
            Системата знае кои думи трябва да прегледаш днес.
          </p>
        </div>
        <Link
          href="/rechnik/study"
          className="shrink-0 inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm active:scale-[.98] transition-all"
          style={{ background: "var(--coral)", boxShadow: "0 8px 16px -8px rgba(232,99,58,.5)" }}
        >
          <Zap className="w-4 h-4" />
          Учи сега
        </Link>
      </div>

      <section>
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--ink)" }}>Всички думи</h2>
        <WordListClient words={allWords} categories={categories} addedWordIds={addedWordIds} />
      </section>
    </div>
  );
}
