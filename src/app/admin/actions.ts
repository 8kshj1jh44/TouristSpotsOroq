"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, ADMIN_EMAIL } from "@/lib/supabase/auth";

export type SpotFormState = {
  error?: string;
  fieldErrors?: Record<string, string | undefined>;
};

export type SpotInput = {
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  barangay: string;
  address: string;
  opening_hours: string;
  is_open_daily: boolean;
  phone: string;
  email: string;
  website_url: string;
  social_handle: string;
  followers_count: string;
  map_url: string;
  featured_image: string;
  gallery: string[];
  is_featured: boolean;
};

async function assertAdmin(): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.email !== ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }
}

function parseInput(formData: FormData): SpotInput {
  const commaList = (key: string) =>
    String(formData.get(key) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    barangay: String(formData.get("barangay") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    opening_hours: String(formData.get("opening_hours") ?? "").trim(),
    is_open_daily: formData.get("is_open_daily") === "on",
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    website_url: String(formData.get("website_url") ?? "").trim(),
    social_handle: String(formData.get("social_handle") ?? "").trim(),
    followers_count: String(formData.get("followers_count") ?? "").trim(),
    map_url: String(formData.get("map_url") ?? "").trim(),
    featured_image: String(formData.get("featured_image") ?? "").trim(),
    gallery: commaList("gallery"),
    is_featured: formData.get("is_featured") === "on",
  };
}

function validate(input: SpotInput): Record<string, string | undefined> {
  const errors: Record<string, string | undefined> = {};
  if (!input.name) errors.name = "Required";
  if (!input.slug) errors.slug = "Required";
  else if (!/^[a-z0-9-]+$/.test(input.slug)) errors.slug = "Lowercase letters, numbers, hyphens only";
  if (!input.barangay) errors.barangay = "Required";
  if (!input.address) errors.address = "Required";
  return errors;
}

export async function createSpot(
  _prevState: SpotFormState,
  formData: FormData
): Promise<SpotFormState> {
  await assertAdmin();
  const input = parseInput(formData);
  const fieldErrors = validate(input);
  if (Object.values(fieldErrors).some(Boolean)) {
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("spots").insert(input);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/spots");
  redirect("/admin");
}

export async function updateSpot(
  _prevState: SpotFormState,
  formData: FormData
): Promise<SpotFormState> {
  await assertAdmin();
  const originalSlug = String(formData.get("original_slug") ?? "");
  const input = parseInput(formData);
  const fieldErrors = validate(input);
  if (Object.values(fieldErrors).some(Boolean)) {
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("spots")
    .update(input)
    .eq("slug", originalSlug);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/spots");
  revalidatePath(`/spots/${input.slug}`);
  redirect("/admin");
}

export async function deleteSpot(id: string) {
  await assertAdmin();
  const supabase = await createClient();
  await supabase.from("spots").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/spots");
}