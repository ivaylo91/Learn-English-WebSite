import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { BookMarked, PenLine, BookOpen, ArrowRight, Target } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ level: string }> };

// ── Level metadata ─────────────────────────────────────────────────────────────

const LEVEL_META: Record<string, {
  label:       string;
  cefr:        string;
  headline:    string;
  description: string;
  canDo:       string[];
  keywords:    string[];
  color:       'sage' | 'sky' | 'lavender';
}> = {
  A1: {
    label:       'A1 — Начинаещ',
    cefr:        'A1',
    headline:    'Английски за начинаещи — Ниво A1',
    description: 'Научи основите на английски. Ниво A1 покрива прости думи, ежедневни фрази и основна граматика — идеалното начало за учене на английски от нула.',
    canDo: [
      'Представяш се с прости изречения',
      'Описваш хора, места и вещи',
      'Разбираш много бавна и ясна реч',
      'Задаваш и отговаряш на прости въпроси',
    ],
    keywords: ['английски за начинаещи', 'английски A1', 'учи английски от нула', 'английски за деца'],
    color: 'sage',
  },
  A2: {
    label:       'A2 — Елементарен',
    cefr:        'A2',
    headline:    'Английски A2 — Елементарно ниво',
    description: 'На ниво A2 вече се справяш с ежедневни ситуации на английски — пазаруване, транспорт, работа. Научи по-сложни структури и разшири речника си.',
    canDo: [
      'Разбираш кратки и прости текстове',
      'Общуваш при ежедневни задачи',
      'Описваш минали събития',
      'Питаш за посоки, цени и разписания',
    ],
    keywords: ['английски A2', 'елементарен английски', 'основен английски', 'английски за пътуване'],
    color: 'sage',
  },
  B1: {
    label:       'B1 — Средно',
    cefr:        'B1',
    headline:    'Английски B1 — Средно ниво',
    description: 'Ниво B1 е прагът на самостоятелен потребител. Можеш да се справиш с повечето ситуации при пътуване, работа и учене. Задълбочи знанията си по граматика и речник.',
    canDo: [
      'Разбираш основните идеи в ясен текст',
      'Справяш се при пътуване в страни с английски',
      'Пишеш прост свързан текст по позната тема',
      'Описваш преживявания, планове и мечти',
    ],
    keywords: ['английски B1', 'средно ниво английски', 'английски за работа', 'английски разговорен'],
    color: 'sky',
  },
  B2: {
    label:       'B2 — Средно напреднал',
    cefr:        'B2',
    headline:    'Английски B2 — Средно напреднало ниво',
    description: 'На ниво B2 комуникираш свободно по широк кръг теми. Разбираш сложен текст и можеш да изразиш мнение, да спориш и да правиш нюансирани изявления.',
    canDo: [
      'Разбираш сложни текстове и абстрактни теми',
      'Общуваш спонтанно и плавно с носители',
      'Пишеш ясни и детайлни текстове',
      'Изразяваш мнение с аргументи',
    ],
    keywords: ['английски B2', 'средно напреднал английски', 'английски за университет', 'FCE английски'],
    color: 'sky',
  },
  C1: {
    label:       'C1 — Напреднал',
    cefr:        'C1',
    headline:    'Английски C1 — Напреднало ниво',
    description: 'Ниво C1 означава свободно владеене на английски. Изразяваш се гладко, точно и ефективно. Разбираш дълги и сложни текстове и имплицирано значение.',
    canDo: [
      'Разбираш дълги и трудни текстове',
      'Изразяваш се гладко без очевидно търсене',
      'Пишеш ясен, добре структуриран текст',
      'Разбираш скрито значение и хумор',
    ],
    keywords: ['английски C1', 'напреднал английски', 'CAE английски', 'свободен английски'],
    color: 'lavender',
  },
  C2: {
    label:       'C2 — Владеещ',
    cefr:        'C2',
    headline:    'Английски C2 — Ниво на владеещ',
    description: 'Ниво C2 е практически ниво на носител на езика. Разбираш и говориш английски с пълна точност и изтънченост по всякаква тема.',
    canDo: [
      'Разбираш всичко, което чуваш или четеш',
      'Обобщаваш информация от различни източници',
      'Изразяваш се спонтанно и прецизно',
      'Правиш фини разграничения в значенията',
    ],
    keywords: ['английски C2', 'перфектен английски', 'CPE английски', 'носител на английски'],
    color: 'lavender',
  },
};

const BADGE_STYLE: Record<'sage' | 'sky' | 'lavender', React.CSSProperties> = {
  sage:     { background: 'var(--sage)',     color: 'var(--sage-ink)',  border: '1px solid #b5d8be' },
  sky:      { background: 'var(--sky)',      color: 'var(--sky-ink)',   border: '1px solid #b4cfe4' },
  lavender: { background: 'var(--lavender)', color: 'var(--lav-ink)',   border: '1px solid #c9bce4' },
};

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level: raw } = await params;
  const level = raw.toUpperCase();
  const meta  = LEVEL_META[level];
  if (!meta) return { title: 'Ниво | Учи Английски' };

  const BASE = 'https://uchi-angliyski.vercel.app';
  return {
    title:       `${meta.headline} | Учи Английски`,
    description: meta.description,
    keywords:    meta.keywords,
    alternates:  { canonical: `/nivo/${level.toLowerCase()}` },
    openGraph:   {
      title:       meta.headline,
      description: meta.description,
      url:         `${BASE}/nivo/${level.toLowerCase()}`,
    },
  };
}

