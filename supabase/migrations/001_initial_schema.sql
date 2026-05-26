-- ============================================================
-- 001_initial_schema.sql
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CONTENT TABLES (public read, admin write)
-- ============================================================

-- ── Vocabulary words ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.vocabulary_words (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word_en     TEXT NOT NULL,
  word_bg     TEXT NOT NULL,
  phonetic    TEXT,
  level       TEXT NOT NULL CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  category    TEXT NOT NULL,
  example_en  TEXT,
  example_bg  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Grammar lessons ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.grammar_lessons (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  content_md   TEXT NOT NULL DEFAULT '',
  level        TEXT NOT NULL CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  category     TEXT NOT NULL,
  order_index  INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Listening clips ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.listening_clips (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  audio_url        TEXT NOT NULL DEFAULT '',
  transcript       TEXT NOT NULL DEFAULT '',
  level            TEXT NOT NULL CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  topic            TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  questions        JSONB NOT NULL DEFAULT '[]',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── Reading texts ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reading_texts (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                 TEXT UNIQUE NOT NULL,
  title                TEXT NOT NULL,
  body_md              TEXT NOT NULL DEFAULT '',
  level                TEXT NOT NULL CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  topic                TEXT NOT NULL,
  reading_time_minutes INTEGER NOT NULL DEFAULT 3,
  questions            JSONB NOT NULL DEFAULT '[]',
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USER TABLES (RLS protected)
-- ============================================================

-- ── Profiles (extends auth.users) ───────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT NOT NULL DEFAULT '',
  level         TEXT NOT NULL DEFAULT 'A1' CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  xp            INTEGER NOT NULL DEFAULT 0,
  streak        INTEGER NOT NULL DEFAULT 0,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Vocabulary progress (SM-2 spaced repetition) ─────────────
CREATE TABLE IF NOT EXISTS public.user_word_progress (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  word_id          UUID NOT NULL REFERENCES public.vocabulary_words(id) ON DELETE CASCADE,
  status           TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','learning','known')),
  ease_factor      FLOAT NOT NULL DEFAULT 2.5,
  interval_days    INTEGER NOT NULL DEFAULT 1,
  repetitions      INTEGER NOT NULL DEFAULT 0,
  next_review_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_reviewed_at TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, word_id)
);

-- ── Grammar lesson progress ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES public.grammar_lessons(id) ON DELETE CASCADE,
  score        INTEGER NOT NULL DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
  completed    BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

-- ── Activity log ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_activity (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  module     TEXT NOT NULL CHECK (module IN ('vocabulary','grammar','listening','reading')),
  action     TEXT NOT NULL,
  xp_gained  INTEGER NOT NULL DEFAULT 0,
  metadata   JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_vocab_level    ON public.vocabulary_words (level);
CREATE INDEX IF NOT EXISTS idx_vocab_category ON public.vocabulary_words (category);
CREATE INDEX IF NOT EXISTS idx_lessons_level  ON public.grammar_lessons (level, order_index);
CREATE INDEX IF NOT EXISTS idx_clips_level    ON public.listening_clips (level);
CREATE INDEX IF NOT EXISTS idx_texts_level    ON public.reading_texts (level);

CREATE INDEX IF NOT EXISTS idx_word_progress_user   ON public.user_word_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_word_progress_review ON public.user_word_progress (user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON public.user_lesson_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_activity_user        ON public.user_activity (user_id, created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_words   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grammar_lessons    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listening_clips    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_texts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_word_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity      ENABLE ROW LEVEL SECURITY;

-- Content tables: anyone can read
CREATE POLICY "Public read vocabulary"  ON public.vocabulary_words   FOR SELECT USING (TRUE);
CREATE POLICY "Public read lessons"     ON public.grammar_lessons    FOR SELECT USING (TRUE);
CREATE POLICY "Public read clips"       ON public.listening_clips    FOR SELECT USING (TRUE);
CREATE POLICY "Public read texts"       ON public.reading_texts      FOR SELECT USING (TRUE);

-- Profiles: own row only
CREATE POLICY "Own profile select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Own profile insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Own profile update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Word progress: own rows only
CREATE POLICY "Own word progress select" ON public.user_word_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own word progress insert" ON public.user_word_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own word progress update" ON public.user_word_progress FOR UPDATE USING (auth.uid() = user_id);

-- Lesson progress: own rows only
CREATE POLICY "Own lesson progress select" ON public.user_lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own lesson progress insert" ON public.user_lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own lesson progress update" ON public.user_lesson_progress FOR UPDATE USING (auth.uid() = user_id);

-- Activity: own rows only
CREATE POLICY "Own activity select" ON public.user_activity FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own activity insert" ON public.user_activity FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: auto-create profile on sign-up
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- FUNCTION: update streak + last_active
-- ============================================================
CREATE OR REPLACE FUNCTION public.record_activity(
  p_user_id UUID,
  p_module  TEXT,
  p_action  TEXT,
  p_xp      INTEGER DEFAULT 0,
  p_meta    JSONB   DEFAULT '{}'
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_last_active DATE;
  v_today       DATE := CURRENT_DATE;
BEGIN
  -- Insert activity log
  INSERT INTO public.user_activity (user_id, module, action, xp_gained, metadata)
  VALUES (p_user_id, p_module, p_action, p_xp, p_meta);

  -- Add XP to profile
  SELECT last_active_at::DATE INTO v_last_active
  FROM public.profiles WHERE id = p_user_id;

  UPDATE public.profiles
  SET
    xp            = xp + p_xp,
    last_active_at = NOW(),
    streak = CASE
      WHEN v_last_active = v_today THEN streak            -- same day, no change
      WHEN v_last_active = v_today - 1 THEN streak + 1   -- consecutive day
      ELSE 1                                               -- streak broken
    END
  WHERE id = p_user_id;
END;
$$;
