"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";

const MILESTONES: Record<Locale, string[]> = {
    en: ["Research", "Build", "Optimize", "Scale"],
    es: ["Investigar", "Construir", "Optimizar", "Escalar"],
};

const POPUPS: Record<Locale, string[]> = {
    en: [
        "Automate competitor & market data collection",
        "Deploy custom AI tools & core Web App",
        "Integrate systems & automate workflows",
        "Scale infrastructure & team handoff"
    ],
    es: [
        "Automatizar captura de datos de mercado",
        "Desplegar herramientas IA y Web App core",
        "Integrar sistemas y flujos de trabajo",
        "Escalar infraestructura e IA al equipo"
    ]
};

const STACK_ICONS = ["🔍", "⚙️", "📈", "🚀"];
const POINTS = [
    { x: 30, y: 110 },
    { x: 95, y: 95 },
    { x: 160, y: 65 },
    { x: 230, y: 20 },
];

export function StartupAdvisoryAnimation({ locale = "en" }: { locale?: Locale }) {
    const [idx, setIdx] = useState(0);
    const labels = MILESTONES[locale] ?? MILESTONES.en;
    const popups = POPUPS[locale] ?? POPUPS.en;

    useEffect(() => {
        const interval = setInterval(() => {
            setIdx(i => (i + 1) % labels.length);
        }, 3200);
        return () => clearInterval(interval);
    }, [labels.length]);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden bg-[#0c0c0c] p-6">
            {/* Top Advisory Message */}
            <div className="w-full flex justify-between items-center bg-white/5 rounded-xl px-4 py-3 border border-white/5 mb-4 z-10">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-white uppercase tracking-wider">{locale === 'es' ? 'Foco Estratégico' : 'Strategic Focus'}</span>
                    <span className="text-[7px] text-[#00BCD4] uppercase font-bold">{locale === 'es' ? 'Apoyo IA en cada fase' : 'AI-Assisted Scaling'}</span>
                </div>
                <span className="text-xl">💡</span>
            </div>

            {/* Central Launch Visual */}
            <div className="relative flex-1 w-full flex flex-col items-center justify-center -my-2 overflow-visible">

                {/* Main Growth Curve & Milestones SVG */}
                <svg width="280" height="150" viewBox="0 0 280 150" className="overflow-visible absolute inset-0 m-auto z-0 pb-4">
                    {/* Avoided Detours - Red Dashed Lines */}
                    <motion.path
                        d="M 50 140 Q 100 20 180 160"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.25"
                    />
                    <motion.path
                        d="M 120 160 Q 220 60 280 170"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.2"
                    />

                    {/* Path */}
                    <motion.path
                        d="M 30 110 Q 120 100 230 20"
                        fill="none"
                        stroke="#00BCD4"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Milestones explicitly plotted */}
                    {POINTS.map((pt, i) => (
                        <motion.g
                            key={i}
                            animate={{ scale: idx === i ? 1.3 : 1, opacity: idx >= i ? 1 : 0.4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <circle cx={pt.x} cy={pt.y} r="6" fill="#00BCD4" />
                            <circle cx={pt.x} cy={pt.y} r="14" fill="none" stroke="#00BCD4" strokeWidth="1" opacity="0.3" />

                            {/* Text Labels below */}
                            <text x={pt.x} y={pt.y + 24} textAnchor="middle" fill="white" fontSize="9" fontWeight="800" className="uppercase tracking-tighter">
                                {labels[i]}
                            </text>
                            {/* Icons above */}
                            <text x={pt.x} y={pt.y - 12} textAnchor="middle" fontSize="13">
                                {STACK_ICONS[i]}
                            </text>
                        </motion.g>
                    ))}
                </svg>

                {/* The Rocket - Smooth motion div instead of SVG elements */}
                <motion.div
                    className="absolute z-10 text-xl"
                    style={{
                        left: "calc(50% - 140px)",
                        top: "calc(50% - 75px)",
                    }}
                    animate={{
                        x: POINTS.map(p => p.x - 10),
                        y: POINTS.map(p => p.y - 14),
                        rotate: [45, 30, 15, 0],
                    }}
                    transition={{
                        duration: 12.8, // 4 steps * 3.2s interval
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.33, 0.66, 1]
                    }}
                >
                    🚀
                </motion.div>
            </div>

            {/* AI Action Footer (Replacing previous V1 ready pill) */}
            <div className="mt-6 flex justify-center w-full z-10 min-h-[50px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="bg-[#151515] border border-[#00BCD4]/30 rounded-lg p-3 shadow-2xl w-full max-w-[280px] flex items-center gap-3"
                    >
                        <div className="flex flex-col flex-1 pl-1">
                            <span className="block text-[#00BCD4] text-[9px] font-black uppercase mb-0.5 tracking-wider">{labels[idx]}</span>
                            <span className="text-[11px] lg:text-xs font-semibold text-white leading-snug block">{popups[idx]}</span>
                        </div>
                        <span className="text-xl opacity-60">🤖</span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
