"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";

const DOCS: Record<Locale, { title: string; lines: string[]; category: string; icon: string }[]> = {
    en: [
        { title: "Market Research: Wellness Trends", category: "Research", icon: "📊", lines: ["Trend: Burnout recovery", "Gap: Somatic therapy", "Demand: Farm-to-table diets"] },
        { title: "Content Gen: Campaign", category: "Creation", icon: "✍️", lines: ["Draft: 'Healing within'", "Focus: Temazcal process", "Applying brand voice..."] },
        { title: "Published Asset: Article", category: "Output", icon: "✨", lines: ["Target: Health professionals", "Tone: Empathetic, calm", "Status: Live on Blog & IG"] }
    ],
    es: [
        { title: "Investigación: Tendencias Bienestar", category: "Investigación", icon: "📊", lines: ["Tendencia: Recuperación burnout", "Brecha: Terapia somática", "Demanda: Dietas orgánicas"] },
        { title: "Generación de Campaña", category: "Creación", icon: "✍️", lines: ["Borrador: 'Sanar desde adentro'", "Foco: Proceso de Temazcal", "Aplicando voz de marca..."] },
        { title: "Activo de Contenido Publicado", category: "Salida", icon: "✨", lines: ["Target: Profesionales de salud", "Tono: Empático, calmado", "Estado: En Blog e IG"] }
    ],
};

const LIFECYCLE: Record<Locale, string[]> = {
    en: ["Research", "Create", "Publish"],
    es: ["Investigar", "Crear", "Publicar"],
};

export function KnowledgeAnimation({ locale = "en" }: { locale?: Locale }) {
    const [docIdx, setDocIdx] = useState(0);
    const docs = DOCS[locale] ?? DOCS.en;
    const doc = docs[docIdx] || docs[0]!;
    const steps = LIFECYCLE[locale] ?? LIFECYCLE.en;

    useEffect(() => {
        const timer = setInterval(() => {
            setDocIdx(prev => (prev + 1) % docs.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [docs.length]);

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0c0c0c]">
            {/* Dedicated scaling container for robust mobile responsiveness */}
            <div className="w-full h-full max-w-[400px] flex flex-col justify-center px-4 py-5 sm:px-6 transform scale-[0.85] sm:scale-100 origin-center max-h-[400px]">
                {/* Top Bar - Lifecycle Tracker */}
                <div className="flex w-full justify-between items-center bg-white/5 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 border border-white/5 mb-4 sm:mb-5 shadow-sm">
                    {steps.map((step, i) => (
                        <motion.div
                            key={`${step}-${docIdx}`}
                            className="flex flex-col items-center gap-1 sm:gap-1.5 opacity-50"
                            animate={{ opacity: [0.3, 1, 1, 1] }}
                            transition={{ duration: 6, times: [0, i * 0.3 + 0.1, 0.9, 1] }}
                        >
                            <motion.div
                                className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/20`}
                                animate={{
                                    backgroundColor: ["rgba(255,255,255,0.2)", "#00BCD4", "#00BCD4", "rgba(255,255,255,0.2)"],
                                    scale: [1, 1.4, 1, 1],
                                    boxShadow: ["none", "0 0 6px #00BCD4", "0 0 6px #00BCD4", "none"]
                                }}
                                transition={{ duration: 6, times: [0, i * 0.3 + 0.1, 0.9, 1] }}
                            />
                            <span className="text-[7.5px] sm:text-[8px] font-black text-white uppercase tracking-wider">{step}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Central Document Display */}
                <div className="flex-1 w-full flex justify-center items-center -my-1 sm:-my-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={docIdx}
                            className="relative w-full max-w-[300px] rounded-2xl border border-white/10 bg-[#151515] p-4 sm:p-5 shadow-2xl min-h-[145px]"
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -5 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="absolute top-3 right-4 bg-[#00BCD4]/10 text-[#00BCD4] px-2 sm:px-2.5 py-1 rounded-md text-[7.5px] sm:text-[8px] font-black uppercase tracking-widest leading-none">{doc.category}</div>

                            <h4 className="flex items-center text-white font-black text-[11px] sm:text-[12px] leading-tight mb-3 sm:mb-4 pr-16 border-b border-white/5 pb-2.5 sm:pb-3">
                                <span className="mr-2 sm:mr-2.5 text-[14px]">{doc.icon}</span>
                                {doc.title}
                            </h4>

                            <div className="space-y-2 sm:space-y-2.5">
                                {doc.lines.map((line, i) => (
                                    <motion.div
                                        key={line}
                                        className="flex items-start gap-2.5 sm:gap-3"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1 + (i * 1.5), duration: 0.4 }}
                                    >
                                        <span className="text-[#00BCD4] text-[9.5px] sm:text-[10px] sm:mt-[1px]">♦</span>
                                        <p className="text-[10.5px] sm:text-[11px] text-white/70 font-semibold leading-relaxed tracking-wide">{line}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Simulated Typewriter Cursor */}
                            <motion.div
                                className="h-2 w-1.5 bg-[#00BCD4] mt-2.5 sm:mt-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom "Signal" indicator */}
                <div className="mt-4 sm:mt-5 flex items-center justify-between w-full rounded-xl bg-white/5 border border-white/5 px-3 py-2 sm:px-4 sm:py-2">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <motion.span
                            className="text-[15px] sm:text-[16px]"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >⚡</motion.span>
                        <div className="flex flex-col">
                            <span className="text-[8.5px] sm:text-[9px] font-bold text-white uppercase tracking-wider">{locale === 'es' ? 'Motor de Contenido' : 'Content Engine'}</span>
                            <span className="text-[7.5px] sm:text-[8px] text-[#00BCD4] font-black uppercase tracking-tight leading-tight pt-[1px]">{locale === 'es' ? 'Creación Automática' : 'Always Generating'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
