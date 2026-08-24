import { notFound } from "next/navigation";
import { getSpotBySlug } from "@/lib/supabase/queries";
import { updateSpot } from "../../actions";
import SpotForm from "@/components/admin/SpotForm";

export const dynamic = "force-dynamic";

export default async function EditSpotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spot = await getSpotBySlug(slug);
  if (!spot) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl tracking-tight text-ink">Edit spot</h1>
      <div className="rounded-2xl border border-border-subtle bg-card p-8 shadow-sm">
        <SpotForm action={updateSpot} spot={spot} />
      </div>
    </div>
  );
}