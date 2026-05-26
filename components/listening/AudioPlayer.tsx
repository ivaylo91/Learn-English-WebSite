'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, ChevronDown, ChevronUp } from 'lucide-react';

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
    <div className="bg-white rounded-3xl border border-purple-100 shadow-[0_8px_30px_-8px_rgba(147,51,234,0.12)] overflow-hidden">
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      {/* Player UI */}
      <div className="p-6">
        {!hasAudio || audioError ? (
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 mb-4">
            <Volume2 className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-700">
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
                className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer"
                title="Начало"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all cursor-pointer"
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
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      speed === s
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {s}×
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="h-2 bg-gray-100 rounded-full cursor-pointer overflow-hidden mb-2"
              onClick={seek}
            >
              <div
                className="h-full bg-purple-500 rounded-full transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Time */}
            <div className="flex justify-between text-xs text-gray-400 tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </>
        )}
      </div>

      {/* Transcript toggle */}
      <div className="border-t border-gray-50">
        <button
          onClick={() => setShowTranscript(t => !t)}
          className="w-full flex items-center justify-between px-6 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Транскрипт
          {showTranscript
            ? <ChevronUp   className="w-4 h-4 text-gray-400" />
            : <ChevronDown className="w-4 h-4 text-gray-400" />
          }
        </button>
        {showTranscript && (
          <div className="px-6 pb-6">
            <pre className="whitespace-pre-wrap text-sm text-gray-600 leading-relaxed font-sans bg-gray-50 rounded-2xl p-5 border border-gray-100">
              {transcript.trim()}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
