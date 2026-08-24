import Link from "next/link";
import { Plus, Pencil, Trash2, ArrowUpRight } from "lucide-react";
import { getSpots } from "@/lib/supabase/queries";
import { deleteSpot } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const spots = await getSpots();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink">Spots</h1>
          <p className="mt-1 text-sm text-muted">{spots.length} destinations</p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          New spot
        </Link>
      </div>

      {spots.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-border-subtle bg-card p-8 text-muted">
          No spots yet. Create your first destination.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border-subtle bg-card">
          <ul className="divide-y divide-border-subtle">
            {spots.map((spot) => (
              <li key={spot.id} className="flex items-center gap-4 p-4">
                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-border-subtle">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={spot.featured_image ?? ""} alt={spot.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-ink">{spot.name}</p>
                    {spot.is_featured && (
                      <span className="rounded-full bg-sage px-2 py-0.5 text-xs font-bold text-forest">Featured</span>
                    )}
                  </div>
                  <p className="truncate text-sm text-muted">
                    Brgy. {spot.barangay} · {spot.category}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/spots/${spot.slug}`}
                    className="rounded-full border border-border-subtle p-2 text-muted transition-colors hover:text-forest"
                    aria-label={`View ${spot.name}`}
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                  <Link
                    href={`/admin/edit/${spot.slug}`}
                    className="rounded-full border border-border-subtle p-2 text-muted transition-colors hover:text-forest"
                    aria-label={`Edit ${spot.name}`}
                  >
                    <Pencil className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                  <form action={deleteSpot.bind(null, spot.id)}>
                    <button
                      type="submit"
                      className="rounded-full border border-border-subtle p-2 text-muted transition-colors hover:border-red-200 hover:text-red-600"
                      aria-label={`Delete ${spot.name}`}
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}