import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ProfileForm from './ProfileForm';
import { Flame, Trophy, TrendingUp, ChevronLeft, KeyRound } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { Metadata } from 'next';
import type { Level } from '@/lib/types/database';

export const metadata: Metadata = {
  title: 'Моят профил | Учи Английски',
  description: 'Управлявай акаунта си — промени името, нивото и паролата.',
};

const levelColor: Record<string, 'green' | 'amber' | 'purple' | 'gray'> = {
  A1: 'green', A2: 'green',
  B1: 'amber', B2: 'amber',
  C1: 'purple', C2: 'purple',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('bg-BG', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';
  return (
    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-extrabold shadow-lg shadow-indigo-200 shrink-0">
      {initials}
    </div>
  );
}

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login?next=/profil');

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, level, xp, streak, created_at')
    .eq('id', user.id)
    .single();

  const name      = profile?.name      ?? user.email?.split('@')[0] ?? 'Потребител';
  const level     = (profile?.level    ?? 'A1') as Level;
  const xp        = profile?.xp        ?? 0;
  const streak    = profile?.streak    ?? 0;
  const joinedAt  = profile?.created_at ?? user.created_at;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

      <Link
        href="/napredak"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Напредък
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Моят профил</h1>
        <p className="text-gray-500 text-sm">Управлявай акаунта и предпочитанията си.</p>
      </div>

      {/* Identity card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5 mb-6">
        <Avatar name={name} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-gray-900 truncate">{name}</h2>
            <Badge color={levelColor[level] ?? 'gray'}>{level}</Badge>
          </div>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
          <p className="text-xs text-gray-400 mt-0.5">Член от {formatDate(joinedAt)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Точки XP',  value: String(xp),     icon: Trophy,     color: 'text-amber-600',  bg: 'bg-amber-50'  },
          { label: 'Дни поред', value: String(streak),  icon: Flame,      color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Ниво',      value: level,           icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-xl font-extrabold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="text-base font-bold text-gray-900 mb-5">Редактирай профила</h3>
        <ProfileForm userId={user.id} initName={name} initLevel={level} />
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-base font-bold text-gray-900 mb-4">Сигурност</h3>
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
        >
          <KeyRound className="w-4 h-4" />
          Промяна на паролата
        </Link>
      </div>

    </div>
  );
}
