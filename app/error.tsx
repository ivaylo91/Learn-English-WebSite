'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: "var(--rose)" }}
      >
        <svg className="w-7 h-7" style={{ color: "var(--rose-ink)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
        Нещо се обърка
      </h2>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>Опитай пак или презареди страницата.</p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-xl text-white text-sm font-semibold active:scale-[.98] transition-all"
        style={{ background: "var(--coral)", boxShadow: "0 8px 16px -8px rgba(232,99,58,.5)" }}
      >
        Опитай пак
      </button>
    </div>
  );
}
