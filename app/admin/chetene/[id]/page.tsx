import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { upsertText } from '@/lib/actions/admin';
import { Field, Input, Textarea, Select } from '@/components/admin/AdminFormField';
import Link from 'next/link';

export const metadata = { title: 'Редактирай текст | Админ' };

const levels = ['A1','A2','B1','B2','C1','C2'].map(v => ({ value: v, label: v }));

export default async function EditTextPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: text } = await supabase.from('reading_texts').select('*').eq('id', id).single();
  if (!text) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/chetene" className="text-sm" style={{ color: 'var(--muted)' }}>
          ← Четене
        </Link>
        <span style={{ color: 'var(--line-2)' }}>/</span>
        <h1 className="text-xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          {text.title}
        </h1>
      </div>

      <form
        action={upsertText}
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <input type="hidden" name="id" value={text.id} />

        <Field label="Заглавие" name="title">
          <Input name="title" defaultValue={text.title} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug" name="slug" hint="URL идентификатор">
            <Input name="slug" defaultValue={text.slug} required />
          </Field>
          <Field label="Тема" name="topic">
            <Input name="topic" defaultValue={text.topic} required />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Ниво" name="level">
            <Select name="level" options={levels} defaultValue={text.level} />
          </Field>
          <Field label="Минути за четене" name="reading_time_minutes">
            <Input name="reading_time_minutes" type="number" defaultValue={String(text.reading_time_minutes)} min="1" />
          </Field>
        </div>

        <Field label="Текст (Markdown)" name="body_md">
          <Textarea name="body_md" rows={10} defaultValue={text.body_md} required />
        </Field>

        <Field
          label="Речник (JSON)"
          name="vocabulary"
          hint='[{"en":"peculiar","bg":"особен, странен"}]'
        >
          <Textarea
            name="vocabulary"
            rows={4}
            defaultValue={JSON.stringify(text.vocabulary ?? [], null, 2)}
          />
        </Field>

        <Field
          label="Въпроси (JSON)"
          name="questions"
          hint='[{"question":"...","options":["a","b","c"],"correct":0}]'
        >
          <Textarea
            name="questions"
            rows={5}
            defaultValue={JSON.stringify(text.questions ?? [], null, 2)}
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
            href="/admin/chetene"
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
