"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Locale } from "@/content/types";

const KPIS: Record<Locale, { label: string; value: string; trend: string }[]> = {
    en: [
        { label: "Bookings", value: "342", trend: "+12%" },
        { label: "Revenue", value: "$85k", trend: "+24%" },
        { label: "Costs", value: "$32k", trend: "−8%" },
    ],
    es: [
        { label: "Reservas", value: "342", trend: "+12%" },
        { label: "Ingresos", value: "$85k", trend: "+24%" },
        { label: "Costos", value: "$32k", trend: "−8%" },
    ],
    pt: [
        { label: "Reservas", value: "342", trend: "+12%" },
        { label: "Receita", value: "$85k", trend: "+24%" },
        { label: "Custos", value: "$32k", trend: "−8%" },
    ]
};

const CHART_H = [60, 40, 80, 50, 95];
const LINE_POINTS = "0,95 25,50 50,80 75,20 100,30";

export function DashboardAnimation({ locale = "en" }: { locale?: Locale }) {
    const kpis = KPIS[locale] ?? KPIS.en;
    const [msgIdx, setMsgIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Parallax mouse tracking
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const xSpring = useSpring(mouseX, springConfig);
    const ySpring = useSpring(mouseY, springConfig);

    const bgX = useTransform(xSpring, [-0.5, 0.5], ["-8px", "8px"]);
    const bgY = useTransform(ySpring, [-0.5, 0.5], ["-8px", "8px"]);
    const fgX = useTransform(xSpring, [-0.5, 0.5], ["12px", "-12px"]);
    const fgY = useTransform(ySpring, [-0.5, 0.5], ["12px", "-12px"]);

    const msgs = locale === "es" ? [
        "Nueva reserva (Paquete Premium) ✅",
        "Anomalía en costos de proveedores ⚠️",
        "Inventario: 3 camas en Retreat Sur",
        "IA: Optimización de turnos lista."
    ] : locale === "pt" ? [
        "Nova reserva (Pacote Premium) ✅",
        "Anomalia nos custos de fornecedores ⚠️",
        "Estoque: 3 camas no Retiro Sul",
        "IA: Otimização de turnos pronta."
    ] : [
        "New booking (Premium Package) ✅",
        "Cost anomaly detected in sourcing ⚠️",
        "Inventory: 3 beds left in South",
        "AI: Staff schedule optimized."
    ];

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setMsgIdx(i => (i + 1) % msgs.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [msgs.length, isHovered]);

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
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
        >
            {/* Ambient Mouse-tracked Glow */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full bg-[#00BCD4] opacity-[0.04] blur-[80px] pointer-events-none"
                style={{ x: bgX, y: bgY }}
            />

            <motion.div
                className="w-full h-full max-h-[400px] max-w-[600px] flex flex-col justify-between p-3 sm:p-6 lg:p-8 transform scale-[0.85] sm:scale-100 origin-center z-10"
                style={{ x: fgX, y: fgY }}
            >
                {/* Top KPIs Row */}
                <div className="w-full flex gap-3 sm:gap-4">
                    {kpis.map((kpi, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 bg-white/[0.03] hover:bg-white/[0.08] transition-colors border border-white/10 hover:border-[#00BCD4]/40 rounded-xl p-2 sm:p-3 lg:p-4 shadow-lg flex flex-col justify-between backdrop-blur-md cursor-default group"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <span className="text-[9px] sm:text-[10px] lg:text-xs font-black uppercase text-white/50 tracking-wider mb-1 sm:mb-2">{kpi.label}</span>
                            <div className="flex items-end justify-between">
                                <span className="text-sm sm:text-lg lg:text-xl font-black text-white group-hover:text-[#00BCD4] transition-colors">{kpi.value}</span>
                                <span className={`text-[9px] lg:text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{kpi.trend}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Middle Section: Chart + AI Integration */}
                <div className="w-full flex gap-3 sm:gap-4 my-3 sm:my-4 flex-1 min-h-[120px] sm:min-h-[140px]">
                    {/* Left: Interactive Line/Bar Chart */}
                    <div className="flex-[3] bg-[#151515] border border-white/10 rounded-xl p-3 sm:p-4 lg:p-5 flex flex-col shadow-2xl overflow-hidden relative group backdrop-blur-md">
                        <div className="flex justify-between items-center mb-2 sm:mb-4 text-[9px] lg:text-xs font-bold text-white/40 uppercase tracking-widest z-10">
                            <span>{locale === 'es' ? 'Flujo de Caja' : locale === 'pt' ? 'Fluxo de Caixa' : 'Cash Flow'}</span>
                            <motion.span
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 shadow-[0_0_8px_green]"
                            />
                        </div>

                        <div className="relative flex-1 flex items-end gap-2 sm:gap-3 lg:gap-4 pb-1 z-0 w-full">
                            {CHART_H.map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                                    <motion.div
                                        className="w-full rounded-t opacity-80 group-hover:opacity-100 transition-opacity"
                                        style={{ background: i % 2 === 0 ? "linear-gradient(to top, #00BCD4, #00BCD4aa)" : "linear-gradient(to top, rgba(255,255,255,0.1), rgba(255,255,255,0.05))" }}
                                        animate={{ height: [`0%`, `${h}%`, `${h}%`, `0%`] }}
                                        transition={{ duration: 7, delay: i * 0.1, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
                                    />
                                </div>
                            ))}
                            {/* Overlay Path */}
                            <svg className="absolute inset-0 h-full w-full pointer-events-none drop-shadow-md" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <motion.polyline
                                    points={LINE_POINTS}
                                    fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    animate={{ opacity: [0, 1, 1, 0], pathLength: [0, 1, 1, 0] }}
                                    transition={{ duration: 7, delay: 0.5, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Right: AI Assistant Panel */}
                    <div
                        className="flex-[2] bg-white/[0.03] border border-white/10 hover:border-[#00BCD4]/30 rounded-xl p-2 sm:p-3 lg:p-4 flex flex-col gap-2 sm:gap-3 shadow-inner overflow-hidden min-w-[35%] transition-colors backdrop-blur-md"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <span className="text-[9px] lg:text-xs font-black uppercase text-[#00BCD4] tracking-wider mb-0 sm:mb-1 flex items-center gap-1 sm:gap-2">
                            <span className="text-sm sm:text-base drop-shadow-[0_0_5px_rgba(0,188,212,0.5)]">🧠</span> Copilot
                        </span>
                        <div className="flex-1 bg-black/60 rounded-lg p-2 sm:p-3 flex flex-col gap-2 relative border border-white/5 overflow-hidden">
                            <motion.div
                                className="h-full w-full flex flex-col gap-2 overflow-hidden justify-center"
                                initial={false}
                            >
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={msgIdx}
                                        initial={{ opacity: 0, x: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -15, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className={`p-2 sm:p-2.5 lg:p-3 rounded-md text-[8px] sm:text-[9px] lg:text-xs font-medium leading-tight border transition-colors ${isHovered ? 'bg-[#00BCD4]/20 border-[#00BCD4]/50 shadow-[0_0_10px_rgba(0,188,212,0.2)] text-white' : 'bg-white/10 border-white/10 text-white/90'
                                            }`}
                                    >
                                        {msgs[msgIdx]}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom Logistics / Activity Row */}
                <div className="w-full bg-[#151515] hover:bg-[#1a1a1a] transition-colors border border-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 flex justify-between items-center shadow-lg backdrop-blur-md cursor-default">
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                        <motion.div
                            className="text-lg sm:text-xl lg:text-2xl drop-shadow-md"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >⚙️</motion.div>
                        <span className="text-[9px] sm:text-[11px] lg:text-xs font-black uppercase tracking-widest text-[#00BCD4]">
                            {locale === 'es' ? 'Motor de Operaciones' : locale === 'pt' ? 'Motor de Operações' : 'Logistics Engine'}
                        </span>
                    </div>
                    <div className="flex -space-x-1 sm:-space-x-2 shadow-md">
                        {["👩‍🔧", "👨‍🍳", "🧘‍♀️", "🚌"].map((emoji, i) => (
                            <motion.div
                                key={i}
                                className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 rounded-full bg-[#2a2a2a] border-2 border-[#1a1a1a] flex items-center justify-center text-[10px] sm:text-xs lg:text-sm z-10 shrink-0 hover:z-20 hover:scale-110 transition-transform shadow-sm"
                            >
                                {emoji}
                            </motion.div>
                        ))}
                        <div className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 rounded-full bg-[#00BCD4] border-2 border-[#1a1a1a] flex items-center justify-center text-[9px] sm:text-[10px] lg:text-xs font-black z-0 shrink-0 text-white shadow-[0_0_10px_rgba(0,188,212,0.4)]">
                            +8
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
