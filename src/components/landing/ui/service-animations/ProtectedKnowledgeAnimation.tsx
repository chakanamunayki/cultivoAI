"use client";

import { motion } from "framer-motion";
import { Camera, Lock, Repeat, Sprout, Sun, Thermometer } from "lucide-react";
import type { Locale } from "@/content/types";
import { cn } from "@/lib/utils";
import {
  EASE_OUT,
  Mark,
  PanelFrame,
  PanelHeader,
  PAPER,
  SampleTag,
  TEXT_LABEL,
  usePanelBeats,
} from "./panel-kit";

/**
 * Protected knowledge platform: the current step, nothing more.
 *
 * The full protocol sits behind a lock as a stack of hatched rows. In front, a
 * phone shows one step and its parameters. The operator ticks it, types an
 * observation and attaches a photo, and the entry flies back into the locked
 * stack while the next step slides in. Parameters are neutral placeholders, tagged as sample data.
 */

const COPY: Record<
  Locale,
  {
    aria: string;
    title: string;
    vault: string;
    step: string;
    of: string;
    params: [string, string, string];
    every: string;
    done: string;
    observation: string;
    note: string;
  }
> = {
  es: {
    aria: "Animación de ejemplo: el protocolo completo queda bajo llave en el sistema. El teléfono del operador muestra solo el paso actual con sus parámetros. El operador lo marca como hecho y registra una observación, que vuelve al protocolo protegido mientras llega el siguiente paso.",
    title: "Ejecución guiada",
    vault: "Protocolo completo",
    step: "Paso",
    of: "de",
    params: ["Temperatura", "Luz", "Frecuencia"],
    every: "cada",
    done: "Hecho",
    observation: "Observación",
    note: "Hojas sanas",
  },
  en: {
    aria: "Sample animation: the full protocol stays locked in the system. The operator's phone shows only the current step and its parameters. The operator marks it done and logs an observation, which goes back into the protected protocol as the next step arrives.",
    title: "Guided execution",
    vault: "Full protocol",
    step: "Step",
    of: "of",
    params: ["Temperature", "Light", "Frequency"],
    every: "every",
    done: "Done",
    observation: "Observation",
    note: "Healthy leaves",
  },
  pt: {
    aria: "Animação de exemplo: o protocolo completo fica trancado no sistema. O telefone do operador mostra apenas o passo atual com seus parâmetros. O operador marca como feito e registra uma observação, que volta ao protocolo protegido enquanto chega o próximo passo.",
    title: "Execução guiada",
    vault: "Protocolo completo",
    step: "Passo",
    of: "de",
    params: ["Temperatura", "Luz", "Frequência"],
    every: "a cada",
    done: "Feito",
    observation: "Observação",
    note: "Folhas saudáveis",
  },
};

// Beat 0: the current step is on the phone. Beat 1: ticked. Beat 2: the observation is typed
// and a photo attached. Beat 3: the entry is sent and flies back into the locked protocol.
// Beat 4: the next step slides in. Beat 5: held.
const BEATS = [1200, 1100, 1900, 1300, 1300, 3400] as const;
const LAST_BEAT = BEATS.length - 1;

const TOTAL_STEPS = 12;
const STEP_ROWS = Array.from({ length: TOTAL_STEPS }, (_, index) => index);

// The two steps the phone shows, as zero-based rows of the protocol. Values are generic placeholders.
const SCREENS = [
  { row: 3, temperature: 22, light: 16, hours: 8 },
  { row: 4, temperature: 24, light: 12, hours: 6 },
] as const;

const PARAM_ICONS = [Thermometer, Sun, Repeat] as const;

/** White diagonal hatching for locked rows on the dark ground. */
const HATCH_WHITE = {
  backgroundImage:
    "repeating-linear-gradient(135deg, rgba(255,255,255,0.34) 0 1.5px, transparent 1.5px 5px)",
};

