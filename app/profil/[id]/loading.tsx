export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-4 w-24 rounded mb-6" style={{ background: 'var(--line)' }} />
      <div className="rounded-2xl p-6 flex items-center gap-5 mb-6" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}>
        <div className="w-20 h-20 rounded-3xl shrink-0" style={{ background: 'var(--line)' }} />
        <div className="flex-1">
          <div className="h-6 w-40 rounded mb-2" style={{ background: 'var(--line)' }} />
          <div className="h-3 w-28 rounded" style={{ background: 'var(--line)' }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl p-4 h-24" style={{ background: 'var(--line)' }} />
        ))}
      </div>
      <div className="h-6 w-32 rounded mb-4" style={{ background: 'var(--line)' }} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-2xl h-24" style={{ background: 'var(--line)' }} />
        ))}
      </div>
    </div>
  );
}
