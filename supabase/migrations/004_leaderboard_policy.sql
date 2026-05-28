-- Step 9 (optional) — Public leaderboard SELECT policy
-- Allows any authenticated user to read all profiles for the leaderboard.
-- Run this in Supabase Dashboard → SQL Editor if you want the leaderboard
-- to work without the SUPABASE_SERVICE_ROLE_KEY env var.

CREATE POLICY "Authenticated leaderboard select"
ON public.profiles
FOR SELECT TO authenticated
USING (true);
