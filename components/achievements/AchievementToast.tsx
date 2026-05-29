'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { UnlockedAchievement } from '@/lib/actions/achievements';
import { ACHIEVEMENT_META, DEFAULT_META } from './meta';

export default function AchievementToast({ achievements }: { achievements: UnlockedAchievement[] }) {
  const [index, setIndex] = useState(0);
  const [gone,  setGone]  = useState(false);

  useEffect(() => {
    setGone(false);
    const t = setTimeout(advance, 4200);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function advance() {
    if (index + 1 < achievements.length) {
      setIndex(i => i + 1);
    } else {
      setGone(true);
    }
  }

  const current = achievements[index];
  if (!current || gone) return null;

  const meta = ACHIEVEMENT_META[current.key] ?? DEFAULT_META;
  const Icon = meta.icon;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[min(320px,calc(100vw-2rem))]">
      <div
        key={index}
        className="achievement-toast rounded-2xl p-4 relative overflow-hidden cursor-pointer select-none"
        style={{
          background:  meta.bg,
          border:      '1px solid var(--line)',
          boxShadow:   'var(--shadow-lg)',
        }}
        onClick={advance}
        role="status"
        aria-live="polite"
      >
        {/* Content row */}
        <div className="flex items-start gap-3 pr-1">
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--hero-icon-bg)' }}
          >
            <Icon className="w-5 h-5" style={{ color: meta.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-[10px] font-semibold uppercase tracking-[.14em] mb-0.5"
              style={{ color: meta.color, opacity: 0.75 }}
            >
              Постижение отключено
            </p>
            <p className="text-sm font-bold leading-snug" style={{ color: meta.color }}>
              {current.title_bg}
            </p>
            <p className="text-xs mt-0.5 leading-snug" style={{ color: meta.color, opacity: 0.8 }}>
              {current.description_bg}
            </p>
            {current.xp_reward > 0 && (
              <p className="text-xs font-bold mt-1.5" style={{ color: meta.color }}>
                +{current.xp_reward} XP
              </p>
            )}
          </div>

          <button
            onClick={e => { e.stopPropagation(); advance(); }}
            className="shrink-0 p-0.5 rounded-lg transition-opacity hover:opacity-100"
            style={{ color: meta.color, opacity: 0.55 }}
            aria-label="Затвори"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: 'rgba(0,0,0,0.08)' }}
        >
          <div
            key={`bar-${index}`}
            className="h-full achievement-progress"
            style={{ background: meta.color, opacity: 0.5 }}
          />
        </div>

        {/* Queue counter */}
        {achievements.length > 1 && (
          <p
            className="text-[10px] text-right mt-2"
            style={{ color: meta.color, opacity: 0.55 }}
          >
            {index + 1} / {achievements.length}
          </p>
        )}
      </div>
    </div>
  );
}
