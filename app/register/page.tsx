"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

const perks = [
  "Безплатен достъп до всички модули",
  "Следи напредъка си",
  "Персонализирани упражнения",
];

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const name     = (form.elements.namedItem("name")     as HTMLInputElement).value.trim();
    const email    = (form.elements.namedItem("email")    as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(
        authError.message.includes("already registered")
          ? "Вече съществува профил с този имейл."
          : "Грешка при регистрация. Опитай отново."
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
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
            Провери имейла си
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6">
            Изпратихме линк за потвърждение. Кликни върху него, за да активираш профила си.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
          >
            Обратно към Вход
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center px-4 py-16">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-violet-100 via-indigo-50 to-transparent opacity-60 blur-3xl" />
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
            Създай профил
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Започни да учиш безплатно още днес</p>
        </div>

        <ul className="flex flex-col gap-2 mb-6">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-zinc-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              {p}
            </li>
          ))}
        </ul>

        <div className="bg-white rounded-2xl border border-zinc-100 p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700" htmlFor="name">Име</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  id="name" name="name" type="text" required
                  autoComplete="name" placeholder="Иван Иванов"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

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

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700" htmlFor="password">Парола</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  id="password" name="password" type="password" required
                  minLength={8} autoComplete="new-password"
                  placeholder="Минимум 8 символа"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <p className="text-xs text-zinc-400">Минимум 8 символа</p>
            </div>

            <Button type="submit" size="md" loading={loading} className="w-full justify-center mt-1">
              Създай профил
              <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-xs text-center text-zinc-400">
              С регистрацията се съгласяваш с нашите{" "}
              <Link href="/terms" className="underline hover:text-zinc-600">Условия</Link>{" "}
              и{" "}
              <Link href="/privacy" className="underline hover:text-zinc-600">Поверителност</Link>.
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Вече имаш профил?{" "}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Влез тук
          </Link>
        </p>
      </div>
    </div>
  );
}
