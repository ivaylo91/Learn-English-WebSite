import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';
import { CERT_GRADIENT, CERT_BADGE, CERT_LABEL, type CertLevel } from '@/lib/certificates';

export const runtime = 'edge';

const W = 1200;
const H = 630;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const level = (searchParams.get('level') ?? 'A1').toUpperCase() as CertLevel;
  const name  = (searchParams.get('name')  ?? 'Потребител').slice(0, 32);
  const year  = searchParams.get('year') ?? String(new Date().getFullYear());

  const [gradFrom, gradTo] = CERT_GRADIENT[level] ?? ['#1a4a6e', '#2a6ea8'];
  const badge = CERT_BADGE[level] ?? { bg: '#b4cfe4', fg: '#1a4a6e' };
  const label = CERT_LABEL[level] ?? level;

  return new ImageResponse(
    (
      <div
        style={{
          width:         W,
          height:        H,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          justifyContent:'center',
          background:    `linear-gradient(145deg, ${gradFrom} 0%, ${gradTo} 100%)`,
          fontFamily:    '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position:      'relative',
        }}
      >
        {/* Radial light overlay */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.14) 0%, transparent 65%)',
        }} />

        {/* Outer decorative border */}
        <div style={{
          position:     'absolute',
          inset:        24,
          border:       '2px solid rgba(255,255,255,0.25)',
          borderRadius: 20,
        }} />
        <div style={{
          position:     'absolute',
          inset:        32,
          border:       '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14,
        }} />

        {/* Corner ornaments */}
        {[
          { top: 40, left: 40 },
          { top: 40, right: 40 },
          { bottom: 40, left: 40 },
          { bottom: 40, right: 40 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            width:    24,
            height:   24,
            ...pos,
            borderTop:    i < 2  ? '3px solid rgba(255,255,255,0.5)' : undefined,
            borderBottom: i >= 2 ? '3px solid rgba(255,255,255,0.5)' : undefined,
            borderLeft:   i % 2 === 0 ? '3px solid rgba(255,255,255,0.5)' : undefined,
            borderRight:  i % 2 === 1 ? '3px solid rgba(255,255,255,0.5)' : undefined,
          }} />
        ))}

        {/* Top branding */}
        <div style={{
          position:    'absolute',
          top:         52,
          left:        0,
          right:       0,
          display:     'flex',
          alignItems:  'center',
          justifyContent: 'center',
          gap:         10,
        }}>
          <div style={{
            width:          32,
            height:         32,
            background:     'rgba(255,255,255,0.2)',
            borderRadius:   8,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       16,
            fontWeight:     800,
            color:          '#fff',
          }}>У</div>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: 1 }}>
            УЧИ АНГЛИЙСКИ
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {/* "СЕРТИФИКАТ" */}
          <div style={{
            fontSize:      13,
            fontWeight:    600,
            letterSpacing: 6,
            color:         'rgba(255,255,255,0.65)',
            marginBottom:  18,
            textTransform: 'uppercase',
          }}>
            С Е Р Т И Ф И К А Т
          </div>

          {/* Level badge */}
          <div style={{
            background:   badge.bg,
            color:        badge.fg,
            borderRadius: 16,
            padding:      '12px 36px',
            fontSize:     52,
            fontWeight:   900,
            letterSpacing:-1,
            marginBottom: 20,
            lineHeight:   1,
          }}>
            {level}
          </div>

          {/* Level label */}
          <div style={{
            fontSize:   22,
            fontWeight: 600,
            color:      'rgba(255,255,255,0.75)',
            marginBottom: 28,
          }}>
            {label}
          </div>

          {/* Divider */}
          <div style={{
            width:      200,
            height:     1,
            background: 'rgba(255,255,255,0.25)',
            marginBottom: 24,
          }} />

          {/* Name */}
          <div style={{
            fontSize:      36,
            fontWeight:    800,
            color:         '#fff',
            letterSpacing: -0.5,
            marginBottom:  10,
            textAlign:     'center',
            maxWidth:      700,
          }}>
            {name}
          </div>

          <div style={{
            fontSize:   17,
            color:      'rgba(255,255,255,0.65)',
            fontWeight: 400,
          }}>
            успешно завърши ниво {level} по английски
          </div>
        </div>

        {/* Bottom: year */}
        <div style={{
          position:   'absolute',
          bottom:     52,
          left:       0,
          right:      0,
          display:    'flex',
          justifyContent: 'center',
          fontSize:   14,
          color:      'rgba(255,255,255,0.45)',
          letterSpacing: 1,
        }}>
          {year}  ·  uchi-angliyski.vercel.app
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
