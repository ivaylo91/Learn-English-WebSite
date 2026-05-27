import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { upsertLesson } from '@/lib/actions/admin';
import { Field, Input, Textarea, Select } from '@/components/admin/AdminFormField';
import Link from 'next/link';

export const metadata = { title: 'Редактирай урок | Админ' };

const levels = ['A1','A2','B1','B2','C1','C2'].map(v => ({ value: v, label: v }));

export default async function EditLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: lesson } = await supabase.from('grammar_lessons').select('*').eq('id', id).single();
  if (!lesson) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/gramatika" className="text-sm" style={{ color: 'var(--muted)' }}>
          ← Граматика
        </Link>
        <span style={{ color: 'var(--line-2)' }}>/</span>
        <h1 className="text-xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          {lesson.title}
        </h1>
      </div>

      <form
        action={upsertLesson}
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <input type="hidden" name="id" value={lesson.id} />

        <Field label="Заглавие" name="title">
          <Input name="title" defaultValue={lesson.title} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug" name="slug" hint="URL идентификатор">
            <Input name="slug" defaultValue={lesson.slug} required />
          </Field>
          <Field label="Категория" name="category">
            <Input name="category" defaultValue={lesson.category} required />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Ниво" name="level">
            <Select name="level" options={levels} defaultValue={lesson.level} />
          </Field>
          <Field label="Поредност" name="order_index" hint="За сортиране в списъка">
            <Input name="order_index" type="number" defaultValue={String(lesson.order_index)} min="1" />
          </Field>
        </div>

        <Field label="Съдържание (Markdown)" name="content_md">
          <Textarea name="content_md" rows={10} defaultValue={lesson.content_md} required />
        </Field>

        <Field
          label="Въпроси (JSON)"
          name="questions"
          hint='Масив от обекти: [{"question":"...","options":["a","b","c"],"correct":0}]'
        >
          <Textarea
            name="questions"
            rows={5}
            defaultValue={JSON.stringify(lesson.questions ?? [], null, 2)}
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
            href="/admin/gramatika"
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
