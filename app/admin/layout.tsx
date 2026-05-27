import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';

function isAdmin(email: string | undefined): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim());
  return !!email && admins.includes(email);
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!isAdmin(user?.email)) redirect('/');

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <AdminSidebar />
      {/* pt-16 on mobile leaves room for the fixed hamburger button */}
      <main className="flex-1 overflow-auto p-8 pt-16 md:pt-8">
        {children}
      </main>
    </div>
  );
}
