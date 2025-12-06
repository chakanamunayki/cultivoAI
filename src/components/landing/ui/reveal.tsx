"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

// Custom hook to check for prefers-reduced-motion using useSyncExternalStore
function usePrefersReducedMotion(): boolean {
  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        // Hint to browser for GPU acceleration
        willChange: isVisible ? "auto" : "transform, opacity",
      }}
      className={`transition-[transform,opacity] duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
}
