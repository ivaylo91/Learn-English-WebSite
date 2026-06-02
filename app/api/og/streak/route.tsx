import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const W = 1200;
const H = 630;

const LEVEL_BG: Record<string, string> = {
  A1: '#b5d8be', A2: '#b5d8be',
  B1: '#b4cfe4', B2: '#b4cfe4',
  C1: '#c9bce4', C2: '#c9bce4',
};
const LEVEL_FG: Record<string, string> = {
  A1: '#2d6040', A2: '#2d6040',
  B1: '#1a4a6e', B2: '#1a4a6e',
  C1: '#4a2d80', C2: '#4a2d80',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const days  = Math.max(0, parseInt(searchParams.get('days')  ?? '0', 10));
  const level = (searchParams.get('level') ?? 'A1').toUpperCase();
  const xp    = Math.max(0, parseInt(searchParams.get('xp')    ?? '0', 10));
  const name  = (searchParams.get('name')  ?? 'Потребител').slice(0, 24);

  const streakLabel = days === 1 ? '1 ден поред' : `${days} дни поред`;
  const lvBg = LEVEL_BG[level] ?? '#b4cfe4';
  const lvFg = LEVEL_FG[level] ?? '#1a4a6e';

  return new ImageResponse(
    (
      <div
        style={{
          width:    W,
          height:   H,
          display:  'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #e8633a 0%, #c4441a 100%)',
          position: 'relative',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* Subtle pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)',
        }} />

        {/* Top logo */}
        <div style={{
          position: 'absolute', top: 40, left: 52,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#fff',
          }}>
            У
          </div>
          <span style={{ fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
            Учи Английски
          </span>
        </div>

        {/* Flame + streak */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 0,
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 80, lineHeight: 1, marginBottom: 8 }}>🔥</div>
          <div style={{
            fontSize: 120, fontWeight: 800, color: '#fff',
            lineHeight: 1, letterSpacing: -4,
          }}>
            {days}
          </div>
          <div style={{
            fontSize: 32, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
            marginTop: 6, letterSpacing: 1,
          }}>
            {streakLabel}
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: 16, alignItems: 'center', marginBottom: 28,
        }}>
          {/* Level badge */}
          <div style={{
            background: lvBg, color: lvFg,
            borderRadius: 12, padding: '8px 20px',
            fontSize: 20, fontWeight: 800,
          }}>
            {level}
          </div>

          {/* XP */}
          <div style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 12, padding: '8px 20px',
            fontSize: 20, fontWeight: 700, color: '#fff',
          }}>
            ✦ {xp.toLocaleString('bg-BG')} XP
          </div>
        </div>

        {/* Name */}
        <div style={{
          fontSize: 24, color: 'rgba(255,255,255,0.7)',
          fontWeight: 500,
        }}>
          {name}
        </div>

        {/* Bottom URL */}
        <div style={{
          position: 'absolute', bottom: 36, right: 52,
          fontSize: 15, color: 'rgba(255,255,255,0.5)',
          letterSpacing: 0.5,
        }}>
          uchi-angliyski.vercel.app
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
