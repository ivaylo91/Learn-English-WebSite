import { ImageResponse } from 'next/og';

export const size        = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width:          32,
          height:         32,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          background:     '#e8633a',
          borderRadius:   6,
        }}
      >
        <span style={{ color: 'white', fontSize: 20, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>
          У
        </span>
      </div>
    ),
    { ...size },
  );
}
