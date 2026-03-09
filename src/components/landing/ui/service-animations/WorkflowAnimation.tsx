"use client";

import { motion } from "framer-motion";
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
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* Dynamic Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="w-full h-full max-w-[500px] flex flex-col justify-center px-2 py-4 sm:px-4 transform scale-[0.8] sm:scale-100 origin-center max-h-[400px]">
                <svg
                    viewBox="0 40 440 120"
                    className="w-full select-none flex-1 mt-6"
                    style={{ overflow: "visible" }}
                >
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
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
                            {/* Travelling Tokens */}
                            <motion.g>
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
                    {NODES.map((node, i) => (
                        <motion.g
                            key={node.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 + 0.5 }}
                        >
                            <rect
                                x={node.x - 35}
                                y={node.y - 20}
                                width={70}
                                height={40}
                                rx={12}
                                fill="#1a1a1a"
                                stroke="#00BCD4"
                                strokeWidth={1}
                                strokeOpacity={0.4}
                            />
                            <rect
                                x={node.x - 35}
                                y={node.y - 20}
                                width={70}
                                height={4}
                                rx={2}
                                fill="#00BCD4"
                                fillOpacity={0.6}
                            />
                            <text
                                x={node.x}
                                y={node.y + 12}
                                textAnchor="middle"
                                fontSize={10}
                                fontWeight="600"
                                fill="#ffffff"
                                fillOpacity={0.7}
                            >
                                {node.label}
                            </text>
                            <text
                                x={node.x}
                                y={node.y - 2}
                                textAnchor="middle"
                                fontSize={14}
                            >
                                {ICONS[node.type as keyof typeof ICONS]}
                            </text>
                        </motion.g>
                    ))}
                </svg>

                {/* "Works while you sleep" message */}
                <motion.div
                    className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-sm self-center justify-self-end mt-4 z-10"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <span className="text-xl">🌙</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00BCD4]">
                        {locale === 'es' ? 'Eficiencia 24/7' : 'Always-on Efficiency'}
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
