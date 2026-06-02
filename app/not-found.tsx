import Link from 'next/link';
import { ArrowLeft, BookMarked, PenLine, Headphones, BookOpen, Pencil } from 'lucide-react';

const modules = [
  { href: '/rechnik',   label: 'Речник',    icon: BookMarked, bg: 'var(--coral-soft)',  color: 'var(--coral-ink)'  },
  { href: '/gramatika', label: 'Граматика', icon: PenLine,    bg: 'var(--lavender)',    color: 'var(--lav-ink)'    },
  { href: '/slusham',   label: 'Слушане',   icon: Headphones, bg: 'var(--sky)',         color: 'var(--sky-ink)'    },
  { href: '/chetene',   label: 'Четене',    icon: BookOpen,   bg: 'var(--sage)',        color: 'var(--sage-ink)'   },
  { href: '/pisane',    label: 'Писане',    icon: Pencil,     bg: 'var(--butter)',      color: 'var(--butter-ink)' },
] as const;

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">

      {/* 404 number */}
      <p
        className="text-8xl font-extrabold tracking-tight mb-2 select-none"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--line-2)' }}
      >
        404
      </p>

      <h1
        className="text-2xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
      >
        Страницата не е намерена
      </h1>

      <p className="text-sm mb-10 max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
        Адресът, който търсиш, не съществува или е бил преместен.
        Избери модул по-долу или се върни към началото.
      </p>

      {/* Module shortcuts */}
      <div className="grid grid-cols-5 gap-2 mb-10">
        {modules.map(({ href, label, icon: Icon, bg, color }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all hover:-translate-y-0.5 active:scale-[.97]"
            style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <span className="text-[11px] font-medium" style={{ color: 'var(--ink-2)' }}>{label}</span>
          </Link>
        ))}
      </div>

      {/* Back home */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold active:scale-[.98] transition-all"
        style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Обратно към началото
      </Link>
    </div>
  );
}
