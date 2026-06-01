'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookMarked, PenLine, Headphones, BookOpen, ArrowRight } from 'lucide-react';
import { search } from '@/lib/actions/search';
import type { SearchResults } from '@/lib/actions/search';

interface Props {
  open:    boolean;
  onClose: () => void;
}

// ── Module metadata ───────────────────────────────────────────────────────────

const MODULE = {
  vocabulary: { icon: BookMarked, bg: 'var(--coral-soft)', color: 'var(--coral-ink)', label: 'Речник' },
  grammar:    { icon: PenLine,    bg: 'var(--lavender)',   color: 'var(--lav-ink)',   label: 'Граматика' },
  listening:  { icon: Headphones, bg: 'var(--sky)',        color: 'var(--sky-ink)',   label: 'Слушане' },
  reading:    { icon: BookOpen,   bg: 'var(--sage)',       color: 'var(--sage-ink)',  label: 'Четене' },
} as const;

const LEVEL_COLOR: Record<string, string> = {
  A1: 'var(--sage-ink)', A2: 'var(--sage-ink)',
  B1: 'var(--sky-ink)',  B2: 'var(--sky-ink)',
  C1: 'var(--lav-ink)',  C2: 'var(--lav-ink)',
};
const LEVEL_BG: Record<string, string> = {
  A1: 'var(--sage)',     A2: 'var(--sage)',
  B1: 'var(--sky)',      B2: 'var(--sky)',
  C1: 'var(--lavender)', C2: 'var(--lavender)',
};

// ── Flat result type used for keyboard navigation ─────────────────────────────

interface FlatResult {
  type:     keyof typeof MODULE;
  href:     string;
  title:    string;
  subtitle: string;
  level:    string;
}

function flattenResults(r: SearchResults): FlatResult[] {
  return [
    ...r.vocabulary.map(w => ({
      type: 'vocabulary' as const,
      href: `/rechnik/${w.id}`,
      title: w.word_en,
      subtitle: w.word_bg,
      level: w.level,
    })),
    ...r.grammar.map(g => ({
      type: 'grammar' as const,
      href: `/gramatika/${g.slug}`,
      title: g.title,
      subtitle: 'Граматика',
      level: g.level,
    })),
    ...r.listening.map(l => ({
      type: 'listening' as const,
      href: `/slusham/${l.id}`,
      title: l.title,
      subtitle: 'Слушане',
      level: l.level,
    })),
    ...r.reading.map(t => ({
      type: 'reading' as const,
      href: `/chetene/${t.slug}`,
      title: t.title,
      subtitle: 'Четене',
      level: t.level,
    })),
  ];
}

const EMPTY_RESULTS: SearchResults = { vocabulary: [], grammar: [], listening: [], reading: [] };

// ── Component ─────────────────────────────────────────────────────────────────

