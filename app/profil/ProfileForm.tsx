'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Level } from '@/lib/types/database';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const levelColor: Record<Level, string> = {
  A1: 'border-green-300  bg-green-50  text-green-700  ring-green-400',
  A2: 'border-green-300  bg-green-50  text-green-700  ring-green-400',
  B1: 'border-amber-300  bg-amber-50  text-amber-700  ring-amber-400',
  B2: 'border-amber-300  bg-amber-50  text-amber-700  ring-amber-400',
  C1: 'border-purple-300 bg-purple-50 text-purple-700 ring-purple-400',
  C2: 'border-purple-300 bg-purple-50 text-purple-700 ring-purple-400',
};

interface Props {
  userId:    string;
  initName:  string;
  initLevel: Level;
}

export default function ProfileForm({ userId, initName, initLevel }: Props) {
  const router  = useRouter();
  const [name,    setName]    = useState(initName);
  const [level,   setLevel]   = useState<Level>(initLevel);
  const [loading, setLoading] = useState(false);
  const [status,  setStatus]  = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    setStatus('idle');

    const supabase = createClient();

    const { error: dbErr } = await supabase
      .from('profiles')
      .update({ name: trimmed, level })
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
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Три имена (или псевдоним)
        </label>
        <input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={60}
          required
          className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="Твоето име"
        />
      </div>

      {/* Level picker */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700">Моето ниво</p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map(l => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                level === l
                  ? `${levelColor[l]} ring-2 ring-offset-1`
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {status === 'success' && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Профилът е обновен.
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Грешка при запазване. Опитай отново.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-[.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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
