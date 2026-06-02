'use client';

import { useState } from 'react';
import { KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  userEmail: string;
}

export default function PasswordChange({ userEmail }: Props) {
  const [open,     setOpen]     = useState(false);
  const [current,  setCurrent]  = useState('');
  const [next,     setNext]     = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [status,   setStatus]   = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const tooShort   = next.length > 0 && next.length < 8;
  const mismatch   = confirm.length > 0 && next !== confirm;
  const canSubmit  = current && next.length >= 8 && next === confirm && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setStatus('idle');
    setErrorMsg('');

    const supabase = createClient();

    // Step 1: verify current password by re-authenticating
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email:    userEmail,
      password: current,
    });
    if (signInError) {
      setStatus('error');
      setErrorMsg('Текущата парола е грешна.');
      setLoading(false);
      return;
    }

    // Step 2: update to new password
    const { error: updateError } = await supabase.auth.updateUser({ password: next });
    if (updateError) {
      setStatus('error');
      setErrorMsg(updateError.message);
      setLoading(false);
      return;
    }

    setStatus('success');
    setCurrent('');
    setNext('');
    setConfirm('');
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = {
    border:     '1px solid var(--line)',
    background: 'var(--bg)',
    color:      'var(--ink)',
    borderRadius: 10,
    padding:    '9px 12px',
    fontSize:   14,
    width:      '100%',
    outline:    'none',
    fontFamily: 'inherit',
  };

  return (
    <div>
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setStatus('idle'); }}
        className="flex items-center justify-between w-full text-left group cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4" style={{ color: 'var(--coral)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--coral)' }}>
            Промяна на паролата
          </span>
        </div>
        {open
          ? <ChevronUp  className="w-4 h-4" style={{ color: 'var(--muted)' }} />
          : <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted)' }} />
        }
      </button>

      {/* Expanded form */}
      {open && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">

          {/* Current password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
              Текуща парола
            </label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={current}
                onChange={e => setCurrent(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Въведи текущата парола"
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,99,58,.15)'; }}
                onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--line)';  e.currentTarget.style.boxShadow = 'none'; }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: 'var(--muted)' }}
                tabIndex={-1}
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
              Нова парола
            </label>
            <input
              type={showPwd ? 'text' : 'password'}
              value={next}
              onChange={e => setNext(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Минимум 8 символа"
              style={{
                ...inputStyle,
                borderColor: tooShort ? 'var(--rose-ink)' : undefined,
              }}
              onFocus={e => { e.currentTarget.style.borderColor = tooShort ? 'var(--rose-ink)' : 'var(--coral)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,99,58,.15)'; }}
              onBlur={e =>  { e.currentTarget.style.borderColor = tooShort ? 'var(--rose-ink)' : 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            {tooShort && (
              <p className="text-xs" style={{ color: 'var(--rose-ink)' }}>Поне 8 символа</p>
            )}
          </div>

          {/* Confirm */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
              Потвърди новата парола
            </label>
            <input
              type={showPwd ? 'text' : 'password'}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Повтори новата парола"
              style={{
                ...inputStyle,
                borderColor: mismatch ? 'var(--rose-ink)' : undefined,
              }}
              onFocus={e => { e.currentTarget.style.borderColor = mismatch ? 'var(--rose-ink)' : 'var(--coral)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,99,58,.15)'; }}
              onBlur={e =>  { e.currentTarget.style.borderColor = mismatch ? 'var(--rose-ink)' : 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            {mismatch && (
              <p className="text-xs" style={{ color: 'var(--rose-ink)' }}>Паролите не съвпадат</p>
            )}
          </div>

          {/* Feedback */}
          {status === 'success' && (
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm"
              style={{ background: 'var(--sage)', border: '1px solid #b5d8be', color: 'var(--sage-ink)' }}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Паролата е сменена успешно.
            </div>
          )}
          {status === 'error' && (
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm"
              style={{ background: 'var(--rose)', border: '1px solid #ecb9b9', color: 'var(--rose-ink)' }}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold active:scale-[.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: 'var(--coral)' }}
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <KeyRound className="w-4 h-4" />
            }
            Смени паролата
          </button>
        </form>
      )}
    </div>
  );
}
