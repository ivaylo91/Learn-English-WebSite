'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, CheckCircle2, AlertCircle, Bell, BellOff } from 'lucide-react';
import { GOAL_TARGETS, type DailyGoal } from '@/lib/actions/goals';
import { createClient } from '@/lib/supabase/client';
import type { Level } from '@/lib/types/database';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const levelTheme: Record<Level, React.CSSProperties> = {
  A1: { background: "var(--sage)",     color: "var(--sage-ink)",  border: "2px solid #b5d8be" },
  A2: { background: "var(--sage)",     color: "var(--sage-ink)",  border: "2px solid #b5d8be" },
  B1: { background: "var(--sky)",      color: "var(--sky-ink)",   border: "2px solid #b4cfe4" },
  B2: { background: "var(--sky)",      color: "var(--sky-ink)",   border: "2px solid #b4cfe4" },
  C1: { background: "var(--lavender)", color: "var(--lav-ink)",   border: "2px solid #c9bce4" },
  C2: { background: "var(--lavender)", color: "var(--lav-ink)",   border: "2px solid #c9bce4" },
};

interface Props {
  userId:             string;
  initName:           string;
  initLevel:          Level;
  initEmailReminders: boolean;
  initDailyGoal:      DailyGoal;
}

export default function ProfileForm({ userId, initName, initLevel, initEmailReminders, initDailyGoal }: Props) {
  const router  = useRouter();
  const [name,           setName]           = useState(initName);
  const [level,          setLevel]          = useState<Level>(initLevel);
  const [emailReminders, setEmailReminders] = useState(initEmailReminders);
  const [dailyGoal,      setDailyGoal]      = useState<DailyGoal>(initDailyGoal);
  const [loading,        setLoading]        = useState(false);
  const [status,         setStatus]         = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    setStatus('idle');

    const supabase = createClient();

    const { error: dbErr } = await supabase
      .from('profiles')
      .update({ name: trimmed, level, email_reminders: emailReminders, daily_goal: dailyGoal })
      .eq('id', userId);

    if (dbErr) {
      setStatus('error');
      setLoading(false);
      return;
    }

    // Sync user_metadata so the navbar initials update via onAuthStateChange
    await supabase.auth.updateUser({ data: { name: trimmed } });

    setStatus('success');
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-semibold" style={{ color: "var(--ink-2)" }}>
          Три имена (или псевдоним)
        </label>
        <input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={60}
          required
          className="w-full px-4 py-2.5 text-sm rounded-xl focus:outline-none transition"
          style={{ border: "1px solid var(--line)", background: "var(--bg)", color: "var(--ink)" }}
          onFocus={e => { e.currentTarget.style.borderColor = "var(--coral)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,99,58,.15)"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; }}
          placeholder="Твоето име"
        />
      </div>

      {/* Level picker */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold" style={{ color: "var(--ink-2)" }}>Моето ниво</p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map(l => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={
                level === l
                  ? { ...levelTheme[l], outline: "2px solid var(--coral)", outlineOffset: "2px" }
                  : { background: "var(--bg-2)", color: "var(--muted)", border: "1px solid var(--line)" }
              }
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Email reminders toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: emailReminders ? 'var(--peach)' : 'var(--bg-2)' }}
          >
            {emailReminders
              ? <Bell className="w-4 h-4" style={{ color: 'var(--coral-ink)' }} />
              : <BellOff className="w-4 h-4" style={{ color: 'var(--muted)' }} />
            }
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
              Напомняния за серия
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
              Имейл, когато серията ти е в риск
            </p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={emailReminders}
          onClick={() => setEmailReminders(v => !v)}
          className="relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 cursor-pointer"
          style={{ background: emailReminders ? 'var(--coral)' : 'var(--line)' }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200"
            style={{ transform: emailReminders ? 'translateX(20px)' : 'translateX(0)' }}
          />
        </button>
      </div>

      {/* Daily goal picker */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>Дневна цел</p>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(GOAL_TARGETS) as [DailyGoal, typeof GOAL_TARGETS[DailyGoal]][]).map(([key, t]) => (
            <button
              key={key}
              type="button"
              onClick={() => setDailyGoal(key)}
              className="flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer"
              style={
                dailyGoal === key
                  ? { background: 'var(--coral-soft)', border: '2px solid var(--coral)', color: 'var(--coral-ink)' }
                  : { background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--muted)' }
              }
            >
              <span className="text-sm font-bold" style={{ color: dailyGoal === key ? 'var(--coral-ink)' : 'var(--ink)' }}>
                {t.label}
              </span>
              <span className="text-[11px] leading-tight">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {status === 'success' && (
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm"
          style={{ background: "var(--sage)", border: "1px solid #b5d8be", color: "var(--sage-ink)" }}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Профилът е обновен.
        </div>
      )}
      {status === 'error' && (
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm"
          style={{ background: "var(--rose)", border: "1px solid #ecb9b9", color: "var(--rose-ink)" }}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          Грешка при запазване. Опитай отново.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold active:scale-[.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "var(--coral)", boxShadow: "0 8px 16px -8px rgba(232,99,58,.5)" }}
      >
        {loading
          ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          : <Save className="w-4 h-4" />
        }
        Запази промените
      </button>
    </form>
  );
}
