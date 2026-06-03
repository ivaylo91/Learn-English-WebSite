"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  LogOut, TrendingUp, Search,
  Headphones, BookOpen, Pencil, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/stores/authStore";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SearchModal from "@/components/search/SearchModal";

// ── Link groups ───────────────────────────────────────────────────────────────

const mainLinks = [
  { href: "/rechnik",   label: "Речник"    },
  { href: "/gramatika", label: "Граматика" },
];

const practiceLinks = [
  { href: "/slusham", label: "Слушане", icon: Headphones, bg: "var(--sky)",    color: "var(--sky-ink)"    },
  { href: "/chetene", label: "Четене",  icon: BookOpen,   bg: "var(--sage)",   color: "var(--sage-ink)"   },
  { href: "/pisane",  label: "Писане",  icon: Pencil,     bg: "var(--butter)", color: "var(--butter-ink)" },
] as const;

// ── Avatar ────────────────────────────────────────────────────────────────────

function UserAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div
      className="w-8 h-8 rounded-[10px] flex items-center justify-center text-xs font-bold"
      style={{ background: "var(--lavender)", color: "var(--lav-ink)" }}
    >
      {initials}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [practiceOpen,  setPracticeOpen]  = useState(false);
  const practiceRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((s) => s.user);

  const isPracticeActive = practiceLinks.some(l => pathname.startsWith(l.href));

  // Close practice dropdown on pathname change
  useEffect(() => { setPracticeOpen(false); }, [pathname]);

  // Close practice dropdown on outside click
  useEffect(() => {
    if (!practiceOpen) return;
    function onOutside(e: MouseEvent) {
      if (practiceRef.current && !practiceRef.current.contains(e.target as Node)) {
        setPracticeOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [practiceOpen]);

  // Global Cmd+K / Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setPracticeOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const displayName: string =
    user?.user_metadata?.name ?? user?.email?.split("@")[0] ?? "Потребител";

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const activeStyle = { background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)", boxShadow: "var(--shadow-sm)" };
  const inactiveStyle = { color: "var(--ink-2)" };

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{ background: "var(--navbar-bg)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-base"
            style={{ background: "var(--coral)", fontFamily: "var(--font-display)", boxShadow: "0 6px 12px -4px rgba(232,99,58,.5)" }}
          >
            У
          </div>
          <div>
            <span className="font-semibold text-[15px] tracking-tight block leading-none" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              Учи Английски
            </span>
            <span className="text-[10px] uppercase tracking-widest block leading-none mt-0.5" style={{ color: "var(--muted)" }}>
              Learn English
            </span>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">

          {/* Речник + Граматика */}
          {mainLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer"
                style={active ? activeStyle : inactiveStyle}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Практика dropdown */}
          <div ref={practiceRef} className="relative">
            <button
              onClick={() => setPracticeOpen(v => !v)}
              className={cn(
                "flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer",
              )}
              style={isPracticeActive ? activeStyle : inactiveStyle}
              aria-expanded={practiceOpen}
            >
              Практика
              <ChevronDown
                className="w-3.5 h-3.5 transition-transform duration-150"
                style={{ transform: practiceOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {practiceOpen && (
              <div
                className="absolute top-full left-0 mt-1.5 rounded-2xl overflow-hidden z-50 min-w-[160px]"
                style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)" }}
              >
                {practiceLinks.map(({ href, label, icon: Icon, bg, color }) => {
                  const active = pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setPracticeOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--bg-2)] cursor-pointer"
                      style={{ color: active ? "var(--coral)" : "var(--ink-2)", borderBottom: "1px solid var(--line)" }}
                    >
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg }}>
                        <Icon className="w-3.5 h-3.5" style={{ color }} />
                      </div>
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Напредък */}
          <Link
            href="/napredak"
            className="px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer"
            style={pathname.startsWith("/napredak") ? activeStyle : inactiveStyle}
          >
            Напредък
          </Link>
        </nav>

        {/* Desktop — logged out */}
        {!user && (
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-xl transition-colors cursor-pointer hover:bg-[var(--bg-2)]" style={{ color: 'var(--muted)' }} title="Търси (Ctrl+K)" aria-label="Търси">
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <Link href="/login" className="px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer rounded-xl hover:bg-[var(--bg-2)]" style={{ color: "var(--ink-2)" }}>
              Вход
            </Link>
            <Link href="/register" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px active:scale-[.98] cursor-pointer" style={{ background: "var(--coral)", boxShadow: "0 8px 16px -8px rgba(232,99,58,.6)" }}>
              Регистрация
            </Link>
          </div>
        )}

        {/* Desktop — logged in */}
        {user && (
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-xl transition-colors cursor-pointer hover:bg-[var(--bg-2)]" style={{ color: 'var(--muted)' }} title="Търси (Ctrl+K)" aria-label="Търси">
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <Link
              href="/napredak"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              style={pathname.startsWith("/napredak") ? activeStyle : { color: "var(--ink-2)" }}
            >
              <TrendingUp className="w-4 h-4" />
              {displayName}
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/profil" title="Профил" className="cursor-pointer">
                <UserAvatar name={displayName} />
              </Link>
              <button onClick={handleSignOut} className="p-1.5 rounded-lg transition-colors cursor-pointer" style={{ color: "var(--muted)" }} title="Изход">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile — search + theme toggle (nav handled by BottomNav) */}
        <div className="md:hidden flex items-center gap-1">
          <button className="p-2 rounded-lg cursor-pointer" style={{ color: "var(--muted)" }} onClick={() => setSearchOpen(true)} aria-label="Търси">
            <Search className="w-5 h-5" />
          </button>
          <ThemeToggle />
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
