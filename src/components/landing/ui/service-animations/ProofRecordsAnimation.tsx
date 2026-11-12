"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Locale } from "@/content/types";
import { cn } from "@/lib/utils";
import {
  CYAN,
  EASE_OUT,
  INK,
  Mark,
  type MarkState,
  PanelFrame,
  PanelHeader,
  PAPER,
  SampleTag,
  TEXT_LABEL,
  TEXT_VALUE,
  usePanelBeats,
} from "./panel-kit";

/**
 * Proof and records: a survival count comes in from the field.
 *
 * A monitor walks six plots. Each plot's planted seedlings resolve into alive
 * (cyan) or dead (hollow), one plot comes back low and is hatched for
 * replanting, then the visit is signed off with who, when, GPS and photo.
 * All figures are illustrative and tagged as sample data.
 */

const COPY: Record<
  Locale,
  {
    aria: string;
    visit: string;
    waiting: string;
    of: string;
    alive: string;
    replant: string;
    summary: string;
    stamp: string;
    checks: [string, string, string, string];
  }
> = {
  es: {
    aria: "Animación de ejemplo: el conteo de supervivencia llega del campo parcela por parcela, una parcela con baja supervivencia queda marcada para resiembra y la visita queda registrada con quién, cuándo, GPS y foto.",
    visit: "Visita 014",
    waiting: "Esperando el conteo",
    of: "de",
    alive: "vivos",
    replant: "Resiembra",
    summary: "6 parcelas · 1 a resiembra",
    stamp: "Registrado",
    checks: ["Quién", "Cuándo", "GPS", "Foto"],
  },
  en: {
    aria: "Sample animation: a survival count comes in from the field plot by plot, one plot with low survival is flagged for replanting, and the visit goes on record with who, when, GPS and photo.",
    visit: "Visit 014",
    waiting: "Waiting for the count",
    of: "of",
    alive: "alive",
    replant: "Replant",
    summary: "6 plots · 1 to replant",
    stamp: "On record",
    checks: ["Who", "When", "GPS", "Photo"],
  },
  pt: {
    aria: "Animação de exemplo: a contagem de sobrevivência chega do campo parcela por parcela, uma parcela com baixa sobrevivência é marcada para replantio e a visita fica registrada com quem, quando, GPS e foto.",
    visit: "Visita 014",
    waiting: "Aguardando a contagem",
    of: "de",
    alive: "vivos",
    replant: "Replantio",
    summary: "6 parcelas · 1 a replantar",
    stamp: "Registrado",
    checks: ["Quem", "Quando", "GPS", "Foto"],
  },
};

// Beat 0: empty map. Beats 1 to 6: one plot's count arrives. Beat 7: signed off and held.
const BEATS = [700, 900, 900, 900, 1500, 900, 900, 3400] as const;
const LAST_BEAT = BEATS.length - 1;

type Pt = readonly [number, number];
type Quad = readonly [Pt, Pt, Pt, Pt]; // top-left, top-right, bottom-right, bottom-left

const MAP_W = 240;
const MAP_H = 128;
const PLANTED = 20;
const ROWS = 4;
const COLS = 5;

// A hand-jittered 4x3 lattice, so the six plots share uneven field boundaries.
const L = [
  [[5, 9], [82, 4], [161, 11], [235, 5]],
  [[9, 65], [77, 60], [167, 67], [231, 61]],
  [[4, 123], [87, 125], [157, 119], [236, 124]],
] as const;

const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Point inside a quad, u across and v down, both 0 to 1. */
const at = (q: Quad, u: number, v: number): Pt => lerp(lerp(q[0], q[1], u), lerp(q[3], q[2], u), v);

/** Pull the corners toward the centre so neighbouring plots leave a track between them. */
function inset(q: Quad): Quad {
  const centre = at(q, 0.5, 0.5);
  const pull = (p: Pt) => lerp(p, centre, 0.07);
  return [pull(q[0]), pull(q[1]), pull(q[2]), pull(q[3])];
}

function buildPlot(id: string, corners: Quad, dead: readonly number[]) {
  const quad = inset(corners);
  const rows: Pt[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: Pt[] = [];
    for (let c = 0; c < COLS; c++) {
      row.push(at(quad, 0.14 + c * 0.18, 0.37 + r * 0.165));
    }
    rows.push(row);
  }
  const alive = PLANTED - dead.length;
  return {
    id,
    points: quad.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" "),
    label: at(quad, 0.07, 0.25),
    pin: at(quad, 0.88, 0.25),
    rows,
    dead: new Set(dead),
    alive,
    low: alive < PLANTED / 2,
  };
}

