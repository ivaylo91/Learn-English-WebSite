-- Phase 30: Writing exercises module
-- Run in Supabase Dashboard → SQL Editor

-- ── Content table ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.writing_exercises (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug       TEXT UNIQUE NOT NULL,
  title      TEXT NOT NULL,
  level      TEXT NOT NULL CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  topic      TEXT NOT NULL,
  prompts    JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prompts format (JSONB array):
-- [{ "prompt": "Fill in: She ___ every day.", "answers": ["works"], "hint": "Present Simple" }]

-- ── User progress table ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_writing_progress (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exercise_id  UUID NOT NULL REFERENCES public.writing_exercises(id) ON DELETE CASCADE,
  score        INTEGER NOT NULL DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
  completed    BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exercise_id)
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_writing_level        ON public.writing_exercises (level);
CREATE INDEX IF NOT EXISTS idx_writing_progress_user ON public.user_writing_progress (user_id);

-- ── RLS ───────────────────────────────────────────────────────────────────────
ALTER TABLE public.writing_exercises     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_writing_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read writing exercises"
  ON public.writing_exercises FOR SELECT USING (TRUE);

CREATE POLICY "Own writing progress select"
  ON public.user_writing_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own writing progress insert"
  ON public.user_writing_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own writing progress update"
  ON public.user_writing_progress FOR UPDATE USING (auth.uid() = user_id);

-- ── Extend the module CHECK to include 'writing' ──────────────────────────────
ALTER TABLE public.user_activity
  DROP CONSTRAINT IF EXISTS user_activity_module_check;
ALTER TABLE public.user_activity
  ADD CONSTRAINT user_activity_module_check
  CHECK (module IN ('vocabulary','grammar','listening','reading','writing'));
