-- Phase 67: Track number of quiz attempts per lesson
-- Run in Supabase Dashboard → SQL Editor

ALTER TABLE public.user_lesson_progress
  ADD COLUMN IF NOT EXISTS attempts INTEGER NOT NULL DEFAULT 1;

-- Existing rows are assumed to represent at least 1 attempt
-- (DEFAULT 1 means no back-fill needed)
