'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import type { Level } from '@/lib/types/database';

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim());
  if (!user || !admins.includes(user.email ?? '')) {
    throw new Error('Unauthorized');
  }
  // Return service client — bypasses RLS for content table writes
  return createServiceClient();
}

// ── Vocabulary ─────────────────────────────────────────────────

export async function upsertWord(formData: FormData) {
  const db = await requireAdmin();
  const id = formData.get('id') as string | null;

  const payload = {
    word_en:    (formData.get('word_en')    as string).trim(),
    word_bg:    (formData.get('word_bg')    as string).trim(),
    phonetic:   (formData.get('phonetic')   as string).trim() || null,
    level:      (formData.get('level')      as Level),
    category:   (formData.get('category')   as string).trim(),
    example_en: (formData.get('example_en') as string).trim() || null,
    example_bg: (formData.get('example_bg') as string).trim() || null,
  };

  if (id) {
    await db.from('vocabulary_words').update(payload).eq('id', id);
  } else {
    await db.from('vocabulary_words').insert(payload);
  }

  revalidatePath('/admin/rechnik');
  revalidatePath('/rechnik');
  redirect('/admin/rechnik?saved=1');
}

export async function deleteWord(id: string) {
  const db = await requireAdmin();
  await db.from('vocabulary_words').delete().eq('id', id);
  revalidatePath('/admin/rechnik');
  revalidatePath('/rechnik');
}

export interface VocabImportRow {
  word_en:    string;
  word_bg:    string;
  phonetic:   string;
  level:      string;
  category:   string;
  example_en: string;
  example_bg: string;
}

export interface ImportResult {
  imported: number;
  errors:   { index: number; message: string }[];
}

export async function importVocabularyWords(rows: VocabImportRow[]): Promise<ImportResult> {
  const db = await requireAdmin();

  const VALID_LEVELS = new Set(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
  const BATCH = 100;

  let imported = 0;
  const errors: { index: number; message: string }[] = [];

  // Validate all rows first
  const validRows: (VocabImportRow & { _idx: number })[] = [];
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (!r.word_en?.trim()) { errors.push({ index: i + 1, message: 'word_en е задължително' }); continue; }
    if (!r.word_bg?.trim()) { errors.push({ index: i + 1, message: 'word_bg е задължително' }); continue; }
    if (!VALID_LEVELS.has(r.level?.trim().toUpperCase())) {
      errors.push({ index: i + 1, message: `Невалидно ниво "${r.level}" (трябва A1–C2)` }); continue;
    }
    if (!r.category?.trim()) { errors.push({ index: i + 1, message: 'category е задължително' }); continue; }
    validRows.push({ ...r, _idx: i + 1 });
  }

  // Insert in batches
  for (let start = 0; start < validRows.length; start += BATCH) {
    const batch = validRows.slice(start, start + BATCH).map(r => ({
      word_en:    r.word_en.trim(),
      word_bg:    r.word_bg.trim(),
      phonetic:   r.phonetic?.trim() || null,
      level:      r.level.trim().toUpperCase() as Level,
      category:   r.category.trim(),
      example_en: r.example_en?.trim() || null,
      example_bg: r.example_bg?.trim() || null,
    }));

    const { error } = await db.from('vocabulary_words').insert(batch);
    if (error) {
      // Log batch-level error but continue with other batches
      batch.forEach((_, bi) => {
        errors.push({ index: validRows[start + bi]._idx, message: error.message });
      });
    } else {
      imported += batch.length;
    }
  }

  if (imported > 0) {
    revalidatePath('/admin/rechnik');
    revalidatePath('/rechnik');
  }

  return { imported, errors };
}

// ── Grammar ────────────────────────────────────────────────────

export async function upsertLesson(formData: FormData) {
  const db = await requireAdmin();
  const id = formData.get('id') as string | null;

  let questions = [];
  try { questions = JSON.parse((formData.get('questions') as string) || '[]'); } catch { questions = []; }

  const payload = {
    slug:        (formData.get('slug')        as string).trim(),
    title:       (formData.get('title')       as string).trim(),
    content_md:  (formData.get('content_md')  as string).trim(),
    level:       (formData.get('level')       as Level),
    category:    (formData.get('category')    as string).trim(),
    order_index: Number(formData.get('order_index') ?? 0),
    questions,
  };

  if (id) {
    await db.from('grammar_lessons').update(payload).eq('id', id);
  } else {
    await db.from('grammar_lessons').insert(payload);
  }

  revalidatePath('/admin/gramatika');
  revalidatePath('/gramatika');
  redirect('/admin/gramatika?saved=1');
}

