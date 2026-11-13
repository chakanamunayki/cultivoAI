"use client";

import { Suspense, type ReactNode } from "react";

interface LazySectionProps {
  children?: ReactNode;
  fallback?: ReactNode;
  className?: string | undefined;
}

/**
 * Wrapper component for lazy-loaded sections.
 * Provides a Suspense boundary with an optional loading fallback.
 */
export function LazySection({
  children,
  fallback,
  className = "",
}: LazySectionProps) {
  const defaultFallback = (
    <div
      className={`min-h-[200px] animate-pulse bg-neutral-100 ${className}`}
      aria-busy="true"
      aria-label="Loading section..."
    />
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>
  );
}
