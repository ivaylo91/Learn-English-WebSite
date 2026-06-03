import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Badge from '@/components/ui/Badge';
import { BookMarked, PenLine, Headphones, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Твоят план | Учи Английски',
  description: 'Персонализиран план за учене след теста за ниво.',
};

const LEVEL_LABEL: Record<string, string> = {
  A1: 'Начинаещ',        A2: 'Елементарен',
  B1: 'Средно ниво',     B2: 'Средно-напреднал',
  C1: 'Напреднал',       C2: 'Владееш отлично',
};

const LEVEL_DESC: Record<string, string> = {
  A1: 'Ще учим основни думи и прости изречения. Перфектно начало!',
  A2: 'Ще разширим речника и граматиката за ежедневни ситуации.',
  B1: 'Ще работим върху свободна комуникация и по-сложна граматика.',
  B2: 'Ще усвоим напреднала лексика и фини граматически конструкции.',
  C1: 'Ще прецизираме изказа с академична лексика и сложен синтаксис.',
  C2: 'Ще работим върху нюансите на езика — приближаваш ниво на носител.',
};

const levelBadgeColor: Record<string, 'sage' | 'sky' | 'lavender'> = {
  A1: 'sage', A2: 'sage', B1: 'sky', B2: 'sky', C1: 'lavender', C2: 'lavender',
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/onboarding');

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, level')
    .eq('id', user.id)
    .single();

  const level = (profile?.level ?? 'A1') as string;
  const name  = profile?.name?.trim() || user.email?.split('@')[0] || 'приятел';

  // Fetch first content at user's level from grammar, listening, vocabulary in parallel
  const [grammarRes, listeningRes, vocabRes] = await Promise.all([
    supabase
      .from('grammar_lessons')
      .select('slug, title, category')
      .eq('level', level)
      .order('created_at')
      .limit(1)
      .maybeSingle(),
    supabase
      .from('listening_clips')
      .select('id, title, topic')
      .eq('level', level)
      .order('created_at')
      .limit(1)
      .maybeSingle(),
    supabase
      .from('vocabulary_words')
      .select('id, word_en, word_bg')
      .eq('level', level)
      .order('word_en')
      .limit(1)
      .maybeSingle(),
  ]);

  type Step = {
    num:   number;
    icon:  React.ElementType;
    bg:    string;
    color: string;
    tag:   string;
    title: string;
    sub:   string;
    href:  string;
  };

  const steps: Step[] = [
    grammarRes.data && {
      num:   1,
      icon:  PenLine,
      bg:    'var(--lavender)',
      color: 'var(--lav-ink)',
      tag:   'Граматика',
      title: grammarRes.data.title,
      sub:   grammarRes.data.category,
      href:  `/gramatika/${grammarRes.data.slug}`,
    },
    listeningRes.data && {
      num:   2,
      icon:  Headphones,
      bg:    'var(--sky)',
      color: 'var(--sky-ink)',
      tag:   'Слушане',
      title: listeningRes.data.title,
      sub:   listeningRes.data.topic,
      href:  `/slusham/${listeningRes.data.id}`,
    },
    vocabRes.data && {
      num:   3,
      icon:  BookMarked,
      bg:    'var(--coral-soft)',
      color: 'var(--coral-ink)',
      tag:   'Речник',
      title: vocabRes.data.word_en,
      sub:   vocabRes.data.word_bg,
      href:  `/rechnik/${vocabRes.data.id}`,
    },
  ].filter(Boolean) as Step[];

  const firstHref = steps[0]?.href ?? '/rechnik';

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">

      {/* Level result card */}
      <div
        className="rounded-3xl p-8 mb-8 text-center"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex items-center justify-center gap-2 mb-5">
          <Sparkles className="w-4 h-4" style={{ color: 'var(--coral)' }} />
          <span className="text-xs font-bold uppercase tracking-[.14em]" style={{ color: 'var(--coral)' }}>
            Тестът завърши
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-3">
          <Badge color={levelBadgeColor[level] ?? 'sky'}>{level}</Badge>
          <h1
            className="text-2xl font-extrabold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            {LEVEL_LABEL[level] ?? level}
          </h1>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: '30ch', margin: '0 auto' }}>
          {LEVEL_DESC[level]}
        </p>
      </div>

      {/* Learning path */}
      {steps.length > 0 && (
        <>
          <p
            className="text-[11px] font-bold uppercase tracking-[.14em] mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Препоръчан план за ниво {level}
          </p>

          <div className="flex flex-col gap-3 mb-8">
            {steps.map(step => {
              const Icon = step.icon;
              return (
                <Link
                  key={step.num}
                  href={step.href}
                  className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
                  style={{
                    background:  'var(--surface)',
                    border:      '1px solid var(--line)',
                    boxShadow:   'var(--shadow-sm)',
                  }}
                >
                  {/* Step number */}
                  <div
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold"
                    style={{ background: step.bg, color: step.color }}
                  >
                    {step.num}
                  </div>

                  {/* Module icon */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: step.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[.1em] mb-0.5"
                      style={{ color: step.color }}
                    >
                      {step.tag}
                    </p>
                    <p className="text-sm font-bold truncate" style={{ color: 'var(--ink)' }}>
                      {step.title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{step.sub}</p>
                  </div>

                  <ArrowRight
                    className="shrink-0 w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                    style={{ color: 'var(--muted)' }}
                  />
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={firstHref}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-px active:scale-[.98]"
          style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
        >
          Начни учене сега
          <ChevronRight className="w-4 h-4" />
        </Link>
        <Link
          href="/napredak"
          className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-px active:scale-[.98]"
          style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
        >
          Виж напредъка
        </Link>
      </div>
    </div>
  );
}
