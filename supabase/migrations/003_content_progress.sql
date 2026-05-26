-- ============================================================
-- 003_content_progress.sql
-- Tracks listening and reading completions + scores
-- Run AFTER 001_initial_schema.sql
-- ============================================================

-- ── Reading vocabulary column ─────────────────────────────────
ALTER TABLE public.reading_texts
  ADD COLUMN IF NOT EXISTS vocabulary JSONB DEFAULT '[]'::jsonb;

-- ── User content progress (listening + reading) ───────────────
CREATE TABLE IF NOT EXISTS public.user_content_progress (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('listening', 'reading')),
  content_id   UUID NOT NULL,
  score        INTEGER NOT NULL DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
  completed    BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, content_type, content_id)
);

ALTER TABLE public.user_content_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own content progress"
  ON public.user_content_progress
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