// The phone and the invisible copy of it that carries the flying observation share these,
// so the observation starts exactly on the phone's observation field.
const PHONE_SIZE =
  "h-[clamp(294px,min(82cqw,82cqh),480px)] max-h-full w-[clamp(168px,min(52cqw,52cqh),300px)] shrink-0";
const FIELD_SHAPE = "h-[clamp(26px,8.5cqmin,40px)] rounded-[clamp(8px,2.6cqmin,12px)]";

// Seconds. Typing starts shortly after the beat, one character at a time.
const TYPE_START = 0.2;
const TYPE_STEP = 0.07;
// The entry turns cyan (sent) before it leaves the phone, and lands this long into the beat.
const SEND_PAUSE = 0.2;
const FLIGHT = 0.7;
const LANDED = SEND_PAUSE + FLIGHT - 0.1;

export function ProtectedKnowledgeAnimation({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale] ?? COPY.en;
  const { ref, beat, reduced, playing } = usePanelBeats(BEATS);

  const done = beat === LAST_BEAT;
  const onNext = beat >= 4;
  const writing = beat === 2;
  const flying = beat === 3;
  const noteChars = Array.from(t.note);
  const photoDelay = TYPE_START + noteChars.length * TYPE_STEP + 0.12;
  const currentRow = onNext ? SCREENS[1].row : SCREENS[0].row;
  const isLogged = (row: number) => row < SCREENS[0].row || (row === SCREENS[0].row && beat >= 3);

  const tween = (duration: number, delay = 0) =>
    reduced ? { duration: 0 } : { duration, delay, ease: EASE_OUT };

  return (
    <PanelFrame panelRef={ref} label={t.aria} className="flex-col">
      <PanelHeader title={t.title} pulsing={playing && !done}>
        <SampleTag locale={locale} />
      </PanelHeader>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="relative flex h-full w-full items-center [@container(min-aspect-ratio:8/5)]:max-w-[80cqw]">
          {/* The full protocol, locked in the system */}
          <div className="flex h-full max-h-[clamp(240px,130cqw,640px)] min-w-0 flex-1 flex-col gap-[clamp(6px,2cqmin,12px)] rounded-2xl border border-white/15 bg-white/[0.05] p-[clamp(8px,2.6cqmin,14px)]">
            <div className="flex items-center gap-[clamp(5px,1.6cqmin,8px)]">
              <motion.span
                className="flex h-[clamp(18px,6cqmin,26px)] w-[clamp(18px,6cqmin,26px)] shrink-0 items-center justify-center rounded-full bg-[#00BCD4] text-[#0c0c0c]"
                initial={false}
                animate={{ scale: flying && !reduced ? [1, 1.3, 1] : 1 }}
                transition={
                  flying && !reduced ? { duration: 0.45, delay: LANDED } : { duration: 0 }
                }
              >
                <Lock className="h-[62%] w-[62%]" strokeWidth={2.6} />
              </motion.span>
              <span className={cn("leading-[1.1] font-semibold text-white/90", TEXT_LABEL)}>
                {t.vault}
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-[clamp(2px,0.9cqmin,6px)]">
              {STEP_ROWS.map((row) => {
                const logged = isLogged(row);
                const isCurrent = row === currentRow;
                return (
                  <div
                    key={row}
                    className="flex min-h-0 flex-1 items-center gap-[clamp(5px,1.6cqmin,8px)]"
                  >
                    <span
                      className={cn(
                        "font-mono text-[length:clamp(11px,3.4cqmin,13px)] leading-none font-semibold tabular-nums",
                        logged ? "text-[#00BCD4]" : isCurrent ? "text-white" : "text-white/50"
                      )}
                    >
                      {String(row + 1).padStart(2, "0")}
                    </span>
                    <span className="relative h-full min-w-0 flex-1 overflow-hidden rounded-[4px] bg-white/[0.07]">
                      <span className="absolute inset-0" style={HATCH_WHITE} />
                      {/* The one step that is out on the phone */}
                      <motion.span
                        className="absolute inset-0 rounded-[4px] bg-white"
                        initial={false}
                        animate={{ opacity: isCurrent ? 1 : 0 }}
                        transition={tween(0.35)}
                      />
                      {/* The observation logged against a finished step */}
                      <motion.span
                        className="absolute inset-y-0 left-0 w-[clamp(14px,5.5cqmin,28px)] rounded-[4px] bg-[#00BCD4]"
                        initial={false}
                        animate={{ opacity: logged ? 1 : 0 }}
                        transition={tween(0.25, flying ? LANDED : 0)}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The operator's phone: the current step, nothing more */}
          <div
            className={cn(
              "relative z-10 -ml-[clamp(10px,3.5cqmin,22px)] flex flex-col gap-[clamp(5px,1.8cqmin,10px)] rounded-[clamp(16px,5.5cqmin,26px)] p-[clamp(8px,2.6cqmin,14px)]",
              PAPER,
              PHONE_SIZE
            )}
          >
            <span className="mx-auto block h-[clamp(4px,1.4cqmin,6px)] w-[26%] shrink-0 rounded-full bg-[#0c0c0c]/75" />

            <div className="grid min-h-0 flex-1 overflow-hidden">
              {SCREENS.map((screen, index) => {
                const active = index === 1 ? onNext : !onNext;
                const ticked = index === 0 && beat >= 1;
                const values = [
                  { lead: "", figure: screen.temperature, unit: "°C" },
                  { lead: "", figure: screen.light, unit: "h" },
                  { lead: t.every, figure: screen.hours, unit: "h" },
                ];
                return (
                  <motion.div
                    key={screen.row}
                    className="col-start-1 row-start-1 flex min-h-0 min-w-0 flex-col justify-between"
                    initial={false}
                    animate={{
                      x: active ? "0%" : index === 0 ? "-105%" : "105%",
                      opacity: active ? 1 : 0,
                    }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : onNext
                          ? { duration: 0.55, ease: EASE_OUT }
                          : // Looping back to the first step: crossfade in place instead of sliding backwards.
                            {
                              x: { duration: 0, delay: index === 0 ? 0 : 0.3 },
                              opacity: { duration: 0.3 },
                            }
                    }
                  >
                    <div className="flex flex-col gap-[clamp(6px,3cqmin,18px)]">
                      <span className="text-[length:clamp(15px,5.6cqmin,22px)] leading-none font-bold whitespace-nowrap">
                        {t.step} {screen.row + 1} {t.of} {TOTAL_STEPS}
                      </span>

                      <div className="flex flex-col">
                        {t.params.map((label, i) => {
                          const Icon = PARAM_ICONS[i] ?? Thermometer;
                          const value = values[i];
                          return (
                            <div
                              key={label}
                              className="flex items-center justify-between gap-1.5 border-b border-[#0c0c0c]/10 py-[clamp(3px,2.2cqmin,16px)] whitespace-nowrap"
                            >
                              <span
                                className={cn(
                                  "flex min-w-0 items-center gap-1.5 text-[#0c0c0c]/70",
                                  TEXT_LABEL
                                )}
                              >
                                <Icon
                                  className="hidden h-[1.25em] w-[1.25em] shrink-0 text-[#0c0c0c] [@container(min-aspect-ratio:8/5)]:block [@container(min-height:480px)]:block"
                                  strokeWidth={2.2}
                                />
                                {label}
                              </span>
                              {value && (
                                <span className="flex items-baseline gap-[0.3em] text-[length:clamp(13px,4.6cqmin,19px)] leading-none font-semibold">
                                  {value.lead && (
                                    <span className={cn("font-medium", TEXT_LABEL)}>
                                      {value.lead}
                                    </span>
                                  )}
                                  <span className="font-mono font-bold tabular-nums">
                                    {value.figure}
                                  </span>
                                  {value.unit}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <span
                      className={cn(
                        "flex items-center gap-1.5 leading-none font-semibold",
                        TEXT_LABEL
                      )}
                    >
                      <Mark
                        state={ticked ? "ok" : "empty"}
                        withCheck
                        instant={reduced}
                        className="h-[clamp(14px,4.8cqmin,20px)] w-[clamp(14px,4.8cqmin,20px)]"
                      />
                      {t.done}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div
              className={cn(
                "flex shrink-0 items-center border border-dashed border-[#0c0c0c]/35 px-[clamp(7px,2.4cqmin,12px)] text-[#0c0c0c]/60",
                FIELD_SHAPE,
                TEXT_LABEL
              )}
            >
              {/* Empty field: a prompt to write, and a camera to add a photo */}
              <motion.span
                className="flex w-full items-center justify-between gap-1.5"
                initial={false}
                animate={{ opacity: writing ? 0 : 1 }}
                transition={
                  writing ? tween(0.15) : flying ? tween(0.3, SEND_PAUSE + 0.25) : { duration: 0 }
                }
              >
                {t.observation}
                <Camera className="h-[1.3em] w-[1.3em] shrink-0" strokeWidth={2.2} />
              </motion.span>
            </div>
          </div>

          {/* The observation: typed, a photo attached, then sent back into the locked protocol */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-end"
            initial={false}
            animate={{ x: flying ? "-60%" : "0%", y: flying ? "-54%" : "0%" }}
            transition={
              flying && !reduced
                ? { duration: FLIGHT, delay: SEND_PAUSE, ease: [0.5, 0, 0.2, 1] }
                : { duration: 0 }
            }
          >
            <div className={cn("relative", PHONE_SIZE)}>
              <motion.div
                className={cn(
                  "absolute inset-x-[clamp(8px,2.6cqmin,14px)] bottom-[clamp(8px,2.6cqmin,14px)] flex items-center justify-between gap-1.5 px-[clamp(7px,2.4cqmin,12px)] font-semibold whitespace-nowrap text-[#0c0c0c]",
                  FIELD_SHAPE,
                  TEXT_LABEL
                )}
                initial={false}
                animate={
                  writing
                    ? { opacity: 1, scale: 1 }
                    : flying
                      ? { opacity: 0, scale: 0.35 }
                      : { opacity: 0, scale: 1 }
                }
                transition={
                  flying && !reduced
                    ? {
                        scale: { duration: FLIGHT, delay: SEND_PAUSE },
                        opacity: { duration: 0.25, delay: SEND_PAUSE + FLIGHT - 0.25 },
                      }
                    : { duration: 0 }
                }
              >
                {/* Turns cyan when sent */}
                <motion.span
                  className="absolute inset-0 rounded-[inherit] bg-[#00BCD4] shadow-[0_6px_14px_rgba(0,0,0,0.22)]"
                  initial={false}
                  animate={{ opacity: flying ? 1 : 0 }}
                  transition={flying && !reduced ? { duration: 0.15 } : { duration: 0 }}
                />
                <span className="relative whitespace-pre">
                  {noteChars.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={false}
                      animate={{ opacity: writing || flying ? 1 : 0 }}
                      transition={
                        writing && !reduced
                          ? { duration: 0.01, delay: TYPE_START + i * TYPE_STEP }
                          : { duration: 0 }
                      }
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                {/* The attached photo, drawn as a small thumbnail */}
                <motion.span
                  className="relative flex aspect-square h-[70%] shrink-0 items-center justify-center rounded-[4px] bg-[#0c0c0c] text-white"
                  initial={false}
                  animate={
                    writing || flying ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
                  }
                  transition={
                    writing && !reduced
                      ? { duration: 0.25, delay: photoDelay, ease: EASE_OUT }
                      : { duration: 0 }
                  }
                >
                  <Sprout className="h-[72%] w-[72%]" strokeWidth={2.4} />
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PanelFrame>
  );
}
