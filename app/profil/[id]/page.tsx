import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ChevronLeft, Flame, Trophy, TrendingUp, Lock } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { ACHIEVEMENT_META, DEFAULT_META } from '@/components/achievements/meta';
import type { Metadata } from 'next';
import type { Level } from '@/lib/types/database';

type Props = { params: Promise<{ id: string }> };

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender' | 'gray'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

function Avatar({ name, size = 'lg' }: { name: string; size?: 'md' | 'lg' }) {
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || '?';
  const sz = size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-12 h-12 text-base';
  return (
    <div
      className={`${sz} rounded-3xl flex items-center justify-center font-extrabold shrink-0`}
      style={{ background: 'var(--lavender)', color: 'var(--lav-ink)', fontFamily: 'var(--font-display)' }}
    >
      {initials}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id }   = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('name, level')
    .eq('id', id)
    .single();
  if (!data) return { title: 'Профил | Учи Английски' };
  const name = (data.name as string | null) ?? 'Потребител';
  return {
    title:       `${name} (${data.level}) | Учи Английски`,
    description: `Публичен профил на ${name} — ниво ${data.level}.`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { id }   = await params;
  const supabase = await createClient();

  // Auth guard — only logged-in users can view profiles
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/profil/${id}`);

  // If viewing own profile, redirect to the editable version
  if (user.id === id) redirect('/profil');

  // Fetch public profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, name, level, xp, streak, created_at')
    .eq('id', id)
    .single();

  if (!profile) notFound();

  const name     = (profile.name as string | null)?.trim() || 'Потребител';
  const level    = (profile.level as Level);
  const xp       = profile.xp   as number;
  const streak   = profile.streak as number;
  const joinedAt = profile.created_at as string;

  // Fetch all achievements + which ones this user has unlocked
  const [allRes, unlockedRes] = await Promise.all([
    supabase.from('achievements').select('*').order('sort_order'),
    supabase.from('user_achievements')
      .select('achievement_key, unlocked_at')
      .eq('user_id', id),
  ]);

  const allAchievements = allRes.data ?? [];
  const unlockedMap     = new Map(
    (unlockedRes.data ?? []).map(r => [r.achievement_key, r.unlocked_at as string])
  );
  const unlockedCount   = unlockedMap.size;

  const joinDate = new Date(joinedAt).toLocaleDateString('bg-BG', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

      {/* Back link */}
      <Link
        href="/napredak/toplista"
        className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline mb-6"
        style={{ color: 'var(--coral)' }}
      >
        <ChevronLeft className="w-4 h-4" />
        Класация
      </Link>

      {/* Identity card */}
      <div
        className="rounded-2xl p-6 flex items-center gap-5 mb-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
      >
        <Avatar name={name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl font-bold truncate" style={{ color: 'var(--ink)' }}>{name}</h1>
            <Badge color={levelBadge[level] ?? 'gray'}>{level}</Badge>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            Учи от {joinDate}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Точки XP',  value: xp.toLocaleString('bg-BG'), icon: Trophy,     bg: 'var(--butter)',   color: 'var(--butter-ink)' },
          { label: 'Дни поред', value: String(streak),              icon: Flame,      bg: 'var(--peach)',    color: 'var(--coral-ink)'  },
          { label: 'Постижения',value: `${unlockedCount}/${allAchievements.length}`, icon: TrendingUp, bg: 'var(--lavender)', color: 'var(--lav-ink)' },
        ].map(({ label, value, icon: Icon, bg, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4 text-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: bg }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <p className="text-xl font-extrabold tabular-nums" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
              {value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      {allAchievements.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Постижения</h2>
            <span className="text-sm tabular-nums" style={{ color: 'var(--muted)' }}>
              <span className="font-bold" style={{ color: 'var(--coral)' }}>{unlockedCount}</span>
              {' '}/ {allAchievements.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {allAchievements.map(a => {
              const unlockedAt = unlockedMap.get(a.key);
              const meta  = ACHIEVEMENT_META[a.key] ?? DEFAULT_META;
              const Icon  = meta.icon;
              const date  = unlockedAt
                ? new Date(unlockedAt).toLocaleDateString('bg-BG', { day: 'numeric', month: 'short' })
                : null;

              return (
                <div
                  key={a.key}
                  className="rounded-2xl p-4 relative overflow-hidden"
                  style={
                    unlockedAt
                      ? { background: meta.bg, border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }
                      : { background: 'var(--surface)', border: '1px solid var(--line)', opacity: 0.4 }
                  }
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: unlockedAt ? 'var(--hero-icon-bg)' : 'var(--bg-2)' }}
                  >
                    {unlockedAt
                      ? <Icon className="w-5 h-5" style={{ color: meta.color }} />
                      : <Lock className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                    }
                  </div>
                  <p className="text-xs font-bold leading-snug" style={{ color: unlockedAt ? meta.color : 'var(--ink)' }}>
                    {a.title_bg}
                  </p>
                  <p className="text-[11px] mt-0.5 leading-snug" style={{ color: unlockedAt ? meta.color : 'var(--muted)', opacity: unlockedAt ? 0.8 : 1 }}>
                    {a.description_bg}
                  </p>
                  {a.xp_reward > 0 && (
                    <p className="text-[11px] font-semibold mt-1" style={{ color: unlockedAt ? meta.color : 'var(--muted)', opacity: 0.75 }}>
                      +{a.xp_reward} XP
                    </p>
                  )}
                  {date && (
                    <p className="text-[10px] mt-1.5 font-medium" style={{ color: meta.color, opacity: 0.65 }}>
                      {date}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
