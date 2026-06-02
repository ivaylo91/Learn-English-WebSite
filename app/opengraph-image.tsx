import { ImageResponse } from 'next/og';

export const runtime     = 'edge';
export const alt         = 'Учи Английски — безплатна платформа за английски на български';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width:      '100%',
          height:     '100%',
          display:    'flex',
          flexDirection: 'column',
          background: '#fffbf8',
          padding:    '60px',
          position:   'relative',
        }}
      >
        {/* Top coral accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#e8633a' }} />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <div style={{
            width: 56, height: 56,
            background: '#e8633a',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 800, color: '#fff',
          }}>
            У
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1c1c1e', lineHeight: 1.2 }}>
              Учи Английски
            </div>
            <div style={{ fontSize: 13, color: '#6b6b6b', letterSpacing: 2 }}>
              LEARN ENGLISH
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{
          fontSize:    64,
          fontWeight:  800,
          color:       '#1c1c1e',
          lineHeight:  1.1,
          letterSpacing: -1.5,
          maxWidth:    700,
          marginBottom: 24,
        }}>
          Научи английски.{' '}
          <span style={{ color: '#e8633a' }}>Тук и сега.</span>
        </div>

        {/* Description */}
        <div style={{ fontSize: 24, color: '#6b6b6b', lineHeight: 1.5, maxWidth: 680, marginBottom: 'auto' }}>
          Речник с флаш карти, граматика, слушане, четене и писане — всичко безплатно на български.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 32, marginTop: 48 }}>
          {[
            { value: '2 000+', label: 'думи' },
            { value: '20',     label: 'урока' },
            { value: '6',      label: 'нива' },
            { value: '100%',   label: 'безплатно' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#e8633a', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 14, color: '#6b6b6b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
