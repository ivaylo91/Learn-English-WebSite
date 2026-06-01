import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

type Params = { params: Promise<{ size: string }> };

// Maskable icons need safe-zone padding (~10% on each side)
export async function GET(_req: NextRequest, { params }: Params) {
  const { size } = await params;
  const dim      = parseInt(size, 10) || 512;
  const iconSize = Math.round(dim * 0.7);
  const fontSize = Math.round(iconSize * 0.57);
  const radius   = Math.round(iconSize * 0.19);

  return new ImageResponse(
    (
      <div
        style={{
          width:          dim,
          height:         dim,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          background:     '#e8633a',
        }}
      >
        <div
          style={{
            width:          iconSize,
            height:         iconSize,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            background:     '#e8633a',
            borderRadius:   radius,
          }}
        >
          <span
            style={{
              color:      'white',
              fontSize,
              fontWeight: 800,
              lineHeight: 1,
              marginTop:  Math.round(iconSize * 0.05),
            }}
          >
            У
          </span>
        </div>
      </div>
    ),
    { width: dim, height: dim },
  );
}
