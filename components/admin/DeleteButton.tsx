'use client';

import { useTransition } from 'react';
import { Trash2, Loader2 } from 'lucide-react';

interface Props {
  action: () => Promise<void>;
}

export default function DeleteButton({ action }: Props) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm('Сигурен ли си? Действието не може да бъде отменено.')) return;
    startTransition(async () => { await action(); });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-opacity"
      style={{
        background: 'var(--rose)',
        color:      'var(--rose-ink)',
        border:     '1px solid #e8c4c4',
        cursor:     pending ? 'not-allowed' : 'pointer',
        opacity:    pending ? 0.6 : 1,
      }}
    >
      {pending
        ? <Loader2 className="w-3 h-3 animate-spin" />
        : <Trash2  className="w-3 h-3" />
      }
      {pending ? 'Изтриване…' : 'Изтрий'}
    </button>
  );
}
