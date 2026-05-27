import { upsertLesson } from '@/lib/actions/admin';
import { Field, Input, Textarea, Select } from '@/components/admin/AdminFormField';
import Link from 'next/link';

export const metadata = { title: 'Нов урок | Админ' };

const levels = ['A1','A2','B1','B2','C1','C2'].map(v => ({ value: v, label: v }));

export default function NewLessonPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/gramatika" className="text-sm" style={{ color: 'var(--muted)' }}>
          ← Граматика
        </Link>
        <span style={{ color: 'var(--line-2)' }}>/</span>
        <h1 className="text-xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          Нов урок
        </h1>
      </div>

      <form
        action={upsertLesson}
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <Field label="Заглавие" name="title">
          <Input name="title" placeholder="Present Simple" required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug" name="slug" hint="URL идентификатор">
            <Input name="slug" placeholder="present-simple" required />
          </Field>
          <Field label="Категория" name="category">
            <Input name="category" placeholder="tenses" required />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Ниво" name="level">
            <Select name="level" options={levels} />
          </Field>
          <Field label="Поредност" name="order_index" hint="За сортиране в списъка">
            <Input name="order_index" type="number" defaultValue="1" min="1" />
          </Field>
        </div>

        <Field label="Съдържание (Markdown)" name="content_md">
          <Textarea name="content_md" rows={10} placeholder="## Present Simple&#10;&#10;Описание на урока..." required />
        </Field>

        <Field
          label="Въпроси (JSON)"
          name="questions"
          hint='Масив от обекти: [{"question":"...","options":["a","b","c"],"correct":0}]'
        >
          <Textarea name="questions" rows={5} defaultValue="[]" />
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
