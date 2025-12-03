"use client";

import { Suspense, lazy, type ComponentType, type ReactNode } from "react";

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

/**
 * Helper function to create a lazy-loaded component with built-in Suspense.
 * Usage:
 *   const LazyServices = createLazySection(
 *     () => import("./services-section").then(m => ({ default: m.ServicesSection }))
 *   );
 */
export function createLazySection<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallbackClassName?: string
) {
  const LazyComponent = lazy(importFn);

  return function LazySectionWrapper(props: P) {
    return (
      <LazySection className={fallbackClassName}>
        <LazyComponent {...props} />
      </LazySection>
    );
  };
}
