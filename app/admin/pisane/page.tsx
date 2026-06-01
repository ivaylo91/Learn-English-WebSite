import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { deleteExercise } from '@/lib/actions/admin';
import DeleteButton from '@/components/admin/DeleteButton';
import SavedBanner from '@/components/admin/SavedBanner';
import type { WritingExercise } from '@/lib/types/database';

export const metadata = { title: 'Писане | Админ' };

const levelColors: Record<string, { bg: string; color: string }> = {
  A1: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  A2: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  B1: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  B2: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  C1: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
  C2: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
};

export default async function AdminWritingList() {
  const supabase = await createClient();
  const { data: exercises } = await supabase
    .from('writing_exercises')
    .select('*')
    .order('level')
    .order('created_at');

  return (
    <div>
      <SavedBanner />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
            Писане
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            {exercises?.length ?? 0} упражнения
          </p>
        </div>
        <Link
          href="/admin/pisane/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--coral)' }}
        >
          <Plus className="w-4 h-4" />
          Ново упражнение
        </Link>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Заглавие</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Slug</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Ниво</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Тема</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Въпроси</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {exercises?.map((ex: WritingExercise) => {
              const lc = levelColors[ex.level] ?? levelColors.A1;
              return (
                <tr key={ex.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--ink)' }}>{ex.title}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>{ex.slug}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: lc.bg, color: lc.color }}>
                      {ex.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{ex.topic}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>
                    {Array.isArray(ex.prompts) ? ex.prompts.length : 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/pisane/${ex.id}`}
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
                      >
                        Редактирай
                      </Link>
                      <DeleteButton action={deleteExercise.bind(null, ex.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!exercises || exercises.length === 0) && (
          <div className="py-16 text-center" style={{ color: 'var(--muted)' }}>
            Няма упражнения. <Link href="/admin/pisane/new" style={{ color: 'var(--coral)' }}>Добави първото</Link>.
          </div>
        )}
      </div>
    </div>
  );
}
