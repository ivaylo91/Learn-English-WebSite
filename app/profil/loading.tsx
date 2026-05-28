function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className ?? ''}`} />;
}

export default function ProfilLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

      <Skeleton className="h-4 w-24 mb-6" />

      <div className="mb-8 space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Identity card */}
      <div
        className="rounded-2xl border shadow-sm p-6 flex items-center gap-5 mb-6"
        style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
      >
        <Skeleton className="w-16 h-16 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 border shadow-sm flex flex-col items-center gap-2"
            style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
          >
            <Skeleton className="w-9 h-9 rounded-xl" />
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>

      {/* Form card */}
      <div
        className="rounded-2xl border shadow-sm p-6 mb-6 space-y-5"
        style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
      >
        <Skeleton className="h-5 w-40" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-12 rounded-full" />
            ))}
          </div>
        </div>
        <Skeleton className="h-10 w-44 rounded-xl" />
      </div>

      {/* Security card */}
      <div
        className="rounded-2xl border shadow-sm p-6 space-y-3"
        style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
      >
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>

    </div>
  );
}
