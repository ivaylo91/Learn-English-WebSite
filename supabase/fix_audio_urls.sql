-- Set audio_url to the local Next.js public paths
-- The MP3 files are in public/audio/ and served at /audio/<slug>.mp3
-- Run in Supabase Dashboard → SQL Editor

UPDATE public.listening_clips SET audio_url = '/audio/a-cup-of-coffee.mp3'           WHERE title = 'A Cup of Coffee';
UPDATE public.listening_clips SET audio_url = '/audio/weekend-plans.mp3'              WHERE title = 'Weekend Plans';
UPDATE public.listening_clips SET audio_url = '/audio/remote-work-pros-cons.mp3'      WHERE title = 'Remote Work: Pros and Cons';
UPDATE public.listening_clips SET audio_url = '/audio/the-science-of-sleep.mp3'       WHERE title = 'The Science of Sleep';
UPDATE public.listening_clips SET audio_url = '/audio/at-the-doctors.mp3'             WHERE title = 'At the Doctor''s';
UPDATE public.listening_clips SET audio_url = '/audio/shopping-for-clothes.mp3'       WHERE title = 'Shopping for Clothes';
UPDATE public.listening_clips SET audio_url = '/audio/making-plans-by-phone.mp3'      WHERE title = 'Making Plans by Phone';
UPDATE public.listening_clips SET audio_url = '/audio/my-neighbourhood.mp3'           WHERE title = 'My Neighbourhood';
UPDATE public.listening_clips SET audio_url = '/audio/planning-a-trip-to-portugal.mp3' WHERE title = 'Planning a Trip to Portugal';
UPDATE public.listening_clips SET audio_url = '/audio/a-job-interview.mp3'            WHERE title = 'A Job Interview';
UPDATE public.listening_clips SET audio_url = '/audio/the-future-of-cities.mp3'       WHERE title = 'The Future of Cities';
UPDATE public.listening_clips SET audio_url = '/audio/mindfulness-and-mental-health.mp3' WHERE title = 'Mindfulness and Mental Health';
