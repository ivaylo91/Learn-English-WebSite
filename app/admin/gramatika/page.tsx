import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import type { GrammarLesson } from '@/lib/types/database';
import { deleteLesson } from '@/lib/actions/admin';

export const metadata = { title: 'Граматика | Админ' };

const levelColors: Record<string, { bg: string; color: string }> = {
  A1: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  A2: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  B1: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  B2: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  C1: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
  C2: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
};

export default async function AdminGrammarList() {
  const supabase = await createClient();
  const { data: lessons } = await supabase
    .from('grammar_lessons')
    .select('*')
    .order('order_index', { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
            Граматика
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            {lessons?.length ?? 0} урока
          </p>
        </div>
        <Link
          href="/admin/gramatika/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--coral)' }}
        >
          <Plus className="w-4 h-4" />
          Нов урок
        </Link>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
              <th className="text-left px-4 py-3 font-semibold w-10" style={{ color: 'var(--ink-2)' }}>#</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Заглавие</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Slug</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Ниво</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Въпроси</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {lessons?.map((l: GrammarLesson) => {
              const lc = levelColors[l.level] ?? levelColors.A1;
              return (
                <tr key={l.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>{l.order_index}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--ink)' }}>{l.title}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>{l.slug}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: lc.bg, color: lc.color }}
                    >
                      {l.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>
                    {Array.isArray(l.questions) ? l.questions.length : 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/gramatika/${l.id}`}
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
                      >
                        Редактирай
                      </Link>
                      <form action={deleteLesson.bind(null, l.id)}>
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
        {(!lessons || lessons.length === 0) && (
          <div className="py-16 text-center" style={{ color: 'var(--muted)' }}>
            Няма добавени уроци. <Link href="/admin/gramatika/new" style={{ color: 'var(--coral)' }}>Добави първия</Link>.
          </div>
        )}
      </div>
    </div>
  );
}
