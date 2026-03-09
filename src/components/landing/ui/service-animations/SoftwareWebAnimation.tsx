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
                className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-transparent via-[#00BCD4] to-transparent opacity-[0.06] blur-[90px] pointer-events-none z-0"
                style={{ x: bgX, y: bgY }}
            />

            <motion.div
                className="w-full h-full max-w-[650px] lg:max-w-[800px] flex flex-col items-center justify-center p-3 sm:p-5 lg:p-6 transform scale-[0.8] sm:scale-100 origin-center z-10"
                style={{ x: fgX, y: fgY }}
            >
                {/* Main Content Area - Crossfades between IDE and Website */}
                <div
                    className="relative w-full flex-1 min-h-[300px] max-h-[440px] lg:max-h-[560px] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-shadow duration-500"
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
                                <div className="h-6 sm:h-8 bg-[#2d2d2d] flex items-center px-3 gap-1.5 border-b border-black/50 shrink-0">
                                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ff5f56]" />
                                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#27c93f]" />
                                    <span className="ml-2 text-[8px] sm:text-[9px] text-white/40 font-mono tracking-wider">page.tsx — CultivoAI</span>
                                </div>
                                {/* IDE Code Content */}
                                <div className="p-3 sm:p-4 font-mono text-[9px] sm:text-[12px] lg:text-[13px] leading-relaxed relative overflow-hidden flex-1">
                                    <motion.div
                                        initial={{ y: 0 }}
                                        animate={{ y: -80 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    >
                                        <div className="text-[#569cd6]"><span className="text-[#c586c0]">import</span> React <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'react'</span>;</div>
                                        <div className="text-[#569cd6]"><span className="text-[#c586c0]">import</span> &#123; motion &#125; <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'framer-motion'</span>;</div>
                                        <br />
                                        <div className="text-[#4ec9b0]">export default function <span className="text-[#dcdcaa]">RetreatHero</span>() &#123;</div>
                                        <div className="ml-4 text-[#c586c0]">return <span className="text-white/80">(</span></div>
                                        <div className="ml-8 text-[#808080]">// AI: Added breathing animation to hero image and transparent navbar</div>
                                        <div className="ml-8 text-[#569cd6]">&lt;<span className="text-[#4ec9b0]">motion.div</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">"relative w-full h-screen bg-[#1a2b29]"</span></div>
                                        <div className="ml-12 text-[#9cdcfe]">animate=<span className="text-[#ffd700]">&#123;&#123; scale: [1, 1.05, 1] &#125;&#125;</span></div>
                                        <div className="ml-12 text-[#9cdcfe]">transition=<span className="text-[#ffd700]">&#123;&#123; duration: 8, repeat: Infinity &#125;&#125;</span></div>
                                        <div className="ml-8 text-[#569cd6]">&gt;</div>
                                        <div className="ml-12 text-[#569cd6]">&lt;<span className="text-[#4ec9b0]">Navbar</span> <span className="text-[#9cdcfe]">theme</span>=<span className="text-[#ce9178]">"transparent"</span> /&gt;</div>
                                        <div className="ml-12 text-[#569cd6]">&lt;<span className="text-[#4ec9b0]">h1</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">"text-white font-serif text-4xl"</span>&gt;</div>
                                        <div className="ml-16 text-white/90">Find Your Balance</div>
                                        <div className="ml-12 text-[#569cd6]">&lt;/<span className="text-[#4ec9b0]">h1</span>&gt;</div>
                                        <div className="ml-12 text-[#569cd6]">&lt;<span className="text-[#4ec9b0]">BookingWidget</span> <span className="text-[#9cdcfe]">style</span>=<span className="text-[#ce9178]">"glassmorphism"</span> /&gt;</div>
                                        <div className="ml-8 text-[#569cd6]">&lt;/<span className="text-[#4ec9b0]">motion.div</span>&gt;</div>
                                        <div className="ml-4 text-white/80">)</div>
                                        <div className="text-white/80">&#125;</div>
                                    </motion.div>
                                    {/* Simulated typing cursor mask overlay */}
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1e1e1e] to-transparent z-10" />
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
                                <div className="h-6 sm:h-8 bg-[#e8eaed] flex items-center px-3 border-b border-black/10 shrink-0">
                                    <div className="flex gap-1.5">
                                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ff5f56]" />
                                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ffbd2e]" />
                                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#27c93f]" />
                                    </div>
                                    <div className="mx-auto bg-white rounded-md px-4 py-0.5 text-[7px] sm:text-[8px] text-gray-500 font-medium flex items-center gap-1 shadow-sm">
                                        🔒 zenretreat.com
                                    </div>
                                </div>
                                {/* Website Content */}
                                <div className="relative flex-1 bg-[#0f172a] flex flex-col overflow-hidden">
                                    {/* Breathing background image simulation */}
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
                                    </motion.div>

                                    {/* Animated Navbar */}
                                    <motion.div
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="w-full h-12 sm:h-14 flex items-center justify-between px-6 sm:px-8 relative z-20 shrink-0 border-b border-white/5"
                                    >
                                        <div className="text-white font-serif italic text-sm sm:text-base tracking-widest">ZEN</div>
                                        <div className="flex gap-4 sm:gap-6 items-center">
                                            <div className="text-[6px] sm:text-[7px] text-white/80 uppercase tracking-widest hover:text-white transition-colors cursor-pointer hidden sm:block">Retreats</div>
                                            <div className="text-[6px] sm:text-[7px] text-white/80 uppercase tracking-widest hover:text-white transition-colors cursor-pointer hidden sm:block">About</div>
                                            <div className="h-6 w-16 sm:h-7 sm:w-20 rounded bg-white text-black flex items-center justify-center text-[6px] sm:text-[7px] font-bold uppercase tracking-widest shadow-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                Book
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Website UI - Hero text and widget */}
                                    <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-6 text-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                            className="px-3 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-md text-white text-[6px] sm:text-[7px] uppercase tracking-[0.2em] mb-4 sm:mb-5"
                                        >
                                            Wellness & Recovery
                                        </motion.div>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                                            className="text-white text-3xl sm:text-5xl lg:text-6xl font-serif mb-6 sm:mb-8 leading-tight drop-shadow-xl"
                                            style={{ fontFamily: "Georgia, serif" }}
                                        >
                                            Find Your <br /><span className="italic text-[#00BCD4]">Balance</span>
                                        </motion.h2>

                                        {/* Widget / CTA Layout */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 w-full max-w-[340px] sm:max-w-[480px] shadow-2xl flex flex-col sm:flex-row gap-3 items-center"
                                        >
                                            <div className="flex-1 w-full flex items-center gap-3 bg-black/30 rounded-lg p-2.5 sm:p-3 border border-white/10">
                                                <div className="text-[14px] sm:text-[16px]">🗓️</div>
                                                <div className="flex flex-col items-start gap-1">
                                                    <div className="text-[5px] sm:text-[6px] text-white/50 uppercase tracking-widest">Select Dates</div>
                                                    <div className="text-[7px] sm:text-[8px] text-white font-bold">Oct 12 - Oct 19</div>
                                                </div>
                                            </div>
                                            <div className="flex-1 w-full flex items-center gap-3 bg-black/30 rounded-lg p-2.5 sm:p-3 border border-white/10">
                                                <div className="text-[14px] sm:text-[16px]">🧘</div>
                                                <div className="flex flex-col items-start gap-1">
                                                    <div className="text-[5px] sm:text-[6px] text-white/50 uppercase tracking-widest">Guests</div>
                                                    <div className="text-[7px] sm:text-[8px] text-white font-bold">2 Adults</div>
                                                </div>
                                            </div>
                                            <motion.div
                                                className="w-full sm:w-auto h-10 sm:h-auto sm:self-stretch px-4 sm:px-6 bg-[#00BCD4] text-white rounded-lg flex items-center justify-center text-[7.5px] sm:text-[8px] font-bold uppercase tracking-widest cursor-pointer shadow-lg"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                Search
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Interactive Scrubber / Progress Bar */}
                <div className="w-full flex items-center gap-3 mt-4 sm:mt-5 px-4 cursor-pointer shrink-0" onClick={() => setStep(s => s === "coding" ? "website" : "coding")}>
                    <div className="flex-1 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden relative">
                        {/* Playhead showing phase duration (5s) */}
                        <motion.div
                            key={step} // Key resets animation fully on change
                            className="absolute top-0 left-0 bottom-0 bg-[#00BCD4] rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }}
                        />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-white/50 uppercase tracking-widest hover:text-white transition-colors">
                        {step === "coding" ? "01 / Editor" : "02 / Preview"}
                    </span>
                </div>

            </motion.div>
        </div>
    );
}
