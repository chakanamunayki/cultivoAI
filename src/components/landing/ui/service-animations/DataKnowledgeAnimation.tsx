"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Gauge, Lock, LockOpen, Mic, NotebookPen, Sparkles, Table2 } from "lucide-react";
import type { Locale } from "@/content/types";
import { cn } from "@/lib/utils";
import {
  CYAN,
  EASE_OUT,
  HATCH_INK,
  INK,
  Mark,
  PanelFrame,
  PanelHeader,
  PLOT_LATTICE,
  SampleTag,
  TEXT_LABEL,
  usePanelBeats,
} from "./panel-kit";

/**
 * Data, knowledge and AI systems: scattered to sorted.
 *
 * A voice note, a notebook photo, a spreadsheet row and a sensor reading drop
 * in as a loose pile, then snap into one ordered record. The notebook page is
 * the protocol, and a lock closes on it. Then someone asks one plain question
 * and the AI answers it from the open rows: the plot that came back low in the
 * Proof and records panel. Figures are illustrative and tagged as sample data.
 */

const COPY: Record<
  Locale,
  {
    aria: string;
    title: string;
    /** Where each row came from, in record order. */
    sources: [string, string, string, string];
    protocol: string;
    /** What the voice note, the spreadsheet row and the sensor each say. */
    facts: [string, string, string];
    question: string;
  }
> = {
  es: {
    aria: "Animación de ejemplo: una nota de voz, una foto de cuaderno, una fila de hoja de cálculo y una lectura de sensor llegan desordenadas y se ordenan en un solo registro. El protocolo queda bajo llave. Al final alguien pregunta qué parcelas necesitan resiembra y la IA responde con esos datos: la parcela P4.",
    title: "Un solo lugar",
    sources: ["Foto de cuaderno", "Nota de voz", "Hoja de cálculo", "Sensor"],
    protocol: "Protocolo",
    facts: ["Plántulas secas", "9 de 20 vivos", "Suelo seco"],
    question: "¿Qué parcelas necesitan resiembra?",
  },
  en: {
    aria: "Sample animation: a voice note, a notebook photo, a spreadsheet row and a sensor reading arrive scattered and are sorted into one record. The protocol is locked. At the end someone asks which plots need replanting and the AI answers from those rows: plot P4.",
    title: "One place",
    sources: ["Notebook photo", "Voice note", "Spreadsheet", "Sensor"],
    protocol: "Protocol",
    facts: ["Dry seedlings", "9 of 20 alive", "Dry soil"],
    question: "Which plots need replanting?",
  },
  pt: {
    aria: "Animação de exemplo: uma nota de voz, uma foto de caderno, uma linha de planilha e uma leitura de sensor chegam desordenadas e são organizadas em um só registro. O protocolo fica trancado. No fim alguém pergunta quais parcelas precisam de replantio e a IA responde com esses dados: a parcela P4.",
    title: "Um só lugar",
    sources: ["Foto de caderno", "Nota de voz", "Planilha", "Sensor"],
    protocol: "Protocolo",
    facts: ["Mudas secas", "9 de 20 vivos", "Solo seco"],
    question: "Quais parcelas precisam de replantio?",
  },
};

// Beat 0: an empty record. Beat 1: the four sources drop in as a loose pile. Beat 2: they snap
// into order. Beat 3: the lock closes on the protocol. Beat 4: the question is typed.
// Beat 5: the AI reads the open rows. Beat 6: the answer, held.
const BEATS = [600, 1600, 1400, 1000, 1500, 1200, 3400] as const;
const LAST_BEAT = BEATS.length - 1;

type Kind = "notebook" | "voice" | "sheet" | "sensor";

// In record order. `drop` is the order they fall in; x, y and tilt are how each lies in the
// pile, as percentages of its own box so the pile holds at every panel size.
const ROWS: ReadonlyArray<{
  kind: Kind;
  Icon: typeof Mic;
  drop: number;
  x: number;
  y: number;
  tilt: number;
}> = [
  { kind: "notebook", Icon: NotebookPen, drop: 1, x: 12, y: 46, tilt: 6 },
  { kind: "voice", Icon: Mic, drop: 0, x: -12, y: 14, tilt: -7 },
  { kind: "sheet", Icon: Table2, drop: 2, x: 11, y: -6, tilt: -3 },
  { kind: "sensor", Icon: Gauge, drop: 3, x: -10, y: -24, tilt: 8 },
];

