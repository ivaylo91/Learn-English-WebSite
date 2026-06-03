-- Phase 80: Grammar lesson bookmarks
-- Run in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS public.grammar_bookmarks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id  UUID NOT NULL REFERENCES public.grammar_lessons(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS grammar_bookmarks_user_lesson_idx
  ON public.grammar_bookmarks (user_id, lesson_id);

ALTER TABLE public.grammar_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own grammar bookmarks"
  ON public.grammar_bookmarks
  FOR ALL USING (auth.uid() = user_id);
