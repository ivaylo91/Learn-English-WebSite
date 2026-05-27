function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-100 rounded-xl ${className ?? ''}`} />;
}

export default function WordDetailLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Skeleton className="h-4 w-36 mb-6" />

      {/* Header card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-10 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-12 w-56" />
            <Skeleton className="h-4 w-28 font-mono" />
          </div>
          <Skeleton className="h-10 w-36 rounded-xl shrink-0" />
        </div>
      </div>

      {/* Translation card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-8 space-y-4">
        <Skeleton className="h-9 w-40" />
        <div className="border-t border-gray-50 pt-5 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-full max-w-sm" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Similar words */}
      <Skeleton className="h-5 w-52 mb-4 rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 space-y-2">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-10 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="w-7 h-7 rounded-lg shrink-0" />
            </div>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