const PILE_SCALE = 0.76;
const ANSWER_PLOT = "P4";

// Seconds.
const DROP_STEP = 0.28;
const SORT_STEP = 0.16;
const TYPE_START = 0.15;
const TYPE_STEP = 0.028;
const READ_STEP = 0.22;
// When the sequence loops, everything fades out in place before it resets.
const FADE = 0.3;

type Pt = readonly [number, number];
const L = PLOT_LATTICE;

/** The six plots of the recurring field map, each pulled in a little so tracks show between them. */
const MAP_PLOTS = (
  [
    ["P1", [L[0][0], L[0][1], L[1][1], L[1][0]]],
    ["P2", [L[0][1], L[0][2], L[1][2], L[1][1]]],
    ["P3", [L[0][2], L[0][3], L[1][3], L[1][2]]],
    ["P4", [L[1][2], L[1][3], L[2][3], L[2][2]]],
    ["P5", [L[1][1], L[1][2], L[2][2], L[2][1]]],
    ["P6", [L[1][0], L[1][1], L[2][1], L[2][0]]],
  ] as ReadonlyArray<readonly [string, readonly Pt[]]>
).map(([id, corners]) => {
  const cx = corners.reduce((sum, p) => sum + p[0], 0) / corners.length;
  const cy = corners.reduce((sum, p) => sum + p[1], 0) / corners.length;
  const points = corners
    .map(
      (p) => `${(p[0] + (cx - p[0]) * 0.09).toFixed(1)},${(p[1] + (cy - p[1]) * 0.09).toFixed(1)}`
    )
    .join(" ");
  return { id, points };
});

const WAVE = [2, 5, 3, 6.5, 4, 2, 5.5, 3, 6, 2.5, 4.5, 2, 3.5, 1.5] as const;

/** A source as it arrives: sound, handwriting, cells, a sensor trace. Not yet anything you can query. */
function Raw({ kind }: { kind: Kind }) {
  const line = {
    fill: "none",
    stroke: INK,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg
      viewBox="0 0 72 16"
      className="block aspect-[72/16] h-[clamp(12px,5cqmin,22px)] max-w-full"
      preserveAspectRatio="xMinYMid meet"
    >
      {kind === "voice" &&
        WAVE.map((h, i) => (
          <path key={i} d={`M${2.5 + i * 5} ${8 - h} V${8 + h}`} {...line} strokeWidth={2.2} />
        ))}
      {kind === "notebook" && (
        <>
          <path d="M2 5 q3.5 -4 7 0 t7 0 t7 0 t7 0 t7 0 t7 0 t7 0 t7 0 t7 0" {...line} />
          <path d="M2 12.5 q3.5 -4 7 0 t7 0 t7 0 t7 0 t7 0 t7 0" {...line} />
        </>
      )}
      {kind === "sheet" && (
        <>
          <rect x="1" y="2" width="70" height="12" rx="2" {...line} />
          <path d="M19 2 V14 M37 2 V14 M54 2 V14" {...line} />
          <path
            d="M5 8 H14 M23 8 H32 M41 8 H49 M58 8 H66"
            {...line}
            strokeWidth={2.2}
            opacity={0.35}
          />
        </>
      )}
      {kind === "sensor" && <path d="M2 11 L11 9 L19 12 L29 6 L37 8 L47 3 L57 9 L70 5" {...line} />}
    </svg>
  );
}

const ROW_SHAPE = "rounded-[clamp(8px,2.6cqmin,12px)]";
const ICON_BOX =
  "flex h-[clamp(16px,6cqmin,28px)] w-[clamp(16px,6cqmin,28px)] shrink-0 items-center justify-center";
const END_MARK = "h-[clamp(14px,4.8cqmin,20px)] w-[clamp(14px,4.8cqmin,20px)]";
const TEXT_FACT = "text-[length:clamp(11px,4.4cqmin,16px)]";
// Where there is room, each row also says where it came from.
const SOURCE_LABEL =
  "hidden font-mono text-[length:clamp(11px,3.2cqmin,12px)] leading-none text-[#0c0c0c]/60 uppercase [@container(min-height:480px)]:block [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:block";

