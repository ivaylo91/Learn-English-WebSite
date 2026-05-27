import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BookMarked, PenLine, Headphones, BookOpen, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Админ табло | Учи Английски' };

const modules = [
  { href: '/admin/rechnik',   label: 'Речник',    icon: BookMarked, table: 'vocabulary_words',  color: 'var(--coral-soft)', border: '#f4c8a8', ink: 'var(--coral-ink)' },
  { href: '/admin/gramatika', label: 'Граматика', icon: PenLine,    table: 'grammar_lessons',   color: 'var(--lavender)',   border: '#c9bce4', ink: 'var(--lav-ink)' },
  { href: '/admin/slusham',   label: 'Слушане',   icon: Headphones, table: 'listening_clips',   color: 'var(--sky)',        border: '#b4cfe4', ink: 'var(--sky-ink)' },
  { href: '/admin/chetene',   label: 'Четене',    icon: BookOpen,   table: 'reading_texts',     color: 'var(--sage)',       border: '#b5d8be', ink: 'var(--sage-ink)' },
] as const;

export default async function AdminDashboard() {
  const supabase = await createClient();

  const counts = await Promise.all(
    modules.map(async m => {
      const { count } = await supabase
        .from(m.table)
        .select('*', { count: 'exact', head: true });
      return count ?? 0;
    })
  );

  return (
    <div>
      <h1
        className="text-3xl font-extrabold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
      >
        Табло
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
        Управление на съдържанието на сайта.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map(({ href, label, icon: Icon, color, border, ink }, i) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-0.5 transition-all"
            style={{ background: color, border: `1px solid ${border}` }}
          >
            <div className="flex items-center justify-between">
              <Icon className="w-6 h-6" style={{ color: ink }} />
              <ArrowRight className="w-4 h-4" style={{ color: ink, opacity: 0.6 }} />
            </div>
            <div>
              <p className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: ink }}>
                {counts[i]}
              </p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: ink }}>{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
