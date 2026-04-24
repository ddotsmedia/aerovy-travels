import Image from "next/image";
import { cn } from "@aerovy/ui";

// Using the "A" mark + wordmark from assets/logo.png. For Phase 1 we serve
// the raster through next/image; a proper SVG mark can replace this later
// without touching consumers.
export function BrandLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/brand/logo.png"
        alt="Aerovy Travels"
        width={160}
        height={128}
        priority={priority}
        className="h-8 w-auto"
      />
      <span className="sr-only">Aerovy Travels</span>
    </div>
  );
}
