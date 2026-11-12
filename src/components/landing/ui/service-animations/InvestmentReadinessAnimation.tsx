"use client";

import { useId } from "react";
import { motion } from "framer-motion";
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
  usePanelBeats,
} from "./panel-kit";

/**
 * Startup and investment readiness: hard questions, answered.
 *
 * An investor asks three questions. Each one is open (hatched) until the
 * matching sheet of the pack lands: the model, the numbers, the story. When
 * all three are down the sheets square up and the last thing said is yes.
 * There are no figures anywhere in this panel.
 */

const COPY: Record<
  Locale,
  {
    aria: string;
    meeting: string;
    questions: [string, string, string];
    yes: string;
    sheets: [string, string, string];
  }
> = {
  es: {
    aria: "Animación de ejemplo: un inversor hace tres preguntas difíciles y cada una se responde con una hoja del paquete: el modelo, los números y la historia. Al final el inversor dice que sí.",
    meeting: "Reunión con inversores",
    questions: ["¿Cómo gana dinero?", "¿Cuánto cuesta una hectárea?", "¿Hasta dónde puede crecer?"],
    yes: "Sí. Cuenta conmigo.",
    sheets: ["Modelo", "Números", "Historia"],
  },
  en: {
    aria: "Sample animation: an investor asks three hard questions and each one is answered by a sheet of the pack: the model, the numbers and the story. At the end the investor says yes.",
    meeting: "Investor meeting",
    questions: ["How does it make money?", "What does one hectare cost?", "How far can it grow?"],
    yes: "Yes. I'm in.",
    sheets: ["Model", "Numbers", "Story"],
  },
  pt: {
    aria: "Animação de exemplo: um investidor faz três perguntas difíceis e cada uma é respondida por uma folha do pacote: o modelo, os números e a história. No fim o investidor diz que sim.",
    meeting: "Reunião com investidores",
    questions: ["Como ganha dinheiro?", "Quanto custa um hectare?", "Até onde pode crescer?"],
    yes: "Sim. Conte comigo.",
    sheets: ["Modelo", "Números", "História"],
  },
};

// Beat 0: empty table. Then for each question: asked (odd beat), answered (even beat).
// Beat 7: the pack squares up and the investor says yes. Held.
const BEATS = [600, 1000, 1300, 1000, 1300, 1000, 1300, 3400] as const;
const LAST_BEAT = BEATS.length - 1;

const askedAt = (index: number) => 1 + index * 2;
const answeredAt = (index: number) => 2 + index * 2;

// How each sheet lies on the table before the pack is squared up.
const TILT = [-5, 3, 6] as const;

/** Fades a group of diagram marks in, in order, once its sheet is down. */
function Step({
  show,
  order,
  reduced,
  children,
}: {
  show: boolean;
  order: number;
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: show ? 1 : 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.25, delay: show ? 0.3 + order * 0.16 : 0 }}
    >
      {children}
    </motion.g>
  );
}

interface DiagramProps {
  show: boolean;
  reduced: boolean;
}

/** Model: land makes a product, the product earns, the earnings go back into the land. */
function ModelDiagram({ show, reduced }: DiagramProps) {
  const arrowId = useId();
  const arrow = {
    stroke: INK,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    fill: "none",
    markerEnd: `url(#${arrowId})`,
  };
  return (
    <svg viewBox="0 0 64 64" className="block h-auto w-full">
      <defs>
        <marker
          id={arrowId}
          viewBox="0 0 6 6"
          refX="5"
          refY="3"
          markerWidth="6"
          markerHeight="6"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 Z" fill={INK} />
        </marker>
      </defs>
      {/* The plot */}
      <rect x="21" y="3" width="22" height="17" rx="2.5" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      {[27, 32, 37].map((x) =>
        [8.5, 14.5].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill={CYAN} />)
      )}
      {/* The product */}
      <rect x="43" y="42" width="17" height="17" rx="2.5" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      <path d="M43 48 H60 M51.5 42 V48" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      {/* The income */}
      <circle cx="13" cy="50" r="9" fill={CYAN} stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="13" cy="50" r="4.5" fill="none" stroke={INK} strokeWidth="1.5" />

      <Step show={show} order={0} reduced={reduced}>
        <path d="M43 23 L50 37" {...arrow} />
      </Step>
      <Step show={show} order={1} reduced={reduced}>
        <path d="M40 52 L26 52" {...arrow} />
      </Step>
      <Step show={show} order={2} reduced={reduced}>
        <path d="M15 38 L22 24" {...arrow} />
      </Step>
    </svg>
  );
}

