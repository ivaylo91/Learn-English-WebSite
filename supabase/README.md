# Supabase Setup

## 1. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in real values:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard → Project Settings → API → Project URL (no trailing slash) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dashboard → Project Settings → API → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Dashboard → Project Settings → API → `service_role` `secret` |
| `ADMIN_EMAILS` | Comma-separated list of admin emails |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL, e.g. `https://uchi-angliyski.vercel.app` |
| `RESEND_API_KEY` | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | e.g. `Учи Английски <noreply@your-domain.com>` |
| `CRON_SECRET` | `openssl rand -hex 32` |
| `UNSUBSCRIBE_SECRET` | `openssl rand -hex 32` |

**Never commit `.env.local` to git.**

---

## 2. Run Migrations (SQL Editor)

Open **Supabase Dashboard → SQL Editor** and run the files in this order:

### Step 1 — Initial schema
```
supabase/migrations/001_initial_schema.sql
```
Creates all tables, RLS policies, `handle_new_user()` trigger, `record_activity()` function.

### Step 2 — Grammar questions column
```
supabase/migrations/002_grammar_questions.sql
```
Adds `questions JSONB` column to `grammar_lessons`.

### Step 3 — Content progress + reading vocabulary
```
supabase/migrations/003_content_progress.sql
```
Creates `user_content_progress` table, adds `vocabulary JSONB` to `reading_texts`.

### Step 4 — Leaderboard RLS policy
```
supabase/migrations/004_leaderboard_policy.sql
```
Allows public read of profiles for the leaderboard (limited columns).

### Step 5 — Achievements system
```
supabase/migrations/005_achievements.sql
```
Creates `achievements` and `user_achievements` tables with 16 seeded achievements (XP milestones, streaks, module firsts).

### Step 6 — Email reminders opt-out
```
supabase/migrations/006_email_reminders.sql
```
Adds `email_reminders BOOLEAN` column to `profiles` (default `true`).

### Step 7 — Writing exercises module
```
supabase/migrations/007_writing.sql
```
Creates `writing_exercises` and `user_writing_progress` tables. Also extends the `user_activity` module CHECK to include `'writing'`.

### Step 8 — Daily goals
```
supabase/migrations/008_daily_goal.sql
```
Adds `daily_goal TEXT DEFAULT 'standard'` column to `profiles` (values: `light`, `standard`, `intensive`).

### Step 9 — Extended achievements
```
supabase/migrations/009_achievements_extended.sql
```
Inserts 9 new achievements (writing milestones, placement test, level milestones, 7-day goal streak, top-10 leaderboard), expanding from 16 → 25 total.

### Step 10 — Welcome email flag
```
supabase/migrations/010_welcome_email.sql
```
Adds `welcome_email_sent BOOLEAN DEFAULT FALSE` to `profiles`. Set to `true` after the first welcome email is sent so it is never sent twice.

---

## 3. Seed Content (SQL Editor)

Run these after all migrations are applied:

### Vocabulary words — starter set (~52 words, A1–C1)
```
supabase/seed.sql
```
Also includes the 14 grammar lesson stubs (slugs + titles, no content yet).

### Vocabulary words — extended set (276 words, A1–C1)
```
supabase/seed_vocabulary_extended.sql
```
Run after `seed.sql`. Adds 276 words across 18 categories:
Colors, Body, Food & Drink, Clothing, Animals, Daily Verbs, Places, Adjectives (A1)
Travel, Home, Weather, Emotions (A2)
Work, Health, Education, Nature (B1)
Personality, Society, Technology (B2)
Academic, Advanced Character (C1)

### Grammar lesson content — A1 to B2 (14 lessons)
```
supabase/seed_grammar_content.sql
```
UPDATEs the 14 lesson stubs with full Bulgarian Markdown explanations + 5 quiz questions each.

