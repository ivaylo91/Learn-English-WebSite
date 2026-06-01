-- Phase 34: Daily goals
-- Run in Supabase Dashboard → SQL Editor

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS daily_goal TEXT NOT NULL DEFAULT 'standard'
    CHECK (daily_goal IN ('light', 'standard', 'intensive'));