/** Numbers: one hectare, what it costs and what it brings in, as plain blocks. */
function NumbersDiagram({ show, reduced }: DiagramProps) {
  return (
    <svg viewBox="0 0 64 64" className="block h-auto w-full">
      <rect x="3" y="5" width="22" height="17" rx="2.5" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      {[9, 14, 19].map((x) =>
        [10.5, 16.5].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill={CYAN} />)
      )}
      <text x="14" y="34" textAnchor="middle" className="font-mono" fontSize="9.5" fontWeight="700" fill={INK}>
        1 ha
      </text>

      {/* Baseline, with a minus under the cost stack and a plus under the income stack */}
      <path d="M30 52 H62" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M34 58.5 H40" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M50 58.5 H56 M53 55.5 V61.5" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />

      {[0, 1].map((i) => (
        <Step key={`cost-${i}`} show={show} order={i} reduced={reduced}>
          <rect x="32" y={43 - i * 9} width="10" height="8" rx="1.5" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        </Step>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Step key={`income-${i}`} show={show} order={i + 1} reduced={reduced}>
          <rect x="48" y={43 - i * 9} width="10" height="8" rx="1.5" fill={CYAN} stroke={INK} strokeWidth="1.4" />
        </Step>
      ))}
    </svg>
  );
}

/** Story: one plot, then a few, then many. */
function StoryDiagram({ show, reduced }: DiagramProps) {
  const stages: Array<Array<[number, number]>> = [
    [[9, 52]],
    [[22, 37], [28.5, 37], [35, 37]],
    [[41, 14.5], [47.5, 14.5], [54, 14.5], [41, 21], [47.5, 21], [54, 21]],
  ];
  return (
    <svg viewBox="0 0 64 64" className="block h-auto w-full">
      <path d="M2 60 H20 V45 H39 V29 H62" fill="none" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      {stages.map((plots, stage) => (
        <Step key={stage} show={show} order={stage} reduced={reduced}>
          {plots.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="5.5" height="5.5" rx="1" fill={CYAN} stroke={INK} strokeWidth="1.1" />
          ))}
        </Step>
      ))}
    </svg>
  );
}

const DIAGRAMS = [ModelDiagram, NumbersDiagram, StoryDiagram] as const;

