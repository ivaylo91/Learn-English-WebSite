import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { upsertExercise } from '@/lib/actions/admin';
import { Field, Input, Textarea, Select } from '@/components/admin/AdminFormField';
import Link from 'next/link';

export const metadata = { title: 'Редактирай упражнение | Админ' };

const levels = ['A1','A2','B1','B2','C1','C2'].map(v => ({ value: v, label: v }));

type Props = { params: Promise<{ id: string }> };

export default async function EditExercisePage({ params }: Props) {
  const { id }   = await params;
  const supabase = await createClient();

  const { data: ex } = await supabase.from('writing_exercises').select('*').eq('id', id).single();
  if (!ex) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/pisane" className="text-sm" style={{ color: 'var(--muted)' }}>← Писане</Link>
        <span style={{ color: 'var(--line-2)' }}>/</span>
        <h1 className="text-xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          Редактирай
        </h1>
      </div>

      <form
        action={upsertExercise}
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <input type="hidden" name="id" value={ex.id} />

        <Field label="Заглавие" name="title">
          <Input name="title" defaultValue={ex.title} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug" name="slug">
            <Input name="slug" defaultValue={ex.slug} required />
          </Field>
          <Field label="Тема" name="topic">
            <Input name="topic" defaultValue={ex.topic} required />
          </Field>
        </div>

        <Field label="Ниво" name="level">
          <Select name="level" options={levels} defaultValue={ex.level} />
        </Field>

        <Field label="Въпроси (JSON)" name="prompts" hint='[{"prompt":"...","answers":["a"],"hint":"optional"}]'>
          <Textarea name="prompts" rows={12} defaultValue={JSON.stringify(ex.prompts, null, 2)} />
        </Field>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--coral)' }}>
            Запази
          </button>
          <Link href="/admin/pisane" className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}>
            Отказ
          </Link>
        </div>
      </form>
    </div>
  );
}
