import { createClient } from "./server";
import { isSupabaseConfigured } from "./config";
import type { Spot } from "./types";

const FALLBACK_SPOTS: Spot[] = [
  {
    id: "fallback-agricio",
    created_at: new Date().toISOString(),
    name: "Agricio Farm and Resort",
    slug: "agricio-farm-and-resort",
    category: "Farm & Resort",
    tagline: "Serenity and refreshing leisure in Brgy. Mobod",
    description: "A tranquil farm and resort offering a refreshing escape in Brgy. Mobod.",
    barangay: "Mobod",
    address: "Purok 3, Brgy. Mobod, Oroquieta City, Misamis Occidental, Philippines, 7207",
    opening_hours: "7:00 AM - 9:00 PM",
    is_open_daily: true,
    phone: "0968 151 1640",
    email: "agriciofarmandresort@gmail.com",
    website_url: "https://cloudbeds.com",
    social_handle: null,
    map_url: null,
    followers_count: "6.3K",
    featured_image: "/agriciofarm.jpg",
    gallery: [],
    is_featured: true,
  },
  {
    id: "fallback-kenjelo",
    created_at: new Date().toISOString(),
    name: "Kenjelo Farm and Recreation Resorts",
    slug: "kenjelo-farm-and-recreation-resorts",
    category: "Farm & Recreation Resort",
    tagline: "START THE FUN! Premier eco-tourism and recreation haven.",
    description: "A premier eco-tourism and recreation haven in Dolipos Alto.",
    barangay: "Dolipos Alto",
    address: "Purok-6, Dolipos Alto, Oroquieta City, Misamis Occidental, Philippines, 7207",
    opening_hours: "7:00 AM - 9:00 PM",
    is_open_daily: true,
    phone: "0954 168 1259",
    email: "contact-us@kenjelofarm.com.ph",
    website_url: "https://kenjelofarm.com.ph",
    social_handle: null,
    map_url: null,
    followers_count: "28K",
    featured_image: "/kenjelo.jpg",
    gallery: [],
    is_featured: true,
  },
];

export async function getSpots(): Promise<Spot[]> {
  if (!isSupabaseConfigured()) return FALLBACK_SPOTS;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("spots")
    .select("*")
    .order("is_featured", { ascending: false });

  if (error || !data) return FALLBACK_SPOTS;
  return data as Spot[];
}

export async function getSpotBySlug(slug: string): Promise<Spot | null> {
  if (!isSupabaseConfigured()) {
    return FALLBACK_SPOTS.find((s) => s.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("spots")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return data as Spot;
}

export async function getFeaturedSpots(): Promise<Spot[]> {
  const spots = await getSpots();
  return spots.filter((s) => s.is_featured);
}