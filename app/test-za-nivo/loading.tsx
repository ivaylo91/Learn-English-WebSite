export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="h-5 w-20 rounded-lg mb-6 animate-pulse" style={{ background: 'var(--line)' }} />
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl animate-pulse shrink-0" style={{ background: 'var(--line)' }} />
        <div className="flex-1">
          <div className="h-8 w-48 rounded-lg mb-2 animate-pulse" style={{ background: 'var(--line)' }} />
          <div className="h-4 w-full rounded animate-pulse" style={{ background: 'var(--line)' }} />
        </div>
      </div>
      <div className="rounded-3xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}>
        <div className="px-6 py-4 flex justify-between" style={{ borderBottom: '1px solid var(--line)' }}>
          <div className="h-4 w-24 rounded animate-pulse" style={{ background: 'var(--line)' }} />
          <div className="h-4 w-12 rounded animate-pulse" style={{ background: 'var(--line)' }} />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="h-5 w-3/4 rounded animate-pulse" style={{ background: 'var(--line)' }} />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 rounded-xl animate-pulse" style={{ background: 'var(--line)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
