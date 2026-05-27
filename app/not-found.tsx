import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p
        className="text-7xl font-extrabold mb-4 tracking-tight"
        style={{ fontFamily: "var(--font-display)", color: "var(--line-2)" }}
      >
        404
      </p>
      <h1 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
        Страницата не е намерена
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        Адресът, който търсиш, не съществува или е бил преместен.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold active:scale-[.98] transition-all"
        style={{ background: "var(--coral)", boxShadow: "0 8px 16px -8px rgba(232,99,58,.5)" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Обратно към началото
      </Link>
    </div>
  );
}
