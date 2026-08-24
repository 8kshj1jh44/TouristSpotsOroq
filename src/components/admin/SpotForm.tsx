"use client";

import { useActionState, useState } from "react";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import type { SpotFormState } from "@/app/admin/actions";
import type { Spot } from "@/lib/supabase/types";

type SpotFormProps = {
  action: (prev: SpotFormState, formData: FormData) => Promise<SpotFormState>;
  spot?: Spot | null;
};

function fieldClasses(hasError?: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 text-sm text-ink bg-canvas outline-none transition-colors focus:ring-2 focus:ring-forest/20 ${
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-border-subtle focus:border-forest"
  }`;
}

export default function SpotForm({ action, spot }: SpotFormProps) {
  const [state, formAction, pending] = useActionState(action, {} as SpotFormState);

  const [featured, setFeatured] = useState(spot?.featured_image ?? "");
  const [galleryText, setGalleryText] = useState((spot?.gallery ?? []).join(", "));

  const isEdit = Boolean(spot);

  const galleryUrls = galleryText
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <input type="hidden" name="original_slug" value={spot?.slug ?? ""} />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="name">
          Name *
        </label>
        <input id="name" name="name" defaultValue={spot?.name} className={fieldClasses(Boolean(state.fieldErrors?.name))} placeholder="Agricio Farm and Resort" />
        {state.fieldErrors?.name && <p className="text-xs text-red-600">{state.fieldErrors.name}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="slug">
          Slug *
        </label>
        <input id="slug" name="slug" defaultValue={spot?.slug} className={fieldClasses(Boolean(state.fieldErrors?.slug))} placeholder="agricio-farm-and-resort" />
        {state.fieldErrors?.slug && <p className="text-xs text-red-600">{state.fieldErrors.slug}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="category">
          Category
        </label>
        <input id="category" name="category" defaultValue={spot?.category ?? "Farm & Resort"} className={fieldClasses()} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="barangay">
          Barangay *
        </label>
        <input id="barangay" name="barangay" defaultValue={spot?.barangay} className={fieldClasses(Boolean(state.fieldErrors?.barangay))} />
        {state.fieldErrors?.barangay && <p className="text-xs text-red-600">{state.fieldErrors.barangay}</p>}
      </div>

      <div className="space-y-2 lg:col-span-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="tagline">
          Tagline
        </label>
        <input id="tagline" name="tagline" defaultValue={spot?.tagline ?? ""} className={fieldClasses()} placeholder="Serenity and refreshing leisure" />
      </div>

      <div className="space-y-2 lg:col-span-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="description">
          Description
        </label>
        <textarea id="description" name="description" defaultValue={spot?.description ?? ""} className={`${fieldClasses()} min-h-28 resize-y`} />
      </div>

      <div className="space-y-2 lg:col-span-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="address">
          Address *
        </label>
        <input id="address" name="address" defaultValue={spot?.address} className={fieldClasses(Boolean(state.fieldErrors?.address))} />
        {state.fieldErrors?.address && <p className="text-xs text-red-600">{state.fieldErrors.address}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="opening_hours">
          Opening hours
        </label>
        <input id="opening_hours" name="opening_hours" defaultValue={spot?.opening_hours ?? "7:00 AM - 9:00 PM"} className={fieldClasses()} />
      </div>

      <div className="flex items-end gap-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink">
          <input type="checkbox" name="is_open_daily" defaultChecked={spot?.is_open_daily ?? true} className="h-4 w-4 accent-forest" />
          Open daily
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-ink">
          <input type="checkbox" name="is_featured" defaultChecked={spot?.is_featured ?? false} className="h-4 w-4 accent-forest" />
          Featured
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="phone">
          Phone
        </label>
        <input id="phone" name="phone" defaultValue={spot?.phone ?? ""} className={fieldClasses()} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" defaultValue={spot?.email ?? ""} className={fieldClasses()} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="website_url">
          Website URL
        </label>
        <input id="website_url" name="website_url" defaultValue={spot?.website_url ?? ""} className={fieldClasses()} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="map_url">
          Map / Directions URL
        </label>
        <input id="map_url" name="map_url" defaultValue={spot?.map_url ?? ""} className={fieldClasses()} placeholder="https://maps.google.com/…" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="social_handle">
          Social handle
        </label>
        <input id="social_handle" name="social_handle" defaultValue={spot?.social_handle ?? ""} className={fieldClasses()} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="followers_count">
          Followers count
        </label>
        <input id="followers_count" name="followers_count" defaultValue={spot?.followers_count ?? ""} className={fieldClasses()} placeholder="6.3K" />
      </div>

      <div className="space-y-2 lg:col-span-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="featured_image">
          Featured image URL
        </label>
        <input
          id="featured_image"
          name="featured_image"
          value={featured}
          onChange={(e) => setFeatured(e.target.value)}
          className={fieldClasses()}
          placeholder="https://images.unsplash.com/…"
        />
        <div className="mt-2 aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-border-subtle bg-sage/40">
          {featured ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featured}
              alt="Featured image preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              onLoad={(e) => {
                e.currentTarget.style.display = "";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center gap-2 text-sm text-muted">
              <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
              No preview yet
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 lg:col-span-2">
        <label className="block text-sm font-semibold text-ink" htmlFor="gallery">
          Gallery URLs (comma separated)
        </label>
        <textarea
          id="gallery"
          name="gallery"
          value={galleryText}
          onChange={(e) => setGalleryText(e.target.value)}
          className={`${fieldClasses()} min-h-20 resize-y`}
        />
        {galleryUrls.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {galleryUrls.map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="aspect-square h-16 w-16 overflow-hidden rounded-xl border border-border-subtle bg-sage/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Gallery preview ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "";
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {state.error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 lg:col-span-2">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" strokeWidth={1.5} />
          {pending ? "Saving…" : isEdit ? "Save changes" : "Create spot"}
        </button>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-6 py-3 text-sm font-semibold text-muted transition-colors hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Cancel
        </Link>
      </div>
    </form>
  );
}