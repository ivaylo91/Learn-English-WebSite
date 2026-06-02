import { BookMarked, Zap, CheckCircle2, Plus } from 'lucide-react';
import ModuleHero from '@/components/modules/ModuleHero';
import WordListClient from '@/components/vocabulary/WordListClient';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Речник | Учи Английски',
  description: 'Думи по теми и ниво с флаш карти и умно SM-2 повторение — системата запомня кое знаеш.',
};

export default async function RechnikPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: words }, { data: catRows }, { data: progressRows }, dueRes] = await Promise.all([
    supabase.from('vocabulary_words').select('*').order('level').order('word_en'),
    supabase.from('vocabulary_words').select('category').order('category'),
    user
      ? supabase.from('user_word_progress').select('word_id, status').eq('user_id', user.id)
      : Promise.resolve({ data: [] }),
    // Count of words currently due for review
    user
      ? supabase
          .from('user_word_progress')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .lte('next_review_at', new Date().toISOString())
          .neq('status', 'known')
      : Promise.resolve({ count: 0 }),
  ]);

  const allWords   = words ?? [];
  const categories = [...new Set((catRows ?? []).map(r => r.category))] as string[];
  const dueCount   = dueRes.count ?? 0;

  // word_id → status map for the "My Words" tab
  const progressMap: Record<string, string> = {};
  for (const r of (progressRows ?? [])) {
    progressMap[(r as { word_id: string; status: string }).word_id] =
      (r as { word_id: string; status: string }).status;
  }

  const wordsInList   = Object.keys(progressMap).length;
  const dueLabel      = dueCount === 1 ? '1 дума' : `${dueCount} думи`;

  // ── CTA states ───────────────────────────────────────────────────────────
  type CtaState = 'guest' | 'empty' | 'due' | 'caught_up';
  const ctaState: CtaState =
    !user           ? 'guest'     :
    wordsInList === 0 ? 'empty'   :
    dueCount > 0      ? 'due'     :
                        'caught_up';

  const ctaConfig: Record<CtaState, {
    bg: string; border: string;
    heading: string; sub: string;
    btnLabel: string; btnStyle: React.CSSProperties;
    icon: React.ElementType;
  }> = {
    guest: {
      bg: 'var(--coral-soft)', border: '#f4c8a8',
      heading: 'Готов ли си за повторение?',
      sub:     'Системата знае кои думи трябва да прегледаш днес.',
      btnLabel: 'Учи сега',
      btnStyle: { background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' },
      icon: Zap,
    },
    empty: {
      bg: 'var(--bg-2)', border: 'var(--line)',
      heading: 'Добави думи в списъка си',
      sub:     'Намери дума в речника, кликни "+" и тя ще се добави за повторение.',
      btnLabel: 'Разгледай речника',
      btnStyle: { background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' },
      icon: Plus,
    },
    due: {
      bg: 'var(--coral-soft)', border: '#f4c8a8',
      heading: `${dueLabel} за повторение`,
      sub:     'SM-2 умно повторение — системата знае точно кое трябва да прегледаш.',
      btnLabel: `Учи ${dueLabel}`,
      btnStyle: { background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' },
      icon: Zap,
    },
    caught_up: {
      bg: 'var(--sage)', border: '#b5d8be',
      heading: 'Всичко прегледано!',
      sub:     'Няма думи за повторение в момента. Добави нови или се върни утре.',
      btnLabel: 'Учи сега',
      btnStyle: { background: 'var(--sage-ink)', boxShadow: 'none' },
      icon: CheckCircle2,
    },
  };

  const cta  = ctaConfig[ctaState];
  const CtaIcon = cta.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ModuleHero
        icon={BookMarked}
        title="Речник"
        description="Думи по теми и ниво. Учи с флаш карти и умно SM-2 повторение — системата запомня кое знаеш и кое не."
        badge="Флаш карти"
        badgeColor="coral"
        gradient="from-indigo-600 to-violet-600"
        bg="bg-indigo-50"
        iconColor="text-indigo-600"
        stats={[
          { label: 'Думи общо',    value: `${allWords.length}` },
          { label: 'В списъка',    value: user ? `${wordsInList}` : '—' },
          { label: 'За повторение', value: user ? (dueCount > 0 ? `${dueCount}` : '✓') : '—' },
        ]}
      />

      {/* Study CTA */}
      <div
        className="flex items-center justify-between gap-4 mb-8 p-5 rounded-2xl"
        style={{ background: cta.bg, border: `1px solid ${cta.border}` }}
      >
        <div className="min-w-0">
          <p className="font-bold text-sm" style={{ color: 'var(--ink)' }}>{cta.heading}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--ink-2)' }}>{cta.sub}</p>
        </div>
        <Link
          href="/rechnik/study"
          className="shrink-0 inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm active:scale-[.98] transition-all"
          style={cta.btnStyle}
        >
          <CtaIcon className="w-4 h-4" />
          {cta.btnLabel}
        </Link>
      </div>

      <section>
        <WordListClient words={allWords} categories={categories} progressMap={progressMap} />
      </section>
    </div>
  );
}
