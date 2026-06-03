'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, LayoutGrid, TrendingUp, User,
  BookMarked, PenLine, Headphones, BookOpen, Pencil, X,
} from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';

const MODULES = [
  { href: '/rechnik',   icon: BookMarked, label: 'Речник',    bg: 'var(--coral-soft)', color: 'var(--coral-ink)'  },
  { href: '/gramatika', icon: PenLine,    label: 'Граматика', bg: 'var(--lavender)',   color: 'var(--lav-ink)'    },
  { href: '/slusham',   icon: Headphones, label: 'Слушане',   bg: 'var(--sky)',        color: 'var(--sky-ink)'    },
  { href: '/chetene',   icon: BookOpen,   label: 'Четене',    bg: 'var(--sage)',       color: 'var(--sage-ink)'   },
  { href: '/pisane',    icon: Pencil,     label: 'Писане',    bg: 'var(--butter)',     color: 'var(--butter-ink)' },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const user     = useAuthStore(s => s.user);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Close sheet on navigation
  useEffect(() => { setSheetOpen(false); }, [pathname]);

  const isModuleActive = MODULES.some(m => pathname.startsWith(m.href));

  return (
    <>
      {/* ── Module sheet backdrop ── */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }}
          onClick={() => setSheetOpen(false)}
        />
      )}

      {/* ── Module sheet (slides up above the nav bar) ── */}
      <div
        className="fixed left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-out"
        style={{
          bottom: '64px',
          transform: sheetOpen ? 'translateY(0)' : 'translateY(calc(100% + 80px))',
        }}
      >
        <div
          className="mx-3 mb-2 rounded-2xl overflow-hidden"
          style={{
            background: 'var(--surface)',
            border:     '1px solid var(--line)',
            boxShadow:  '0 -8px 32px -8px rgba(0,0,0,.18)',
          }}
        >
          {/* Sheet header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid var(--line)' }}
          >
            <span className="text-sm font-bold" style={{ color: 'var(--ink)' }}>
              Избери модул
            </span>
            <button
              onClick={() => setSheetOpen(false)}
              className="p-1.5 rounded-lg cursor-pointer transition-colors hover:bg-[var(--bg-2)]"
              style={{ color: 'var(--muted)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Module grid */}
          <div className="grid grid-cols-2 gap-3 p-4">
            {MODULES.map(({ href, icon: Icon, label, bg, color }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all active:scale-[.97]"
                  style={{
                    background: active ? bg : 'var(--bg-2)',
                    border:     active ? `1.5px solid ${color}` : '1.5px solid transparent',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: active ? color : 'var(--ink)' }}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom nav bar ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        style={{
          background:    'var(--surface)',
          borderTop:     '1px solid var(--line)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          boxShadow:     '0 -4px 16px -4px rgba(0,0,0,.08)',
        }}
      >
        <div className="grid grid-cols-4 h-16">

          {/* Home */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 transition-colors"
            style={{ color: pathname === '/' ? 'var(--coral)' : 'var(--muted)' }}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Начало</span>
          </Link>

          {/* Modules — opens sheet */}
          <button
            onClick={() => setSheetOpen(v => !v)}
            className="flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
            style={{ color: (isModuleActive || sheetOpen) ? 'var(--coral)' : 'var(--muted)' }}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Учи</span>
          </button>

          {/* Progress */}
          <Link
            href="/napredak"
            className="flex flex-col items-center justify-center gap-1 transition-colors"
            style={{ color: pathname.startsWith('/napredak') ? 'var(--coral)' : 'var(--muted)' }}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Напредък</span>
          </Link>

          {/* Profile / Login */}
          <Link
            href={user ? '/profil' : '/login'}
            className="flex flex-col items-center justify-center gap-1 transition-colors"
            style={{
              color: (pathname.startsWith('/profil') || pathname.startsWith('/login') || pathname.startsWith('/register'))
                ? 'var(--coral)'
                : 'var(--muted)',
            }}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{user ? 'Профил' : 'Вход'}</span>
          </Link>

        </div>
      </nav>
    </>
  );
}
