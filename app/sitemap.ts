import type { MetadataRoute } from 'next';
import { createServiceClient } from '@/lib/supabase/service';

const BASE = 'https://uchi-angliyski.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = createServiceClient();

  const [grammarRes, listeningRes, readingRes] = await Promise.all([
    db.from('grammar_lessons').select('slug, created_at'),
    db.from('listening_clips').select('id, created_at'),
    db.from('reading_texts').select('slug, created_at'),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,               lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/rechnik`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/gramatika`,lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/slusham`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/chetene`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/login`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/register`, lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
  ];

  const grammarRoutes: MetadataRoute.Sitemap = (grammarRes.data ?? []).map(l => ({
    url:             `${BASE}/gramatika/${l.slug}`,
    lastModified:    new Date(l.created_at),
    changeFrequency: 'monthly',
    priority:        0.7,
  }));

  const listeningRoutes: MetadataRoute.Sitemap = (listeningRes.data ?? []).map(c => ({
    url:             `${BASE}/slusham/${c.id}`,
    lastModified:    new Date(c.created_at),
    changeFrequency: 'monthly',
    priority:        0.7,
  }));

  const readingRoutes: MetadataRoute.Sitemap = (readingRes.data ?? []).map(t => ({
    url:             `${BASE}/chetene/${t.slug}`,
    lastModified:    new Date(t.created_at),
    changeFrequency: 'monthly',
    priority:        0.7,
  }));

  return [...staticRoutes, ...grammarRoutes, ...listeningRoutes, ...readingRoutes];
}
