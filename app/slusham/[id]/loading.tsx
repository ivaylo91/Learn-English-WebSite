function Sk({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className ?? ''}`} />;
}

export default function ListeningClipLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-pulse">

      {/* Back link */}
      <Sk className="h-4 w-32 mb-6" />

      {/* Header */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Sk className="h-6 w-10 rounded-full" />
          <Sk className="h-6 w-20 rounded-full" />
        </div>
        <Sk className="h-8 w-3/4" />
        <div className="flex gap-4">
          <Sk className="h-4 w-16" />
          <Sk className="h-4 w-12" />
        </div>
      </div>

      {/* Audio player */}
      <div
        className="rounded-3xl p-5 mb-8 space-y-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        {/* Waveform bar */}
        <div className="flex items-center gap-0.5 h-10">
          {[...Array(48)].map((_, i) => (
            <Sk
              key={i}
              className="flex-1 rounded-full"
              style={{ height: `${14 + Math.abs(Math.sin(i * 0.7 + 1)) * 18}px` }}
            />
          ))}
        </div>
        {/* Controls */}
        <div className="flex items-center gap-4">
          <Sk className="w-10 h-10 rounded-full" />
          <Sk className="flex-1 h-1.5 rounded-full" />
          <Sk className="h-4 w-10" />
        </div>
      </div>

      {/* Transcript accordion */}
      <Sk className="h-12 w-full rounded-2xl mb-8" />

      {/* Quiz */}
      <div>
        <Sk className="h-6 w-32 mb-4" />
        <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
          <Sk className="h-14 w-full rounded-none" />
          <div className="p-6 space-y-3">
            <Sk className="h-5 w-3/4" />
            {[...Array(4)].map((_, i) => (
              <Sk key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
