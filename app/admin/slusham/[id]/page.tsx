import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { upsertClip } from '@/lib/actions/admin';
import { Field, Input, Textarea, Select } from '@/components/admin/AdminFormField';
import AudioUploadField from '@/components/admin/AudioUploadField';
import Link from 'next/link';

export const metadata = { title: 'Редактирай клип | Админ' };

const levels = ['A1','A2','B1','B2','C1','C2'].map(v => ({ value: v, label: v }));

export default async function EditClipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: clip } = await supabase.from('listening_clips').select('*').eq('id', id).single();
  if (!clip) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/slusham" className="text-sm" style={{ color: 'var(--muted)' }}>
          ← Слушане
        </Link>
        <span style={{ color: 'var(--line-2)' }}>/</span>
        <h1 className="text-xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          {clip.title}
        </h1>
      </div>

      <form
        action={upsertClip}
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <input type="hidden" name="id" value={clip.id} />

        <Field label="Заглавие" name="title">
          <Input name="title" defaultValue={clip.title} required />
        </Field>

        <Field label="Аудио файл" name="audio_url" hint="Качи .mp3 файл или постави директна URL връзка">
          <AudioUploadField name="audio_url" defaultValue={clip.audio_url} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Тема" name="topic">
            <Input name="topic" defaultValue={clip.topic} required />
          </Field>
          <Field label="Ниво" name="level">
            <Select name="level" options={levels} defaultValue={clip.level} />
          </Field>
        </div>

        <Field label="Времетраене (секунди)" name="duration_seconds">
          <Input name="duration_seconds" type="number" defaultValue={String(clip.duration_seconds)} min="1" />
        </Field>

        <Field label="Транскрипция" name="transcript">
          <Textarea name="transcript" rows={6} defaultValue={clip.transcript} required />
        </Field>

        <Field
          label="Въпроси (JSON)"
          name="questions"
          hint='[{"question":"...","options":["a","b","c"],"correct":0}]'
        >
          <Textarea
            name="questions"
            rows={5}
            defaultValue={JSON.stringify(clip.questions ?? [], null, 2)}
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--coral)' }}
          >
            Запази
          </button>
          <Link
            href="/admin/slusham"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
          >
            Отказ
          </Link>
        </div>
      </form>
    </div>
  );
}