export async function deleteLesson(id: string) {
  const db = await requireAdmin();
  await db.from('grammar_lessons').delete().eq('id', id);
  revalidatePath('/admin/gramatika');
  revalidatePath('/gramatika');
}

// ── Listening ──────────────────────────────────────────────────

export async function upsertClip(formData: FormData) {
  const db = await requireAdmin();
  const id = formData.get('id') as string | null;

  let questions = [];
  try { questions = JSON.parse((formData.get('questions') as string) || '[]'); } catch { questions = []; }

  const payload = {
    title:            (formData.get('title')            as string).trim(),
    audio_url:        (formData.get('audio_url')        as string).trim(),
    transcript:       (formData.get('transcript')       as string).trim(),
    level:            (formData.get('level')            as Level),
    topic:            (formData.get('topic')            as string).trim(),
    duration_seconds: Number(formData.get('duration_seconds') ?? 0),
    questions,
  };

  if (id) {
    await db.from('listening_clips').update(payload).eq('id', id);
  } else {
    await db.from('listening_clips').insert(payload);
  }

  revalidatePath('/admin/slusham');
  revalidatePath('/slusham');
  redirect('/admin/slusham?saved=1');
}

export async function deleteClip(id: string) {
  const db = await requireAdmin();
  await db.from('listening_clips').delete().eq('id', id);
  revalidatePath('/admin/slusham');
  revalidatePath('/slusham');
}

// ── Reading ────────────────────────────────────────────────────

export async function upsertText(formData: FormData) {
  const db = await requireAdmin();
  const id = formData.get('id') as string | null;

  let questions = [];
  let vocabulary: { en: string; bg: string }[] = [];
  try { questions  = JSON.parse((formData.get('questions')  as string) || '[]'); } catch { questions = []; }
  try { vocabulary = JSON.parse((formData.get('vocabulary') as string) || '[]'); } catch { vocabulary = []; }

  const payload = {
    slug:                 (formData.get('slug')    as string).trim(),
    title:                (formData.get('title')   as string).trim(),
    body_md:              (formData.get('body_md') as string).trim(),
    level:                (formData.get('level')   as Level),
    topic:                (formData.get('topic')   as string).trim(),
    reading_time_minutes: Number(formData.get('reading_time_minutes') ?? 5),
    questions,
    vocabulary,
  };

  if (id) {
    await db.from('reading_texts').update(payload).eq('id', id);
  } else {
    await db.from('reading_texts').insert(payload);
  }

  revalidatePath('/admin/chetene');
  revalidatePath('/chetene');
  redirect('/admin/chetene?saved=1');
}

export async function deleteText(id: string) {
  const db = await requireAdmin();
  await db.from('reading_texts').delete().eq('id', id);
  revalidatePath('/admin/chetene');
  revalidatePath('/chetene');
}

// ── Writing ────────────────────────────────────────────────────

export async function upsertExercise(formData: FormData) {
  const db = await requireAdmin();
  const id = formData.get('id') as string | null;

  let prompts = [];
  try { prompts = JSON.parse((formData.get('prompts') as string) || '[]'); } catch { prompts = []; }

  const payload = {
    slug:    (formData.get('slug')  as string).trim(),
    title:   (formData.get('title') as string).trim(),
    level:   (formData.get('level') as Level),
    topic:   (formData.get('topic') as string).trim(),
    prompts,
  };

  if (id) {
    await db.from('writing_exercises').update(payload).eq('id', id);
  } else {
    await db.from('writing_exercises').insert(payload);
  }

  revalidatePath('/admin/pisane');
  revalidatePath('/pisane');
  redirect('/admin/pisane?saved=1');
}

export async function deleteExercise(id: string) {
  const db = await requireAdmin();
  await db.from('writing_exercises').delete().eq('id', id);
  revalidatePath('/admin/pisane');
  revalidatePath('/pisane');
}
