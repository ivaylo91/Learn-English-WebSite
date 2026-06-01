import Link from 'next/link';
import VocabImport from '@/components/admin/VocabImport';

export const metadata = { title: 'Импорт речник | Админ' };

export default function ImportVocabPage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/rechnik" className="text-sm" style={{ color: 'var(--muted)' }}>
          ← Речник
        </Link>
        <span style={{ color: 'var(--line-2)' }}>/</span>
        <h1
          className="text-xl font-extrabold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
        >
          Масов импорт
        </h1>
      </div>

      <VocabImport />
    </div>
  );
}
