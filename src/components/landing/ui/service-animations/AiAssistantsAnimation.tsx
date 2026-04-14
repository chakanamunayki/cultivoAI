"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
    const [isHovered, setIsHovered] = useState(false);
    const convos = CONVERSATIONS[locale];
    const current = convos[idx];
    const user = current?.user ?? "";
    const ai = current?.ai ?? "";
    const category = current?.category ?? "";

    // Parallax mouse tracking
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 120 };
    const xSpring = useSpring(mouseX, springConfig);
    const ySpring = useSpring(mouseY, springConfig);

    const bgX = useTransform(xSpring, [-0.5, 0.5], ["-8px", "8px"]);
    const bgY = useTransform(ySpring, [-0.5, 0.5], ["-8px", "8px"]);
    const fgX = useTransform(xSpring, [-0.5, 0.5], ["10px", "-10px"]);
    const fgY = useTransform(ySpring, [-0.5, 0.5], ["10px", "-10px"]);

    useEffect(() => {
        if (isHovered) return;
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
    }, [convos.length, isHovered]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0c0c0c]"
        >
            {/* Central Ambient Glow tracking mouse */}
            <motion.div
                className="absolute w-[250px] h-[250px] rounded-full bg-[#00BCD4] opacity-[0.05] blur-[70px] pointer-events-none"
                style={{ x: bgX, y: bgY }}
            />

            {/* Dedicated scaling container for robust mobile responsiveness */}
            <motion.div
                className="w-full h-full max-w-[400px] flex flex-col justify-between px-4 py-5 sm:px-6 transform scale-[0.85] sm:scale-100 origin-center max-h-[400px] z-10"
                style={{ x: fgX, y: fgY }}
            >

                {/* Top Bar - Channel Indicators */}
                <div className="flex justify-around items-center border-b border-white/5 pb-2.5 sm:pb-3 w-full shrink-0">
                    {CHANNELS.map((ch, i) => (
                        <motion.div
                            key={ch}
                            className="flex flex-col items-center gap-1 sm:gap-1.5 opacity-40 shrink-0 select-none"
                            animate={{ opacity: step === "ai" && i === (idx % 3) ? 1 : 0.4, scale: step === "ai" && i === (idx % 3) ? 1.05 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className={`text-xs sm:text-sm drop-shadow-md ${step === "ai" && i === (idx % 3) ? 'drop-shadow-[0_0_8px_rgba(0,188,212,0.6)]' : ''}`}>{i === 0 ? "💬" : i === 1 ? "🌐" : "📸"}</span>
                            <span className="text-[7.5px] sm:text-[8px] font-black uppercase text-[#00BCD4] drop-shadow-sm">{ch}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Central Brain / Analyzing Visual */}
                <div
                    className="relative flex-1 flex flex-col items-center justify-center -my-1 sm:-my-2 w-full min-h-[160px] cursor-default"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg width="100%" height="100%">
                            <motion.circle cx="50%" cy="50%" r="50" sm-r="60" fill="none" stroke="#00BCD4" strokeWidth="0.5" strokeDasharray="5 5" animate={isHovered ? { rotate: 360 } : {}} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: '50% 50%' }} />
                            <motion.circle cx="50%" cy="50%" r="80" sm-r="90" fill="none" stroke="#00BCD4" strokeWidth="0.5" strokeDasharray="3 3" animate={isHovered ? { rotate: -360 } : {}} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: '50% 50%' }} />
                        </svg>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === "user" && (
                            <motion.div
                                key="user-q"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-2xl p-3 sm:p-3.5 text-[11px] sm:text-xs text-white/90 max-w-[95%] sm:max-w-[90%] text-center shadow-md relative z-10 mx-auto backdrop-blur-md transition-colors"
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
                                        className="absolute inset-0 rounded-full border border-[#00BCD4] shadow-[0_0_15px_rgba(0,188,212,0.4)]"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                    <span className="text-xl sm:text-2xl drop-shadow-[0_0_8px_rgba(0,188,212,0.8)]">🧠</span>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-[#00BCD4] tracking-widest uppercase bg-black/60 backdrop-blur-sm px-2 py-0.5 sm:py-1 rounded shadow-lg ring-1 ring-[#00BCD4]/30">{category}...</span>
                            </motion.div>
                        )}

                        {step === "ai" && (
                            <motion.div
                                key="ai-r"
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-[#00BCD4] hover:bg-[#00acc1] rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 text-[10px] sm:text-[11px] leading-relaxed font-bold text-white shadow-[0_4px_20px_rgba(0,188,212,0.4)] text-center max-w-full sm:max-w-[95%] relative z-10 mx-auto transition-colors"
                            >
                                {ai}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Footer - Sales Assistant Mode */}
                <div className="flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 border border-white/10 hover:border-[#00BCD4]/30 mt-1 sm:mt-2 z-10 w-full shrink-0 backdrop-blur-md transition-all group shadow-lg">
                    <div className="flex items-center gap-2">
                        <motion.span
                            className="text-lg sm:text-xl drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                            animate={isHovered ? { y: [0, -3, 0] } : {}}
                            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                        >👩‍💻</motion.span>
                        <div className="flex flex-col">
                            <span className="text-[8.5px] sm:text-[9px] font-bold text-white uppercase leading-tight pt-[1px]">{locale === 'es' ? 'Asistente de Ventas' : 'Sales Assistant 24/7'}</span>
                            <span className="text-[7.5px] sm:text-[8px] text-[#00BCD4] font-bold leading-tight drop-shadow-sm">{locale === 'es' ? 'Convirtiendo leads' : 'Converting inquiries'}</span>
                        </div>
                    </div>
                    <div className="flex gap-1.5 items-center shrink-0">
                        <motion.div
                            className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_green]"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-[7.5px] sm:text-[8px] text-white/60 uppercase font-black tracking-wider">Live</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
