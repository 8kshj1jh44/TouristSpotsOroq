import Logo from "@/components/Logo";
import StarBorder from "@/components/StarBorder";
import SpotImage from "@/components/SpotImage";
import DriftWall from "@/components/ui/DriftWall";
import ScrollExpand from "@/components/ui/ScrollExpand";
import BorderGlow from "@/components/ui/BorderGlow";
import { MapPin, ArrowUpRight, Car, Clock, MapPinned, Sparkles } from "lucide-react";
import { getSpots } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allSpots = await getSpots();

  const wallItems = allSpots.map((spot) => ({
    image:
      spot.featured_image ||
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    title: spot.name,
    href: `/spots/${spot.slug}`,
  }));

  return (
    <>
      {/* Nav */}
      <header className="w-full border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5 font-display text-xl font-semibold text-forest">
            <Logo className="h-8 w-8" />
            <span className="hidden sm:inline">Discover&nbsp;Oroquieta</span>
          </a>
          <a
            href="#spots"
            className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Explore spots
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-16 pb-10 md:grid-cols-12 md:pt-24">
          <div className="md:col-span-7">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              City of Good Life · Misamis Occidental
            </p>
            <h1 className="max-w-2xl font-display text-5xl leading-[1.05] tracking-tight text-ink md:text-6xl">
              Discover{" "}
              <span className="italic text-forest">Oroquieta,</span> where every barangay holds a
              story.
            </h1>
            <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-muted">
              From farm resorts to recreation havens, explore the natural wonders and warm welcomes
              tucked into the hills and coasts of this thriving city.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StarBorder
                as="a"
                href="#spots"
                color="#E8AA42"
                speed="5s"
                thickness={2}
                className="star-border-cta"
              >
                Browse destinations
              </StarBorder>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative h-[520px] w-full overflow-hidden rounded-3xl md:h-[600px]">
              <DriftWall
                items={wallItems}
                columns={4}
                tileWidth={200}
                tileHeight={132}
                overlayColor="#1A4D2E"
              />
            </div>
          </div>
        </section>

        {/* Scroll-expanding media band */}
        <section className="relative w-full my-8">
          <ScrollExpand
            src="/hero.jpg"
            alt="Oroquieta City Heritage Kiosk"
            title="Experience Oroquieta"
            scrollHint="Scroll to explore"
            startWidth={56}
            startHeight={54}
            startRadius={28}
            endRadius={0}
            mediaZoom={1.25}
            overlayScrim={0.65}
            useWindowScroll={true}
          >
            <div className="mx-4 max-w-2xl space-y-3 rounded-3xl bg-black/50 px-6 py-8 text-center text-white shadow-2xl backdrop-blur-md border border-white/20">
              <span className="inline-block rounded-full bg-emerald-700/90 px-3.5 py-1 font-mono text-xs font-medium uppercase tracking-widest text-emerald-100 backdrop-blur-sm">
                Oroquieta City • The City of Good Life
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-white drop-shadow-lg md:text-5xl">
                Breathe Easy, Wander Freely
              </h2>
              <p className="text-sm leading-relaxed text-gray-100 drop-shadow-md md:text-base">
                From cool hillside farm retreats to refreshing coastal getaways—discover the natural charm and slow-paced serenity tucked in every corner of the city.
              </p>
            </div>
          </ScrollExpand>
        </section>

        {/* All destinations — card grid */}
        {allSpots.length > 0 && (
          <section id="spots" className="mx-auto max-w-7xl px-6 pb-24">
            <div className="mb-8 flex flex-col gap-2">
              <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
                Explore all destinations
              </h2>
              <p className="max-w-[52ch] text-muted">
                From farm resorts to recreation havens — every spot, barangay by barangay.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allSpots.map((spot) => (
                <BorderGlow
                  key={spot.id}
                  glowColor="145 49 42"
                  colors={["#1A4D2E", "#E8AA42", "#34D399"]}
                  backgroundColor="#FFFFFF"
                  borderRadius={24}
                  glowRadius={32}
                  glowIntensity={1.0}
                  className="h-full"
                >
                  <a
                    href={`/spots/${spot.slug}`}
                    className="group flex h-full flex-col"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <SpotImage
                        src={spot.featured_image}
                        alt={spot.name}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex w-fit items-center rounded-full bg-sage px-3 py-1 text-xs font-bold uppercase tracking-wide text-forest">
                          {spot.category}
                        </span>
                        {spot.followers_count && (
                          <span className="text-xs font-semibold text-muted">
                            {spot.followers_count}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl leading-snug text-ink transition-colors group-hover:text-forest">
                        {spot.name}
                      </h3>
                      {spot.tagline && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                          {spot.tagline}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-3 text-sm">
                        <span className="inline-flex items-center gap-1.5 text-muted">
                          <MapPin className="h-4 w-4 text-forest" strokeWidth={1.5} />
                          Brgy. {spot.barangay}
                        </span>
                        <span className="inline-flex items-center gap-1 text-forest">
                          View
                          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                        </span>
                      </div>
                    </div>
                  </a>
                </BorderGlow>
              ))}
            </div>
          </section>
        )}

        {/* Plan your visit — image band */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
              alt="Tropical shoreline of Misamis Occidental"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/60 to-forest/20" />
          </div>
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:py-28">
            <div className="md:col-span-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                Plan your visit
              </p>
              <h2 className="font-display text-3xl leading-tight tracking-tight text-white md:text-4xl">
                Come for the spots, stay for the welcome.
              </h2>
              <p className="mt-5 max-w-md text-white/85">
                Oroquieta sits between the hills and the coast — easy to reach by land from
                anywhere in Misamis Occidental.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-7">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <Car className="h-5 w-5 text-sand" strokeWidth={1.5} />
                <h3 className="mt-3 font-display text-lg text-white">Getting here</h3>
                <p className="mt-2 text-sm text-white/80">
                  Well-paved roads connect every barangay. Ride a jeepney, van, or drive straight
                  to each destination.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <Clock className="h-5 w-5 text-sand" strokeWidth={1.5} />
                <h3 className="mt-3 font-display text-lg text-white">Best time to visit</h3>
                <p className="mt-2 text-sm text-white/80">
                  Dry months are ideal for rivers and springs. Mornings are cooler and quieter.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <MapPinned className="h-5 w-5 text-sand" strokeWidth={1.5} />
                <h3 className="mt-3 font-display text-lg text-white">City center hub</h3>
                <p className="mt-2 text-sm text-white/80">
                  Start at the city proper, then head out to the barangays — most spots are a short
                  ride from the plaza.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-sand" strokeWidth={1.5} />
                <h3 className="mt-3 font-display text-lg text-white">Local tips</h3>
                <p className="mt-2 text-sm text-white/80">
                  Bring the essentials and always confirm opening hours with the operator before
                  heading out.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base text-forest">Discover Oroquieta</p>
          <p>© {new Date().getFullYear()} City of Oroquieta, Misamis Occidental.</p>
        </div>
      </footer>
    </>
  );
}