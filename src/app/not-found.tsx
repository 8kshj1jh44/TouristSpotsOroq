import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <>
      <header className="border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold text-forest">
            <Logo className="h-8 w-8" />
            <span className="hidden sm:inline">Discover&nbsp;Oroquieta</span>
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center md:py-32">
        <p className="font-display text-7xl tracking-tight text-forest md:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl tracking-tight text-ink md:text-3xl">
          This path leads nowhere.
        </h1>
        <p className="mt-3 max-w-[46ch] text-muted">
          The destination you&apos;re looking for isn&apos;t on the map. Let&apos;s get you back to
          the good spots.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-dark active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to Discover Oroquieta
        </Link>
      </main>
    </>
  );
}