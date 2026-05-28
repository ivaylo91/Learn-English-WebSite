function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className ?? ''}`} />;
}

export default function RechnikLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* ModuleHero skeleton */}
      <div
        className="rounded-3xl border p-7 mb-10 flex flex-col md:flex-row gap-6 shadow-sm"
        style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
      >
        <div className="flex-1 space-y-3">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <Skeleton className="h-8 w-32" />
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

      {/* Study CTA skeleton */}
      <Skeleton className="h-20 w-full rounded-2xl mb-8" />

      {/* Section heading */}
      <Skeleton className="h-6 w-36 mb-4 rounded-lg" />

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-14 rounded-full" />
        ))}
      </div>

      {/* Word grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 border shadow-sm space-y-2"
            style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
          >
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="w-7 h-7 rounded-lg shrink-0" />
            </div>
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-24 rounded-full" />
          </div>
        ))}
      </div>

    </div>
  );
}
