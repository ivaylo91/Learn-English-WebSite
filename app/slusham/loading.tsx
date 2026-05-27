import type { CSSProperties } from 'react';

function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={`skeleton rounded-xl ${className ?? ''}`} style={style} />;
}

export default function SlushamLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* ModuleHero skeleton */}
      <div className="bg-white rounded-3xl border border-[color:var(--line)] p-7 mb-10 flex flex-col md:flex-row gap-6 shadow-sm">
        <div className="flex-1 space-y-3">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-full max-w-sm" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <Skeleton className="h-7 w-12" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Clip cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-[color:var(--line)] shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            {/* Waveform */}
            <div className="flex items-center gap-0.5 h-7">
              {Array.from({ length: 36 }).map((_, j) => (
                <Skeleton
                  key={j}
                  className="flex-1 rounded-full"
                  style={{ height: `${18 + Math.sin(j * 0.9) * 10}px` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