export function generateStaticParams() {
  return ['a1','a2','b1','b2','c1','c2'].map(l => ({ level: l }));
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function NivoPage({ params }: Props) {
  const { level: raw } = await params;
  const level = raw.toUpperCase();
  const meta  = LEVEL_META[level];
  if (!meta) notFound();

  const BASE = 'https://uchi-angliyski.vercel.app';
  const supabase = await createClient();

  const [grammarRes, readingRes, vocabCountRes] = await Promise.all([
    supabase.from('grammar_lessons').select('slug, title, category').eq('level', level).order('order_index').limit(6),
    supabase.from('reading_texts').select('slug, title, topic, reading_time_minutes').eq('level', level).order('created_at').limit(4),
    supabase.from('vocabulary_words').select('id', { count: 'exact', head: true }).eq('level', level),
  ]);

  const lessons    = grammarRes.data  ?? [];
  const texts      = readingRes.data  ?? [];
  const vocabCount = vocabCountRes.count ?? 0;
  const bs         = BADGE_STYLE[meta.color];

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: meta.headline,
    description: meta.description,
    provider: {
      '@type': 'Organization',
      name: 'Учи Английски',
      url: BASE,
    },
    url: `${BASE}/nivo/${level.toLowerCase()}`,
    educationalLevel: level,
    inLanguage: 'bg',
    teaches: `English language at ${level} level`,
    hasCourseInstance: lessons.map(l => ({
      '@type': 'CourseInstance',
      name: l.title,
      url: `${BASE}/gramatika/${l.slug}`,
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--coral)' }}>Начало</Link>
        <span>/</span>
        <Link href="/test-za-nivo" className="hover:underline" style={{ color: 'var(--coral)' }}>Нива</Link>
        <span>/</span>
        <span style={{ color: 'var(--ink-2)' }}>{level}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1.5 rounded-xl text-sm font-bold" style={bs}>{level}</span>
          <span className="text-sm" style={{ color: 'var(--muted)' }}>
            Обща европейска езикова рамка (CEFR)
          </span>
        </div>
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1.1 }}
        >
          {meta.headline}
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--muted)' }}>
          {meta.description}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { label: 'Думи', value: `${vocabCount}+`, href: `/rechnik?level=${level}` },
            { label: 'Граматични урока', value: `${lessons.length}`, href: `/gramatika` },
            { label: 'Текста за четене', value: `${texts.length}`, href: `/chetene` },
          ].map(s => (
            <Link
              key={s.label}
              href={s.href}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--ink-2)' }}
            >
              <span className="font-extrabold text-lg" style={{ color: 'var(--coral)' }}>{s.value}</span>
              <span>{s.label}</span>
            </Link>
          ))}
        </div>

        {/* Can-do list */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
        >
          <h2 className="text-base font-bold mb-4" style={{ color: 'var(--ink)' }}>
            На ниво {level} можеш да…
          </h2>
          <ul className="flex flex-col gap-2.5">
            {meta.canDo.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--ink-2)' }}>
                <span className="mt-0.5 text-base leading-none" style={{ color: 'var(--sage-ink)' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grammar lessons */}
      {lessons.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--ink)' }}>
              <PenLine className="w-5 h-5" style={{ color: 'var(--lav-ink)' }} />
              Граматика за ниво {level}
            </h2>
            <Link href="/gramatika" className="text-sm hover:underline" style={{ color: 'var(--coral)' }}>
              Всички уроци →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lessons.map(l => (
              <Link
                key={l.slug}
                href={`/gramatika/${l.slug}`}
                className="flex items-center justify-between gap-3 p-4 rounded-xl group transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
              >
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{l.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{l.category}</p>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--coral)' }} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reading texts */}
      {texts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--ink)' }}>
              <BookOpen className="w-5 h-5" style={{ color: 'var(--sage-ink)' }} />
              Четене за ниво {level}
            </h2>
            <Link href="/chetene" className="text-sm hover:underline" style={{ color: 'var(--coral)' }}>
              Всички текстове →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {texts.map(t => (
              <Link
                key={t.slug}
                href={`/chetene/${t.slug}`}
                className="flex items-center justify-between gap-3 p-4 rounded-xl group transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
              >
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{t.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                    {t.topic} · {t.reading_time_minutes} мин.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--coral)' }} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Vocabulary CTA */}
      {vocabCount > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--ink)' }}>
              <BookMarked className="w-5 h-5" style={{ color: 'var(--coral-ink)' }} />
              Речник за ниво {level}
            </h2>
          </div>
          <Link
            href="/rechnik"
            className="flex items-center justify-between p-5 rounded-2xl group transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--coral-soft)', border: '1px solid #f4c8a8' }}
          >
            <div>
              <p className="font-bold" style={{ color: 'var(--coral-ink)' }}>
                {vocabCount}+ думи за ниво {level}
              </p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--coral-ink)', opacity: 0.75 }}>
                Учи с флаш карти и умно SM-2 повторение
              </p>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" style={{ color: 'var(--coral-ink)' }} />
          </Link>
        </section>
      )}

      {/* CTA */}
      <div
        className="rounded-3xl p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, var(--peach) 0%, var(--butter) 100%)',
          border: '1px solid #f4c8a8',
        }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[.16em] mb-2" style={{ color: 'var(--coral-ink)' }}>
          Не знаеш ли нивото си?
        </p>
        <h3 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          Вземи тест за ниво
        </h3>
        <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'var(--ink-2)' }}>
          20 въпроса, 5 минути — системата определя нивото ти автоматично.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/test-za-nivo"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white cursor-pointer hover:-translate-y-0.5 transition-all active:scale-[.98]"
            style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
          >
            <Target className="w-4 h-4" />
            Тест за ниво
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer hover:-translate-y-0.5 transition-all active:scale-[.98]"
            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid var(--line)', color: 'var(--ink-2)' }}
          >
            Започни безплатно
          </Link>
        </div>
      </div>
    </div>
  );
}
