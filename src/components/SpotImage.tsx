import { X } from "lucide-react";

type SpotImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

/**
 * Renders a spot image, or a clear "X" placeholder when none is set so that
 * image-less spots are easy to identify.
 */
export default function SpotImage({ src, alt, className = "" }: SpotImageProps) {
  if (!src) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-card ${className}`}
      >
        <X className="h-10 w-10 text-red-400" strokeWidth={1.5} aria-hidden />
        <span className="px-2 text-center text-xs font-semibold uppercase tracking-wide text-muted">
          No image
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
}