import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Badge from '@/components/ui/Badge';
import { Trophy, Flame, ChevronLeft, Medal } from 'lucide-react';
import type { Metadata } from 'next';
import type { Level } from '@/lib/types/database';

export const metadata: Metadata = {
  title: 'Класация | Учи Английски',
  description: 'Топ ученици по точки XP.',
};

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

const podiumTheme = [
  { bg: 'var(--butter)',   color: 'var(--butter-ink)', label: '1' },
  { bg: 'var(--sky)',      color: 'var(--sky-ink)',     label: '2' },
  { bg: 'var(--sage)',     color: 'var(--sage-ink)',    label: '3' },
] as const;

interface Row {
  id: string;
  name: string | null;
  level: Level;
  xp: number;
  streak: number;
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || '?';
  const sz =
    size === 'lg' ? 'w-14 h-14 text-base' :
    size === 'md' ? 'w-10 h-10 text-sm' :
                    'w-8 h-8 text-xs';
  return (
    <div
      className={`${sz} rounded-xl flex items-center justify-center font-bold shrink-0`}
      style={{ background: 'var(--lavender)', color: 'var(--lav-ink)', fontFamily: 'var(--font-display)' }}
    >
      {initials}
    </div>
  );
}

export default async function ToplistaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login?next=/napredak/toplista');

  // RLS policy "Authenticated leaderboard select" allows any logged-in user to read all profiles
  const { data } = await supabase
    .from('profiles')
    .select('id, name, level, xp, streak')
    .order('xp', { ascending: false })
    .limit(50);

  const rows: Row[] = (data ?? []) as Row[];

  const myRank = rows.findIndex(r => r.id === user.id) + 1; // 0 if not found
  const podium = rows.slice(0, 3);
  const rest   = rows.slice(3);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/napredak"
          className="flex items-center gap-1.5 text-sm font-medium"
          style={{ color: 'var(--coral)' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Напредък
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-10">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: 'var(--butter)', color: 'var(--butter-ink)' }}
        >
          <Trophy className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
            Класация
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Топ {rows.length} ученици по точки XP
            {myRank > 0 && (
              <span> · ти си на <span className="font-bold tabular-nums" style={{ color: 'var(--coral)' }}>#{myRank}</span> място</span>
            )}
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div
          className="rounded-2xl p-16 text-center text-sm"
          style={{ background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--muted)' }}
        >
          Все още няма данни за класацията.
        </div>
      ) : (
        <>
          {/* ── Podium (top 3) ── */}
          {podium.length > 0 && (
            <div className="flex items-end justify-center gap-4 mb-10">
              {/* 2nd — left */}
              {podium[1] && (
                <PodiumCard row={podium[1]} rank={2} isMe={podium[1].id === user.id} />
              )}
              {/* 1st — center (taller) */}
              {podium[0] && (
                <PodiumCard row={podium[0]} rank={1} isMe={podium[0].id === user.id} tall />
              )}
              {/* 3rd — right */}
              {podium[2] && (
                <PodiumCard row={podium[2]} rank={3} isMe={podium[2].id === user.id} />
              )}
            </div>
          )}

          {/* ── Ranks 4+ ── */}
          {rest.length > 0 && (
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
            >
              {rest.map((row, i) => {
                const rank  = i + 4;
                const isMe  = row.id === user.id;
                return (
                  <div
                    key={row.id}
                    className="flex items-center gap-4 px-5 py-3.5"
                    style={{
                      borderBottom: i < rest.length - 1 ? '1px solid var(--line)' : undefined,
                      background: isMe ? 'var(--coral-soft)' : undefined,
                    }}
                  >
                    {/* Rank */}
                    <span
                      className="shrink-0 w-7 text-center text-sm font-bold tabular-nums"
                      style={{ color: isMe ? 'var(--coral)' : 'var(--muted)' }}
                    >
                      {rank}
                    </span>

                    <Avatar name={row.name ?? '?'} size="sm" />

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{ color: isMe ? 'var(--coral-ink)' : 'var(--ink)' }}
                      >
                        {row.name ?? 'Анонимен'}
                        {isMe && <span className="ml-1.5 text-xs font-normal" style={{ color: 'var(--coral)' }}>(ти)</span>}
                      </p>
                    </div>

                    <Badge color={levelBadge[row.level] ?? 'sage'}>{row.level}</Badge>

                    {row.streak > 0 && (
                      <span className="flex items-center gap-1 text-xs tabular-nums shrink-0" style={{ color: 'var(--coral-ink)' }}>
                        <Flame className="w-3 h-3" />
                        {row.streak}
                      </span>
                    )}

                    <span
                      className="shrink-0 text-sm font-bold tabular-nums"
                      style={{ color: 'var(--ink-2)', minWidth: '52px', textAlign: 'right' }}
                    >
                      {row.xp.toLocaleString()} XP
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── Podium card ── */
function PodiumCard({
  row, rank, isMe, tall = false,
}: {
  row: Row;
  rank: 1 | 2 | 3;
  isMe: boolean;
  tall?: boolean;
}) {
  const theme = podiumTheme[rank - 1];
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      {/* Medal */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold"
        style={{ background: theme.bg, color: theme.color }}
      >
        {rank === 1 ? <Medal className="w-4 h-4" /> : rank}
      </div>

      {/* Card */}
      <div
        className={`w-full rounded-2xl flex flex-col items-center gap-2 text-center ${tall ? 'py-6 px-4' : 'py-4 px-3'}`}
        style={{
          background: isMe ? 'var(--coral-soft)' : 'var(--surface)',
          border: isMe ? '2px solid var(--coral)' : '1px solid var(--line)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Avatar name={row.name ?? '?'} size={tall ? 'lg' : 'md'} />
        <div>
          <p
            className={`font-bold leading-tight truncate w-full ${tall ? 'text-base' : 'text-sm'}`}
            style={{ color: isMe ? 'var(--coral-ink)' : 'var(--ink)' }}
          >
            {row.name ?? 'Анонимен'}
          </p>
          <Badge color={levelBadge[row.level] ?? 'sage'}>{row.level}</Badge>
        </div>
        <p
          className="font-extrabold tabular-nums"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)', fontSize: tall ? '1.25rem' : '1rem' }}
        >
          {row.xp.toLocaleString()}
          <span className="text-xs font-normal ml-0.5" style={{ color: 'var(--muted)' }}> XP</span>
        </p>
        {row.streak > 0 && (
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--coral-ink)' }}>
            <Flame className="w-3 h-3" />
            {row.streak} дни
          </span>
        )}
      </div>
    </div>
  );
}
