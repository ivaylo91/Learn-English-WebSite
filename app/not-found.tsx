import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-gray-200 mb-4 tracking-tight">404</p>
      <h1 className="text-xl font-bold text-gray-900 mb-2">Страницата не е намерена</h1>
      <p className="text-sm text-gray-500 mb-8">
        Адресът, който търсиш, не съществува или е бил преместен.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-[.98] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Обратно към началото
      </Link>
    </div>
  );
}
