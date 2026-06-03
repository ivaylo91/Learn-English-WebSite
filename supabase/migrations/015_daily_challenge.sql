-- Phase 75: Daily Challenge
-- One challenge per user per day across all 5 modules.
-- Run in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS public.daily_challenge_completions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_date DATE NOT NULL DEFAULT CURRENT_DATE,
  module         TEXT NOT NULL,
  content_id     TEXT NOT NULL,
  xp_earned      INTEGER NOT NULL DEFAULT 25,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- One completion per user per day
CREATE UNIQUE INDEX IF NOT EXISTS daily_challenge_user_date_idx
  ON public.daily_challenge_completions (user_id, challenge_date);

ALTER TABLE public.daily_challenge_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own challenge completions"
  ON public.daily_challenge_completions
  FOR ALL USING (auth.uid() = user_id);
