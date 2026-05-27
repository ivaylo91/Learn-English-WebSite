'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';

interface Props {
  next: string;
  callbackError?: string;
}

export default function LoginForm({ next, callbackError }: Props) {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(
    callbackError ? 'Линкът е изтекъл или невалиден. Моля, опитай отново.' : null
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form     = e.currentTarget;
    const email    = (form.elements.namedItem('email')    as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(
        authError.message === 'Invalid login credentials'
          ? 'Невалиден имейл или парола.'
          : 'Грешка при влизане. Опитай отново.'
      );
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center px-4 py-16">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(ellipse, var(--peach), var(--lavender), transparent)" }}
        />
      </div>

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold"
            style={{
              background: "var(--coral)",
              fontFamily: "var(--font-display)",
              boxShadow: "0 8px 20px -6px rgba(232,99,58,.5)",
            }}
          >
            У
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Добре дошъл обратно
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Влез в профила си и продължи да учиш</p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)" }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {error && (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm"
                style={{ background: "var(--rose)", border: "1px solid #ecb9b9", color: "var(--rose-ink)" }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="email" style={{ color: "var(--ink-2)" }}>Имейл</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted)" }} />
                <input
                  id="email" name="email" type="email" required autoComplete="email"
                  placeholder="тебе@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition"
                  style={{
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--ink)",
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = "var(--coral)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,99,58,.15)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold" htmlFor="password" style={{ color: "var(--ink-2)" }}>Парола</label>
                <Link href="/forgot-password" className="text-xs font-medium hover:underline" style={{ color: "var(--coral)" }}>
                  Забравена парола?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted)" }} />
                <input
                  id="password" name="password" type="password" required autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition"
                  style={{
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--ink)",
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = "var(--coral)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,99,58,.15)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            <Button type="submit" size="md" loading={loading} className="w-full justify-center mt-1">
              Влез
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: "1px solid var(--line)" }} />
            </div>
            <div className="relative flex justify-center text-xs px-3" style={{ color: "var(--muted)", background: "var(--surface)" }}>нямаш профил?</div>
          </div>

          <Link
            href="/register"
            className="flex w-full items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            style={{ color: "var(--coral-ink)", border: "1px solid #f4c8a8", background: "var(--coral-soft)" }}
          >
            Регистрирай се безплатно
          </Link>
        </div>
      </div>
    </div>
  );
}
