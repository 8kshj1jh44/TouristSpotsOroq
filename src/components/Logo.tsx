import Image from "next/image";

/**
 * Adaptive logo mark. Renders the OroqLogo image (public/oroqlogo.jpg) via the
 * optimized Next Image component.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/oroqlogo.jpg"
      alt="Discover Oroquieta logo"
      width={400}
      height={400}
      className={className}
      priority
    />
  );
}
