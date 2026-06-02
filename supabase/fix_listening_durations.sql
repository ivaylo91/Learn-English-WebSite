-- Fix duration_seconds to match the actual generated MP3 files
-- Run in Supabase Dashboard → SQL Editor

UPDATE public.listening_clips SET duration_seconds = 35  WHERE title = 'A Cup of Coffee';
UPDATE public.listening_clips SET duration_seconds = 47  WHERE title = 'Weekend Plans';
UPDATE public.listening_clips SET duration_seconds = 73  WHERE title = 'Remote Work: Pros and Cons';
UPDATE public.listening_clips SET duration_seconds = 68  WHERE title = 'The Science of Sleep';
UPDATE public.listening_clips SET duration_seconds = 71  WHERE title = 'At the Doctor''s';
UPDATE public.listening_clips SET duration_seconds = 71  WHERE title = 'Shopping for Clothes';
UPDATE public.listening_clips SET duration_seconds = 79  WHERE title = 'Making Plans by Phone';
UPDATE public.listening_clips SET duration_seconds = 72  WHERE title = 'My Neighbourhood';
UPDATE public.listening_clips SET duration_seconds = 94  WHERE title = 'Planning a Trip to Portugal';
UPDATE public.listening_clips SET duration_seconds = 98  WHERE title = 'A Job Interview';
UPDATE public.listening_clips SET duration_seconds = 90  WHERE title = 'The Future of Cities';
UPDATE public.listening_clips SET duration_seconds = 100 WHERE title = 'Mindfulness and Mental Health';
