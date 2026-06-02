function Sk({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`skeleton rounded-xl ${className ?? ''}`} style={style} />;
}

export default function LessonLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-pulse">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Sk className="h-4 w-20" />
        <Sk className="h-3 w-3 rounded-full" />
        <Sk className="h-4 w-40" />
      </div>

      {/* Header */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Sk className="h-6 w-10 rounded-full" />
          <Sk className="h-4 w-24" />
        </div>
        <Sk className="h-8 w-72" />
        <Sk className="h-4 w-32" />
      </div>

      {/* Markdown content */}
      <div className="space-y-3 mb-10">
        <Sk className="h-4 w-full" />
        <Sk className="h-4 w-5/6" />
        <Sk className="h-4 w-full" />
        <Sk className="h-4 w-4/5" />
        <div className="pt-2 pb-1">
          <Sk className="h-6 w-48" />
        </div>
        <Sk className="h-4 w-full" />
        <Sk className="h-4 w-3/4" />
        <div className="rounded-xl overflow-hidden mt-4">
          {[...Array(4)].map((_, i) => (
            <Sk key={i} className="h-10 w-full rounded-none border-b" style={{ borderColor: 'var(--line)' }} />
          ))}
        </div>
        <Sk className="h-4 w-full" />
        <Sk className="h-4 w-5/6" />
      </div>

      {/* Quiz section */}
      <div className="mb-10">
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

      {/* Prev / Next */}
      <div className="flex items-center justify-between pt-6" style={{ borderTop: '1px solid var(--line)' }}>
        <Sk className="h-4 w-32" />
        <Sk className="h-4 w-32" />
      </div>
    </div>
  );
}
