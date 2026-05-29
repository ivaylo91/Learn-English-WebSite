import { createClient } from '@/lib/supabase/server';
import { Lock } from 'lucide-react';
import type { Achievement } from '@/lib/types/database';
import { ACHIEVEMENT_META, DEFAULT_META } from './meta';

export default async function AchievementShelf({ userId }: { userId: string }) {
  const supabase = await createClient();

  let all: Achievement[] = [];
  let unlockedMap = new Map<string, string>();

  try {
    const [allRes, unlockedRes] = await Promise.all([
      supabase.from('achievements').select('*').order('sort_order'),
      supabase.from('user_achievements')
        .select('achievement_key, unlocked_at')
        .eq('user_id', userId),
    ]);
    all = (allRes.data ?? []) as Achievement[];
    unlockedMap = new Map(
      (unlockedRes.data ?? []).map(r => [r.achievement_key, r.unlocked_at])
    );
  } catch {
    // Migration not yet run — render nothing
    return null;
  }

  if (all.length === 0) return null;

  const unlockedCount = unlockedMap.size;

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Постижения</h2>
        <span className="text-sm tabular-nums" style={{ color: 'var(--muted)' }}>
          <span className="font-bold" style={{ color: 'var(--coral)' }}>{unlockedCount}</span>
          {' '}/ {all.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {all.map(a => {
          const unlockedAt = unlockedMap.get(a.key);
          const meta = ACHIEVEMENT_META[a.key] ?? DEFAULT_META;
          const Icon = meta.icon;

          return (
            <div
              key={a.key}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={
                unlockedAt
                  ? { background: meta.bg, border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }
                  : { background: 'var(--surface)', border: '1px solid var(--line)', opacity: 0.45 }
              }
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: unlockedAt ? 'var(--hero-icon-bg)' : 'var(--bg-2)' }}
              >
                {unlockedAt
                  ? <Icon className="w-5 h-5" style={{ color: meta.color }} />
                  : <Lock className="w-4 h-4" style={{ color: 'var(--muted)' }} />}
              </div>

              <p
                className="text-xs font-bold leading-snug"
                style={{ color: unlockedAt ? meta.color : 'var(--ink)' }}
              >
                {a.title_bg}
              </p>

              <p
                className="text-[11px] mt-0.5 leading-snug"
                style={{ color: unlockedAt ? meta.color : 'var(--muted)', opacity: unlockedAt ? 0.8 : 1 }}
              >
                {a.description_bg}
              </p>

              {a.xp_reward > 0 && (
                <p
                  className="text-[11px] font-semibold mt-1"
                  style={{ color: unlockedAt ? meta.color : 'var(--muted)', opacity: 0.75 }}
                >
                  +{a.xp_reward} XP
                </p>
              )}

              {unlockedAt && (
                <p
                  className="text-[10px] mt-1.5 font-medium"
                  style={{ color: meta.color, opacity: 0.65 }}
                >
                  {new Date(unlockedAt).toLocaleDateString('bg-BG', {
                    day: 'numeric', month: 'short',
                  })}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
