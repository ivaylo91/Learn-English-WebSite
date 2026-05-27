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
  redirect('/admin/rechnik');
}

export async function deleteWord(id: string) {
  const db = await requireAdmin();
  await db.from('vocabulary_words').delete().eq('id', id);
  revalidatePath('/admin/rechnik');
  revalidatePath('/rechnik');
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
  redirect('/admin/gramatika');
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
  redirect('/admin/slusham');
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
  redirect('/admin/chetene');
}

export async function deleteText(id: string) {
  const db = await requireAdmin();
  await db.from('reading_texts').delete().eq('id', id);
  revalidatePath('/admin/chetene');
  revalidatePath('/chetene');
}