// Numbered in the order the monitor walks them: along the top, back along the bottom.
const PLOTS = [
  buildPlot("P1", [L[0][0], L[0][1], L[1][1], L[1][0]], [13]),
  buildPlot("P2", [L[0][1], L[0][2], L[1][2], L[1][1]], [3, 11, 16]),
  buildPlot("P3", [L[0][2], L[0][3], L[1][3], L[1][2]], [6, 19]),
  buildPlot("P4", [L[1][2], L[1][3], L[2][3], L[2][2]], [0, 2, 3, 5, 7, 8, 11, 12, 14, 16, 19]),
  buildPlot("P5", [L[1][1], L[1][2], L[2][2], L[2][1]], [1, 9, 10, 17]),
  buildPlot("P6", [L[1][0], L[1][1], L[2][1], L[2][0]], [4, 15]),
];

export function ProofRecordsAnimation({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale] ?? COPY.en;
  const { ref, beat, reduced, playing } = usePanelBeats(BEATS);
  const hatchId = useId();

  const counted = Math.min(beat, PLOTS.length);
  const current = beat >= 1 && beat <= PLOTS.length ? PLOTS[beat - 1] : undefined;
  const done = beat === LAST_BEAT;
  const pinPlot = PLOTS[Math.max(0, counted - 1)];
  const stateOf = (index: number): MarkState =>
    index < counted ? (PLOTS[index]?.low ? "flag" : "ok") : "empty";

  const tween = (duration: number, delay = 0) =>
    reduced ? { duration: 0 } : { duration, delay, ease: EASE_OUT };

  return (
    <PanelFrame
      panelRef={ref}
      label={t.aria}
      className="flex-col [@container(min-aspect-ratio:8/5)]:flex-row"
    >
      {/* Header and plot map */}
      <div className="flex min-w-0 flex-none flex-col justify-center gap-[clamp(8px,2.6cqmin,14px)] [@container(min-aspect-ratio:8/5)]:flex-[1.35]">
        <PanelHeader title={t.visit} pulsing={playing && !done}>
          <SampleTag locale={locale} />
        </PanelHeader>

        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="block h-auto w-full overflow-visible">
          <defs>
            <pattern
              id={hatchId}
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="1.6" height="6" fill="rgba(255,255,255,0.3)" />
            </pattern>
          </defs>

          {PLOTS.map((plot, index) => {
            const isCounted = index < counted;
            return (
              <g key={plot.id}>
                <polygon
                  points={plot.points}
                  fill="#191919"
                  stroke="#191919"
                  strokeWidth={3}
                  strokeLinejoin="round"
                />
                <motion.polygon
                  points={plot.points}
                  fill={plot.low ? `url(#${hatchId})` : CYAN}
                  stroke={plot.low ? "none" : CYAN}
                  strokeWidth={3}
                  strokeLinejoin="round"
                  initial={false}
                  animate={{ opacity: isCounted ? (plot.low ? 1 : 0.18) : 0 }}
                  transition={tween(0.4)}
                />
                <motion.polygon
                  points={plot.points}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={1}
                  strokeLinejoin="round"
                  initial={false}
                  animate={{ opacity: isCounted ? 0.9 : 0.3 }}
                  transition={tween(0.3)}
                />
                <text
                  x={plot.label[0]}
                  y={plot.label[1]}
                  className="font-mono"
                  fontSize="11"
                  fontWeight="600"
                  fill="#ffffff"
                >
                  {plot.id}
                </text>

                {/* Planted positions, before the count */}
                <motion.g
                  initial={false}
                  animate={{ opacity: isCounted ? 0 : 1 }}
                  transition={tween(0.2)}
                >
                  {plot.rows.flat().map((p, i) => (
                    <circle key={i} cx={p[0]} cy={p[1]} r={1.3} fill="rgba(255,255,255,0.4)" />
                  ))}
                </motion.g>

                {/* The count, resolving row by row */}
                {plot.rows.map((row, r) => (
                  <motion.g
                    key={r}
                    initial={false}
                    animate={{ opacity: isCounted ? 1 : 0 }}
                    transition={tween(0.18, isCounted ? 0.12 + r * 0.1 : 0)}
                  >
                    {row.map((p, c) =>
                      plot.dead.has(r * COLS + c) ? (
                        <circle
                          key={c}
                          cx={p[0]}
                          cy={p[1]}
                          r={2.2}
                          fill="#191919"
                          stroke="rgba(255,255,255,0.65)"
                          strokeWidth={0.9}
                        />
                      ) : (
                        <circle key={c} cx={p[0]} cy={p[1]} r={2.8} fill={CYAN} />
                      )
                    )}
                  </motion.g>
                ))}
              </g>
            );
          })}

          {/* Where the monitor is, walking plot to plot */}
          {pinPlot && (
            <motion.g
              initial={false}
              animate={{ x: pinPlot.pin[0], y: pinPlot.pin[1], opacity: counted === 0 ? 0 : 1 }}
              transition={tween(0.55)}
            >
              <path
                d="M0 0 L-5.2 -8.4 A6.2 6.2 0 1 1 5.2 -8.4 Z"
                fill="#ffffff"
                stroke={INK}
                strokeWidth={1.2}
                strokeLinejoin="round"
              />
              <circle cy={-11.6} r={2.3} fill={INK} />
            </motion.g>
          )}
        </svg>
      </div>

      {/* The record slip */}
      <div
        className={cn(
          "relative flex min-h-0 min-w-0 flex-1 flex-col justify-between p-[clamp(10px,3.4cqmin,16px)] [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:pt-8",
          PAPER
        )}
      >
        <motion.div
          key={beat}
          className="flex h-[clamp(22px,8cqmin,30px)] items-center justify-between gap-2"
          initial={reduced ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tween(0.3)}
        >
          {current ? (
            <>
              <span className="flex min-w-0 items-baseline gap-1.5 whitespace-nowrap">
                <span
                  className={cn(
                    "rounded-[5px] bg-[#0c0c0c] px-1.5 py-px font-mono font-semibold text-white",
                    TEXT_LABEL
                  )}
                >
                  {current.id}
                </span>
                <span className={cn("leading-none font-bold tabular-nums", TEXT_VALUE)}>
                  {current.alive} {t.of} {PLANTED}
                </span>
                <span className={cn("font-medium text-[#0c0c0c]/70", TEXT_LABEL)}>{t.alive}</span>
              </span>
              {current.low && (
                <span
                  className={cn(
                    "flex shrink-0 items-center gap-1 font-semibold whitespace-nowrap uppercase",
                    TEXT_LABEL
                  )}
                >
                  <Mark state="flag" instant className="h-3 w-3" />
                  {t.replant}
                </span>
              )}
            </>
          ) : (
            <span className={cn("font-semibold whitespace-nowrap", TEXT_LABEL)}>
              {done ? t.summary : t.waiting}
            </span>
          )}
        </motion.div>

        {/* Compact tally for small panels */}
        <div className="flex gap-1.5 [@container(min-height:480px)]:hidden [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:hidden">
          {PLOTS.map((plot, index) => (
            <Mark key={plot.id} state={stateOf(index)} instant={reduced} className="h-3 w-3" />
          ))}
        </div>

        {/* Full ledger where there is room */}
        <div className="hidden grid-flow-col grid-rows-3 gap-x-5 [@container(min-height:480px)]:grid [@container(min-height:600px)]:grid-rows-6 [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:grid [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:grid-rows-6">
          {PLOTS.map((plot, index) => {
            const isCounted = index < counted;
            return (
              <motion.div
                key={plot.id}
                className={cn(
                  "flex items-center justify-between gap-2 border-b border-[#0c0c0c]/10 py-[clamp(3px,1cqmin,6px)] font-mono",
                  TEXT_LABEL
                )}
                initial={false}
                animate={{ opacity: isCounted ? 1 : 0.55 }}
                transition={tween(0.3)}
              >
                <span className="font-semibold">{plot.id}</span>
                <span className="tabular-nums">
                  {isCounted ? plot.alive : "··"} {t.of} {PLANTED}
                </span>
                <Mark state={stateOf(index)} withCheck instant={reduced} className="h-4 w-4" />
              </motion.div>
            );
          })}
        </div>

        {/* Who, when, where and photo: ticked when the visit is signed off */}
        <div className="flex items-center justify-between gap-1">
          {t.checks.map((label, i) => (
            <span
              key={label}
              className={cn("flex items-center gap-1 font-mono leading-none whitespace-nowrap", TEXT_LABEL)}
            >
              <Mark
                state={done ? "ok" : "empty"}
                withCheck
                delay={done ? 0.15 + i * 0.14 : 0}
                instant={reduced}
                className="h-3.5 w-3.5"
              />
              {label}
            </span>
          ))}
        </div>

        {/* Sign-off badge: beside the tally on small panels, on the top edge of the slip where the ledger shows */}
        <motion.span
          className={cn(
            "absolute top-[calc(50%-13px)] right-2.5 flex items-center gap-1 rounded-full bg-[#00BCD4] px-2.5 py-1.5 leading-none font-bold tracking-[0.06em] text-[#0c0c0c] uppercase shadow-[0_6px_14px_rgba(0,0,0,0.22)] [@container(min-height:480px)]:-top-3.5 [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:-top-2",
            TEXT_LABEL
          )}
          initial={false}
          animate={done ? { opacity: 1, scale: 1, rotate: -4 } : { opacity: 0, scale: 1.2, rotate: -4 }}
          transition={reduced ? { duration: 0 } : { duration: 0.3, delay: done ? 0.8 : 0, ease: EASE_OUT }}
        >
          <Check className="h-[1em] w-[1em]" strokeWidth={3.5} />
          {t.stamp}
        </motion.span>
      </div>
    </PanelFrame>
  );
}
