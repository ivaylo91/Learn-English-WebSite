'use client';

import { useState, useRef } from 'react';
import { Volume2, Loader2, VolumeX } from 'lucide-react';

interface Props {
  word:  string;         // English word / phrase to pronounce
  size?: 'sm' | 'md';   // sm = 16px icon, md = 20px icon
  style?: React.CSSProperties;
}

export default function PronounceButton({ word, size = 'md', style }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function play(e: React.MouseEvent) {
    e.stopPropagation(); // don't flip flashcard when clicking speaker
    if (state === 'loading') return;

    // Stop any currently playing pronunciation
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setState('loading');

    try {
      const audio = new Audio(`/api/audio/word/${encodeURIComponent(word)}`);
      audioRef.current = audio;

      audio.oncanplaythrough = () => {
        setState('idle');
        audio.play().catch(() => setState('error'));
      };
      audio.onerror = () => setState('error');
      audio.load();
    } catch {
      setState('error');
    }
  }

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  const btnSize  = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';

  return (
    <button
      type="button"
      onClick={play}
      disabled={state === 'loading'}
      title={`Произнеси: ${word}`}
      aria-label={`Произнеси ${word}`}
      className={`${btnSize} rounded-lg flex items-center justify-center transition-colors cursor-pointer disabled:cursor-default shrink-0`}
      style={{
        background: state === 'error' ? 'var(--rose)' : 'var(--bg-2)',
        color:      state === 'error' ? 'var(--rose-ink)' : 'var(--muted)',
        border:     '1px solid var(--line)',
        ...style,
      }}
    >
      {state === 'loading' && <Loader2 className={`${iconSize} animate-spin`} />}
      {state === 'error'   && <VolumeX className={iconSize} />}
      {state === 'idle'    && <Volume2 className={iconSize} />}
    </button>
  );
}
