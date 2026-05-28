function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className ?? ''}`} />;
}

export default function ToplistaLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      <Skeleton className="h-4 w-24 mb-8" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <Skeleton className="w-11 h-11 rounded-2xl shrink-0" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mb-10">
        {[false, true, false].map((tall, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <Skeleton className="w-8 h-8 rounded-xl" />
            <div
              className={`w-full rounded-2xl flex flex-col items-center gap-2 ${tall ? 'py-6 px-4' : 'py-4 px-3'}`}
              style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
            >
              <Skeleton className={tall ? 'w-14 h-14 rounded-xl' : 'w-10 h-10 rounded-xl'} />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        ))}
      </div>

      {/* Rows */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-5 py-3.5"
            style={{ borderBottom: i < 6 ? '1px solid var(--line)' : undefined }}
          >
            <Skeleton className="w-7 h-4 shrink-0" />
            <Skeleton className="w-8 h-8 rounded-xl shrink-0" />
            <Skeleton className="h-4 flex-1 max-w-[140px]" />
            <Skeleton className="h-5 w-10 rounded-full shrink-0" />
            <Skeleton className="h-4 w-16 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
