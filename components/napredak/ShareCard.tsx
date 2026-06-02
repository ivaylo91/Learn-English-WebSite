'use client';

import { useState } from 'react';
import { Share2, Download, Link2, CheckCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  streak: number;
  level:  string;
  xp:     number;
  name:   string;
}

export default function ShareCard({ streak, level, xp, name }: Props) {
  const [open,    setOpen]    = useState(false);
  const [copied,  setCopied]  = useState(false);
  const [sharing, setSharing] = useState(false);

  if (streak === 0) return null;

  const imageUrl = () => {
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    const p = new URLSearchParams({
      days:  String(streak),
      level,
      xp:    String(xp),
      name:  name.slice(0, 24),
    });
    return `${base}/api/og/streak?${p}`;
  };

  async function handleShare() {
    setSharing(true);
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: `Учи Английски — ${streak} дни поред! 🔥`,
          text:  `Поддържам ${streak}-дневна серия на Учи Английски! Ниво: ${level} · ${xp} XP`,
          url:   window.location.href,
        });
      } else {
        await handleCopy();
      }
    } catch {
      // User cancelled or share not supported
    } finally {
      setSharing(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(imageUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* silent */ }
  }

  function handleDownload() {
    const a = document.createElement('a');
    a.href     = imageUrl();
    a.download = `uchi-angliyski-${streak}-dni.png`;
    a.click();
  }

  return (
    <div
      className="rounded-2xl overflow-hidden mb-10"
      style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer transition-colors hover:bg-[var(--bg-2)]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--coral-soft)' }}>
            <Share2 className="w-4 h-4" style={{ color: 'var(--coral-ink)' }} />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold" style={{ color: 'var(--ink)' }}>Сподели напредъка си</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              {streak} {streak === 1 ? 'ден' : 'дни'} поред · Ниво {level} · {xp} XP
            </p>
          </div>
        </div>
        {open
          ? <ChevronUp  className="w-4 h-4 shrink-0" style={{ color: 'var(--muted)' }} />
          : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: 'var(--muted)' }} />
        }
      </button>

      {/* Expandable content */}
      {open && (
        <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--line)' }}>
          {/* Card preview */}
          <div className="mt-5 mb-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl()}
              alt="Shareable progress card preview"
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleShare}
              disabled={sharing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[.98] cursor-pointer disabled:opacity-60"
              style={{ background: 'var(--coral)' }}
            >
              <Share2 className="w-4 h-4" />
              {sharing ? 'Споделяне…' : 'Сподели'}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[.98] cursor-pointer"
              style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
            >
              <Download className="w-4 h-4" />
              Свали PNG
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[.98] cursor-pointer"
              style={{ background: 'var(--bg-2)', color: copied ? 'var(--sage-ink)' : 'var(--ink-2)', border: '1px solid var(--line)' }}
            >
              {copied
                ? <><CheckCheck className="w-4 h-4" /> Копирано!</>
                : <><Link2 className="w-4 h-4" /> Копирай линк</>
              }
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
