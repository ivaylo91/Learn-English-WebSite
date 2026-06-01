import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Target } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import PlacementTest from '@/components/placement/PlacementTest';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Тест за ниво | Учи Английски',
  description: 'Реши 20 въпроса и разбери своето ниво на английски — от A1 до C2.',
};

export default async function TestZaNivoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login?next=/test-za-nivo');

  const { data: profile } = await supabase
    .from('profiles')
    .select('level, xp')
    .eq('id', user.id)
    .single();

  const hasLevel = profile && profile.xp > 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

      <Link
        href="/profil"
        className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline mb-6"
        style={{ color: 'var(--coral)' }}
      >
        <ChevronLeft className="w-4 h-4" />
        Профил
      </Link>

      {/* Page header */}
      <div className="flex items-start gap-4 mb-8">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: 'var(--coral-soft)' }}
        >
          <Target className="w-6 h-6" style={{ color: 'var(--coral-ink)' }} />
        </div>
        <div>
          <h1
            className="text-3xl font-extrabold mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            Тест за ниво
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            20 въпроса по речник и граматика — от A1 до C1. Ще ти отнеме около 5 минути.
            {hasLevel && (
              <> Текущото ти ниво е <strong style={{ color: 'var(--ink-2)' }}>{profile.level}</strong>.</>
            )}
          </p>
        </div>
      </div>

      {/* Retake notice for existing users */}
      {hasLevel && (
        <div
          className="rounded-2xl px-5 py-4 mb-8 text-sm"
          style={{ background: 'var(--butter)', border: '1px solid #e8d8a8', color: 'var(--butter-ink)' }}
        >
          Като завършиш теста, нивото ти ще се обнови автоматично.
        </div>
      )}

      <PlacementTest />
    </div>
  );
}
