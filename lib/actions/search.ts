'use server';

import { createClient } from '@/lib/supabase/server';

export interface VocabResult    { id: string; word_en: string; word_bg: string; level: string; }
export interface GrammarResult  { id: string; slug: string;   title: string;   level: string; }
export interface ListenResult   { id: string;                  title: string;   level: string; }
export interface ReadingResult  { id: string; slug: string;   title: string;   level: string; }

export interface SearchResults {
  vocabulary: VocabResult[];
  grammar:    GrammarResult[];
  listening:  ListenResult[];
  reading:    ReadingResult[];
}

const EMPTY: SearchResults = { vocabulary: [], grammar: [], listening: [], reading: [] };

export async function search(query: string): Promise<SearchResults> {
  const q = query.trim();
  if (q.length < 2) return EMPTY;

  // Escape SQL LIKE special chars
  const safe = q.replace(/%/g, '\\%').replace(/_/g, '\\_');
  const like = `%${safe}%`;

  const supabase = await createClient();

  const [vocabRes, grammarRes, listenRes, readingRes] = await Promise.all([
    supabase
      .from('vocabulary_words')
      .select('id, word_en, word_bg, level')
      .or(`word_en.ilike.${like},word_bg.ilike.${like}`)
      .order('word_en')
      .limit(5),
    supabase
      .from('grammar_lessons')
      .select('id, slug, title, level')
      .ilike('title', like)
      .order('order_index')
      .limit(5),
    supabase
      .from('listening_clips')
      .select('id, title, level')
      .ilike('title', like)
      .order('created_at')
      .limit(5),
    supabase
      .from('reading_texts')
      .select('id, slug, title, level')
      .ilike('title', like)
      .order('created_at')
      .limit(5),
  ]);

  return {
    vocabulary: (vocabRes.data  ?? []) as VocabResult[],
    grammar:    (grammarRes.data ?? []) as GrammarResult[],
    listening:  (listenRes.data  ?? []) as ListenResult[],
    reading:    (readingRes.data ?? []) as ReadingResult[],
  };
}
