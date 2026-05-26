"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, BookOpen, LogOut, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/stores/authStore";

const navLinks = [
  { href: "/rechnik",   label: "Речник"    },
  { href: "/gramatika", label: "Граматика" },
  { href: "/slusham",   label: "Слушане"   },
  { href: "/chetene",   label: "Четене"    },
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
    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
      {initials}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-bold text-zinc-900 text-[15px] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Учи Английски
          </span>
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
                  "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer",
                  active
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA — logged out */}
        {!user && (
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Вход
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px active:scale-[.98] cursor-pointer"
              style={{ background: "#22C55E", boxShadow: "0 2px 8px rgba(34,197,94,.30)" }}
            >
              Регистрация
            </Link>
          </div>
        )}

        {/* Desktop — logged in */}
        {user && (
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/napredak"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                pathname.startsWith("/napredak")
                  ? "bg-zinc-100 text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              )}
            >
              <TrendingUp className="w-4 h-4" />
              {displayName}
            </Link>
            <div className="flex items-center gap-2">
              <UserAvatar name={displayName} />
              <button
                onClick={handleSignOut}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                title="Изход"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-100 px-4 py-4 flex flex-col gap-1 bg-white">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                  active
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 mt-2 border-t border-zinc-100">
            {!user ? (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                >
                  Вход
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer"
                  style={{ background: "#22C55E" }}
                >
                  Регистрация
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <UserAvatar name={displayName} />
                  <span className="text-sm font-medium text-zinc-700">{displayName}</span>
                </div>
                <button
                  onClick={() => { setOpen(false); handleSignOut(); }}
                  className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Изход
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
