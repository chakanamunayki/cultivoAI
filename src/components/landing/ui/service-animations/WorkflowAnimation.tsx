"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { Locale } from "@/content/types";

// Central hub and surrounding apps layout
const NODES = [
    { id: "ai", label: "Cultivo AI Hub", x: 220, y: 100, type: "ai" },
    { id: "content", label: "Content Mgmt", x: 80, y: 40, type: "doc" },
    { id: "social", label: "Social Media", x: 360, y: 40, type: "social" },
    { id: "team", label: "Team Comms", x: 80, y: 160, type: "msg" },
    { id: "crm", label: "Client CRM", x: 360, y: 160, type: "crm" },
];

// Paths flowing toward or away from the central AI Hub
const PATHS = [
    // Content to AI
    { from: "content", to: "ai", d: "M 115 40 C 150 40 160 100 185 100" },
    // AI to Social Media
    { from: "ai", to: "social", d: "M 255 100 C 280 100 290 40 325 40" },
    // Team to AI
    { from: "team", to: "ai", d: "M 115 160 C 150 160 160 100 185 100" },
    // AI to CRM
    { from: "ai", to: "crm", d: "M 255 100 C 280 100 290 160 325 160" },
];

const ICONS = {
    ai: "🧠",
    doc: "📝",
    social: "📱",
    msg: "💬",
    crm: "👥",
};

export function WorkflowAnimation({ locale = "en" }: { locale?: Locale }) {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Parallax mouse tracking
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100 };
    const xSpring = useSpring(mouseX, springConfig);
    const ySpring = useSpring(mouseY, springConfig);

    const bgX = useTransform(xSpring, [-0.5, 0.5], ["-15px", "15px"]);
    const bgY = useTransform(ySpring, [-0.5, 0.5], ["-15px", "15px"]);
    const fgX = useTransform(xSpring, [-0.5, 0.5], ["5px", "-5px"]);
    const fgY = useTransform(ySpring, [-0.5, 0.5], ["5px", "-5px"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setHoveredNode(null);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0c0c0c] perspective-[1000px]"
        >
            {/* Dynamic Background Pattern reacting heavily to parallax */}
            <motion.div
                className="absolute inset-[-50px] opacity-[0.03] pointer-events-none"
                style={{ x: bgX, y: bgY }}
            >
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </motion.div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#00BCD4] rounded-full blur-[120px] opacity-[0.08] pointer-events-none" />

            {/* Central Node Pulse Radar */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-[#00BCD4]/30 pointer-events-none"
                animate={{ scale: [0.8, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                style={{ y: "-20px" }}
            />

            <motion.div
                className="w-full h-full max-w-[600px] flex flex-col justify-center px-2 py-4 sm:px-4 transform scale-[0.85] sm:scale-100 origin-center max-h-[460px] z-10"
                style={{ x: fgX, y: fgY }}
            >
                <svg
                    viewBox="0 0 440 200"
                    className="w-full select-none flex-1 mt-6 overflow-visible"
                >
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Connections */}
                    {PATHS.map((path, i) => (
                        <g key={i}>
                            <motion.path
                                d={path.d}
                                fill="none"
                                stroke={hoveredNode === "ai" ? "#00BCD4" : "#00BCD4"}
                                strokeWidth={hoveredNode === "ai" ? 2 : 1.5}
                                strokeDasharray="4 4"
                                strokeOpacity={hoveredNode === "ai" ? 0.6 : 0.2}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                            />
                            {/* Travelling Data Tokens */}
                            <motion.g
                                animate={hoveredNode && hoveredNode !== "ai" ? { opacity: 0.1 } : { opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <circle r={3.5} fill="#00BCD4" filter="url(#glow)">
                                    <animateMotion
                                        dur={path.from === "ai" ? "2.5s" : "2s"}
                                        repeatCount="indefinite"
                                        path={path.d}
                                        begin={`${i * 0.5}s`}
                                    />
                                </circle>
                                <text fontSize="8">
                                    <animateMotion
                                        dur={path.from === "ai" ? "2.5s" : "2s"}
                                        repeatCount="indefinite"
                                        path={path.d}
                                        begin={`${i * 0.5}s`}
                                    />
                                    <tspan dy="-8" dx="-5">{ICONS[NODES.find(n => n.id === path.from)?.type as keyof typeof ICONS]}</tspan>
                                </text>
                            </motion.g>
                        </g>
                    ))}

                    {/* Nodes */}
                    {NODES.map((node, i) => {
                        const isHovered = hoveredNode === node.id || (hoveredNode === "ai" && node.id !== "ai");
                        const isCenter = node.id === "ai";
                        return (
                            <motion.g
                                key={node.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: isCenter ? 0.2 : i * 0.15 + 0.4, type: "spring" }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                style={{ cursor: 'pointer' }}
                                className="group"
                            >
                                <motion.rect
                                    x={node.x - (isCenter ? 45 : 35)}
                                    y={node.y - (isCenter ? 25 : 20)}
                                    width={isCenter ? 90 : 70}
                                    height={isCenter ? 50 : 40}
                                    rx={12}
                                    fill={isHovered ? "rgba(0,188,212,0.15)" : "#1a1a1a"}
                                    stroke={isCenter ? "#00BCD4" : (isHovered ? "#00BCD4" : "#333")}
                                    strokeWidth={isHovered || isCenter ? 2 : 1}
                                    strokeOpacity={isHovered || isCenter ? 0.9 : 0.6}
                                    animate={isHovered ? { y: -2, scale: 1.05 } : { y: 0, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    style={{ filter: isHovered || isCenter ? "drop-shadow(0 0 12px rgba(0,188,212,0.4))" : "none" }}
                                />
                                {isCenter && (
                                    <rect
                                        x={node.x - 45}
                                        y={node.y - 25}
                                        width={90}
                                        height={4}
                                        rx={2}
                                        fill="#00BCD4"
                                        fillOpacity={1}
                                    />
                                )}
                                <text
                                    x={node.x}
                                    y={node.y + (isCenter ? 14 : 12)}
                                    textAnchor="middle"
                                    fontSize={isCenter ? 11 : 9}
                                    fontWeight="600"
                                    fill={isHovered || isCenter ? "#00BCD4" : "#ffffff"}
                                    fillOpacity={isHovered || isCenter ? 1 : 0.7}
                                    className="transition-colors pointer-events-none"
                                >
                                    {node.label}
                                </text>
                                <text
                                    x={node.x}
                                    y={node.y - (isCenter ? 2 : 2)}
                                    textAnchor="middle"
                                    fontSize={isCenter ? 18 : 14}
                                    className="pointer-events-none"
                                >
                                    {ICONS[node.type as keyof typeof ICONS]}
                                </text>
                            </motion.g>
                        );
                    })}
                </svg>

                {/* Status Message */}
                <div className="w-full flex justify-center mt-6 z-10">
                    <motion.div
                        className="flex items-center gap-3 rounded-full border border-[#00BCD4]/30 bg-black/40 px-5 py-2.5 backdrop-blur-md shadow-[0_0_15px_rgba(0,188,212,0.1)]"
                        animate={hoveredNode === "ai" ? { scale: 1.05, borderColor: "rgba(0,188,212,0.6)" } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-[#00BCD4]"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#e2e8e0]">
                            {locale === 'es' ? 'Hub Central de Automatización' : 'Central Automation Hub'}
                        </span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
