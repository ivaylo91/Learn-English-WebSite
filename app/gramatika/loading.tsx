function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className ?? ''}`} />;
}

export default function GramatikaLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* ModuleHero skeleton */}
      <div className="bg-white rounded-3xl border border-[color:var(--line)] p-7 mb-10 flex flex-col md:flex-row gap-6 shadow-sm">
        <div className="flex-1 space-y-3">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <Skeleton className="h-8 w-40" />
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

      {/* Category sections */}
      {Array.from({ length: 3 }).map((_, ci) => (
        <section key={ci} className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-1 w-full rounded-full mb-4" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl px-5 py-4 border border-[color:var(--line)] flex items-center gap-4">
                <Skeleton className="w-8 h-8 rounded-xl shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-3 w-16 shrink-0" />
              </div>
            ))}
          </div>
        </section>
      ))}

    </div>
  );
}
