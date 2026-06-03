-- Phase 85: Reading text bookmarks
-- Run in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS public.reading_bookmarks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text_id    UUID NOT NULL REFERENCES public.reading_texts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS reading_bookmarks_user_text_idx
  ON public.reading_bookmarks (user_id, text_id);

ALTER TABLE public.reading_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own reading bookmarks"
  ON public.reading_bookmarks
  FOR ALL USING (auth.uid() = user_id);
