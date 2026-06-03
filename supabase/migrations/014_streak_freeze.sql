-- Phase 74: Streak freeze
-- Gives every user 1 freeze by default.
-- Earn additional freezes by maintaining a 7-day streak (awarded in-app).
-- Run in Supabase Dashboard → SQL Editor

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS streak_freeze_count INTEGER NOT NULL DEFAULT 1;
