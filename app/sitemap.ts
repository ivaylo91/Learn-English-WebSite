import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const BASE = 'https://uchi-angliyski.vercel.app';

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db_ = db();

  const [grammarRes, listeningRes, readingRes, vocabRes, writingRes] = await Promise.all([
    db_.from('grammar_lessons').select('slug, created_at'),
    db_.from('listening_clips').select('id, created_at'),
    db_.from('reading_texts').select('slug, created_at'),
    db_.from('vocabulary_words').select('id, created_at'),
    db_.from('writing_exercises').select('slug, created_at'),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/rechnik`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/gramatika`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/slusham`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/chetene`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/pisane`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/test-za-nivo`,lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/login`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/register`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
  ];

  // Level landing pages — high SEO value
  const nivoRoutes: MetadataRoute.Sitemap = ['a1','a2','b1','b2','c1','c2'].map(l => ({
    url:             `${BASE}/nivo/${l}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.85,
  }));

  const grammarRoutes: MetadataRoute.Sitemap = (grammarRes.data ?? []).map(l => ({
    url:             `${BASE}/gramatika/${l.slug}`,
    lastModified:    new Date(l.created_at),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }));

  const listeningRoutes: MetadataRoute.Sitemap = (listeningRes.data ?? []).map(c => ({
    url:             `${BASE}/slusham/${c.id}`,
    lastModified:    new Date(c.created_at),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }));

  const readingRoutes: MetadataRoute.Sitemap = (readingRes.data ?? []).map(t => ({
    url:             `${BASE}/chetene/${t.slug}`,
    lastModified:    new Date(t.created_at),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }));

  // Individual vocabulary word pages — valuable for "word X English Bulgarian" searches
  const vocabRoutes: MetadataRoute.Sitemap = (vocabRes.data ?? []).map(w => ({
    url:             `${BASE}/rechnik/${w.id}`,
    lastModified:    new Date(w.created_at),
    changeFrequency: 'yearly' as const,
    priority:        0.5,
  }));

  const writingRoutes: MetadataRoute.Sitemap = (writingRes.data ?? []).map(e => ({
    url:             `${BASE}/pisane/${e.slug}`,
    lastModified:    new Date(e.created_at),
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }));

  return [
    ...staticRoutes,
    ...nivoRoutes,
    ...grammarRoutes,
    ...listeningRoutes,
    ...readingRoutes,
    ...vocabRoutes,
    ...writingRoutes,
  ];
}
