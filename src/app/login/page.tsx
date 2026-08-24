"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold text-forest">
            <Logo className="h-8 w-8" />
            <span className="hidden sm:inline">Discover&nbsp;Oroquieta</span>
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <div className="rounded-2xl border border-border-subtle bg-card p-8 shadow-sm">
          <h1 className="font-display text-2xl tracking-tight text-ink">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted">Restricted access for Oroquieta administrators.</p>

          <form action={formAction} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-ink">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-border-subtle bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-ink">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-border-subtle bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
              />
            </div>

            {state.error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" strokeWidth={1.5} />
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}