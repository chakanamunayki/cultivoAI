"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Locale } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Shared pieces for the motion panels in the service and project cards.
 *
 * One visual language for all of them, matching the site's soft dark cards:
 * rounded white "paper" objects with a soft shadow on a near-black survey
 * grid. Cyan means confirmed, white is data, diagonal hatching means locked,
 * pending or needs attention.
 *
 * Sizing is driven by the panel's own box (container units), because the same
 * panel renders at roughly 265x280 on a phone, 660x340 on a tablet and
 * 518x631 on desktop.
 */

export const INK = "#0c0c0c";
export const CYAN = "#00BCD4";

/** Confident arrival: fast start, long settle. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Never below 11px on a 390px-wide phone. */
export const TEXT_LABEL = "text-[length:clamp(11px,4.2cqmin,14px)]";
export const TEXT_VALUE = "text-[length:clamp(16px,6.2cqmin,24px)]";

/** A white paper surface: rounded, borderless, lifted off the ground by a soft shadow. */
export const PAPER = "rounded-2xl bg-white text-[#0c0c0c] shadow-[0_14px_30px_rgba(0,0,0,0.4)]";

/** Diagonal ink hatching for HTML elements. */
export const HATCH_INK = {
  backgroundImage:
    "repeating-linear-gradient(135deg, rgba(12,12,12,0.8) 0 1.5px, transparent 1.5px 4.5px)",
};

/**
 * The six-plot field map that recurs across the panels: a hand-jittered 4x3
 * lattice in a 240x128 box, so the plots share uneven field boundaries.
 */
export const PLOT_LATTICE = [
  [[5, 9], [82, 4], [161, 11], [235, 5]],
  [[9, 65], [77, 60], [167, 67], [231, 61]],
  [[4, 123], [87, 125], [157, 119], [236, 124]],
] as const;

const REDUCED_QUERY ="(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

/**
 * Steps through a fixed sequence of beats, one held duration per beat, and
 * loops. The clock only runs while the panel is on screen. With reduced
 * motion it does not run at all and reports the last beat, which every panel
 * designs as its held result frame.
 *
 * `durations` must be a stable (module-level) array.
 */
export function usePanelBeats(durations: readonly number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const playing = inView && !reduced;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setBeat((current) => (current + 1) % durations.length),
      durations[beat]
    );
    return () => window.clearTimeout(timer);
  }, [playing, beat, durations]);

  return {
    ref,
    beat: reduced ? durations.length - 1 : beat,
    reduced,
    playing,
  };
}

interface PanelFrameProps {
  panelRef: React.Ref<HTMLDivElement>;
  /** Read by screen readers in place of the mock UI inside. */
  label: string;
  children: React.ReactNode;
  className?: string;
}

/** The dark survey-grid ground every panel sits on. Fills the card's panel box. */
export function PanelFrame({ panelRef, label, children, className }: PanelFrameProps) {
  return (
    <div
      ref={panelRef}
      role="img"
      aria-label={label}
      className="absolute inset-0 z-[1] overflow-hidden bg-[#0c0c0c] font-grotesk text-white select-none"
      style={{ containerType: "size" }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div
        aria-hidden
        className={cn(
          "relative flex h-full w-full gap-[clamp(8px,2.6cqmin,14px)] p-[clamp(10px,4cqmin,20px)]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

const SAMPLE_LABEL: Record<Locale, string> = {
  es: "Datos de ejemplo",
  en: "Sample data",
  pt: "Dados de exemplo",
};

/** Marks every figure in a panel as illustrative. */
export function SampleTag({ locale }: { locale: Locale }) {
  return (
    <span className="shrink-0 rounded-full border border-white/25 bg-white/[0.06] px-2 py-1 font-mono text-[length:clamp(11px,3.4cqmin,12px)] leading-none whitespace-nowrap text-white/75 uppercase">
      {SAMPLE_LABEL[locale]}
    </span>
  );
}

export type MarkState = "empty" | "ok" | "flag";

/** A small square: empty until dealt with, cyan when confirmed, hatched when open or needing attention. */
export function Mark({
  state,
  withCheck,
  delay = 0,
  instant,
  className,
}: {
  state: MarkState;
  withCheck?: boolean;
  delay?: number;
  /** Skip the crossfade (reduced motion). */
  instant: boolean;
  className?: string;
}) {
  const transition = instant ? { duration: 0 } : { duration: 0.2, delay };
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-[4px] bg-white", className)}>
      <span className="absolute inset-0 rounded-[4px] border-[1.5px] border-[#0c0c0c]/40" />
      <motion.span
        className="absolute inset-0 flex items-center justify-center bg-[#00BCD4]"
        initial={false}
        animate={{ opacity: state === "ok" ? 1 : 0 }}
        transition={transition}
      >
        {withCheck && <Check className="h-full w-full p-px" strokeWidth={3.5} color={INK} />}
      </motion.span>
      <motion.span
        className="absolute inset-0"
        style={HATCH_INK}
        initial={false}
        animate={{ opacity: state === "flag" ? 1 : 0 }}
        transition={transition}
      />
    </span>
  );
}

/** The strip at the top of a panel: a live dot, a title, and an optional tag on the right. */
export function PanelHeader({
  title,
  pulsing,
  children,
}: {
  title: string;
  /** Dot blinks while the sequence is still coming in, and holds steady once it is done. */
  pulsing: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <motion.span
          className="h-2 w-2 shrink-0 rounded-full bg-[#00BCD4]"
          initial={false}
          animate={pulsing ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
          transition={pulsing ? { duration: 1.2, repeat: Infinity } : { duration: 0 }}
        />
        <span className={cn("truncate font-semibold tracking-[0.08em] text-white/90 uppercase", TEXT_LABEL)}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
