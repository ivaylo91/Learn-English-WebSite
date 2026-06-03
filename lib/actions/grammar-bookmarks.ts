'use server';

import { createClient } from '@/lib/supabase/server';

export async function toggleGrammarBookmark(
  lessonId: string,
): Promise<{ bookmarked: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { bookmarked: false };

  const { data: existing } = await supabase
    .from('grammar_bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('grammar_bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId);
    return { bookmarked: false };
  }

  await supabase
    .from('grammar_bookmarks')
    .insert({ user_id: user.id, lesson_id: lessonId });
  return { bookmarked: true };
}

export type BookmarkedLesson = {
  id:    string;
  title: string;
  slug:  string;
  level: string;
  bookmarkedAt: string;
};

export async function getGrammarBookmarks(): Promise<BookmarkedLesson[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('grammar_bookmarks')
    .select('created_at, grammar_lessons!inner(id, title, slug, level)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(12);

  return (data ?? []).map(row => {
    const lesson = row.grammar_lessons as unknown as { id: string; title: string; slug: string; level: string };
    return {
      id:           lesson.id,
      title:        lesson.title,
      slug:         lesson.slug,
      level:        lesson.level,
      bookmarkedAt: row.created_at as string,
    };
  });
}
