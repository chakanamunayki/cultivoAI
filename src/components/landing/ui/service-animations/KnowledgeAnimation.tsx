"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
    pt: [
        { title: "Pesquisa: Tendências de Bem-estar", category: "Pesquisa", icon: "📊", lines: ["Tendência: Recuperação de burnout", "Lacuna: Terapia somática", "Demanda: Dietas da fazenda à mesa"] },
        { title: "Geração de Conteúdo: Campanha", category: "Criação", icon: "✍️", lines: ["Rascunho: 'Curar por dentro'", "Foco: Processo de Temazcal", "Aplicando a voz da marca..."] },
        { title: "Ativo de Conteúdo Publicado", category: "Saída", icon: "✨", lines: ["Público: Profissionais de saúde", "Tom: Empático, calmo", "Status: No Blog e no IG"] }
    ],
};

const LIFECYCLE: Record<Locale, string[]> = {
    en: ["Research", "Create", "Publish"],
    es: ["Investigar", "Crear", "Publicar"],
    pt: ["Pesquisar", "Criar", "Publicar"],
};

export function KnowledgeAnimation({ locale = "en" }: { locale?: Locale }) {
    const [docIdx, setDocIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const docs = DOCS[locale] ?? DOCS.en;
    const doc = docs[docIdx] || docs[0]!;
    const steps = LIFECYCLE[locale] ?? LIFECYCLE.en;

    // Parallax mouse tracking & 3D tilt
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const xSpring = useSpring(mouseX, springConfig);
    const ySpring = useSpring(mouseY, springConfig);

    const bgX = useTransform(xSpring, [-0.5, 0.5], ["-8px", "8px"]);
    const bgY = useTransform(ySpring, [-0.5, 0.5], ["-8px", "8px"]);
    const fgX = useTransform(xSpring, [-0.5, 0.5], ["10px", "-10px"]);
    const fgY = useTransform(ySpring, [-0.5, 0.5], ["10px", "-10px"]);

    // 3D card tilt values
    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setDocIdx(prev => (prev + 1) % docs.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [docs.length, isHovered]);

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
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0c0c0c] perspective-[1000px]"
        >
            {/* Ambient Mouse Tracking Light */}
            <motion.div
                className="absolute w-[200px] h-[200px] rounded-full bg-[#00BCD4] opacity-[0.06] blur-[60px] pointer-events-none z-0"
                style={{ x: bgX, y: bgY }}
            />

            {/* Dedicated scaling container for robust mobile responsiveness */}
            <motion.div
                className="w-full h-full max-w-[400px] flex flex-col justify-center px-4 py-5 sm:px-6 transform scale-[0.85] sm:scale-100 origin-center max-h-[400px] z-10"
                style={{ x: fgX, y: fgY }}
            >
                {/* Top Bar - Lifecycle Tracker */}
                <div className="flex w-full justify-between items-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 border border-white/5 hover:border-white/10 mb-4 sm:mb-5 shadow-lg transition-colors cursor-default">
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
                                    boxShadow: ["none", "0 0 10px rgba(0,188,212,0.8)", "0 0 10px rgba(0,188,212,0.8)", "none"]
                                }}
                                transition={{ duration: 6, times: [0, i * 0.3 + 0.1, 0.9, 1] }}
                            />
                            <span className="text-[7.5px] sm:text-[8px] font-black text-white uppercase tracking-wider drop-shadow-sm">{step}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Central Document Display with 3D Tilt */}
                <div
                    className="flex-1 w-full flex justify-center items-center -my-1 sm:-my-2 perspective-[1200px]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={docIdx}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            className="relative w-full max-w-[300px] rounded-2xl border border-white/10 hover:border-[#00BCD4]/40 bg-[#151515]/90 backdrop-blur-xl p-4 sm:p-5 shadow-2xl min-h-[145px] cursor-pointer transition-colors"
                            initial={{ opacity: 0, scale: 0.95, z: -50 }}
                            animate={{ opacity: 1, scale: 1, z: 0 }}
                            exit={{ opacity: 0, scale: 0.98, z: -100 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Inner Depth Layer */}
                            <motion.div style={{ transform: "translateZ(30px)" }}>
                                <div className="absolute -top-1 -right-1 bg-[#00BCD4]/10 text-[#00BCD4] px-2 sm:px-2.5 py-1 rounded-md text-[7.5px] sm:text-[8px] font-black uppercase tracking-widest leading-none ring-1 ring-[#00BCD4]/30 shadow-[0_0_10px_rgba(0,188,212,0.2)]">
                                    {doc.category}
                                </div>

                                <h4 className="flex items-center text-white font-black text-[11px] sm:text-[12px] leading-tight mb-3 sm:mb-4 pr-16 border-b border-white/10 pb-2.5 sm:pb-3 drop-shadow-md">
                                    <span className="mr-2 sm:mr-2.5 text-[14px] drop-shadow-[0_0_8px_rgba(0,188,212,0.5)]">{doc.icon}</span>
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
                                            <span className="text-[#00BCD4] text-[9.5px] sm:text-[10px] sm:mt-[1px] drop-shadow-[0_0_2px_#00BCD4]">♦</span>
                                            <p className="text-[10.5px] sm:text-[11px] text-white/80 font-semibold leading-relaxed tracking-wide shadow-black drop-shadow-sm">{line}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Simulated Typewriter Cursor */}
                                <motion.div
                                    className="h-2 w-1.5 bg-[#00BCD4] mt-2.5 sm:mt-3 shadow-[0_0_5px_#00BCD4]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom "Signal" indicator */}
                <div className="mt-4 sm:mt-5 flex items-center justify-between w-full rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/5 hover:border-[#00BCD4]/30 px-3 py-2 sm:px-4 sm:py-2 transition-colors cursor-default shadow-lg group">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <motion.span
                            className="text-[15px] sm:text-[16px] drop-shadow-lg group-hover:drop-shadow-[0_0_10px_rgba(255,255,100,0.8)]"
                            animate={isHovered ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : { scale: [1, 1.2, 1] }}
                            transition={{ duration: isHovered ? 0.5 : 2, repeat: Infinity }}
                        >⚡</motion.span>
                        <div className="flex flex-col">
                            <span className="text-[8.5px] sm:text-[9px] font-bold text-white uppercase tracking-wider drop-shadow-sm">{locale === 'es' ? 'Motor de Contenido' : locale === 'pt' ? 'Motor de Conteúdo' : 'Content Engine'}</span>
                            <span className="text-[7.5px] sm:text-[8px] text-[#00BCD4] font-black uppercase tracking-tight leading-tight pt-[1px] drop-shadow-[0_0_2px_rgba(0,188,212,0.8)]">{locale === 'es' ? 'Creación Automática' : locale === 'pt' ? 'Criação Automática' : 'Always Generating'}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
