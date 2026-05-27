import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import type { ReadingText } from '@/lib/types/database';
import { deleteText } from '@/lib/actions/admin';

export const metadata = { title: 'Четене | Админ' };

const levelColors: Record<string, { bg: string; color: string }> = {
  A1: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  A2: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  B1: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  B2: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  C1: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
  C2: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
};

export default async function AdminReadingList() {
  const supabase = await createClient();
  const { data: texts } = await supabase
    .from('reading_texts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
            Четене
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            {texts?.length ?? 0} текста
          </p>
        </div>
        <Link
          href="/admin/chetene/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--coral)' }}
        >
          <Plus className="w-4 h-4" />
          Нов текст
        </Link>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Заглавие</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Slug</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Тема</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Ниво</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Мин.</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {texts?.map((t: ReadingText) => {
              const lc = levelColors[t.level] ?? levelColors.A1;
              return (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--ink)' }}>{t.title}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>{t.slug}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{t.topic}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: lc.bg, color: lc.color }}
                    >
                      {t.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    {t.reading_time_minutes}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/chetene/${t.id}`}
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
                      >
                        Редактирай
                      </Link>
                      <form action={deleteText.bind(null, t.id)}>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{ background: 'var(--rose)', color: 'var(--rose-ink)', border: '1px solid #e8c4c4' }}
                        >
                          Изтрий
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!texts || texts.length === 0) && (
          <div className="py-16 text-center" style={{ color: 'var(--muted)' }}>
            Няма добавени текстове. <Link href="/admin/chetene/new" style={{ color: 'var(--coral)' }}>Добави първия</Link>.
          </div>
        )}
      </div>
    </div>
  );
}
