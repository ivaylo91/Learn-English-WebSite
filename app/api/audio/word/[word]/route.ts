import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

type Params = { params: Promise<{ word: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const raw = (await params).word;

  // Decode and sanitise — allow letters, spaces, hyphens, apostrophes, periods
  const word = decodeURIComponent(raw).trim();
  if (!word || !/^[a-zA-Z\s\-'.]+$/.test(word) || word.length > 80) {
    return new NextResponse('Invalid word', { status: 400 });
  }

  // Google Translate TTS — free, no key required, edge-safe
  const ttsUrl =
    `https://translate.google.com/translate_tts` +
    `?ie=UTF-8&q=${encodeURIComponent(word)}&tl=en-GB&client=gtx&ttsspeed=0.9`;

  try {
    const res = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer':    'https://translate.google.com/',
        'Accept':     'audio/mpeg, audio/*, */*',
      },
    });

    if (!res.ok) {
      return new NextResponse('TTS unavailable', { status: 502 });
    }

    const audio = await res.arrayBuffer();

    return new NextResponse(audio, {
      headers: {
        'Content-Type':  'audio/mpeg',
        'Cache-Control': 'public, max-age=604800, immutable', // 7 days — words don't change
        'Accept-Ranges': 'bytes',
      },
    });
  } catch {
    return new NextResponse('TTS error', { status: 502 });
  }
}
