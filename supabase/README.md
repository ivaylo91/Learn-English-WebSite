# Supabase Setup

## 1. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in real values:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard → Project Settings → API → Project URL (no trailing slash, no `/rest/v1/`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dashboard → Project Settings → API → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Dashboard → Project Settings → API → `service_role` `secret` |
| `ADMIN_EMAILS` | Comma-separated list of emails that have admin access |

**Never commit `.env.local` or the real service role key to git.**

---

## 2. Run Migrations (SQL Editor)

Open **Supabase Dashboard → SQL Editor** and run the files in order:

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

---

## 3. Seed Content (SQL Editor)

Run these after all migrations are applied:

### Step 4 — Vocabulary words (40 words, A1–C1)
```
supabase/seed.sql
```

### Step 5 — Grammar lesson stubs (14 lessons)
Already included in `seed.sql`.

### Step 6 — Grammar lesson content (Markdown + questions)
```
supabase/seed_grammar_content.sql
```
UPDATEs the 14 lesson stubs with full `content_md` and `questions`.

### Step 7 — Listening clips (4 clips, A1–B2)
```
supabase/seed_listening.sql
```
Inserts listening clips with transcripts and comprehension questions. `audio_url` is a placeholder — replace with real hosted audio file URLs via Supabase Storage or any CDN.

### Step 8 — Reading texts (4 texts, A2–C1)
```
supabase/seed_reading.sql
```
Inserts reading texts with Markdown body, vocabulary arrays, and comprehension questions.

---

## 4. Auth Setup

In **Supabase Dashboard → Authentication → Email**:
- Enable **Email + Password** sign-in
- Optionally disable email confirmation for local dev (Auth → Settings → disable "Confirm email")

The `handle_new_user()` trigger automatically creates a `profiles` row when a new user signs up.

---

## 5. Storage (Optional — for audio files)

If self-hosting audio for the Listening module:
1. Create a public bucket named `audio` in Supabase Storage
2. Upload `.mp3` files
3. Update `audio_url` values in `listening_clips` with the public URLs
