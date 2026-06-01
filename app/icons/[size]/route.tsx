import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

type Params = { params: Promise<{ size: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { size } = await params;
  const dim = parseInt(size, 10) || 512;
  const radius = Math.round(dim * 0.19);
  const fontSize = Math.round(dim * 0.57);

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
          borderRadius:   radius,
        }}
      >
        <span
          style={{
            color:      'white',
            fontSize,
            fontWeight: 800,
            lineHeight: 1,
            marginTop:  Math.round(dim * 0.05),
          }}
        >
          У
        </span>
      </div>
    ),
    { width: dim, height: dim },
  );
}
