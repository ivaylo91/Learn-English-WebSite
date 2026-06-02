'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { deleteAccount } from '@/lib/actions/account';

const CONFIRM_WORD = 'ИЗТРИЙ';

export default function DeleteAccount() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [open,      setOpen]      = useState(false);
  const [typed,     setTyped]     = useState('');
  const [serverErr, setServerErr] = useState('');

  const confirmed = typed === CONFIRM_WORD;

  function handleDelete() {
    if (!confirmed) return;
    setServerErr('');
    startTransition(async () => {
      const result = await deleteAccount();
      if (result.error) {
        setServerErr(result.error);
      } else {
        router.push('/');
        router.refresh();
      }
    });
  }

  return (
    <div
      className="rounded-2xl overflow-hidden mt-6"
      style={{ border: '1px solid var(--rose-ink)', background: 'var(--surface)' }}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setTyped(''); setServerErr(''); }}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer transition-colors hover:bg-[var(--rose)]"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" style={{ color: 'var(--rose-ink)' }} />
          <span className="text-sm font-bold" style={{ color: 'var(--rose-ink)' }}>
            Изтриване на акаунта
          </span>
        </div>
        {open
          ? <ChevronUp   className="w-4 h-4" style={{ color: 'var(--rose-ink)' }} />
          : <ChevronDown className="w-4 h-4" style={{ color: 'var(--rose-ink)' }} />
        }
      </button>

      {/* Expanded danger zone */}
      {open && (
        <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--rose-ink)' }}>
          <p className="text-sm mt-4 mb-5 leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            Това действие е <strong>необратимо</strong>. Всички твои данни — думи, прогрес,
            постижения и настройки — ще бъдат изтрити завинаги.
          </p>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
              За да потвърдиш, напиши <code
                className="px-1.5 py-0.5 rounded text-xs font-mono"
                style={{ background: 'var(--rose)', color: 'var(--rose-ink)' }}
              >{CONFIRM_WORD}</code>
            </label>
            <input
              type="text"
              value={typed}
              onChange={e => setTyped(e.target.value)}
              placeholder={CONFIRM_WORD}
              autoComplete="off"
              spellCheck={false}
              className="w-full px-4 py-2.5 text-sm rounded-xl outline-none transition"
              style={{
                border:     `1px solid ${confirmed ? 'var(--rose-ink)' : 'var(--line)'}`,
                background: 'var(--bg)',
                color:      'var(--ink)',
                fontFamily: 'var(--font-mono)',
              }}
            />
          </div>

          {serverErr && (
            <p className="text-xs mb-4" style={{ color: 'var(--rose-ink)' }}>{serverErr}</p>
          )}

          <button
            type="button"
            onClick={handleDelete}
            disabled={!confirmed || isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white active:scale-[.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: 'var(--rose-ink)' }}
          >
            {isPending
              ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <Trash2 className="w-4 h-4" />
            }
            {isPending ? 'Изтриване…' : 'Изтрий акаунта'}
          </button>
        </div>
      )}
    </div>
  );
}
