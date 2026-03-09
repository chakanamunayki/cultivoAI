"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";

const MODULES = {
    en: [
        { label: "Bookings & Payments", desc: "152 pax • $45k confirmed", icon: "💳" },
        { label: "Guest Messaging", desc: "3 unread • WhatsApp via AI", icon: "💬" },
        { label: "Itinerary & Tasks", desc: "Yoga 8am • Chef prepped", icon: "📋" },
        { label: "Dashboards", desc: "98% Occupancy • 4.9⭐", icon: "📊" },
    ],
    es: [
        { label: "Reservas y Pagos", desc: "152 pax • $45k confirmado", icon: "💳" },
        { label: "Mensajería", desc: "3 sin leer • WhatsApp IA", icon: "💬" },
        { label: "Itinerario y Tareas", desc: "Yoga 8am • Chef listo", icon: "📋" },
        { label: "Panel de Control", desc: "98% Ocupación • 4.9⭐", icon: "📊" },
    ]
};

export function RetreatOpsAnimation({ locale = "en" }: { locale?: Locale }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const modules = MODULES[locale] ?? MODULES.en;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx(i => (i + 1) % modules.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [modules.length]);

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* Dedicated scaling container for robust mobile responsiveness */}
            <div className="w-full h-full max-h-[400px] max-w-[400px] flex flex-col justify-between p-4 sm:p-5 lg:p-6 transform scale-[0.85] sm:scale-100 origin-center">

                {/* Top Text - The "Brain" Concept */}
                <div className="w-full flex justify-between items-center mb-4 sm:mb-6 px-2 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                        <motion.div
                            className="relative flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="absolute inset-0 bg-[#00BCD4] rounded-full blur-md opacity-30" />
                            <span className="text-lg sm:text-xl relative z-10">🧠</span>
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-[9px] sm:text-[10px] font-black uppercase text-white tracking-widest">{locale === 'es' ? 'Cerebro Operativo' : 'Operational Brain'}</span>
                            <span className="text-[7.5px] sm:text-[8px] text-[#00BCD4] font-bold tracking-wider">{locale === 'es' ? 'Gestión Centralizada' : 'Centralized Management'}</span>
                        </div>
                    </div>
                    <div className="flex gap-1 sm:gap-1.5 items-center bg-white/5 px-2 sm:px-2.5 py-1 rounded-full border border-white/10 shrink-0">
                        <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-green-500 shadow-[0_0_5px_green]" />
                        <span className="text-[7px] sm:text-[7.5px] uppercase font-black text-white/70">Online</span>
                    </div>
                </div>

                {/* Central 2x2 Grid of Modules */}
                <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-3 flex-1 px-1 sm:px-2">
                    {modules.map((mod, i) => (
                        <motion.div
                            key={i}
                            className={`relative rounded-xl border flex flex-col justify-center items-center p-2 sm:p-3 text-center overflow-hidden transition-colors duration-500
                                ${activeIdx === i ? 'bg-[#00BCD4]/10 border-[#00BCD4]/50 shadow-lg' : 'bg-white/5 border-white/5 opacity-60'}`}
                            animate={{ scale: activeIdx === i ? 1.02 : 1 }}
                        >
                            {/* Active Indicator Glow */}
                            <AnimatePresence>
                                {activeIdx === i && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-[#00BCD4]/20 to-transparent pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </AnimatePresence>

                            <div className="relative z-10">
                                <motion.span
                                    className="text-xl sm:text-2xl mb-1 sm:mb-1.5 block"
                                    animate={activeIdx === i ? { y: [0, -4, 0] } : {}}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    {mod.icon}
                                </motion.span>
                                <h3 className={`text-[9px] sm:text-[10px] font-black uppercase tracking-tight mb-0.5 sm:mb-1 leading-tight ${activeIdx === i ? 'text-white' : 'text-white/60'}`}>
                                    {mod.label}
                                </h3>
                                <p className={`text-[7px] sm:text-[8px] font-bold leading-tight ${activeIdx === i ? 'text-[#00BCD4]' : 'text-white/30'}`}>
                                    {mod.desc}
                                </p>
                            </div>

                            {/* Connection Lines (Visual Polish) */}
                            {activeIdx === i && (
                                <motion.div
                                    className="absolute top-0 right-0 h-1 w-full bg-[#00BCD4]"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ transformOrigin: "left" }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Footer - AI Agents Activity */}
                <div className="w-full bg-white/5 rounded-xl border border-white/10 mt-4 sm:mt-5 p-2 sm:p-3 flex justify-between items-center z-10">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-base sm:text-lg">🤖</span>
                        <div className="flex flex-col">
                            <span className="text-[8px] sm:text-[9px] font-black uppercase text-white/50 tracking-wider">
                                {locale === 'es' ? 'Agentes IA Activos' : 'AI Agents Active'}
                            </span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeIdx}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-[9px] sm:text-[10px] text-white font-bold whitespace-nowrap"
                                >
                                    {activeIdx === 0 && (locale === 'es' ? 'Procesando pago Stripe...' : 'Processing Stripe invoice...')}
                                    {activeIdx === 1 && (locale === 'es' ? 'Respondiendo a María...' : 'Replying to Maria on WA...')}
                                    {activeIdx === 2 && (locale === 'es' ? 'Avisando dieta vegana...' : 'Notifying chef of vegan diet...')}
                                    {activeIdx === 3 && (locale === 'es' ? 'Generando reporte semanal...' : 'Generating weekly report...')}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
