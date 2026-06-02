import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ProfileForm from './ProfileForm';
import PushToggle from '@/components/profil/PushToggle';
import { Flame, Trophy, TrendingUp, ChevronLeft, KeyRound, Target } from 'lucide-react';
import { type DailyGoal } from '@/lib/actions/goals';
import Badge from '@/components/ui/Badge';
import type { Metadata } from 'next';
import type { Level } from '@/lib/types/database';

export const metadata: Metadata = {
  title: 'Моят профил | Учи Английски',
  description: 'Управлявай акаунта си — промени името, нивото и паролата.',
};

const levelColor: Record<string, 'sage' | 'sky' | 'lavender' | 'gray'> = {
  A1: 'sage', A2: 'sage',
  B1: 'sky',  B2: 'sky',
  C1: 'lavender', C2: 'lavender',
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
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold shrink-0"
      style={{
        background: "var(--lavender)",
        color: "var(--lav-ink)",
        fontFamily: "var(--font-display)",
      }}
    >
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
    .select('name, level, xp, streak, created_at, email_reminders, daily_goal')
    .eq('id', user.id)
    .single();

  const name           = profile?.name           ?? user.email?.split('@')[0] ?? 'Потребител';
  const level          = (profile?.level         ?? 'A1') as Level;
  const xp             = profile?.xp             ?? 0;
  const streak         = profile?.streak         ?? 0;
  const joinedAt       = profile?.created_at     ?? user.created_at;
  const emailReminders = profile?.email_reminders ?? true;
  const dailyGoal      = (profile?.daily_goal    ?? 'standard') as DailyGoal;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

      <Link
        href="/napredak"
        className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline mb-6"
        style={{ color: "var(--coral)" }}
      >
        <ChevronLeft className="w-4 h-4" />
        Напредък
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          Моят профил
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Управлявай акаунта и предпочитанията си.</p>
      </div>

      {/* Identity card */}
      <div
        className="rounded-2xl p-6 flex items-center gap-5 mb-6"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}
      >
        <Avatar name={name} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-bold truncate" style={{ color: "var(--ink)" }}>{name}</h2>
            <Badge color={levelColor[level] ?? 'gray'}>{level}</Badge>
          </div>
          <p className="text-sm truncate" style={{ color: "var(--muted)" }}>{user.email}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Член от {formatDate(joinedAt)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Точки XP',  value: String(xp),    icon: Trophy,     bg: "var(--butter)",   color: "var(--butter-ink)" },
          { label: 'Дни поред', value: String(streak), icon: Flame,      bg: "var(--peach)",    color: "var(--coral-ink)" },
          { label: 'Ниво',      value: level,          icon: TrendingUp, bg: "var(--lavender)", color: "var(--lav-ink)"   },
        ].map(({ label, value, icon: Icon, bg, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4 text-center"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: bg }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <p className="text-xl font-extrabold" style={{ color: "var(--ink)" }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Edit form */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}
      >
        <h3 className="text-base font-bold mb-5" style={{ color: "var(--ink)" }}>Редактирай профила</h3>
        <ProfileForm userId={user.id} initName={name} initLevel={level} initEmailReminders={emailReminders} initDailyGoal={dailyGoal} />
      </div>

      {/* Security */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}
      >
        <h3 className="text-base font-bold mb-4" style={{ color: "var(--ink)" }}>Сигурност</h3>
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
          style={{ color: "var(--coral)" }}
        >
          <KeyRound className="w-4 h-4" />
          Промяна на паролата
        </Link>
      </div>

      {/* Placement test */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}
      >
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--ink)" }}>Ниво</h3>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          Не си сигурен на кое ниво си? Реши кратък тест и нивото ти ще се обнови автоматично.
        </p>
        <Link
          href="/test-za-nivo"
          className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
          style={{ color: "var(--coral)" }}
        >
          <Target className="w-4 h-4" />
          Тест за ниво
        </Link>
      </div>

      {/* Push notifications */}
      <PushToggle />

    </div>
  );
}