export function InvestmentReadinessAnimation({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale] ?? COPY.en;
  const { ref, beat, reduced, playing } = usePanelBeats(BEATS);
  const done = beat === LAST_BEAT;

  const tween = (duration: number, delay = 0) =>
    reduced ? { duration: 0 } : { duration, delay, ease: EASE_OUT };

  const bubbles = [
    ...t.questions.map((text, index) => {
      const answered = beat >= answeredAt(index);
      const mark: MarkState = answered ? "ok" : "flag";
      return {
        text,
        isYes: false,
        arrived: beat >= askedAt(index),
        // Replaced by the next thing said. Only matters on small panels, which show one at a time.
        past: beat >= askedAt(index + 1),
        mark,
      };
    }),
    { text: t.yes, isYes: true, arrived: done, past: false, mark: "ok" as MarkState },
  ];

  return (
    <PanelFrame
      panelRef={ref}
      label={t.aria}
      className="flex-col [@container(min-aspect-ratio:8/5)]:flex-row"
    >
      {/* What the investor says */}
      <div className="flex min-w-0 flex-none flex-col justify-center gap-[clamp(8px,2.6cqmin,14px)] [@container(min-aspect-ratio:8/5)]:flex-1">
        <PanelHeader title={t.meeting} pulsing={playing && !done} />

        <div
          className={cn(
            "grid",
            "[@container(min-height:480px)]:flex [@container(min-height:480px)]:flex-col [@container(min-height:480px)]:gap-[clamp(6px,1.8cqmin,10px)]",
            "[@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:flex [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:flex-col [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:gap-1.5"
          )}
        >
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.text}
              className="col-start-1 row-start-1 pt-[5px]"
              initial={false}
              animate={bubble.arrived ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -8, scale: 0.96 }}
              transition={tween(0.35)}
            >
              <div
                data-past={bubble.past}
                className={cn(
                  "relative flex min-h-[clamp(44px,17cqmin,54px)] items-center justify-between gap-2 rounded-2xl px-[clamp(12px,3.6cqmin,16px)] py-1.5 text-[#0c0c0c] shadow-[0_8px_18px_rgba(0,0,0,0.3)] transition-opacity duration-200 motion-reduce:transition-none",
                  "data-[past=true]:opacity-0",
                  "[@container(min-height:480px)]:min-h-0 [@container(min-height:480px)]:py-[clamp(8px,2cqmin,12px)] [@container(min-height:480px)]:data-[past=true]:opacity-100",
                  "[@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:min-h-0 [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:py-2 [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:data-[past=true]:opacity-100",
                  bubble.isYes ? "bg-[#00BCD4]" : "bg-white"
                )}
              >
                {/* Speech tail, pointing up to whoever is across the table */}
                <span className="absolute -top-[5px] right-6 block h-3 w-3 rotate-45 rounded-[2px] bg-inherit" />
                <span
                  className={cn(
                    "relative leading-tight text-balance",
                    bubble.isYes
                      ? "text-[length:clamp(16px,6cqmin,21px)] font-bold"
                      : "text-[length:clamp(13px,5cqmin,17px)] font-semibold"
                  )}
                >
                  {bubble.text}
                </span>
                {!bubble.isYes && (
                  <Mark state={bubble.mark} withCheck instant={reduced} className="h-4 w-4" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The pack, one sheet per answer. Sheets size to whichever of width or height is tighter. */}
      <div
        className="flex min-h-0 min-w-0 flex-1 items-center justify-center [@container(min-aspect-ratio:8/5)]:flex-[1.2]"
        style={{ containerType: "size" }}
      >
        {t.sheets.map((title, index) => {
          const down = beat >= answeredAt(index);
          const Diagram = DIAGRAMS[index] ?? ModelDiagram;
          return (
            <div
              key={title}
              className={cn(
                "relative aspect-[3/4] w-[min(34cqw,68cqh)] shrink-0",
                index > 0 && "-ml-[min(3cqw,6cqh)]"
              )}
              style={{ zIndex: index + 1 }}
            >
              {/* The gap on the table until the answer exists */}
              <motion.div
                className="absolute inset-[4%] rounded-[12px] border border-dashed border-white/35 p-[6%]"
                initial={false}
                animate={{ opacity: down ? 0 : 1 }}
                transition={tween(0.3)}
              >
                <span className="text-[length:clamp(11px,6.5cqmin,14px)] font-semibold tracking-[0.05em] text-white/65 uppercase">
                  {title}
                </span>
              </motion.div>

              <motion.div
                className="absolute inset-0 flex flex-col rounded-[12px] bg-white p-[8%] text-[#0c0c0c] shadow-[0_10px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
                initial={false}
                animate={
                  down
                    ? { opacity: 1, y: 0, rotate: done ? 0 : (TILT[index] ?? 0) }
                    : { opacity: 0, y: -26, rotate: (TILT[index] ?? 0) - 8 }
                }
                transition={tween(done ? 0.5 : 0.45, done ? index * 0.08 : 0)}
              >
                <span className="text-[length:clamp(11px,6.5cqmin,14px)] leading-none font-bold tracking-[0.05em] uppercase">
                  {title}
                </span>
                <div className="flex min-h-0 flex-1 items-center">
                  <Diagram show={down} reduced={reduced} />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </PanelFrame>
  );
}