export function DataKnowledgeAnimation({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale] ?? COPY.en;
  const { ref, beat, reduced, playing } = usePanelBeats(BEATS);
  const hatchId = useId();

  const done = beat === LAST_BEAT;
  const away = beat === 0;
  const sorted = beat >= 2;
  const locked = beat >= 3;
  const asked = beat >= 4;
  const reading = beat >= 5;
  const questionChars = Array.from(t.question);

  const tween = (duration: number, delay = 0) =>
    reduced ? { duration: 0 } : { duration, delay, ease: EASE_OUT };
  // Used for whatever sits inside something that is fading out as the sequence loops.
  const afterFade = { duration: 0, delay: reduced || !away ? 0 : FADE };

  return (
    <PanelFrame panelRef={ref} label={t.aria} className="flex-col">
      <PanelHeader title={t.title} pulsing={playing && !done}>
        <SampleTag locale={locale} />
      </PanelHeader>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-[clamp(8px,2.6cqmin,14px)] [@container(min-aspect-ratio:8/5)]:flex-row [@container(min-aspect-ratio:8/5)]:items-center [@container(min-aspect-ratio:8/5)]:gap-[clamp(12px,3cqw,24px)]">
        {/* The record: one ordered place, part of the system */}
        <div className="flex max-h-full min-h-0 min-w-0 flex-col gap-[clamp(4px,1.5cqmin,8px)] rounded-2xl border border-white/15 bg-white/[0.05] p-[clamp(6px,2.2cqmin,12px)] [@container(min-aspect-ratio:8/5)]:flex-[1.25]">
          {ROWS.map((row, index) => {
            const isProtocol = row.kind === "notebook";
            const fact = isProtocol ? t.protocol : t.facts[index - 1];
            const cited = reading && !isProtocol;
            return (
              <div key={row.kind} className="relative h-[clamp(26px,16cqmin,76px)] min-h-0 shrink">
                {/* The empty slot, until its row is in */}
                <motion.span
                  className={cn("absolute inset-0 border border-dashed border-white/25", ROW_SHAPE)}
                  initial={false}
                  animate={{ opacity: sorted ? 0 : 1 }}
                  transition={tween(0.3, sorted ? index * SORT_STEP + 0.2 : 0)}
                />

                <motion.div
                  className={cn(
                    "absolute inset-0 z-10 flex items-center gap-[clamp(5px,1.8cqmin,10px)] bg-white px-[clamp(6px,2.2cqmin,12px)] text-[#0c0c0c] shadow-[0_8px_18px_rgba(0,0,0,0.4)] ring-1 ring-black/5",
                    ROW_SHAPE
                  )}
                  initial={false}
                  animate={
                    sorted
                      ? { opacity: 1, x: "0%", y: "0%", rotate: 0, scale: 1 }
                      : away
                        ? {
                            opacity: 0,
                            x: `${row.x}%`,
                            y: `${row.y - 130}%`,
                            rotate: row.tilt - 8,
                            scale: PILE_SCALE,
                          }
                        : {
                            opacity: 1,
                            x: `${row.x}%`,
                            y: `${row.y}%`,
                            rotate: row.tilt,
                            scale: PILE_SCALE,
                          }
                  }
                  transition={
                    reduced
                      ? { duration: 0 }
                      : sorted
                        ? { duration: 0.55, delay: index * SORT_STEP, ease: EASE_OUT }
                        : away
                          ? // Looping back: fade out in place, then reset out of sight.
                            { opacity: { duration: FADE }, default: { duration: 0, delay: FADE } }
                          : { duration: 0.45, delay: row.drop * DROP_STEP, ease: EASE_OUT }
                  }
                >
                  {/* What it is: a photo is a dark tile, the rest are plain marks */}
                  <span
                    className={cn(
                      ICON_BOX,
                      isProtocol && "rounded-[clamp(4px,1.4cqmin,6px)] bg-[#0c0c0c] text-white"
                    )}
                  >
                    <row.Icon
                      className={isProtocol ? "h-[68%] w-[68%]" : "h-[88%] w-[88%]"}
                      strokeWidth={2.2}
                    />
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col justify-center gap-[clamp(3px,1cqmin,6px)]">
                    <span className={SOURCE_LABEL}>{t.sources[index]}</span>
                    <span className="grid items-center">
                      {/* As it arrived */}
                      <motion.span
                        className="col-start-1 row-start-1 flex items-center"
                        initial={false}
                        animate={{ opacity: sorted ? 0 : 1 }}
                        transition={sorted ? tween(0.2, index * SORT_STEP + 0.1) : afterFade}
                      >
                        <Raw kind={row.kind} />
                      </motion.span>
                      {/* As a row of the record */}
                      <motion.span
                        className="col-start-1 row-start-1 flex min-w-0 items-center gap-[clamp(5px,1.8cqmin,9px)] whitespace-nowrap"
                        initial={false}
                        animate={{ opacity: sorted ? 1 : 0 }}
                        transition={sorted ? tween(0.3, index * SORT_STEP + 0.3) : afterFade}
                      >
                        {!isProtocol && (
                          <span
                            className={cn(
                              "rounded-[5px] bg-[#0c0c0c] px-1.5 py-px font-mono leading-[1.3] font-semibold text-white",
                              TEXT_LABEL
                            )}
                          >
                            {ANSWER_PLOT}
                          </span>
                        )}
                        <span className={cn("leading-none font-semibold", TEXT_FACT)}>{fact}</span>
                        {isProtocol && (
                          <span className="relative h-[clamp(10px,3.8cqmin,16px)] min-w-0 flex-1 overflow-hidden rounded-[4px]">
                            {/* Readable lines, until the lock closes */}
                            <span className="absolute inset-0 flex flex-col justify-between py-px">
                              <span className="block h-[3px] rounded-full bg-[#0c0c0c]/25" />
                              <span className="block h-[3px] w-[70%] rounded-full bg-[#0c0c0c]/25" />
                            </span>
                            <motion.span
                              className="absolute inset-0 rounded-[4px] bg-white"
                              initial={false}
                              animate={{ opacity: locked ? 1 : 0 }}
                              transition={locked ? tween(0.3) : afterFade}
                            >
                              <span
                                className="absolute inset-0 rounded-[4px] bg-[#0c0c0c]/[0.06]"
                                style={HATCH_INK}
                              />
                            </motion.span>
                          </span>
                        )}
                      </motion.span>
                    </span>
                  </span>

                  {isProtocol ? (
                    // The lock: open when the protocol lands, closed a beat later
                    <motion.span
                      className={cn("relative block shrink-0", END_MARK)}
                      initial={false}
                      animate={{ opacity: sorted ? 1 : 0 }}
                      transition={sorted ? tween(0.3, index * SORT_STEP + 0.3) : afterFade}
                    >
                      <motion.span
                        className="absolute inset-0 flex items-center justify-center text-[#0c0c0c]/60"
                        initial={false}
                        animate={{ opacity: locked ? 0 : 1 }}
                        transition={locked ? tween(0.15) : afterFade}
                      >
                        <LockOpen className="h-[82%] w-[82%]" strokeWidth={2.4} />
                      </motion.span>
                      <motion.span
                        className="absolute -inset-[12%] flex items-center justify-center rounded-full bg-[#00BCD4] text-[#0c0c0c]"
                        initial={false}
                        animate={
                          locked
                            ? { opacity: 1, scale: beat === 3 && !reduced ? [0.6, 1.25, 1] : 1 }
                            : { opacity: 0, scale: 1 }
                        }
                        transition={
                          locked && beat === 3 && !reduced
                            ? { duration: 0.45, delay: 0.1 }
                            : locked
                              ? { duration: 0 }
                              : afterFade
                        }
                      >
                        <Lock className="h-[62%] w-[62%]" strokeWidth={2.6} />
                      </motion.span>
                    </motion.span>
                  ) : (
                    // Ticked when the AI has read this row for its answer
                    <motion.span
                      className="shrink-0"
                      initial={false}
                      animate={{ opacity: cited ? 1 : 0 }}
                      transition={cited ? tween(0.25, 0.2 + (index - 1) * READ_STEP) : afterFade}
                    >
                      <Mark state="ok" withCheck instant className={END_MARK} />
                    </motion.span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* One plain question, answered from the rows above */}
        <div className="flex min-w-0 shrink-0 flex-col gap-[clamp(6px,2cqmin,10px)] [@container(min-aspect-ratio:8/5)]:flex-1">
          <motion.div
            className="pt-[5px]"
            initial={false}
            animate={asked ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={
              reduced
                ? { duration: 0 }
                : asked
                  ? { duration: 0.3, ease: EASE_OUT }
                  : { opacity: { duration: FADE }, default: { duration: 0, delay: FADE } }
            }
          >
            <div className="relative rounded-2xl bg-white px-[clamp(10px,3.4cqmin,16px)] py-[clamp(7px,2.4cqmin,12px)] text-[#0c0c0c] shadow-[0_8px_18px_rgba(0,0,0,0.3)]">
              {/* Speech tail: a person is asking */}
              <span className="absolute -top-[5px] right-6 block h-3 w-3 rotate-45 rounded-[2px] bg-inherit" />
              <span className="relative block text-[length:clamp(12px,4.6cqmin,17px)] leading-[1.15] font-semibold text-balance">
                {questionChars.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={false}
                    animate={{ opacity: asked ? 1 : 0 }}
                    transition={
                      asked && !reduced
                        ? { duration: 0.01, delay: TYPE_START + i * TYPE_STEP }
                        : afterFade
                    }
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </div>
          </motion.div>

          {/* The answer, from the system */}
          <motion.div
            className="flex items-center gap-[clamp(7px,2.4cqmin,12px)] rounded-2xl border border-white/15 bg-white/[0.05] px-[clamp(8px,2.8cqmin,14px)] py-[clamp(6px,2cqmin,10px)]"
            initial={false}
            animate={reading ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={
              reduced
                ? { duration: 0 }
                : reading
                  ? { duration: 0.3, ease: EASE_OUT }
                  : { opacity: { duration: FADE }, default: { duration: 0, delay: FADE } }
            }
          >
            <motion.span
              className="flex h-[clamp(20px,7cqmin,30px)] w-[clamp(20px,7cqmin,30px)] shrink-0 items-center justify-center rounded-full bg-[#00BCD4] text-[#0c0c0c]"
              initial={false}
              animate={playing && beat === 5 ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
              transition={
                playing && beat === 5 ? { duration: 0.8, repeat: Infinity } : { duration: 0 }
              }
            >
              <Sparkles className="h-[66%] w-[66%]" strokeWidth={2.4} />
            </motion.span>

            <span className="grid items-center">
              {/* Still reading */}
              <motion.span
                className="col-start-1 row-start-1 flex items-center gap-[clamp(3px,1cqmin,5px)]"
                initial={false}
                animate={{ opacity: done ? 0 : 1 }}
                transition={done ? tween(0.15) : afterFade}
              >
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="block h-[clamp(4px,1.4cqmin,6px)] w-[clamp(4px,1.4cqmin,6px)] rounded-full bg-white/45"
                  />
                ))}
              </motion.span>
              <motion.span
                className="col-start-1 row-start-1 font-mono text-[length:clamp(18px,7cqmin,28px)] leading-none font-bold text-white"
                initial={false}
                animate={{ opacity: done ? 1 : 0 }}
                transition={done ? tween(0.3, 0.15) : afterFade}
              >
                {ANSWER_PLOT}
              </motion.span>
            </span>

            {/* The rows the answer came from, by their own marks */}
            <motion.span
              className="flex items-center gap-[clamp(4px,1.6cqmin,8px)] text-white/70"
              initial={false}
              animate={{ opacity: done ? 1 : 0 }}
              transition={done ? tween(0.3, 0.3) : afterFade}
            >
              {ROWS.filter((row) => row.kind !== "notebook").map((row) => (
                <row.Icon
                  key={row.kind}
                  className="h-[clamp(13px,4.6cqmin,20px)] w-[clamp(13px,4.6cqmin,20px)]"
                  strokeWidth={2.2}
                />
              ))}
            </motion.span>

            {/* The same six plots as the survival count, with the answer hatched */}
            <svg
              viewBox="0 0 240 128"
              className="ml-auto block h-auto w-[clamp(54px,20cqmin,110px)] shrink-0 overflow-visible"
            >
              <defs>
                <pattern
                  id={hatchId}
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <rect width="5" height="16" fill="rgba(255,255,255,0.6)" />
                </pattern>
              </defs>
              {MAP_PLOTS.map((plot) => {
                const isAnswer = plot.id === ANSWER_PLOT;
                return (
                  <g key={plot.id}>
                    <polygon points={plot.points} fill="#191919" />
                    <motion.polygon
                      points={plot.points}
                      fill={isAnswer ? `url(#${hatchId})` : CYAN}
                      initial={false}
                      animate={{ opacity: done ? (isAnswer ? 1 : 0.3) : 0 }}
                      transition={done ? tween(0.35, isAnswer ? 0.35 : 0.15) : afterFade}
                    />
                    <polygon
                      points={plot.points}
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity={isAnswer ? 1 : 0.7}
                      strokeWidth={1}
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>
      </div>
    </PanelFrame>
  );
}
