"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MessageSquare, Zap, BarChart3, Star } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

/**
 * Growing Ecosystem Tree Animation
 *
 * A brutalist-style animated SVG tree representing business growth through AI integration.
 * - Stage 1: Seed appears with pulse
 * - Stage 2: Stem grows upward
 * - Stage 3: Main branches with service icons
 * - Stage 4: Sub-branches with results
 * - Stage 5: Success crown with glow
 * - Stage 6: Hold and loop
 *
 * Respects prefers-reduced-motion for accessibility.
 */

interface GrowingTreeProps {
  className?: string;
}

// Animation stage durations in ms
const STAGE_DURATIONS = {
  seed: 1000,
  stem: 1000,
  branches: 1500,
  results: 1500,
  crown: 1000,
  hold: 2000,
};

// Hook to detect reduced motion preference (SSR-safe)
function useReducedMotion() {
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

export function GrowingTree({ className = "" }: GrowingTreeProps) {
  const { locale } = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState(() => (prefersReducedMotion ? 5 : 0));
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Content based on locale
  const content = {
    seed: locale === "es" ? "Tu negocio" : "Your business",
    branches: {
      chatbots: locale === "es" ? "Chatbots" : "Chatbots",
      automation: locale === "es" ? "Automatizacion" : "Automation",
      dashboards: locale === "es" ? "Dashboards" : "Dashboards",
    },
    results: {
      support24: "24/7",
      happyClients: locale === "es" ? "Clientes felices" : "Happy clients",
      timeSaved: locale === "es" ? "Tiempo ahorrado" : "Time saved",
      insights: locale === "es" ? "Insights claros" : "Clear insights",
      lessWork: locale === "es" ? "Menos trabajo" : "Less work",
      moreGrowth: locale === "es" ? "Mas crecimiento" : "More growth",
    },
  };

  // Animation loop
  useEffect(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (prefersReducedMotion) {
      // Show final state for reduced motion - use timeout to avoid sync setState
      const timeout = setTimeout(() => setStage(5), 0);
      timeoutsRef.current.push(timeout);
      return () => clearTimeout(timeout);
    }

    const runAnimation = () => {
      let currentTime = 0;

      // Stage 0: Initial (seed pulse)
      timeoutsRef.current.push(setTimeout(() => setStage(0), currentTime));

      // Stage 1: Seed visible
      currentTime += STAGE_DURATIONS.seed;
      timeoutsRef.current.push(setTimeout(() => setStage(1), currentTime));

      // Stage 2: Stem grows
      currentTime += STAGE_DURATIONS.stem;
      timeoutsRef.current.push(setTimeout(() => setStage(2), currentTime));

      // Stage 3: Branches appear
      currentTime += STAGE_DURATIONS.branches;
      timeoutsRef.current.push(setTimeout(() => setStage(3), currentTime));

      // Stage 4: Results appear
      currentTime += STAGE_DURATIONS.results;
      timeoutsRef.current.push(setTimeout(() => setStage(4), currentTime));

      // Stage 5: Crown appears
      currentTime += STAGE_DURATIONS.crown;
      timeoutsRef.current.push(setTimeout(() => setStage(5), currentTime));

      // Loop back
      currentTime += STAGE_DURATIONS.hold;
      timeoutsRef.current.push(
        setTimeout(() => {
          timeoutsRef.current.forEach(clearTimeout);
          timeoutsRef.current = [];
          runAnimation();
        }, currentTime)
      );
    };

    runAnimation();

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [prefersReducedMotion]);

  // CSS classes for animation states
  const getStageClass = (minStage: number) => {
    const isVisible = stage >= minStage;

    if (prefersReducedMotion) {
      return isVisible ? "opacity-100" : "opacity-0";
    }

    return `transition-all duration-500 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;
  };

  return (
    <div
      className={`relative w-full h-full min-h-[350px] flex items-center justify-center ${className}`}
    >
      {/* Main SVG Container */}
      <svg
        viewBox="0 0 400 450"
        className="w-full h-full max-w-[400px] max-h-[450px]"
        aria-label={
          locale === "es" ? "Arbol de ecosistema creciendo" : "Growing ecosystem tree"
        }
        role="img"
      >
        {/* Definitions for gradients and filters */}
        <defs>
          {/* Glow filter for crown */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === STAGE 1: SEED === */}
        <g className={getStageClass(0)}>
          {/* Seed base - brown circle */}
          <circle
            cx="200"
            cy="400"
            r="25"
            fill="#92400e"
            stroke="#000"
            strokeWidth="3"
            className={stage === 0 && !prefersReducedMotion ? "animate-pulse" : ""}
          />
          {/* Seed label */}
          <rect
            x="145"
            y="430"
            width="110"
            height="24"
            fill="#fff"
            stroke="#000"
            strokeWidth="2"
          />
          <text
            x="200"
            y="447"
            textAnchor="middle"
            className="fill-black font-bold text-xs"
            style={{ fontFamily: "inherit" }}
          >
            {content.seed}
          </text>
        </g>

        {/* === STAGE 2: STEM === */}
        <g className={getStageClass(1)}>
          {/* Main trunk - geometric/brutalist style */}
          <rect
            x="192"
            y="200"
            width="16"
            height="200"
            fill="#059669"
            stroke="#000"
            strokeWidth="3"
          />
        </g>

        {/* === STAGE 3: MAIN BRANCHES === */}
        {/* Left Branch - Chatbots (Blue) */}
        <g className={getStageClass(2)}>
          <rect
            x="100"
            y="195"
            width="100"
            height="10"
            fill="#059669"
            stroke="#000"
            strokeWidth="2"
          />
          <rect
            x="70"
            y="145"
            width="80"
            height="55"
            fill="#3b82f6"
            stroke="#000"
            strokeWidth="3"
          />
          <foreignObject x="78" y="150" width="64" height="45">
            <div className="flex flex-col items-center justify-center h-full">
              <MessageSquare className="w-5 h-5 text-white" strokeWidth={3} />
              <span className="text-white font-bold text-[9px] mt-1 text-center leading-tight">
                {content.branches.chatbots}
              </span>
            </div>
          </foreignObject>
        </g>

        {/* Center Branch - Automation (Amber) */}
        <g className={getStageClass(2)}>
          <rect
            x="192"
            y="120"
            width="16"
            height="80"
            fill="#059669"
            stroke="#000"
            strokeWidth="2"
          />
          <rect
            x="160"
            y="65"
            width="80"
            height="55"
            fill="#f59e0b"
            stroke="#000"
            strokeWidth="3"
          />
          <foreignObject x="168" y="70" width="64" height="45">
            <div className="flex flex-col items-center justify-center h-full">
              <Zap className="w-5 h-5 text-white" strokeWidth={3} />
              <span className="text-white font-bold text-[9px] mt-1 text-center leading-tight">
                {content.branches.automation}
              </span>
            </div>
          </foreignObject>
        </g>

        {/* Right Branch - Dashboards (Purple) */}
        <g className={getStageClass(2)}>
          <rect
            x="200"
            y="195"
            width="100"
            height="10"
            fill="#059669"
            stroke="#000"
            strokeWidth="2"
          />
          <rect
            x="250"
            y="145"
            width="80"
            height="55"
            fill="#8b5cf6"
            stroke="#000"
            strokeWidth="3"
          />
          <foreignObject x="258" y="150" width="64" height="45">
            <div className="flex flex-col items-center justify-center h-full">
              <BarChart3 className="w-5 h-5 text-white" strokeWidth={3} />
              <span className="text-white font-bold text-[9px] mt-1 text-center leading-tight">
                {content.branches.dashboards}
              </span>
            </div>
          </foreignObject>
        </g>

        {/* === STAGE 4: RESULT LABELS === */}
        {/* Left side results */}
        <g className={getStageClass(3)}>
          <rect x="20" y="100" width="50" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="45" y="114" textAnchor="middle" className="fill-black font-bold text-[8px]">
            {content.results.support24}
          </text>
        </g>
        <g className={getStageClass(3)}>
          <rect x="10" y="130" width="70" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="45" y="144" textAnchor="middle" className="fill-black font-bold text-[8px]">
            {content.results.happyClients}
          </text>
        </g>

        {/* Center results */}
        <g className={getStageClass(3)}>
          <rect x="120" y="35" width="70" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="155" y="49" textAnchor="middle" className="fill-black font-bold text-[8px]">
            {content.results.timeSaved}
          </text>
        </g>
        <g className={getStageClass(3)}>
          <rect x="210" y="35" width="70" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="245" y="49" textAnchor="middle" className="fill-black font-bold text-[8px]">
            {content.results.insights}
          </text>
        </g>

        {/* Right side results */}
        <g className={getStageClass(3)}>
          <rect x="330" y="100" width="60" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="360" y="114" textAnchor="middle" className="fill-black font-bold text-[8px]">
            {content.results.lessWork}
          </text>
        </g>
        <g className={getStageClass(3)}>
          <rect x="320" y="130" width="75" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="357" y="144" textAnchor="middle" className="fill-black font-bold text-[8px]">
            {content.results.moreGrowth}
          </text>
        </g>

        {/* === STAGE 5: SUCCESS CROWN === */}
        <g
          className={getStageClass(4)}
          filter={!prefersReducedMotion && stage >= 4 ? "url(#glow)" : undefined}
        >
          <Star
            x={175}
            y={-5}
            className={`text-[#fbbf24] ${!prefersReducedMotion && stage >= 4 ? "animate-pulse" : ""}`}
            fill="#fbbf24"
            stroke="#000"
            strokeWidth={2}
            size={50}
          />
        </g>
      </svg>
    </div>
  );
}
