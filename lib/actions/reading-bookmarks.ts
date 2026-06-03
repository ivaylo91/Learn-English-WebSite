'use server';

import { createClient } from '@/lib/supabase/server';

export async function toggleReadingBookmark(
  textId: string,
): Promise<{ bookmarked: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { bookmarked: false };

  const { data: existing } = await supabase
    .from('reading_bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('text_id', textId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('reading_bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('text_id', textId);
    return { bookmarked: false };
  }

  await supabase
    .from('reading_bookmarks')
    .insert({ user_id: user.id, text_id: textId });
  return { bookmarked: true };
}

export type BookmarkedText = {
  id:           string;
  title:        string;
  slug:         string;
  level:        string;
  topic:        string;
  bookmarkedAt: string;
};

export async function getReadingBookmarks(): Promise<BookmarkedText[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('reading_bookmarks')
    .select('created_at, reading_texts!inner(id, title, slug, level, topic)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(12);

  return (data ?? []).map(row => {
    const text = row.reading_texts as unknown as {
      id: string; title: string; slug: string; level: string; topic: string;
    };
    return {
      id:           text.id,
      title:        text.title,
      slug:         text.slug,
      level:        text.level,
      topic:        text.topic,
      bookmarkedAt: row.created_at as string,
    };
  });
}
