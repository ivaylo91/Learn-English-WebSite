import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Badge from '@/components/ui/Badge';
import WordActions from '@/components/vocabulary/WordActions';
import WordCard from '@/components/vocabulary/WordCard';
import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

const levelColor: Record<string, 'green' | 'amber' | 'purple' | 'gray'> = {
  A1: 'green', A2: 'green',
  B1: 'amber', B2: 'amber',
  C1: 'purple', C2: 'purple',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id }   = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('vocabulary_words')
    .select('word_en, word_bg, level')
    .eq('id', id)
    .single();
  if (!data) return { title: 'Дума | Речник' };
  return {
    title: `${data.word_en} — ${data.word_bg} (${data.level}) | Речник`,
    description: `Значение, произношение и примери за „${data.word_en}" на ниво ${data.level}.`,
  };
}

export default async function WordDetailPage({ params }: Props) {
  const { id }   = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [wordRes, progressRes] = await Promise.all([
    supabase.from('vocabulary_words').select('*').eq('id', id).single(),
    user
      ? supabase
          .from('user_word_progress')
          .select('status')
          .eq('user_id', user.id)
          .eq('word_id', id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  if (!wordRes.data) notFound();
  const word    = wordRes.data;
  const isAdded = progressRes.data !== null;

  const { data: similar } = await supabase
    .from('vocabulary_words')
    .select('*')
    .eq('category', word.category)
    .eq('level', word.level)
    .neq('id', word.id)
    .order('word_en')
    .limit(6);

  // To show correct add/remove state on similar cards
  const { data: addedRows } = user
    ? await supabase
        .from('user_word_progress')
        .select('word_id')
        .eq('user_id', user.id)
        .in('word_id', (similar ?? []).map(w => w.id))
    : { data: [] };

  const addedSimilarIds = new Set((addedRows ?? []).map(r => r.word_id));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/rechnik"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Обратно към речника
      </Link>

      {/* Word header */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-8 mb-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge color={levelColor[word.level] ?? 'gray'}>{word.level}</Badge>
              <span className="text-xs text-gray-400 uppercase tracking-wide">{word.category}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-2 break-words">
              {word.word_en}
            </h1>
            {word.phonetic && (
              <p className="text-base text-gray-400 font-mono">{word.phonetic}</p>
            )}
          </div>
          <div className="shrink-0 pt-1">
            <WordActions wordId={word.id} userId={user?.id} initialAdded={isAdded} />
          </div>
        </div>
      </div>

      {/* Translation + example */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-8 mb-8">
        <p className="text-3xl font-bold text-indigo-700 mb-5 leading-tight">{word.word_bg}</p>
        {word.example_en && (
          <div className="border-t border-gray-50 pt-5 space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-gray-400 mb-2">Пример</p>
            <p className="text-gray-700 leading-relaxed">{word.example_en}</p>
            {word.example_bg && (
              <p className="text-sm text-gray-400 italic">{word.example_bg}</p>
            )}
          </div>
        )}
      </div>

      {/* Similar words */}
      {(similar?.length ?? 0) > 0 && (
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Подобни думи &mdash; {word.category} &middot; {word.level}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(similar ?? []).map(w => (
              <WordCard
                key={w.id}
                word={w}
                userId={user?.id}
                alreadyAdded={addedSimilarIds.has(w.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
