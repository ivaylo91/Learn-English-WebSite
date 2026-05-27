'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookMarked, PenLine, Headphones, BookOpen,
  LayoutDashboard, Menu, X, ArrowLeft,
} from 'lucide-react';

const navItems = [
  { href: '/admin',           label: 'Табло',     icon: LayoutDashboard },
  { href: '/admin/rechnik',   label: 'Речник',    icon: BookMarked },
  { href: '/admin/gramatika', label: 'Граматика', icon: PenLine },
  { href: '/admin/slusham',   label: 'Слушане',   icon: Headphones },
  { href: '/admin/chetene',   label: 'Четене',    icon: BookOpen },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  const nav = (
    <>
      <div className="px-3 pb-4 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'var(--coral)', fontFamily: 'var(--font-display)' }}
          >
            А
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
            Админ
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="md:hidden p-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                color:      active ? 'var(--coral-ink)' : 'var(--ink-2)',
                background: active ? 'var(--coral-soft)' : 'transparent',
              }}
            >
              <Icon
                className="w-4 h-4 shrink-0"
                style={{ color: active ? 'var(--coral)' : 'var(--muted)' }}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4" style={{ borderTop: '1px solid var(--line)' }}>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Обратно към сайта
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-xl"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-sm)',
          color: 'var(--ink)',
        }}
        aria-label="Отвори меню"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed md:static inset-y-0 left-0 z-40',
          'w-56 shrink-0 flex flex-col p-4 gap-1',
          'transition-transform duration-200 ease-out',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
        style={{ background: 'var(--bg-2)', borderRight: '1px solid var(--line)' }}
      >
        {nav}
      </aside>
    </>
  );
}
