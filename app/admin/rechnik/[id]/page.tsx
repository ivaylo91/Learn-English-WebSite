import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { upsertWord } from '@/lib/actions/admin';
import { Field, Input, Textarea, Select } from '@/components/admin/AdminFormField';
import Link from 'next/link';

export const metadata = { title: 'Редактирай дума | Админ' };

const levels = ['A1','A2','B1','B2','C1','C2'].map(v => ({ value: v, label: v }));

export default async function EditWordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: word } = await supabase.from('vocabulary_words').select('*').eq('id', id).single();
  if (!word) notFound();

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/rechnik" className="text-sm" style={{ color: 'var(--muted)' }}>
          ← Речник
        </Link>
        <span style={{ color: 'var(--line-2)' }}>/</span>
        <h1 className="text-xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          {word.word_en}
        </h1>
      </div>

      <form
        action={upsertWord}
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <input type="hidden" name="id" value={word.id} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Английски" name="word_en">
            <Input name="word_en" defaultValue={word.word_en} required />
          </Field>
          <Field label="Български" name="word_bg">
            <Input name="word_bg" defaultValue={word.word_bg} required />
          </Field>
        </div>

        <Field label="Фонетика" name="phonetic" hint="Незадължително — /ˈæpəl/">
          <Input name="phonetic" defaultValue={word.phonetic ?? ''} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Ниво" name="level">
            <Select name="level" options={levels} defaultValue={word.level} />
          </Field>
          <Field label="Категория" name="category">
            <Input name="category" defaultValue={word.category} required />
          </Field>
        </div>

        <Field label="Пример (английски)" name="example_en">
          <Textarea name="example_en" rows={2} defaultValue={word.example_en ?? ''} />
        </Field>

        <Field label="Пример (български)" name="example_bg">
          <Textarea name="example_bg" rows={2} defaultValue={word.example_bg ?? ''} />
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
            href="/admin/rechnik"
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
