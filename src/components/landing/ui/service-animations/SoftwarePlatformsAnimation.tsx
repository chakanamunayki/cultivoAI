"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Sprout, WifiOff } from "lucide-react";
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
 * Software and platforms: version one, then better.
 *
 * A phone shows a plain planting log, stamped as version one. Two notes from
 * real use land beside it, one asking if it works without signal and one
 * asking for a photo. Each note is answered by the feature appearing in the
 * app. An AI mark under the title pulses the whole time, and once the photos
 * are in it checks them. Then the stamp turns to version two. Figures are
 * illustrative and tagged as sample data.
 */

const COPY: Record<
  Locale,
  {
    aria: string;
    title: string;
    app: string;
    trees: string;
    stamps: [string, string];
    notes: [string, string];
    saved: string;
    ai: [string, string];
  }
> = {
  es: {
    aria: "Animación de ejemplo: un teléfono muestra un registro de siembra sencillo, la versión uno en la semana tres. Llegan dos notas del uso real, una pregunta si funciona sin señal y otra pide agregar una foto, y la app pasa a la versión dos con las dos cosas incluidas. Una IA trabaja en segundo plano y revisa las fotos.",
    title: "App de campo",
    app: "Registro de siembra",
    trees: "árboles",
    stamps: ["v1 · semana 3", "v2 · semana 5"],
    notes: ["¿Funciona sin señal?", "Agregar una foto"],
    saved: "Guardado",
    ai: ["IA activa", "Revisado por IA"],
  },
  en: {
    aria: "Sample animation: a phone shows a plain planting log, version one in week three. Two notes from real use arrive, one asking if it works offline and one asking to add a photo, and the app moves to version two with both built in. An AI works in the background and checks the photos.",
    title: "Field app",
    app: "Planting log",
    trees: "trees",
    stamps: ["v1 · week 3", "v2 · week 5"],
    notes: ["Works offline?", "Add a photo"],
    saved: "Saved",
    ai: ["AI active", "Checked by AI"],
  },
  pt: {
    aria: "Animação de exemplo: um telefone mostra um registro de plantio simples, a versão um na semana três. Chegam duas notas do uso real, uma pergunta se funciona sem sinal e outra pede para adicionar uma foto, e o app passa para a versão dois com as duas coisas incluídas. Uma IA trabalha em segundo plano e revisa as fotos.",
    title: "App de campo",
    app: "Registro de plantio",
    trees: "árvores",
    stamps: ["v1 · semana 3", "v2 · semana 5"],
    notes: ["Funciona sem sinal?", "Adicionar uma foto"],
    saved: "Salvo",
    ai: ["IA ativa", "Revisado por IA"],
  },
};

// Beat 0: version one. Beats 1 and 2: a note from real use lands. Beat 3: the first note is
// answered (saves without signal). Beat 4: the second is answered (photos). Beat 5: the AI
// checks the photos. Beat 6: version two, held.
const BEATS = [1000, 1000, 1000, 1100, 1100, 1400, 3400] as const;
const LAST_BEAT = BEATS.length - 1;

const landsAt = (index: number) => 1 + index;
const builtAt = (index: number) => 3 + index;

const PLOTS = ["P1", "P2", "P3", "P4", "P5", "P6"] as const;
const PLANTED = 20;

// How each note lies once it has landed.
const TILT = [-3, 4] as const;

