function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className ?? ''}`} />;
}

export default function NapredakLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-10 space-y-2">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 border shadow-sm flex flex-col items-center gap-3"
            style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
          >
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="h-8 w-14" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Streak calendar */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32 rounded-lg" />
          <div className="flex gap-6">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <div
          className="rounded-2xl p-5 border shadow-sm"
          style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
        >
          {/* Month row */}
          <div className="flex gap-1 mb-1 pl-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="flex-1 h-2.5 rounded" />
            ))}
          </div>
          {/* Grid */}
          <div className="flex gap-1 pl-6">
            {Array.from({ length: 10 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-1 flex-1">
                {Array.from({ length: 7 }).map((_, di) => (
                  <Skeleton key={di} className="h-2.5 rounded-sm" />
                ))}
              </div>
            ))}
          </div>
          <Skeleton className="h-3 w-48 mt-3" />
        </div>
      </section>

      {/* Module progress */}
      <section className="mb-10">
        <Skeleton className="h-6 w-44 mb-4 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 border shadow-sm space-y-4"
              style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Activity */}
      <section>
        <Skeleton className="h-6 w-52 mb-4 rounded-lg" />
        <div
          className="rounded-2xl border shadow-sm"
          style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4"
              style={{ borderBottom: i < 4 ? '1px solid var(--line)' : undefined }}
            >
              <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-3 w-16 shrink-0" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
