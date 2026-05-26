"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [sent, setSent]       = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value.trim();
    const supabase = createClient();

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (authError) {
      setError("Грешка при изпращане. Опитай отново.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2
            className="text-2xl font-bold text-zinc-900 mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Имейлът е изпратен
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6">
            Провери пощата си за линк за нулиране на паролата. Линкът е валиден 1 час.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline">
            Обратно към Вход
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center px-4 py-16">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-br from-indigo-100 to-transparent opacity-50 blur-3xl" />
      </div>

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1
            className="text-2xl font-bold text-zinc-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Забравена парола
          </h1>
          <p className="text-sm text-zinc-500 mt-1 max-w-[28ch] mx-auto">
            Въведи имейла си и ще ти изпратим линк за нулиране.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-100 p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700" htmlFor="email">Имейл</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  id="email" name="email" type="email" required
                  autoComplete="email" placeholder="тебе@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <Button type="submit" size="md" loading={loading} className="w-full justify-center mt-1">
              Изпрати линк
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Спомни си паролата?{" "}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Влез тук
          </Link>
        </p>
      </div>
    </div>
  );
}
