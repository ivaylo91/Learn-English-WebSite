import { upsertExercise } from '@/lib/actions/admin';
import { Field, Input, Textarea, Select } from '@/components/admin/AdminFormField';
import Link from 'next/link';

export const metadata = { title: 'Ново упражнение | Админ' };

const levels = ['A1','A2','B1','B2','C1','C2'].map(v => ({ value: v, label: v }));

const PROMPTS_PLACEHOLDER = JSON.stringify([
  { prompt: 'Fill in: She ___ to school every day.', answers: ['goes'], hint: 'Present Simple' },
  { prompt: 'Translate: Аз харесвам четенето.', answers: ['I like reading', 'I like to read'] },
], null, 2);

export default function NewExercisePage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/pisane" className="text-sm" style={{ color: 'var(--muted)' }}>← Писане</Link>
        <span style={{ color: 'var(--line-2)' }}>/</span>
        <h1 className="text-xl font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          Ново упражнение
        </h1>
      </div>

      <form
        action={upsertExercise}
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <Field label="Заглавие" name="title">
          <Input name="title" placeholder="Present Simple — Fill in the blanks" required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug" name="slug" hint="URL идентификатор">
            <Input name="slug" placeholder="present-simple-fill" required />
          </Field>
          <Field label="Тема" name="topic">
            <Input name="topic" placeholder="Времена" required />
          </Field>
        </div>

        <Field label="Ниво" name="level">
          <Select name="level" options={levels} />
        </Field>

        <Field
          label="Въпроси (JSON)"
          name="prompts"
          hint='Масив от обекти: [{"prompt":"...","answers":["a","b"],"hint":"optional"}]'
        >
          <Textarea name="prompts" rows={10} defaultValue={PROMPTS_PLACEHOLDER} />
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
