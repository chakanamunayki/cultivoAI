import { cn } from "@/lib/utils";

/**
 * The Cultivo Labs terraces mark. Same geometry as public/brand/cultivo-labs-mark-*.svg.
 * Colour comes from `currentColor`, so set it with a text colour class.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={11}
      strokeLinecap="round"
    >
      <path d="M10 82 H78" />
      <path d="M27 62 H78" />
      <path d="M44 42 H78" />
      <path d="M61 22 H78" />
    </svg>
  );
}
