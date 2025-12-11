"use client";

import { useEffect, useState } from "react";

// ============================================
// Types
// ============================================

interface VoiceMicLevelProps {
  level: number; // 0-100
  locale: "es" | "en";
}

// ============================================
// Constants
// ============================================

const LABELS = {
  es: "NIVEL DE VOZ",
  en: "VOICE LEVEL",
};

// ============================================
// Main Component
// ============================================

/**
 * Voice Input Level Indicator - Brutalist Design
 *
 * Shows real-time microphone input level with color-coded feedback:
 * - Green (40-80%): Good level
 * - Yellow (<40%): Too quiet
 * - Red (>80%): Clipping/too loud
 */
export function VoiceMicLevel({ level, locale }: VoiceMicLevelProps) {
  const [smoothedLevel, setSmoothedLevel] = useState(0);

  // Smooth level changes with exponential moving average (on animation frame)
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setSmoothedLevel((prev) => prev * 0.7 + level * 0.3);
    });
    return () => cancelAnimationFrame(rafId);
  }, [level]);

  // Determine color based on level
  const getColor = (): string => {
    if (smoothedLevel >= 80) return "#EF4444"; // Red - clipping
    if (smoothedLevel <= 40) return "#FFDE00"; // Yellow - too quiet
    return "#10B981"; // Green - good
  };

  // Determine background color (lighter shade)
  const getBgColor = (): string => {
    if (smoothedLevel >= 80) return "#FEE2E2"; // Light red
    if (smoothedLevel <= 40) return "#FEF3C7"; // Light yellow
    return "#C4F9E0"; // Light green
  };

  const color = getColor();
  const bgColor = getBgColor();

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-[200px]">
      {/* Label */}
      <div className="text-white text-xs font-bold uppercase tracking-wider">
        {LABELS[locale]}
      </div>

      {/* Level meter container - vertical bar */}
      <div className="relative w-12 h-48 bg-[#F3F4F6] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Background gradient marks (visual guides) */}
        <div className="absolute inset-0 flex flex-col justify-between p-1 pointer-events-none">
          {/* 80% mark (red zone start) */}
          <div className="h-[1px] w-full bg-black/20" />
          {/* 40% mark (yellow zone start) */}
          <div className="h-[1px] w-full bg-black/20" />
          <div className="h-[1px] w-full bg-black/20" />
        </div>

        {/* Filled level bar (grows from bottom) */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-100 border-t-2 border-black"
          style={{
            height: `${smoothedLevel}%`,
            backgroundColor: color,
          }}
        />

        {/* Percentage indicator overlay (floats at top of fill) */}
        {smoothedLevel > 5 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 transition-all duration-100 text-[10px] font-bold text-black px-1"
            style={{
              bottom: `${Math.max(smoothedLevel - 5, 0)}%`,
            }}
          >
            {Math.round(smoothedLevel)}%
          </div>
        )}
      </div>

      {/* Status label */}
      <div
        className="px-3 py-1 border-2 border-black text-xs font-bold uppercase transition-all duration-300"
        style={{
          backgroundColor: bgColor,
          color: "#000000",
        }}
      >
        {smoothedLevel >= 80
          ? locale === "es"
            ? "MUY ALTO"
            : "TOO LOUD"
          : smoothedLevel <= 40
          ? locale === "es"
            ? "MUY BAJO"
            : "TOO QUIET"
          : locale === "es"
          ? "BUENO"
          : "GOOD"}
      </div>
    </div>
  );
}
