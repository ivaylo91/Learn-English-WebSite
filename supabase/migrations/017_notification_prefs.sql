-- Phase 81: Granular notification preferences
-- Splits email_reminders (streak) from weekly_summary_emails.
-- Run in Supabase Dashboard → SQL Editor

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS weekly_summary_emails BOOLEAN NOT NULL DEFAULT TRUE;