Lessons covered:
- **A1:** Present Simple (intro, positive, negative, questions)
- **A2:** Present Continuous (intro, vs Simple)
- **B1:** Past Simple (regular, irregular), Future will, Future going to
- **B2:** Conditionals Zero/First, Second Conditional, Passive Voice, Reported Speech

### Grammar lesson content — B2 to C1 (6 new lessons)
```
supabase/seed_grammar_b2_c1.sql
```
Inserts + populates 6 advanced lessons:

| Lesson | Level |
|--------|-------|
| Present Perfect — Въведение | B2 |
| Present Perfect vs Past Simple | B2 |
| Modal Verbs | B2 |
| Past Perfect | C1 |
| Third Conditional | C1 |
| Relative Clauses | C1 |

### Listening clips — starter set (4 clips, A1–B2)
```
supabase/seed_listening.sql
```
`audio_url` fields are placeholders — replace with real hosted URLs via Supabase Storage.

### Listening clips — extended set (8 clips, A1–B2)
```
supabase/seed_listening_extended.sql
```
Run after `seed_listening.sql`. 8 more clips: At the Doctor's, Shopping for Clothes (A1); Making Plans by Phone, My Neighbourhood (A2); Planning a Trip to Portugal, A Job Interview (B1); The Future of Cities, Mindfulness and Mental Health (B2). All have full transcripts and 5 comprehension questions.

### Reading texts — starter set (4 texts, A2–C1)
```
supabase/seed_reading.sql
```
Reading texts with Markdown body, vocabulary arrays, and comprehension questions.

### Reading texts — extended set (8 texts, A1–C1)
```
supabase/seed_reading_extended.sql
```
Run after `seed_reading.sql`. 8 more texts: My Family (A1); Food Around the World, A Typical School Day (A2); Social Media and Young People, The History of the Internet (B1); The Psychology of Happiness, Sustainable Fashion (B2); The Ethics of Artificial Intelligence (C1).

---

## 4. Auth Setup

In **Supabase Dashboard → Authentication → Email**:
- Enable **Email + Password** sign-in
- Optionally disable email confirmation for local dev (Auth → Settings → disable "Confirm email")

The `handle_new_user()` trigger automatically creates a `profiles` row on sign-up.

---

## 5. Storage — Audio Files

The admin panel uploads directly to Supabase Storage. To enable it:

**Step A — Create the bucket**

Dashboard → Storage → New bucket:
- Name: `audio`
- Public bucket: **yes**

**Step B — Add RLS policies**

```sql
CREATE POLICY "Public audio read"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'audio');

CREATE POLICY "Authenticated audio upload"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'audio');

CREATE POLICY "Authenticated audio delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'audio');
```

Then go to **Admin → Слушане → [edit clip]** and click "Качи .mp3".

---

## 6. Streak Reminder Emails (Phase 27)

The daily cron job (`/api/cron/streak-reminder`) fires at 18:00 UTC via Vercel Cron (configured in `vercel.json`).

Set these in **Vercel Dashboard → Environment Variables**:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | From resend.com |
| `RESEND_FROM_EMAIL` | Verified sender address |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL |
| `CRON_SECRET` | Random hex string (`openssl rand -hex 32`) |
| `UNSUBSCRIBE_SECRET` | Random hex string (`openssl rand -hex 32`) |

---

## 7. Content Strategy

The platform homepage advertises "2 000+ думи", "120 урока" etc. Use the bulk import to reach those numbers:

- **Vocabulary:** Admin → Речник → **Масов импорт** — upload CSV files. Template available in the import UI.
- **Grammar:** Use Admin → Граматика → Нов урок to add more lessons per level.
- **Listening:** Add clips via Admin → Слушане. Upload MP3s to Supabase Storage.
- **Reading:** Add texts via Admin → Четене. Use the `vocabulary` JSON field for in-text word hints.
- **Writing:** Add exercises via Admin → Писане. Each exercise is a JSON array of `{prompt, answers, hint}`.
