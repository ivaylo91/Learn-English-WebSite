"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, TrendingUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/stores/authStore";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SearchModal from "@/components/search/SearchModal";

const navLinks = [
  { href: "/rechnik",   label: "Речник"    },
  { href: "/gramatika", label: "Граматика" },
  { href: "/slusham",   label: "Слушане"   },
  { href: "/chetene",   label: "Четене"    },
  { href: "/pisane",    label: "Писане"    },
  { href: "/napredak",  label: "Напредък"  },
];

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-8 h-8 rounded-[10px] flex items-center justify-center text-xs font-bold"
      style={{ background: "var(--lavender)", color: "var(--lav-ink)" }}
    >
      {initials}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [open,       setOpen]       = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const displayName: string =
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "Потребител";

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        background: "var(--navbar-bg)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-base"
            style={{
              background: "var(--coral)",
              fontFamily: "var(--font-display)",
              boxShadow: "0 6px 12px -4px rgba(232,99,58,.5)",
            }}
          >
            У
          </div>
          <div>
            <span
              className="font-semibold text-[15px] tracking-tight block leading-none"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Учи Английски
            </span>
            <span
              className="text-[10px] uppercase tracking-widest block leading-none mt-0.5"
              style={{ color: "var(--muted)" }}
            >
              Learn English
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer",
                  active
                    ? "text-[var(--ink)]"
                    : "hover:text-[var(--ink)]"
                )}
                style={
                  active
                    ? { background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)", boxShadow: "var(--shadow-sm)" }
                    : { color: "var(--ink-2)" }
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA — logged out */}
        {!user && (
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl transition-colors cursor-pointer hover:bg-[var(--bg-2)]"
              style={{ color: 'var(--muted)' }}
              title="Търси (Ctrl+K)"
              aria-label="Търси"
            >
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer rounded-xl hover:bg-[var(--bg-2)]"
              style={{ color: "var(--ink-2)" }}
            >
              Вход
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px active:scale-[.98] cursor-pointer"
              style={{ background: "var(--coral)", boxShadow: "0 8px 16px -8px rgba(232,99,58,.6)" }}
            >
              Регистрация
            </Link>
          </div>
        )}

        {/* Desktop — logged in */}
        {user && (
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl transition-colors cursor-pointer hover:bg-[var(--bg-2)]"
              style={{ color: 'var(--muted)' }}
              title="Търси (Ctrl+K)"
              aria-label="Търси"
            >
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <Link
              href="/napredak"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors cursor-pointer",
              )}
              style={
                pathname.startsWith("/napredak")
                  ? { background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)" }
                  : { color: "var(--ink-2)" }
              }
            >
              <TrendingUp className="w-4 h-4" />
              {displayName}
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/profil" title="Профил" className="cursor-pointer">
                <UserAvatar name={displayName} />
              </Link>
              <button
                onClick={handleSignOut}
                className="p-1.5 rounded-lg transition-colors cursor-pointer"
                style={{ color: "var(--muted)" }}
                title="Изход"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile search + toggle */}
        <div className="md:hidden flex items-center gap-1">
          <button
            className="p-2 rounded-lg cursor-pointer"
            style={{ color: "var(--muted)" }}
            onClick={() => setSearchOpen(true)}
            aria-label="Търси"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-lg cursor-pointer"
            style={{ color: "var(--muted)" }}
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 py-4 flex flex-col gap-1"
          style={{ borderTop: "1px solid var(--line)", background: "var(--bg)" }}
        >
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                style={
                  active
                    ? { background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)" }
                    : { color: "var(--ink-2)" }
                }
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 mt-2" style={{ borderTop: "1px solid var(--line)" }}>
            {!user ? (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{ border: "1px solid var(--line)", color: "var(--ink-2)", background: "var(--surface)" }}
                >
                  Вход
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer"
                  style={{ background: "var(--coral)" }}
                >
                  Регистрация
                </Link>
                <ThemeToggle />
              </div>
            ) : (
              <div className="flex items-center justify-between px-1">
                <Link
                  href="/profil"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <UserAvatar name={displayName} />
                  <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{displayName}</span>
                </Link>
                <div className="flex items-center gap-1">
                  <ThemeToggle />
                  <button
                    onClick={() => { setOpen(false); handleSignOut(); }}
                    className="flex items-center gap-1.5 text-sm transition-colors cursor-pointer"
                    style={{ color: "var(--muted)" }}
                  >
                    <LogOut className="w-4 h-4" />
                    Изход
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
