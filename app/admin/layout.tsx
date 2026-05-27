import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { BookMarked, PenLine, Headphones, BookOpen, LayoutDashboard } from 'lucide-react';

function isAdmin(email: string | undefined): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim());
  return !!email && admins.includes(email);
}

const navItems = [
  { href: '/admin',          label: 'Табло',     icon: LayoutDashboard },
  { href: '/admin/rechnik',  label: 'Речник',    icon: BookMarked },
  { href: '/admin/gramatika',label: 'Граматика', icon: PenLine },
  { href: '/admin/slusham',  label: 'Слушане',   icon: Headphones },
  { href: '/admin/chetene',  label: 'Четене',    icon: BookOpen },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!isAdmin(user?.email)) redirect('/');

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside
        className="w-56 shrink-0 flex flex-col p-4 gap-1"
        style={{ background: "var(--bg-2)", borderRight: "1px solid var(--line)" }}
      >
        <div className="px-3 pb-4 pt-2">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "var(--coral)", fontFamily: "var(--font-display)" }}
            >
              А
            </div>
            <span className="text-sm font-bold" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>
              Админ
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{ color: "var(--ink-2)" }}
            >
              <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--muted)" }} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4" style={{ borderTop: "1px solid var(--line)" }}>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl transition-colors"
            style={{ color: "var(--muted)" }}
          >
            ← Обратно към сайта
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
