-- Set audio_url to the dedicated API route that serves audio with proper headers
-- Run in Supabase Dashboard → SQL Editor

UPDATE public.listening_clips SET audio_url = '/api/audio/a-cup-of-coffee'            WHERE title = 'A Cup of Coffee';
UPDATE public.listening_clips SET audio_url = '/api/audio/weekend-plans'               WHERE title = 'Weekend Plans';
UPDATE public.listening_clips SET audio_url = '/api/audio/remote-work-pros-cons'       WHERE title = 'Remote Work: Pros and Cons';
UPDATE public.listening_clips SET audio_url = '/api/audio/the-science-of-sleep'        WHERE title = 'The Science of Sleep';
UPDATE public.listening_clips SET audio_url = '/api/audio/at-the-doctors'              WHERE title = 'At the Doctor''s';
UPDATE public.listening_clips SET audio_url = '/api/audio/shopping-for-clothes'        WHERE title = 'Shopping for Clothes';
UPDATE public.listening_clips SET audio_url = '/api/audio/making-plans-by-phone'       WHERE title = 'Making Plans by Phone';
UPDATE public.listening_clips SET audio_url = '/api/audio/my-neighbourhood'            WHERE title = 'My Neighbourhood';
UPDATE public.listening_clips SET audio_url = '/api/audio/planning-a-trip-to-portugal' WHERE title = 'Planning a Trip to Portugal';
UPDATE public.listening_clips SET audio_url = '/api/audio/a-job-interview'             WHERE title = 'A Job Interview';
UPDATE public.listening_clips SET audio_url = '/api/audio/the-future-of-cities'        WHERE title = 'The Future of Cities';
UPDATE public.listening_clips SET audio_url = '/api/audio/mindfulness-and-mental-health' WHERE title = 'Mindfulness and Mental Health';
