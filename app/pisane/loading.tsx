export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="h-56 rounded-3xl mb-10 animate-pulse" style={{ background: 'var(--line)' }} />
      <div className="flex gap-2 mb-6">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-8 w-14 rounded-full animate-pulse" style={{ background: 'var(--line)' }} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 rounded-2xl animate-pulse" style={{ background: 'var(--line)' }} />
        ))}
      </div>
    </div>
  );
}
