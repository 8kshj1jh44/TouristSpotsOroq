import Link from "next/link";
import Logo from "@/components/Logo";
import { requireAdmin } from "@/lib/supabase/auth";
import { logout } from "@/app/login/actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-[100dvh]">
      <header className="border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5 font-display text-xl font-semibold text-forest">
            <Logo className="h-8 w-8" />
            Admin
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-sm font-semibold text-muted transition-colors hover:text-forest"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/new"
              className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
            >
              New spot
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-border-subtle bg-card px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-forest"
              >
                Sign out
              </button>
            </form>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}