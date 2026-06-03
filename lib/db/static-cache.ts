/**
 * static-cache.ts — unstable_cache wrappers for public content.
 *
 * These functions use the anon Supabase client (no cookies) so they are
 * safe to cache with Next.js's data cache across requests. User-specific
 * data (progress, scores) must NOT be fetched here.
 *
 * Cache TTL: 1 hour (revalidate: 3600).
 * Tagged 'grammar' / 'reading' so on-demand revalidation is possible.
 */

import { unstable_cache } from 'next/cache';
import { createClient }    from '@supabase/supabase-js';

function anonDb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

// ── Grammar ───────────────────────────────────────────────────────────────────

/** All grammar lesson slugs — used by generateStaticParams. */
export const getCachedGrammarSlugs = unstable_cache(
  async () => {
    const { data } = await anonDb().from('grammar_lessons').select('slug');
    return (data ?? []).map(r => r.slug as string);
  },
  ['grammar-slugs'],
  { revalidate: 3600, tags: ['grammar'] },
);

/** A single grammar lesson + its category siblings (for Prev/Next). */
export const getCachedGrammarLesson = unstable_cache(
  async (slug: string) => {
    const db = anonDb();
    const { data: lesson } = await db
      .from('grammar_lessons')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!lesson) return null;

    const { data: siblings } = await db
      .from('grammar_lessons')
      .select('slug, title, level, order_index')
      .eq('category', lesson.category)
      .order('order_index');

    return { lesson, siblings: siblings ?? [] };
  },
  ['grammar-lesson'],
  { revalidate: 3600, tags: ['grammar'] },
);

// ── Reading ───────────────────────────────────────────────────────────────────

/** All reading text slugs — used by generateStaticParams. */
export const getCachedReadingSlugs = unstable_cache(
  async () => {
    const { data } = await anonDb().from('reading_texts').select('slug');
    return (data ?? []).map(r => r.slug as string);
  },
  ['reading-slugs'],
  { revalidate: 3600, tags: ['reading'] },
);

/** A single reading text + level siblings (for Prev/Next). */
export const getCachedReadingText = unstable_cache(
  async (slug: string) => {
    const db = anonDb();
    const { data: text } = await db
      .from('reading_texts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!text) return null;

    const { data: siblings } = await db
      .from('reading_texts')
      .select('slug, title')
      .eq('level', text.level)
      .order('created_at');

    return { text, siblings: siblings ?? [] };
  },
  ['reading-text'],
  { revalidate: 3600, tags: ['reading'] },
);
