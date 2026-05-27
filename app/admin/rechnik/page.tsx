import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import type { VocabularyWord } from '@/lib/types/database';
import { deleteWord } from '@/lib/actions/admin';
import DeleteButton from '@/components/admin/DeleteButton';
import SavedBanner from '@/components/admin/SavedBanner';

export const metadata = { title: 'Речник | Админ' };

const levelColors: Record<string, { bg: string; color: string }> = {
  A1: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  A2: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  B1: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  B2: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  C1: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
  C2: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
};

export default async function AdminVocabList() {
  const supabase = await createClient();
  const { data: words } = await supabase
    .from('vocabulary_words')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <SavedBanner />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
            Речник
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            {words?.length ?? 0} думи
          </p>
        </div>
        <Link
          href="/admin/rechnik/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--coral)' }}
        >
          <Plus className="w-4 h-4" />
          Нова дума
        </Link>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Английски</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Български</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Ниво</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Категория</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {words?.map((w: VocabularyWord) => {
              const lc = levelColors[w.level] ?? levelColors.A1;
              return (
                <tr key={w.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--ink)' }}>
                    {w.word_en}
                    {w.phonetic && (
                      <span className="ml-2 text-xs font-normal" style={{ color: 'var(--muted)' }}>
                        {w.phonetic}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--ink-2)' }}>{w.word_bg}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: lc.bg, color: lc.color }}
                    >
                      {w.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{w.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/rechnik/${w.id}`}
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
                      >
                        Редактирай
                      </Link>
                      <DeleteButton action={deleteWord.bind(null, w.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!words || words.length === 0) && (
          <div className="py-16 text-center" style={{ color: 'var(--muted)' }}>
            Няма добавени думи. <Link href="/admin/rechnik/new" style={{ color: 'var(--coral)' }}>Добави първата</Link>.
          </div>
        )}
      </div>
    </div>
  );
}
