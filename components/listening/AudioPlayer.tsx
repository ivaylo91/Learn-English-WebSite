'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import TranscriptViewer from './TranscriptViewer';

interface AudioPlayerProps {
  audioUrl: string;
  transcript: string;
}

const SPEEDS = [0.75, 1, 1.25, 1.5] as const;

function formatTime(s: number) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ audioUrl, transcript }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying]         = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [speed, setSpeed]             = useState<number>(1);
  const [hasAudio, setHasAudio]       = useState(!!audioUrl);
  const [audioError, setAudioError]   = useState(false);
  const [showTranscript, setShowTranscript] = useState(!audioUrl);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const onTime    = () => setCurrentTime(audio.currentTime);
    const onLoaded  = () => setDuration(audio.duration);
    const onEnded   = () => setPlaying(false);
    const onError   = () => { setAudioError(true); setHasAudio(false); setShowTranscript(true); };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [audioUrl]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {
        setAudioError(true);
        setHasAudio(false);
      });
    }
  }, [playing]);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pos * duration;
    setCurrentTime(audio.currentTime);
  }, [duration]);

  const changeSpeed = (s: number) => {
    if (audioRef.current) audioRef.current.playbackRate = s;
    setSpeed(s);
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-md)' }}
    >
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      {/* Player UI */}
      <div className="p-6">
        {!hasAudio || audioError ? (
          <div
            className="flex items-center gap-3 p-4 rounded-2xl mb-4"
            style={{ background: 'var(--butter)', border: '1px solid #e8d8a8' }}
          >
            <Volume2 className="w-5 h-5 shrink-0" style={{ color: 'var(--butter-ink)' }} />
            <p className="text-sm" style={{ color: 'var(--butter-ink)' }}>
              {audioError ? 'Аудиото не може да се зареди.' : 'Аудио файлът скоро ще бъде наличен.'}
              {' '}Транскриптът е достъпен по-долу.
            </p>
          </div>
        ) : (
          <>
            {/* Controls row */}
            <div className="flex items-center gap-4 mb-5">
              <button
                onClick={restart}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                style={{ background: 'var(--sky)', color: 'var(--sky-ink)' }}
                title="Начало"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
                style={{ background: 'var(--sky-ink)', boxShadow: '0 8px 20px -6px rgba(31,77,119,.4)' }}
              >
                {playing
                  ? <Pause className="w-6 h-6" />
                  : <Play  className="w-6 h-6 ml-0.5" />
                }
              </button>

              <div className="flex items-center gap-1.5 ml-auto">
                {SPEEDS.map(s => (
                  <button
                    key={s}
                    onClick={() => changeSpeed(s)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    style={
                      speed === s
                        ? { background: 'var(--sky-ink)', color: '#fff' }
                        : { background: 'var(--bg-2)', color: 'var(--muted)' }
                    }
                  >
                    {s}×
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="h-2 rounded-full cursor-pointer overflow-hidden mb-2"
              style={{ background: 'var(--bg-2)' }}
              onClick={seek}
            >
              <div
                className="h-full rounded-full transition-none"
                style={{ width: `${progress}%`, background: 'var(--sky-ink)' }}
              />
            </div>

            {/* Time */}
            <div className="flex justify-between text-xs tabular-nums" style={{ color: 'var(--muted)' }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </>
        )}
      </div>

      {/* Transcript toggle */}
      <div style={{ borderTop: '1px solid var(--line)' }}>
        <button
          onClick={() => setShowTranscript(t => !t)}
          className="w-full flex items-center justify-between px-6 py-3.5 text-sm font-semibold transition-colors cursor-pointer"
          style={{ color: 'var(--ink-2)' }}
        >
          Транскрипт
          {showTranscript
            ? <ChevronUp   className="w-4 h-4" style={{ color: 'var(--muted)' }} />
            : <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted)' }} />
          }
        </button>
        {showTranscript && (
          <div className="px-6 pb-6">
            <TranscriptViewer transcript={transcript} />
          </div>
        )}
      </div>
    </div>
  );
}
