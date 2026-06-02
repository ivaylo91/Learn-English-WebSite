-- Phase 45: Public leaderboard profiles
-- Allows any authenticated user to read which achievements any user has unlocked.
-- This enables the public profile page (/profil/[id]) without exposing sensitive data.
-- Run in Supabase Dashboard → SQL Editor

CREATE POLICY "Authenticated read user_achievements"
  ON public.user_achievements FOR SELECT TO authenticated
  USING (true);