export default function SearchModal({ open, onClose }: Props) {
  const router    = useRef(useRouter());
  const inputRef  = useRef<HTMLInputElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);

  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState<SearchResults>(EMPTY_RESULTS);
  const [loading, setLoading] = useState(false);
  const [cursor,  setCursor]  = useState(-1);

  const flat = flattenResults(results);
  const hasResults = flat.length > 0;

  // Focus input when opened; reset on close
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setQuery('');
      setResults(EMPTY_RESULTS);
      setCursor(-1);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) { setResults(EMPTY_RESULTS); setLoading(false); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      const data = await search(query);
      setResults(data);
      setCursor(-1);
      setLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard: arrows + Enter + Escape
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { onClose(); return; }
    if (!hasResults) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor(c => Math.min(c + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor(c => Math.max(c - 1, -1));
    } else if (e.key === 'Enter' && cursor >= 0) {
      e.preventDefault();
      navigate(flat[cursor].href);
    }
  }

  // Scroll highlighted item into view
  useEffect(() => {
    if (cursor < 0 || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-idx="${cursor}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  function navigate(href: string) {
    router.current.push(href);
    onClose();
  }

  if (!open) return null;

  // Build section groups for rendering
  const sections: { key: keyof typeof MODULE; items: FlatResult[] }[] = (
    Object.keys(MODULE) as (keyof typeof MODULE)[]
  )
    .map(key => ({ key, items: flat.filter(r => r.type === key) }))
    .filter(s => s.items.length > 0);

  // Global flat index offset per section (for cursor tracking)
  const offsets: Record<string, number> = {};
  let offset = 0;
  for (const key of Object.keys(MODULE) as (keyof typeof MODULE)[]) {
    offsets[key] = offset;
    offset += results[key].length;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal
        aria-label="Търсене"
        className="fixed left-1/2 z-50 w-full"
        style={{
          top: '12vh',
          maxWidth: '560px',
          transform: 'translateX(-50%)',
          padding: '0 16px',
        }}
        onKeyDown={handleKeyDown}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            boxShadow: '0 24px 48px -12px rgba(0,0,0,.25)',
          }}
        >
          {/* Input row */}
          <div
            className="flex items-center gap-3 px-4"
            style={{ borderBottom: '1px solid var(--line)' }}
          >
            {loading
              ? <span className="shrink-0 w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--line)', borderTopColor: 'var(--coral)' }} />
              : <Search className="shrink-0 w-4 h-4" style={{ color: 'var(--muted)' }} />
            }
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Търси думи, уроци, текстове…"
              className="flex-1 py-4 text-sm bg-transparent outline-none"
              style={{ color: 'var(--ink)' }}
              spellCheck={false}
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="shrink-0 p-1 rounded-lg cursor-pointer"
                style={{ color: 'var(--muted)' }}
                tabIndex={-1}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd
              className="shrink-0 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono"
              style={{ background: 'var(--bg-2)', color: 'var(--muted)', border: '1px solid var(--line)' }}
            >
              Esc
            </kbd>
          </div>

          {/* Results */}
          {hasResults && (
            <div ref={listRef} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {sections.map(({ key, items }) => {
                const meta = MODULE[key];
                const Icon = meta.icon;
                const sectionOffset = offsets[key];
                return (
                  <div key={key}>
                    {/* Section header */}
                    <div
                      className="flex items-center gap-2 px-4 py-2"
                      style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center"
                        style={{ background: meta.bg }}
                      >
                        <Icon className="w-3 h-3" style={{ color: meta.color }} />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[.12em]" style={{ color: 'var(--muted)' }}>
                        {meta.label}
                      </span>
                    </div>

                    {/* Items */}
                    {items.map((item, i) => {
                      const idx = sectionOffset + i;
                      const active = cursor === idx;
                      return (
                        <button
                          key={item.href}
                          data-idx={idx}
                          onClick={() => navigate(item.href)}
                          onMouseEnter={() => setCursor(idx)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-75 cursor-pointer group"
                          style={{
                            background: active ? 'var(--coral-soft)' : 'transparent',
                            borderBottom: '1px solid var(--line)',
                          }}
                        >
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-sm font-semibold truncate"
                              style={{ color: active ? 'var(--coral-ink)' : 'var(--ink)' }}
                            >
                              {item.title}
                            </p>
                            <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>
                              {item.subtitle}
                            </p>
                          </div>
                          <span
                            className="shrink-0 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                            style={{ background: LEVEL_BG[item.level] ?? 'var(--bg-2)', color: LEVEL_COLOR[item.level] ?? 'var(--muted)' }}
                          >
                            {item.level}
                          </span>
                          <ArrowRight
                            className="shrink-0 w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: 'var(--coral)' }}
                          />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state — shown only when query is long enough but nothing found */}
          {!loading && query.length >= 2 && !hasResults && (
            <div className="px-4 py-10 text-center">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Няма резултати за <strong style={{ color: 'var(--ink-2)' }}>&ldquo;{query}&rdquo;</strong>
              </p>
            </div>
          )}

          {/* Hint footer */}
          {(hasResults || query.length < 2) && (
            <div
              className="px-4 py-2.5 flex items-center gap-4 text-[11px]"
              style={{ borderTop: hasResults ? '1px solid var(--line)' : undefined, color: 'var(--muted)', background: 'var(--bg)' }}
            >
              <span><kbd className="font-mono">↑↓</kbd> навигация</span>
              <span><kbd className="font-mono">↵</kbd> отвори</span>
              <span><kbd className="font-mono">Esc</kbd> затвори</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
