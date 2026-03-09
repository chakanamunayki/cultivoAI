"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";

const CONVERSATIONS: Record<Locale, { user: string; ai: string; category: string }[]> = {
    en: [
        { user: "What's included in the wellness retreat?", ai: "It includes daily meditation, a Temazcal ceremony, and organic farm-to-table meals. Let me send you the brochure!", category: "Sales" },
        { user: "Can this help me with recent stress and burnout?", ai: "Yes, our guided meditations and breathwork are specifically designed to help cope with stress and loss.", category: "Benefits" },
        { user: "Are the meals fully organic?", ai: "Absolutely! All food is locally sourced, 100% organic, and tailored to any dietary needs you may have.", category: "Details" },
    ],
    es: [
        { user: "¿Qué incluye el retiro de bienestar?", ai: "Incluye meditación diaria, ceremonia de Temazcal y comidas orgánicas. ¡Te envío el folleto!", category: "Ventas" },
        { user: "¿Me puede ayudar con estrés reciente y agotamiento?", ai: "Sí, nuestras meditaciones y respiración están diseñadas para ayudar a sobrellevar el estrés.", category: "Beneficios" },
        { user: "¿Las comidas son totalmente orgánicas?", ai: "¡Absolutamente! Toda la comida es local, 100% orgánica y adaptada a cualquier dieta.", category: "Detalles" },
    ],
};

const CHANNELS = ["WhatsApp", "Website", "Instagram"];

interface Props { locale?: Locale }

export function AiAssistantsAnimation({ locale = "en" }: Props) {
    const [step, setStep] = useState<"user" | "analyzing" | "ai" | "pause">("user");
    const [idx, setIdx] = useState(0);
    const convos = CONVERSATIONS[locale];
    const current = convos[idx];
    const user = current?.user ?? "";
    const ai = current?.ai ?? "";
    const category = current?.category ?? "";

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        const run = () => {
            setStep("user");
            timers.push(setTimeout(() => setStep("analyzing"), 2000));
            timers.push(setTimeout(() => setStep("ai"), 4300));
            timers.push(setTimeout(() => setStep("pause"), 9000));
            timers.push(setTimeout(() => {
                setIdx((i) => (i + 1) % convos.length);
                run();
            }, 10000));
        };
        run();
        return () => timers.forEach(clearTimeout);
    }, [convos.length]);

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0c0c0c]">
            {/* Dedicated scaling container for robust mobile responsiveness */}
            <div className="w-full h-full max-w-[400px] flex flex-col justify-between px-4 py-5 sm:px-6 transform scale-[0.85] sm:scale-100 origin-center max-h-[400px]">

                {/* Top Bar - Channel Indicators */}
                <div className="flex justify-around items-center border-b border-white/5 pb-2.5 sm:pb-3 w-full shrink-0">
                    {CHANNELS.map((ch, i) => (
                        <motion.div
                            key={ch}
                            className="flex flex-col items-center gap-1 sm:gap-1.5 opacity-40 shrink-0"
                            animate={{ opacity: step === "ai" && i === (idx % 3) ? 1 : 0.3 }}
                        >
                            <span className="text-xs sm:text-sm">{i === 0 ? "💬" : i === 1 ? "🌐" : "📸"}</span>
                            <span className="text-[7.5px] sm:text-[8px] font-black uppercase text-[#00BCD4]">{ch}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Central Brain / Analyzing Visual */}
                <div className="relative flex-1 flex flex-col items-center justify-center -my-1 sm:-my-2 w-full min-h-[160px]">
                    <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%">
                            <circle cx="50%" cy="50%" r="50" sm-r="60" fill="none" stroke="#00BCD4" strokeWidth="0.5" strokeDasharray="5 5" />
                            <circle cx="50%" cy="50%" r="80" sm-r="90" fill="none" stroke="#00BCD4" strokeWidth="0.5" strokeDasharray="3 3" />
                        </svg>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === "user" && (
                            <motion.div
                                key="user-q"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-3.5 text-[11px] sm:text-xs text-white/90 max-w-[95%] sm:max-w-[90%] text-center shadow-md relative z-10 mx-auto"
                            >
                                {user}
                            </motion.div>
                        )}

                        {step === "analyzing" && (
                            <motion.div
                                key="brain"
                                initial={{ opacity: 0, rotate: 0 }}
                                animate={{ opacity: 1, rotate: 360 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-2 sm:gap-3 relative z-10"
                            >
                                <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center">
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-[#00BCD4]"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                    <span className="text-xl sm:text-2xl">🧠</span>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-[#00BCD4] tracking-widest uppercase bg-black/50 px-2 py-0.5 sm:py-1 rounded">{category}...</span>
                            </motion.div>
                        )}

                        {step === "ai" && (
                            <motion.div
                                key="ai-r"
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-[#00BCD4] rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 text-[10px] sm:text-[11px] leading-relaxed font-bold text-white shadow-lg text-center max-w-full sm:max-w-[95%] relative z-10 mx-auto"
                            >
                                {ai}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Footer - Sales Assistant Mode */}
                <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 border border-white/10 mt-1 sm:mt-2 z-10 w-full shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl">👩‍💻</span>
                        <div className="flex flex-col">
                            <span className="text-[8.5px] sm:text-[9px] font-bold text-white uppercase leading-tight pt-[1px]">{locale === 'es' ? 'Asistente de Ventas' : 'Sales Assistant 24/7'}</span>
                            <span className="text-[7.5px] sm:text-[8px] text-[#00BCD4] font-medium leading-tight">{locale === 'es' ? 'Convirtiendo leads' : 'Converting inquiries'}</span>
                        </div>
                    </div>
                    <div className="flex gap-1.5 items-center shrink-0">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_5px_green]" />
                        <span className="text-[7.5px] sm:text-[8px] text-white/60 uppercase font-black">Live</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
