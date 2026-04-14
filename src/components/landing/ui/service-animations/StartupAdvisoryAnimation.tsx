"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
    const [isHovered, setIsHovered] = useState(false);
    const labels = MILESTONES[locale] ?? MILESTONES.en;
    const popups = POPUPS[locale] ?? POPUPS.en;

    // Parallax mouse tracking
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const xSpring = useSpring(mouseX, springConfig);
    const ySpring = useSpring(mouseY, springConfig);

    const fgX = useTransform(xSpring, [-0.5, 0.5], ["12px", "-12px"]);
    const fgY = useTransform(ySpring, [-0.5, 0.5], ["12px", "-12px"]);
    const bgX = useTransform(xSpring, [-0.5, 0.5], ["-8px", "8px"]);
    const bgY = useTransform(ySpring, [-0.5, 0.5], ["-8px", "8px"]);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setIdx(i => (i + 1) % labels.length);
        }, 3200);
        return () => clearInterval(interval);
    }, [labels.length, isHovered]);

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
            className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden bg-[#0c0c0c] p-6 group cursor-default"
        >
            {/* Ambient Nebula Background */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-transparent via-[#00BCD4] to-transparent opacity-[0.06] blur-[70px] pointer-events-none z-0"
                style={{ x: bgX, y: bgY }}
            />

            {/* Top Advisory Message */}
            <motion.div
                className="w-full flex justify-between items-center bg-white/5 backdrop-blur-md rounded-xl px-4 py-3 border border-white/5 hover:border-white/15 mb-4 z-10 shadow-lg transition-colors"
                style={{ x: fgX, y: fgY }}
            >
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-white uppercase tracking-wider drop-shadow-sm">{locale === 'es' ? 'Foco Estratégico' : 'Strategic Focus'}</span>
                    <span className="text-[7px] text-[#00BCD4] uppercase font-bold drop-shadow-[0_0_2px_rgba(0,188,212,0.8)] pt-[2px]">{locale === 'es' ? 'Apoyo IA en cada fase' : 'AI-Assisted Scaling'}</span>
                </div>
                <motion.span
                    className="text-xl drop-shadow-[0_0_10px_rgba(255,255,100,0.8)]"
                    animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >💡</motion.span>
            </motion.div>

            {/* Central Launch Visual with Mouse Tracking */}
            <div
                className="relative flex-1 w-full flex flex-col items-center justify-center -my-2 overflow-visible"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0 pointer-events-none">
                    {/* Main Growth Curve & Milestones SVG */}
                    <svg width="280" height="150" viewBox="0 0 280 150" className="overflow-visible absolute inset-0 m-auto z-0 pb-4">
                        <defs>
                            <filter id="rocketGlow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Avoided Detours - Red Dashed Lines */}
                        <motion.path
                            d="M 50 140 Q 100 20 180 160"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            opacity={isHovered ? 0.4 : 0.25}
                            className="transition-opacity"
                        />
                        <motion.path
                            d="M 120 160 Q 220 60 280 170"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            opacity={isHovered ? 0.3 : 0.2}
                            className="transition-opacity"
                        />

                        {/* Path Backdrop Glow */}
                        <motion.path
                            d="M 30 110 Q 120 100 230 20"
                            fill="none"
                            stroke="#00BCD4"
                            strokeWidth="8"
                            strokeLinecap="round"
                            opacity="0.1"
                            filter="blur(4px)"
                        />

                        {/* Main Path */}
                        <motion.path
                            d="M 30 110 Q 120 100 230 20"
                            fill="none"
                            stroke="#00BCD4"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            filter="url(#rocketGlow)"
                        />

                        {/* Milestones explicitly plotted */}
                        {POINTS.map((pt, i) => {
                            const isActive = idx === i;
                            return (
                                <motion.g
                                    key={i}
                                    animate={{ scale: isActive ? 1.3 : 1, opacity: idx >= i ? 1 : 0.4 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                                >
                                    <circle cx={pt.x} cy={pt.y} r="6" fill={isActive ? "#00ACC1" : "#00BCD4"} />
                                    <circle cx={pt.x} cy={pt.y} r="14" fill="none" stroke="#00BCD4" strokeWidth={isActive ? 2 : 1} opacity={isActive ? 0.8 : 0.3} />

                                    {/* Text Labels below */}
                                    <text x={pt.x} y={pt.y + 24} textAnchor="middle" fill="white" fontSize="9" fontWeight="800" className="uppercase tracking-tighter" style={{ textShadow: isActive ? "0 0 5px rgba(255,255,255,0.8)" : "none" }}>
                                        {labels[i]}
                                    </text>
                                    {/* Icons above */}
                                    <text x={pt.x} y={pt.y - 12} textAnchor="middle" fontSize="13" style={{ filter: isActive ? "drop-shadow(0 0 8px rgba(0,188,212,0.8))" : "none" }}>
                                        {STACK_ICONS[i]}
                                    </text>
                                </motion.g>
                            );
                        })}
                    </svg>

                    {/* The Rocket - Smooth motion div instead of SVG elements */}
                    <motion.div
                        className="absolute z-10 text-2xl drop-shadow-[0_0_15px_rgba(0,188,212,1)]"
                        style={{
                            left: "calc(50% - 140px)",
                            top: "calc(50% - 75px)",
                        }}
                        animate={{
                            x: POINTS.map(p => p.x - 14),
                            y: POINTS.map(p => p.y - 18),
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
                </motion.div>
            </div>

            {/* AI Action Footer - Interactive */}
            <motion.div
                className="mt-6 flex justify-center w-full z-20 min-h-[50px] pointer-events-none"
                style={{ x: fgX, y: fgY }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className={`bg-[#151515]/90 backdrop-blur-md border rounded-lg p-3 w-full max-w-[280px] flex items-center gap-3 transition-all ${isHovered ? 'border-[#00BCD4]/60 shadow-[0_0_20px_rgba(0,188,212,0.25)]' : 'border-[#00BCD4]/30 shadow-2xl'
                            }`}
                    >
                        <div className="flex flex-col flex-1 pl-1">
                            <span className="block text-[#00BCD4] text-[9px] font-black uppercase mb-0.5 tracking-wider drop-shadow-[0_0_3px_#00BCD4]">{labels[idx]}</span>
                            <span className="text-[11px] lg:text-xs font-semibold text-white leading-snug block drop-shadow-sm">{popups[idx]}</span>
                        </div>
                        <motion.span
                            className="text-xl"
                            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        >🤖</motion.span>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
