'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { ListeningClip, Level } from '@/lib/types/database';
import Badge from '@/components/ui/Badge';
import { Search, SlidersHorizontal, Headphones, Clock, BarChart2, CheckCircle2 } from 'lucide-react';

interface ProgressEntry {
  content_id: string;
  completed: boolean;
  score?: number | null;
}

interface ListeningListClientProps {
  clips: ListeningClip[];
  progress: ProgressEntry[];
}

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const levelBadge: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
};

function formatDuration(secs: number) {
  if (!secs) return null;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function ListeningListClient({ clips, progress }: ListeningListClientProps) {
  const [query, setQuery]             = useState('');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);

  const progMap = useMemo(
    () => new Map(progress.map(p => [p.content_id, p])),
    [progress],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return clips.filter(c => {
      if (activeLevel && c.level !== activeLevel) return false;
      if (q) return c.title.toLowerCase().includes(q) || c.topic.toLowerCase().includes(q);
      return true;
    });
  }, [clips, query, activeLevel]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Търси по заглавие или тема..."
          className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl focus:outline-none"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--ink)',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'var(--coral)';
            e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(232,99,58,.15)';
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'var(--line)';
            e.currentTarget.style.boxShadow   = 'var(--shadow-sm)';
          }}
        />
      </div>

      {/* Level filter */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <SlidersHorizontal className="w-4 h-4 shrink-0" style={{ color: 'var(--muted)' }} />
        <button
          onClick={() => setActiveLevel(null)}
          className="px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          style={
            activeLevel === null
              ? { background: 'var(--coral)', color: '#fff' }
              : { background: 'var(--bg-2)', color: 'var(--ink-2)' }
          }
        >
          Всички нива
        </button>
        {LEVELS.map(l => (
          <button
            key={l}
            onClick={() => setActiveLevel(activeLevel === l ? null : l)}
            className="px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            style={
              activeLevel === l
                ? { background: 'var(--coral)', color: '#fff' }
                : { background: 'var(--bg-2)', color: 'var(--ink-2)' }
            }
          >
            {l}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs mb-4 tabular-nums" style={{ color: 'var(--muted)' }}>
        {filtered.length} {filtered.length === 1 ? 'клип' : 'клипа'}
      </p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Няма намерени клипове.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(clip => {
            const p        = progMap.get(clip.id);
            const done     = p?.completed ?? false;
            const duration = formatDuration(clip.duration_seconds);

            return (
              <Link
                key={clip.id}
                href={`/slusham/${clip.id}`}
                className="group rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={
                      done
                        ? { background: 'var(--sage)',     color: 'var(--sage-ink)' }
                        : { background: 'var(--sky-ink)',  color: '#fff' }
                    }
                  >
                    {done
                      ? <CheckCircle2 className="w-5 h-5" />
                      : <Headphones   className="w-5 h-5" />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm" style={{ color: 'var(--ink)' }}>{clip.title}</h3>
                      <Badge color={levelBadge[clip.level] ?? 'sage'}>{clip.level}</Badge>
                    </div>
                    <Badge color="sky">{clip.topic}</Badge>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs" style={{ color: 'var(--muted)' }}>
                      {duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{duration}
                        </span>
                      )}
                      {clip.questions?.length > 0 && (
                        <span className="flex items-center gap-1">
                          <BarChart2 className="w-3 h-3" />{clip.questions.length} въпроса
                        </span>
                      )}
                      {p?.score != null && (
                        <span className="font-semibold tabular-nums" style={{ color: 'var(--ink-2)' }}>
                          {p.score}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Waveform decoration */}
                <div className="mt-4 flex items-center gap-0.5 h-7">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full transition-colors"
                      style={{
                        height: `${18 + Math.sin(i * 0.9) * 10}px`,
                        background: done ? 'var(--sage)' : 'var(--sky)',
                      }}
                    />
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
