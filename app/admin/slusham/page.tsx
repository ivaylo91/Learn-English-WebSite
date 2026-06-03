import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, AlertTriangle, VolumeX } from 'lucide-react';
import type { ListeningClip } from '@/lib/types/database';
import { deleteClip } from '@/lib/actions/admin';
import DeleteButton from '@/components/admin/DeleteButton';
import SavedBanner from '@/components/admin/SavedBanner';

export const metadata = { title: 'Слушане | Админ' };

const levelColors: Record<string, { bg: string; color: string }> = {
  A1: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  A2: { bg: 'var(--sage)',     color: 'var(--sage-ink)' },
  B1: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  B2: { bg: 'var(--sky)',      color: 'var(--sky-ink)' },
  C1: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
  C2: { bg: 'var(--lavender)', color: 'var(--lav-ink)' },
};

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default async function AdminListeningList() {
  const supabase = await createClient();
  const { data: clips } = await supabase
    .from('listening_clips')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <SavedBanner />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
            Слушане
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            {clips?.length ?? 0} клипа
          </p>
        </div>
        <Link
          href="/admin/slusham/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--coral)' }}
        >
          <Plus className="w-4 h-4" />
          Нов клип
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
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Тема</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Ниво</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Времетраене</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--ink-2)' }}>Въпроси</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {clips?.map((c: ListeningClip) => {
              const lc = levelColors[c.level] ?? levelColors.A1;
              return (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium" style={{ color: 'var(--ink)' }}>{c.title}</span>
                      {!c.audio_url && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
                          style={{ background: 'var(--rose)', color: 'var(--rose-ink)', border: '1px solid #ecb9b9' }}>
                          <VolumeX className="w-2.5 h-2.5" />Без аудио
                        </span>
                      )}
                      {(!Array.isArray(c.questions) || c.questions.length === 0) && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
                          style={{ background: 'var(--butter)', color: 'var(--butter-ink)', border: '1px solid #e8d8a8' }}>
                          <AlertTriangle className="w-2.5 h-2.5" />Без въпроси
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{c.topic}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: lc.bg, color: lc.color }}
                    >
                      {c.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    {formatDuration(c.duration_seconds)}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>
                    {Array.isArray(c.questions) ? c.questions.length : 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/slusham/${c.id}`}
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
                      >
                        Редактирай
                      </Link>
                      <DeleteButton action={deleteClip.bind(null, c.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!clips || clips.length === 0) && (
          <div className="py-16 text-center" style={{ color: 'var(--muted)' }}>
            Няма добавени клипове. <Link href="/admin/slusham/new" style={{ color: 'var(--coral)' }}>Добави първия</Link>.
          </div>
        )}
      </div>
    </div>
  );
}
