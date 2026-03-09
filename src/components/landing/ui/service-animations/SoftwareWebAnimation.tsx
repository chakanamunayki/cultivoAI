"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import type { Locale } from "@/content/types";

export function SoftwareWebAnimation({ locale = "en" }: { locale?: Locale }) {
    const [step, setStep] = useState<"coding" | "website">("coding");
    const [isHovered, setIsHovered] = useState(false);

    // Parallax mouse tracking
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 120 };
    const xSpring = useSpring(mouseX, springConfig);
    const ySpring = useSpring(mouseY, springConfig);

    const fgX = useTransform(xSpring, [-0.5, 0.5], ["10px", "-10px"]);
    const fgY = useTransform(ySpring, [-0.5, 0.5], ["10px", "-10px"]);
    const bgX = useTransform(xSpring, [-0.5, 0.5], ["-10px", "10px"]);
    const bgY = useTransform(ySpring, [-0.5, 0.5], ["-10px", "10px"]);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setStep(s => s === "coding" ? "website" : "coding");
        }, 5000); // 5 sec per phase
        return () => clearInterval(interval);
    }, [isHovered]);

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
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0c0c0c] perspective-[1000px] cursor-default"
        >
            {/* Ambient Background Glow */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-transparent via-[#00BCD4] to-transparent opacity-[0.05] blur-[80px] pointer-events-none z-0"
                style={{ x: bgX, y: bgY }}
            />

            <motion.div
                className="w-full h-full max-w-[450px] flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 transform scale-[0.85] sm:scale-100 origin-center z-10"
                style={{ x: fgX, y: fgY }}
            >
                {/* Top Status Bar */}
                <div className="w-full flex justify-between items-center bg-white/5 backdrop-blur-md rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 border border-white/5 mb-4 shadow-lg">
                    <div className="flex items-center gap-2">
                        <motion.div
                            className="text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                            animate={step === "coding" ? { rotate: 360 } : { scale: [1, 1.1, 1] }}
                            transition={step === "coding" ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 2, repeat: Infinity }}
                        >
                            {step === "coding" ? "⚙️" : "✨"}
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white drop-shadow-sm">
                                {locale === 'es' ? 'Desarrollo con IA' : 'AI-Assisted Build'}
                            </span>
                            <span className="text-[7.5px] sm:text-[8px] font-bold tracking-wider text-[#00BCD4] mt-[1px]">
                                {step === "coding" ? (locale === 'es' ? 'Generando código...' : 'Generating code...') : (locale === 'es' ? 'Despliegue exitoso' : 'Deployment successful')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - Crossfades between IDE and Website */}
                <div
                    className="relative w-full flex-1 max-h-[220px] rounded-xl overflow-hidden shadow-2xl transition-shadow duration-500"
                    style={{ boxShadow: step === "coding" ? "0 20px 40px rgba(0,0,0,0.5)" : "0 20px 40px rgba(0,188,212,0.15)" }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        {step === "coding" ? (
                            <motion.div
                                key="coding"
                                className="absolute inset-0 bg-[#1e1e1e] flex flex-col border border-white/10 rounded-xl"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* IDE Header */}
                                <div className="h-6 sm:h-8 bg-[#2d2d2d] flex items-center px-3 gap-1.5 border-b border-black/50">
                                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ff5f56]" />
                                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#27c93f]" />
                                    <span className="ml-2 text-[8px] sm:text-[9px] text-white/40 font-mono tracking-wider">page.tsx — CultivoAI</span>
                                </div>
                                {/* IDE Code Content */}
                                <div className="p-3 sm:p-4 font-mono text-[8px] sm:text-[10px] leading-relaxed relative overflow-hidden flex-1">
                                    <motion.div
                                        initial={{ y: 0 }}
                                        animate={{ y: -60 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    >
                                        <div className="text-[#569cd6]"><span className="text-[#c586c0]">import</span> React <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'react'</span>;</div>
                                        <div className="text-[#569cd6]"><span className="text-[#c586c0]">import</span> &#123; motion &#125; <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'framer-motion'</span>;</div>
                                        <br />
                                        <div className="text-[#4ec9b0]">export default function <span className="text-[#dcdcaa]">RetreatHero</span>() &#123;</div>
                                        <div className="ml-4 text-[#c586c0]">return <span className="text-white/80">(</span></div>
                                        <div className="ml-8 text-[#808080]">// AI: Added breathing animation to hero image</div>
                                        <div className="ml-8 text-[#569cd6]">&lt;<span className="text-[#4ec9b0]">motion.div</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">"relative w-full h-screen"</span></div>
                                        <div className="ml-12 text-[#9cdcfe]">animate=<span className="text-[#ffd700]">&#123;&#123; scale: [1, 1.05, 1] &#125;&#125;</span></div>
                                        <div className="ml-12 text-[#9cdcfe]">transition=<span className="text-[#ffd700]">&#123;&#123; duration: 8, repeat: Infinity &#125;&#125;</span></div>
                                        <div className="ml-8 text-[#569cd6]">&gt;</div>
                                        <div className="ml-12 text-[#569cd6]">&lt;<span className="text-[#4ec9b0]">Navbar</span> /&gt;</div>
                                        <div className="ml-12 text-[#569cd6]">&lt;<span className="text-[#4ec9b0]">h1</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">"text-white font-serif"</span>&gt;</div>
                                        <div className="ml-16 text-white/90">Find Your Balance</div>
                                        <div className="ml-12 text-[#569cd6]">&lt;/<span className="text-[#4ec9b0]">h1</span>&gt;</div>
                                        <div className="ml-12 text-[#569cd6]">&lt;<span className="text-[#4ec9b0]">BookingWidget</span> /&gt;</div>
                                        <div className="ml-8 text-[#569cd6]">&lt;/<span className="text-[#4ec9b0]">motion.div</span>&gt;</div>
                                        <div className="ml-4 text-white/80">)</div>
                                        <div className="text-white/80">&#125;</div>
                                    </motion.div>
                                    {/* Simulated typing cursor mask overlay */}
                                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#1e1e1e] to-transparent z-10" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="website"
                                className="absolute inset-0 bg-[#f8f9fa] flex flex-col border border-[#00BCD4]/30 rounded-xl overflow-hidden"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Browser Header */}
                                <div className="h-6 sm:h-8 bg-[#e8eaed] flex items-center px-3 border-b border-black/10">
                                    <div className="flex gap-1.5">
                                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ff5f56]" />
                                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ffbd2e]" />
                                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#27c93f]" />
                                    </div>
                                    <div className="mx-auto bg-white rounded-md px-4 py-0.5 text-[7px] sm:text-[8px] text-gray-500 font-medium flex items-center gap-1">
                                        🔒 zenretreat.com
                                    </div>
                                </div>
                                {/* Website Content */}
                                <div className="relative flex-1 bg-[#1a2b29] p-4 sm:p-5 flex flex-col items-center justify-center overflow-hidden">
                                    {/* Breathing background image simulation */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-[#1a2b29] to-[#2c4c47]"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    {/* Website UI */}
                                    <div className="relative z-10 text-center w-full">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                            className="text-[#e2e8e0] text-[6px] sm:text-[7px] uppercase tracking-[0.2em] font-bold mb-2"
                                        >
                                            Wellness & Recovery
                                        </motion.div>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                            className="text-white text-xl sm:text-2xl font-serif mb-4"
                                            style={{ fontFamily: "Georgia, serif" }}
                                        >
                                            Find Your Balance
                                        </motion.h2>

                                        {/* Widget / CTA */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 sm:p-4 max-w-[200px] mx-auto shadow-xl"
                                        >
                                            <div className="h-2 w-16 bg-white/20 rounded-full mx-auto mb-2.5" />
                                            <div className="flex justify-between gap-2 mb-3">
                                                <div className="h-6 flex-1 bg-white/10 rounded" />
                                                <div className="h-6 flex-1 bg-white/10 rounded" />
                                            </div>
                                            <motion.div
                                                className="w-full h-7 bg-white text-[#1a2b29] rounded flex items-center justify-center text-[8px] sm:text-[9px] font-bold uppercase tracking-wider"
                                                whileHover={{ scale: 1.02, backgroundColor: "#e2e8f0" }}
                                            >
                                                {locale === 'es' ? 'Reservar Retiro' : 'Book Retreat'}
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Interactive Scrubber / Progress Bar */}
                <div className="w-full flex items-center gap-3 mt-4 sm:mt-5 px-4 cursor-pointer" onClick={() => setStep(s => s === "coding" ? "website" : "coding")}>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                        {/* Playhead showing phase duration (5s) */}
                        <motion.div
                            key={step} // Key resets animation fully on change
                            className="absolute top-0 left-0 bottom-0 bg-[#00BCD4] rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }}
                        />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold text-white/50 uppercase tracking-widest hover:text-white transition-colors">
                        {step === "coding" ? "01 / Editor" : "02 / Preview"}
                    </span>
                </div>

            </motion.div>
        </div>
    );
}
