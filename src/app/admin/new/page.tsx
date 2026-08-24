import { createSpot } from "../actions";
import SpotForm from "@/components/admin/SpotForm";

export const dynamic = "force-dynamic";

export default function NewSpotPage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl tracking-tight text-ink">New spot</h1>
      <div className="rounded-2xl border border-border-subtle bg-card p-8 shadow-sm">
        <SpotForm action={createSpot} />
      </div>
    </div>
  );
}