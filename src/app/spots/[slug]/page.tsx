import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  AtSign,
  BadgeCheck,
} from "lucide-react";
import Logo from "@/components/Logo";
import SpotImage from "@/components/SpotImage";
import { getSpotBySlug } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

function mapEmbedUrl(mapUrl?: string | null): string | null {
  if (!mapUrl) return null;
  const m = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!m) return null;
  const lat = m[1];
  const lng = m[2];
  return `https://maps.google.com/maps?q=${lat},${lng}&z=16&ie=UTF8&output=embed`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spot = await getSpotBySlug(slug);

  if (!spot) {
    return { title: "Spot not found | Discover Oroquieta" };
  }

  return {
    title: `${spot.name} | Discover Oroquieta`,
    description:
      spot.description ?? spot.tagline ?? `Explore ${spot.name} in Brgy. ${spot.barangay}, Oroquieta City.`,
    openGraph: {
      title: `${spot.name} | Discover Oroquieta`,
      description:
        spot.description ??
        spot.tagline ??
        `Explore ${spot.name} in Brgy. ${spot.barangay}, Oroquieta City.`,
      images: spot.featured_image ? [{ url: spot.featured_image }] : undefined,
    },
  };
}

export default async function SpotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spot = await getSpotBySlug(slug);

  if (!spot) notFound();

  const images = [spot.featured_image, ...(spot.gallery ?? [])].filter(
    (img): img is string => Boolean(img)
  );

  return (
    <>
      <header className="border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold text-forest">
            <Logo className="h-8 w-8" />
            <span className="hidden sm:inline">Discover&nbsp;Oroquieta</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/#spots"
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-4 py-2 text-sm font-semibold text-forest transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              All spots
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <Link
          href="/#spots"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to destinations
        </Link>

        <div className="overflow-hidden rounded-3xl border border-border-subtle">
          <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
            <SpotImage src={spot.featured_image} alt={spot.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                {spot.category}
              </span>
              <h1 className="font-display text-3xl tracking-tight text-white md:text-5xl">
                {spot.name}
              </h1>
              {spot.tagline && (
                <p className="max-w-xl text-base text-white/90">{spot.tagline}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Description */}
          <section className="lg:col-span-2">
            <h2 className="mb-3 font-display text-2xl tracking-tight text-ink">About</h2>
            <p className="max-w-[65ch] text-base leading-relaxed text-muted">
              {spot.description ??
                `A ${spot.category.toLowerCase()} nestled in Brgy. ${spot.barangay}, Oroquieta City.`}
            </p>

            {mapEmbedUrl(spot.map_url) && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-border-subtle">
                <iframe
                  src={mapEmbedUrl(spot.map_url)!}
                  title={`Map of ${spot.name}`}
                  className="h-[380px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            )}

            {images.length > 1 && (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden rounded-2xl border border-border-subtle"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${spot.name} gallery ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Info card */}
          <aside className="h-fit rounded-2xl border border-border-subtle bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-display text-lg text-ink">Visit details</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.5} />
                <div>
                  <p className="font-semibold text-ink">Barangay {spot.barangay}</p>
                  <p className="text-muted">{spot.address}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.5} />
                <div>
                  <p className="font-semibold text-ink">Opening hours</p>
                  <p className="text-muted">
                    {spot.opening_hours}
                    {spot.is_open_daily ? " · Open daily" : ""}
                  </p>
                </div>
              </li>
              {spot.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.5} />
                  <a
                    href={`tel:${spot.phone.replace(/\s/g, "")}`}
                    className="text-muted transition-colors hover:text-forest"
                  >
                    {spot.phone}
                  </a>
                </li>
              )}
              {spot.email && (
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.5} />
                  <a
                    href={`mailto:${spot.email}`}
                    className="text-muted transition-colors hover:text-forest"
                  >
                    {spot.email}
                  </a>
                </li>
              )}
              {spot.website_url && (
                <li className="flex items-center gap-3">
                  <Globe className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.5} />
                  <a
                    href={spot.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-muted transition-colors hover:text-forest"
                  >
                    {spot.website_url.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
              {spot.social_handle && (
                <li className="flex items-center gap-3">
                  <AtSign className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.5} />
                  <span className="text-muted">{spot.social_handle}</span>
                </li>
              )}
            </ul>

            <div className="mt-6 border-t border-border-subtle pt-4">
              <p className="text-xs uppercase tracking-wide text-muted">Followers</p>
              <p className="mt-1 font-display text-2xl text-forest">
                {spot.followers_count ?? "—"}
              </p>
            </div>

            {spot.website_url && (
              <a
                href={spot.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-dark active:scale-[0.98]"
              >
                <BadgeCheck className="h-4 w-4" strokeWidth={1.5} />
                Visit official site
              </a>
            )}

            {spot.map_url && (
              <a
                href={spot.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-forest px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-sage/40 active:scale-[0.98]"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
                Get directions
              </a>
            )}
          </aside>
        </div>
      </main>

      <footer className="border-t border-border-subtle bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base text-forest">Discover Oroquieta</p>
          <p>© {new Date().getFullYear()} City of Oroquieta, Misamis Occidental.</p>
        </div>
      </footer>
    </>
  );
}