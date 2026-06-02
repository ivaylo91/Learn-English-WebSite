function Sk({ className }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className ?? ''}`} />;
}

export default function ReadingLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-pulse">

      {/* Back link */}
      <Sk className="h-4 w-36 mb-6" />

      {/* Header */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Sk className="h-6 w-10 rounded-full" />
          <Sk className="h-6 w-20 rounded-full" />
          <Sk className="h-6 w-16 rounded-full" />
        </div>
        <Sk className="h-9 w-3/4" />
        <div className="flex gap-4">
          <Sk className="h-4 w-24" />
          <Sk className="h-4 w-20" />
        </div>
      </div>

      {/* Vocabulary panel */}
      <Sk className="h-14 w-full rounded-2xl mb-8" />

      {/* Reading text */}
      <div className="space-y-3 mb-10">
        <Sk className="h-4 w-full" />
        <Sk className="h-4 w-5/6" />
        <Sk className="h-4 w-full" />
        <Sk className="h-4 w-4/5" />
        <Sk className="h-4 w-full" />
        <div className="pt-3 pb-1">
          <Sk className="h-6 w-52" />
        </div>
        <Sk className="h-4 w-full" />
        <Sk className="h-4 w-3/4" />
        <Sk className="h-4 w-full" />
        <Sk className="h-4 w-5/6" />
        <Sk className="h-4 w-2/3" />
        <div className="pt-3 pb-1">
          <Sk className="h-6 w-40" />
        </div>
        <Sk className="h-4 w-full" />
        <Sk className="h-4 w-4/5" />
        <Sk className="h-4 w-full" />
      </div>

      {/* Quiz */}
      <div className="mb-6">
        <Sk className="h-6 w-44 mb-4" />
        <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
          <Sk className="h-14 w-full rounded-none" />
          <div className="p-6 space-y-3">
            <Sk className="h-5 w-2/3" />
            {[...Array(4)].map((_, i) => (
              <Sk key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
