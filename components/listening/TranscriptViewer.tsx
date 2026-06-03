'use client';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ParsedLine {
  type:     'stage' | 'dialogue' | 'narrator' | 'blank';
  speaker?: string;
  text:     string;
}

// ── Speaker colours (cycle through if more than 5 speakers) ──────────────────

const SPEAKER_PALETTE = [
  { color: 'var(--sky-ink)',    bg: 'var(--sky)'        },
  { color: 'var(--lav-ink)',    bg: 'var(--lavender)'   },
  { color: 'var(--sage-ink)',   bg: 'var(--sage)'       },
  { color: 'var(--coral-ink)',  bg: 'var(--coral-soft)' },
  { color: 'var(--butter-ink)', bg: 'var(--butter)'     },
];

// ── Parser ────────────────────────────────────────────────────────────────────

// Matches "Speaker Name: dialogue text" — speaker is 1–4 capitalised words
const DIALOGUE_RE = /^([A-Z][A-Za-z.]*(?:\s[A-Z][A-Za-z.]*){0,3}):\s(.+)$/;

function parseTranscript(raw: string): ParsedLine[] {
  return raw.split('\n').map(line => {
    const t = line.trim();
    if (!t) return { type: 'blank', text: '' };
    if (t.startsWith('[') && t.endsWith(']')) return { type: 'stage', text: t.slice(1, -1) };
    const m = t.match(DIALOGUE_RE);
    if (m) return { type: 'dialogue', speaker: m[1], text: m[2] };
    return { type: 'narrator', text: t };
  });
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TranscriptViewer({ transcript }: { transcript: string }) {
  const lines = parseTranscript(transcript);

  // Assign a stable colour to each unique speaker in order of first appearance
  const speakerColour = new Map<string, (typeof SPEAKER_PALETTE)[number]>();
  for (const line of lines) {
    if (line.type === 'dialogue' && line.speaker && !speakerColour.has(line.speaker)) {
      speakerColour.set(line.speaker, SPEAKER_PALETTE[speakerColour.size % SPEAKER_PALETTE.length]);
    }
  }

  return (
    <div
      className="rounded-2xl p-5 text-sm leading-relaxed"
      style={{ background: 'var(--bg-2)', border: '1px solid var(--line)' }}
    >
      {lines.map((line, i) => {
        switch (line.type) {

          case 'blank':
            return <div key={i} className="h-2" />;

          case 'stage':
            return (
              <p key={i} className="italic mb-2.5 text-xs" style={{ color: 'var(--muted)' }}>
                [{line.text}]
              </p>
            );

          case 'dialogue': {
            const c = speakerColour.get(line.speaker!) ?? SPEAKER_PALETTE[0];
            return (
              <div key={i} className="flex items-start gap-2.5 mb-2.5">
                {/* Speaker chip */}
                <span
                  className="shrink-0 px-2 py-0.5 rounded-lg text-[11px] font-bold whitespace-nowrap mt-0.5"
                  style={{ background: c.bg, color: c.color }}
                >
                  {line.speaker}
                </span>
                {/* Speech */}
                <p style={{ color: 'var(--ink-2)' }}>{line.text}</p>
              </div>
            );
          }

          default: // narrator / monologue
            return (
              <p key={i} className="mb-3" style={{ color: 'var(--ink-2)' }}>
                {line.text}
              </p>
            );
        }
      })}
    </div>
  );
}
