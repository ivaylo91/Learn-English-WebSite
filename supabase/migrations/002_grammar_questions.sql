-- ============================================================
-- 002_grammar_questions.sql
-- Adds questions JSONB column to grammar_lessons
-- Run AFTER 001_initial_schema.sql
-- ============================================================

ALTER TABLE public.grammar_lessons
  ADD COLUMN IF NOT EXISTS questions JSONB DEFAULT '[]'::jsonb;
