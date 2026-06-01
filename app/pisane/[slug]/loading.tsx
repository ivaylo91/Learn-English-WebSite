export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-4 w-32 rounded mb-6" style={{ background: 'var(--line)' }} />
      <div className="h-8 w-64 rounded mb-2" style={{ background: 'var(--line)' }} />
      <div className="h-4 w-40 rounded mb-8" style={{ background: 'var(--line)' }} />
      <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
        <div className="h-14" style={{ background: 'var(--line)' }} />
        <div className="p-6 flex flex-col gap-4">
          <div className="h-5 w-3/4 rounded" style={{ background: 'var(--line)' }} />
          <div className="h-12 rounded-xl" style={{ background: 'var(--line)' }} />
        </div>
      </div>
    </div>
  );
}
