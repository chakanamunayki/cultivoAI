"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { Locale } from "@/content/types";

const NODES = [
    { id: "notion", label: "Notion", x: 60, y: 70, type: "doc" },
    { id: "slack", label: "Slack", x: 140, y: 130, type: "msg" },
    { id: "gmail", label: "Gmail", x: 220, y: 70, type: "mail" },
    { id: "whatsapp", label: "WhatsApp", x: 300, y: 130, type: "msg" },
    { id: "invoice", label: "Invoicing", x: 380, y: 80, type: "money" },
];

const PATHS = [
    { from: "notion", to: "slack", d: "M 80 85 C 100 110 120 110 140 120" },
    { from: "slack", to: "gmail", d: "M 160 130 C 180 110 200 90 220 85" },
    { from: "gmail", to: "whatsapp", d: "M 240 85 C 260 110 280 110 300 120" },
    { from: "whatsapp", to: "invoice", d: "M 320 130 C 340 120 360 100 380 95" },
];

const ICONS = {
    doc: "📄",
    msg: "💬",
    mail: "📧",
    money: "💰",
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
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00BCD4] rounded-full blur-[100px] opacity-[0.05] pointer-events-none" />

            <motion.div
                className="w-full h-full max-w-[500px] flex flex-col justify-center px-2 py-4 sm:px-4 transform scale-[0.8] sm:scale-100 origin-center max-h-[400px] z-10"
                style={{ x: fgX, y: fgY }}
            >
                <svg
                    viewBox="0 40 440 120"
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
                                stroke="#00BCD4"
                                strokeWidth={1.5}
                                strokeDasharray="4 4"
                                strokeOpacity={0.2}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                            />
                            {/* Travelling Tokens (Paused randomly on hover of any node for effect) */}
                            <motion.g
                                animate={hoveredNode ? { opacity: 0.2 } : { opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <circle r={3} fill="#00BCD4" filter="url(#glow)">
                                    <animateMotion
                                        dur="3s"
                                        repeatCount="indefinite"
                                        path={path.d}
                                        begin={`${i * 0.7}s`}
                                    />
                                </circle>
                                <text fontSize="10">
                                    <animateMotion
                                        dur="3s"
                                        repeatCount="indefinite"
                                        path={path.d}
                                        begin={`${i * 0.7}s`}
                                    />
                                    <tspan dy="-10" dx="-5">{ICONS[NODES.find(n => n.id === path.from)?.type as keyof typeof ICONS]}</tspan>
                                </text>
                            </motion.g>
                        </g>
                    ))}

                    {/* Nodes */}
                    {NODES.map((node, i) => {
                        const isHovered = hoveredNode === node.id;
                        return (
                            <motion.g
                                key={node.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 + 0.5 }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                style={{ cursor: 'crosshair' }}
                            >
                                <motion.rect
                                    x={node.x - 35}
                                    y={node.y - 20}
                                    width={70}
                                    height={40}
                                    rx={12}
                                    fill={isHovered ? "rgba(0,188,212,0.15)" : "#1a1a1a"}
                                    stroke="#00BCD4"
                                    strokeWidth={isHovered ? 2 : 1}
                                    strokeOpacity={isHovered ? 0.9 : 0.4}
                                    animate={isHovered ? { y: -2 } : { y: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    style={{ filter: isHovered ? "drop-shadow(0 0 8px rgba(0,188,212,0.5))" : "none" }}
                                />
                                <rect
                                    x={node.x - 35}
                                    y={node.y - 20}
                                    width={70}
                                    height={4}
                                    rx={2}
                                    fill="#00BCD4"
                                    fillOpacity={isHovered ? 1 : 0.6}
                                />
                                <text
                                    x={node.x}
                                    y={node.y + 12}
                                    textAnchor="middle"
                                    fontSize={10}
                                    fontWeight="600"
                                    fill={isHovered ? "#00BCD4" : "#ffffff"}
                                    fillOpacity={isHovered ? 1 : 0.7}
                                    className="transition-colors pointer-events-none"
                                >
                                    {node.label}
                                </text>
                                <text
                                    x={node.x}
                                    y={node.y - 2}
                                    textAnchor="middle"
                                    fontSize={14}
                                    className="pointer-events-none"
                                >
                                    {ICONS[node.type as keyof typeof ICONS]}
                                </text>
                            </motion.g>
                        );
                    })}
                </svg>

                {/* "Works while you sleep" message */}
                <motion.div
                    className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-sm self-center justify-self-end mt-4 z-10 shadow-lg"
                    animate={hoveredNode ? { scale: 1.05, opacity: 1, borderColor: "rgba(0,188,212,0.3)" } : { opacity: [0.4, 1, 0.4], scale: 1 }}
                    transition={{ duration: hoveredNode ? 0.3 : 4, repeat: hoveredNode ? 0 : Infinity }}
                >
                    <span className="text-xl">🌙</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00BCD4]">
                        {locale === 'es' ? 'Eficiencia 24/7' : 'Always-on Efficiency'}
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}
