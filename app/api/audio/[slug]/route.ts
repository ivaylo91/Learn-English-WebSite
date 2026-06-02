import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const { slug } = await params;

  // Sanitise slug — only allow alphanumeric, hyphens, and underscores
  if (!/^[a-z0-9_-]+$/.test(slug)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(process.cwd(), 'public', 'audio', `${slug}.mp3`);

  if (!existsSync(filePath)) {
    return new NextResponse('Audio file not found', { status: 404 });
  }

  const fileBuffer = readFileSync(filePath);
  const fileSize   = fileBuffer.length;

  // Support Range requests for seeking
  const range = req.headers.get('range');
  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end   = endStr ? parseInt(endStr, 10) : fileSize - 1;
    const chunk = fileBuffer.slice(start, end + 1);

    return new NextResponse(chunk, {
      status: 206,
      headers: {
        'Content-Type':  'audio/mpeg',
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': String(chunk.length),
        'Cache-Control':  'public, max-age=31536000, immutable',
      },
    });
  }

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type':   'audio/mpeg',
      'Content-Length': String(fileSize),
      'Accept-Ranges':  'bytes',
      'Cache-Control':  'public, max-age=31536000, immutable',
    },
  });
}
