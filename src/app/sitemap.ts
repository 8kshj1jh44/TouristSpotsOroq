import type { MetadataRoute } from "next";
import { getSpots } from "@/lib/supabase/queries";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const spots = await getSpots();

  const lastModified = new Date();

  const spotUrls = spots.map((spot) => ({
    url: `${SITE_URL.replace(/\/$/, "")}/spots/${spot.slug}`,
    lastModified: spot.created_at ?? lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL.replace(/\/$/, "")}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    ...spotUrls,
  ];
}