export function SoftwarePlatformsAnimation({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale] ?? COPY.en;
  const { ref, beat, reduced, playing } = usePanelBeats(BEATS);

  const done = beat === LAST_BEAT;
  const offlineBuilt = beat >= builtAt(0);
  const photosBuilt = beat >= builtAt(1);
  const aiChecked = beat >= 5;

  const tween = (duration: number, delay = 0) =>
    reduced ? { duration: 0 } : { duration, delay, ease: EASE_OUT };

  return (
    <PanelFrame panelRef={ref} label={t.aria} className="flex-col">
      <PanelHeader title={t.title} pulsing={playing && !done}>
        <SampleTag locale={locale} />
      </PanelHeader>

      <div className="flex min-h-0 flex-1 items-center justify-center pt-[clamp(22px,6.6cqmin,29px)]">
        {/* The app */}
        <div
          className={cn(
            "relative flex h-[clamp(216px,min(86cqw,80cqh),445px)] max-h-full w-[clamp(144px,min(50cqw,48cqh),260px)] shrink-0 flex-col gap-[clamp(5px,1.8cqmin,10px)] rounded-[clamp(16px,5.5cqmin,26px)] p-[clamp(8px,2.6cqmin,14px)]",
            PAPER
          )}
        >
          {/* Version stamp, sitting on the top edge clear of the speaker */}
          <motion.span
            className={cn(
              "absolute -top-[clamp(19px,5.8cqmin,24px)] left-[clamp(8px,2.6cqmin,14px)] z-10 rounded-full bg-[#0c0c0c] px-2.5 py-1.5 leading-none font-bold whitespace-nowrap text-white shadow-[0_6px_14px_rgba(0,0,0,0.22)] ring-1 ring-white/25",
              TEXT_LABEL
            )}
            initial={false}
            animate={
              done ? { opacity: 0, scale: 0.85, rotate: -4 } : { opacity: 1, scale: 1, rotate: -4 }
            }
            transition={tween(0.2)}
          >
            {t.stamps[0]}
          </motion.span>
          <motion.span
            className={cn(
              "absolute -top-[clamp(19px,5.8cqmin,24px)] left-[clamp(8px,2.6cqmin,14px)] z-10 flex items-center gap-1 rounded-full bg-[#00BCD4] px-2.5 py-1.5 leading-none font-bold whitespace-nowrap text-[#0c0c0c] shadow-[0_6px_14px_rgba(0,0,0,0.22)]",
              TEXT_LABEL
            )}
            initial={false}
            animate={
              done ? { opacity: 1, scale: 1, rotate: -4 } : { opacity: 0, scale: 1.2, rotate: -4 }
            }
            transition={tween(0.3, done ? 0.25 : 0)}
          >
            <Check className="h-[1em] w-[1em]" strokeWidth={3.5} />
            {t.stamps[1]}
          </motion.span>

          <span className="mx-auto block h-[clamp(4px,1.4cqmin,6px)] w-[26%] shrink-0 rounded-full bg-[#0c0c0c]/75" />

          <span className="pt-[clamp(2px,1.2cqmin,8px)] text-[length:clamp(12px,min(4cqw,3.84cqh),20px)] leading-none font-bold whitespace-nowrap">
            {t.app}
          </span>

          {/* The AI, working in the background the whole time */}
          <div
            className={cn(
              "flex items-center gap-[clamp(4px,1.5cqmin,7px)] leading-none font-semibold whitespace-nowrap text-[#0c0c0c]/70",
              TEXT_LABEL
            )}
          >
            <motion.span
              className="flex h-[1.4em] w-[1.4em] shrink-0 items-center justify-center rounded-full bg-[#00BCD4] text-[#0c0c0c]"
              initial={false}
              animate={playing && !done ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
              transition={playing && !done ? { duration: 1.2, repeat: Infinity } : { duration: 0 }}
            >
              <Sparkles className="h-[72%] w-[72%]" strokeWidth={2.4} />
            </motion.span>
            <span className="grid">
              <motion.span
                className="col-start-1 row-start-1"
                initial={false}
                animate={{ opacity: aiChecked ? 0 : 1 }}
                transition={tween(0.2)}
              >
                {t.ai[0]}
              </motion.span>
              <motion.span
                className="col-start-1 row-start-1 text-[#0c0c0c]"
                initial={false}
                animate={{ opacity: aiChecked ? 1 : 0 }}
                transition={tween(0.3, aiChecked ? 0.7 : 0)}
              >
                {t.ai[1]}
              </motion.span>
            </span>
          </div>

          <div className="flex flex-col">
            {PLOTS.map((plot, index) => (
              <div
                key={plot}
                className={cn(
                  "items-center gap-[clamp(5px,1.8cqmin,9px)] border-b border-[#0c0c0c]/10 py-[clamp(4px,1.7cqmin,10px)] whitespace-nowrap",
                  index < 3
                    ? "flex"
                    : index === 3
                      ? "hidden [@container(min-aspect-ratio:8/5)_and_(min-height:320px)]:flex [@container(min-height:480px)]:flex"
                      : "hidden [@container(min-height:480px)]:flex"
                )}
              >
                <span
                  className={cn(
                    "rounded-[5px] bg-[#0c0c0c] px-1.5 py-px font-mono font-semibold text-white",
                    TEXT_LABEL
                  )}
                >
                  {plot}
                </span>
                <span className={cn("font-medium text-[#0c0c0c]/75", TEXT_LABEL)}>
                  <span className="font-mono font-bold text-[#0c0c0c] tabular-nums">{PLANTED}</span>{" "}
                  {t.trees}
                </span>
                {/* Version two: a photo against each entry */}
                <motion.span
                  className="relative ml-auto flex h-[clamp(16px,6cqmin,26px)] w-[clamp(16px,6cqmin,26px)] shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-[#0c0c0c] text-white"
                  initial={false}
                  animate={photosBuilt ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={tween(0.3, photosBuilt ? 0.15 + index * 0.1 : 0)}
                >
                  <Sprout className="h-[72%] w-[72%]" strokeWidth={2.4} />
                  {/* Checked by the AI */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center rounded-[4px] bg-[#00BCD4] text-[#0c0c0c]"
                    initial={false}
                    animate={{ opacity: aiChecked ? 1 : 0 }}
                    transition={tween(0.25, aiChecked ? 0.1 + index * 0.1 : 0)}
                  >
                    <Sprout className="h-[72%] w-[72%]" strokeWidth={2.4} />
                  </motion.span>
                </motion.span>
              </div>
            ))}
          </div>

          {/* Version two: entries save without signal */}
          <motion.span
            className={cn(
              "mt-auto flex items-center gap-1.5 self-start rounded-full bg-[#00BCD4] px-[clamp(8px,2.6cqmin,12px)] py-[clamp(4px,1.5cqmin,7px)] leading-none font-semibold whitespace-nowrap text-[#0c0c0c]",
              TEXT_LABEL
            )}
            initial={false}
            animate={
              offlineBuilt ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 6 }
            }
            transition={tween(0.35, offlineBuilt ? 0.15 : 0)}
          >
            <WifiOff className="h-[1.2em] w-[1.2em] shrink-0" strokeWidth={2.4} />
            {t.saved}
          </motion.span>
        </div>

        {/* Notes from real use. They overlap the phone by its own padding, so they never cover a row. */}
        <div className="relative z-10 -ml-[clamp(8px,2.6cqmin,14px)] flex w-[clamp(100px,40cqw,220px)] shrink-0 flex-col gap-[clamp(10px,4cqmin,22px)]">
          {t.notes.map((note, index) => {
            const landed = beat >= landsAt(index);
            const built = beat >= builtAt(index);
            const tilt = TILT[index] ?? 0;
            return (
              <motion.div
                key={note}
                className={cn(
                  "flex items-start gap-[clamp(5px,1.8cqmin,9px)] rounded-[12px] bg-white p-[clamp(7px,2.4cqmin,12px)] text-[#0c0c0c] shadow-[0_10px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/5",
                  index === 1 && "ml-[clamp(6px,3cqmin,18px)]"
                )}
                initial={false}
                animate={
                  landed
                    ? { opacity: 1, y: 0, rotate: tilt }
                    : { opacity: 0, y: -22, rotate: tilt - 8 }
                }
                transition={tween(0.45)}
              >
                <Mark
                  state={built ? "ok" : "flag"}
                  withCheck
                  delay={built ? 0.05 : 0}
                  instant={reduced}
                  className="mt-px h-[clamp(13px,4.6cqmin,18px)] w-[clamp(13px,4.6cqmin,18px)]"
                />
                <span className="text-[length:clamp(11px,4.4cqmin,16px)] leading-[1.15] font-semibold text-balance">
                  {note}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PanelFrame>
  );
}
