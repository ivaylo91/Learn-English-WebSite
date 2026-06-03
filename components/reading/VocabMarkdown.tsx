'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface VocabEntry { en: string; bg: string; }

interface Props {
  bodyMd:     string;
  vocabulary: VocabEntry[];
}

// ── Normalise for matching (lowercase, collapse spaces) ───────────────────────

function norm(s: string) { return s.toLowerCase().replace(/\s+/g, ' ').trim(); }

// ── Tooltip word component ────────────────────────────────────────────────────

function VocabWord({ text, entry }: { text: string; entry: VocabEntry }) {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLSpanElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <span ref={ref} className="relative inline">
      {/* Dotted underline to signal interactivity */}
      <strong
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="cursor-help select-none"
        style={{
          color:          'var(--ink)',
          borderBottom:   '2px dotted var(--coral)',
          paddingBottom:  '1px',
        }}
      >
        {text}
      </strong>

      {/* Tooltip */}
      {open && (
        <span
          className="pointer-events-none absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2
            flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-xs shadow-lg whitespace-nowrap"
          style={{
            background: 'var(--ink)',
            border:     '1px solid rgba(255,255,255,0.08)',
          }}
          role="tooltip"
        >
          <span className="font-bold" style={{ color: '#fff' }}>{entry.en}</span>
          <span style={{ color: 'rgba(255,255,255,0.72)' }}>{entry.bg}</span>
          {/* Arrow */}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2"
            style={{
              width: 0, height: 0,
              borderLeft:  '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop:   '5px solid var(--ink)',
            }}
          />
        </span>
      )}
    </span>
  );
}

// ── Custom ReactMarkdown renderer ─────────────────────────────────────────────

export default function VocabMarkdown({ bodyMd, vocabulary }: Props) {
  // Build a normalised lookup map once
  const vocabMap = new Map(vocabulary.map(v => [norm(v.en), v]));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Strong = ({ children, ...rest }: any) => {
    // children is typically a string node for simple bold text
    const text   = typeof children === 'string' ? children : String(children ?? '');
    const entry  = vocabMap.get(norm(text));

    if (entry) return <VocabWord text={text} entry={entry} />;
    return <strong {...rest}>{children}</strong>;
  };

  return (
    <div className="prose prose-sm sm:prose-base max-w-none prose-warm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ strong: Strong }}>
        {bodyMd}
      </ReactMarkdown>
    </div>
  );
}
