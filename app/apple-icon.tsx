import { ImageResponse } from 'next/og';

export const size        = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width:          180,
          height:         180,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          background:     '#e8633a',
          borderRadius:   34,
        }}
      >
        <span style={{ color: 'white', fontSize: 104, fontWeight: 800, lineHeight: 1, marginTop: 10 }}>
          У
        </span>
      </div>
    ),
    { ...size },
  );
}
