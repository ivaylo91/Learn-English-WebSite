'use client';

import { Award, Download, Lock } from 'lucide-react';
import {
  LEVELS, CERT_XP, CERT_LABEL, CERT_BADGE,
  earnedCertificates, nextCertificate,
} from '@/lib/certificates';

interface Props {
  xp:   number;
  name: string;
}

const LEVEL_COLOR: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage', B1: 'sky', B2: 'sky', C1: 'lavender', C2: 'lavender',
};

export default function CertificateSection({ xp, name }: Props) {
  const earned = earnedCertificates(xp);
  const next   = nextCertificate(xp);

  function downloadUrl(level: string) {
    const p = new URLSearchParams({
      level,
      name: name.slice(0, 32),
      year: String(new Date().getFullYear()),
    });
    return `/api/og/certificate?${p}`;
  }

  if (earned.length === 0 && !next) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5" style={{ color: 'var(--butter-ink)' }} />
        <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Сертификати</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {LEVELS.map(level => {
          const isEarned  = earned.includes(level);
          const isNext    = next?.level === level;
          const badge     = CERT_BADGE[level];
          const label     = CERT_LABEL[level];
          const threshold = CERT_XP[level];

          if (!isEarned && !isNext) {
            // Locked — only show if it's close (next 2 after current next)
            const nextIdx    = next ? LEVELS.indexOf(next.level) : LEVELS.length;
            const levelIdx   = LEVELS.indexOf(level);
            if (levelIdx > nextIdx + 1) return null;
          }

          return (
            <div
              key={level}
              className="rounded-2xl overflow-hidden"
              style={{
                background:   isEarned ? 'var(--surface)' : 'var(--bg-2)',
                border:       `1px solid ${isEarned ? 'var(--line)' : 'var(--line)'}`,
                boxShadow:    isEarned ? 'var(--shadow-sm)' : 'none',
                opacity:      isEarned || isNext ? 1 : 0.55,
              }}
            >
              {/* Color header strip */}
              <div
                className="h-1.5"
                style={{ background: isEarned ? badge.fg : 'var(--line)' }}
              />

              <div className="p-4">
                {/* Level badge + lock */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-xl text-sm font-extrabold"
                    style={
                      isEarned
                        ? { background: badge.bg, color: badge.fg }
                        : { background: 'var(--bg-2)', color: 'var(--muted)', border: '1px solid var(--line)' }
                    }
                  >
                    {level}
                  </span>
                  {isEarned ? (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: badge.bg, color: badge.fg }}>
                      ✓
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
                  )}
                </div>

                <p className="text-sm font-semibold mb-1" style={{ color: isEarned ? 'var(--ink)' : 'var(--ink-2)' }}>
                  {label}
                </p>
                <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
                  {isEarned ? `${threshold} XP досягнати` : isNext ? `Остават ${next!.xpNeeded} XP` : `${threshold} XP`}
                </p>

                {/* Progress bar for next cert */}
                {isNext && (
                  <div className="mb-4">
                    <div className="h-1.5 rounded-full overflow-hidden mb-1" style={{ background: 'var(--line)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${next!.progress}%`, background: badge.fg }}
                      />
                    </div>
                    <p className="text-[10px] text-right" style={{ color: 'var(--muted)' }}>
                      {next!.progress}%
                    </p>
                  </div>
                )}

                {/* Download button */}
                {isEarned ? (
                  <a
                    href={downloadUrl(level)}
                    download={`сертификат-${level.toLowerCase()}.png`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-px active:scale-[.97]"
                    style={{ background: badge.bg, color: badge.fg }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Изтегли
                  </a>
                ) : (
                  <div
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-semibold"
                    style={{ background: 'var(--bg-2)', color: 'var(--muted)' }}
                  >
                    <Lock className="w-3 h-3" />
                    Заключен
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
