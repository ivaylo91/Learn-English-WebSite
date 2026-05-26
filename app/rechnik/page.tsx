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

  const [{ data: words }, { data: catRows }] = await Promise.all([
    supabase.from('vocabulary_words').select('*').order('level').order('word_en'),
    supabase.from('vocabulary_words').select('category').order('category'),
  ]);

  const allWords = words ?? [];
  const categories = [...new Set((catRows ?? []).map(r => r.category))] as string[];

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
          { label: 'Думи общо',  value: `${allWords.length}+` },
          { label: 'Категории', value: `${categories.length}` },
          { label: 'SM-2 метод', value: '✓'                   },
        ]}
      />

      {/* Study CTA */}
      <div className="flex items-center justify-between mb-8 p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
        <div>
          <p className="font-bold text-gray-900 text-sm">Готов ли си за повторение?</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Системата знае кои думи трябва да прегледаш днес.
          </p>
        </div>
        <Link
          href="/rechnik/study"
          className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-[.98] transition-all shadow-sm"
        >
          <Zap className="w-4 h-4" />
          Учи сега
        </Link>
      </div>

      {/* Word list with search + filters */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Всички думи</h2>
        <WordListClient words={allWords} categories={categories} />
      </section>
    </div>
  );
}
