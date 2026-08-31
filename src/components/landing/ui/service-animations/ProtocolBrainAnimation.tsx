"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Locale } from "@/content/types";

type NodeId =
    | "protocol"
    | "steps"
    | "parameters"
    | "sequence"
    | "asepsis"
    | "frequency"
    | "observations"
    | "operator"
    | "roles"
    | "director"
    | "scientist"
    | "versions";

interface BrainNode {
    id: NodeId;
    x: number;
    y: number;
    en: string;
    es: string;
    pt: string;
}

// Geometry and edge topology kept identical to CompanyBrainAnimation (proven layout);
// only the labels and chrome tell the protocol-IP story.
const NODES: BrainNode[] = [
    { id: "protocol", x: 215, y: 158, en: "Protocol", es: "Protocolo", pt: "Protocolo" },
    { id: "steps", x: 50, y: 78, en: "Steps", es: "Pasos", pt: "Passos" },
    { id: "parameters", x: 160, y: 42, en: "Parameters", es: "Parametros", pt: "Parâmetros" },
    { id: "sequence", x: 290, y: 56, en: "Sequence", es: "Secuencia", pt: "Sequência" },
    { id: "asepsis", x: 370, y: 112, en: "Asepsis", es: "Asepsia", pt: "Assepsia" },
    { id: "frequency", x: 380, y: 204, en: "Frequency", es: "Frecuencia", pt: "Frequência" },
    { id: "observations", x: 320, y: 262, en: "Observations", es: "Observaciones", pt: "Observações" },
    { id: "operator", x: 200, y: 286, en: "Operator", es: "Operador", pt: "Operador" },
    { id: "roles", x: 80, y: 274, en: "Roles", es: "Roles", pt: "Papéis" },
    { id: "director", x: 24, y: 186, en: "Director", es: "Director", pt: "Diretor" },
    { id: "scientist", x: 112, y: 126, en: "Scientist", es: "Cientifico", pt: "Cientista" },
    { id: "versions", x: 305, y: 182, en: "Versions", es: "Versiones", pt: "Versões" },
];

const EDGES: Array<[NodeId, NodeId]> = [
    ["protocol", "steps"],
    ["protocol", "parameters"],
    ["protocol", "sequence"],
    ["protocol", "asepsis"],
    ["protocol", "versions"],
    ["protocol", "observations"],
    ["protocol", "operator"],
    ["protocol", "roles"],
    ["protocol", "scientist"],
    ["protocol", "director"],
    ["protocol", "frequency"],
    ["parameters", "steps"],
    ["parameters", "sequence"],
    ["sequence", "frequency"],
    ["asepsis", "frequency"],
    ["observations", "versions"],
    ["observations", "operator"],
    ["versions", "parameters"],
    ["roles", "director"],
    ["roles", "scientist"],
    ["scientist", "steps"],
];

const QUERY_CYCLE: NodeId[] = [
    "sequence",
    "parameters",
    "observations",
    "protocol",
    "operator",
    "asepsis",
    "roles",
];

function curvePath(x1: number, y1: number, x2: number, y2: number, bend = 0.16): string {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const offset = bend * len;
    return `M ${x1} ${y1} Q ${mx + nx * offset} ${my + ny * offset} ${x2} ${y2}`;
}

interface Props {
    locale?: Locale;
}

export function ProtocolBrainAnimation({ locale = "en" }: Props) {
    const [tick, setTick] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const activeId = QUERY_CYCLE[tick % QUERY_CYCLE.length]!;
    const active = useMemo(() => NODES.find((n) => n.id === activeId)!, [activeId]);

    const neighborIds = useMemo(() => {
        const ids = new Set<NodeId>();
        for (const [a, b] of EDGES) {
            if (a === activeId) ids.add(b);
            else if (b === activeId) ids.add(a);
        }
        return ids;
    }, [activeId]);

    const outgoingEdges = useMemo(() => {
        const list: Array<{ from: BrainNode; to: BrainNode }> = [];
        for (const [a, b] of EDGES) {
            if (a === activeId) {
                list.push({ from: active, to: NODES.find((n) => n.id === b)! });
            } else if (b === activeId) {
                list.push({ from: active, to: NODES.find((n) => n.id === a)! });
            }
        }
        return list;
    }, [activeId, active]);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => setTick((t) => t + 1), 3800);
        return () => clearInterval(timer);
    }, [isHovered]);

    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 22, stiffness: 140 };
    const xSpring = useSpring(mouseX, springConfig);
    const ySpring = useSpring(mouseY, springConfig);

    const bgX = useTransform(xSpring, [-0.5, 0.5], ["-8px", "8px"]);
    const bgY = useTransform(ySpring, [-0.5, 0.5], ["-8px", "8px"]);
    const fgX = useTransform(xSpring, [-0.5, 0.5], ["12px", "-12px"]);
    const fgY = useTransform(ySpring, [-0.5, 0.5], ["12px", "-12px"]);

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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0c0c0c]"
        >
            {/* Ambient mouse-tracking glow */}
            <motion.div
                className="absolute w-[240px] h-[240px] rounded-full bg-[#00BCD4] opacity-[0.06] blur-[70px] pointer-events-none z-0"
                style={{ x: bgX, y: bgY }}
            />

            {/* Scaling container for mobile responsiveness */}
            <motion.div
                className="w-full h-full max-w-[440px] flex flex-col justify-center px-4 py-5 sm:px-6 transform scale-[0.85] sm:scale-100 origin-center max-h-[420px] z-10"
                style={{ x: fgX, y: fgY }}
            >
                {/* Header */}
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 border border-white/5 hover:border-white/10 mb-3 shadow-lg transition-colors cursor-default">
                    <div className="flex items-center gap-2">
                        <motion.span
                            className="text-[14px] sm:text-[15px] drop-shadow-[0_0_8px_rgba(0,188,212,0.5)]"
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity }}
                        >
                            🧠
                        </motion.span>
                        <span className="text-[8.5px] sm:text-[9px] font-black text-white uppercase tracking-wider drop-shadow-sm">
                            {locale === "es" ? "Cerebro de Empresa" : locale === "pt" ? "Cérebro da Empresa" : "Company Brain"}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <motion.div
                            className="h-1.5 w-1.5 rounded-full bg-[#00BCD4] shadow-[0_0_8px_#00BCD4]"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-[7.5px] sm:text-[8px] text-white/60 uppercase font-black tracking-wider">
                            {locale === "es" ? "Guiando" : locale === "pt" ? "Guiando" : "Guiding"}
                        </span>
                    </div>
                </div>

                {/* Knowledge graph */}
                <div className="flex-1 w-full flex items-center justify-center min-h-[200px]">
                    <svg
                        viewBox="0 0 400 320"
                        preserveAspectRatio="xMidYMid meet"
                        className="w-full h-full drop-shadow-[0_0_18px_rgba(0,188,212,0.15)]"
                    >
                        <defs>
                            <radialGradient id="protocol-node-halo">
                                <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#00BCD4" stopOpacity="0" />
                            </radialGradient>
                        </defs>

                        {/* Edges */}
                        {EDGES.map(([a, b], i) => {
                            const na = NODES.find((n) => n.id === a)!;
                            const nb = NODES.find((n) => n.id === b)!;
                            const isActive = a === activeId || b === activeId;
                            return (
                                <motion.path
                                    key={`edge-${i}`}
                                    d={curvePath(na.x, na.y, nb.x, nb.y)}
                                    fill="none"
                                    stroke={isActive ? "#00BCD4" : "rgba(255,255,255,0.14)"}
                                    strokeWidth={isActive ? 1.1 : 0.7}
                                    animate={{ opacity: isActive ? 0.85 : 0.42 }}
                                    transition={{ duration: 0.5 }}
                                />
                            );
                        })}

                        {/* Knowledge pulses from active node */}
                        {outgoingEdges.map((edge, i) => (
                            <motion.circle
                                key={`pulse-${tick}-${i}`}
                                r={2.8}
                                fill="#00BCD4"
                                style={{ filter: "drop-shadow(0 0 4px #00BCD4)" }}
                                initial={{ cx: edge.from.x, cy: edge.from.y, opacity: 0 }}
                                animate={{
                                    cx: [edge.from.x, edge.to.x],
                                    cy: [edge.from.y, edge.to.y],
                                    opacity: [0, 1, 1, 0],
                                }}
                                transition={{
                                    duration: 1.4,
                                    delay: 0.25 + i * 0.08,
                                    times: [0, 0.12, 0.9, 1],
                                    ease: "easeInOut",
                                }}
                            />
                        ))}

                        {/* Nodes */}
                        {NODES.map((node, i) => {
                            const isActive = node.id === activeId;
                            const isNeighbor = neighborIds.has(node.id);
                            const label = (locale === "es" ? node.es : locale === "pt" ? node.pt : node.en).toUpperCase();
                            return (
                                <motion.g
                                    key={node.id}
                                    animate={{ y: [0, -2.4, 0, 2.4, 0] }}
                                    transition={{
                                        duration: 6 + (i % 4),
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: (i * 0.37) % 3,
                                    }}
                                >
                                    {isActive && (
                                        <motion.circle
                                            cx={node.x}
                                            cy={node.y}
                                            r={16}
                                            fill="url(#protocol-node-halo)"
                                            initial={{ opacity: 0, scale: 0.6 }}
                                            animate={{
                                                opacity: [0.35, 0.85, 0.35],
                                                scale: [0.9, 1.25, 0.9],
                                            }}
                                            transition={{ duration: 2.2, repeat: Infinity }}
                                        />
                                    )}
                                    <motion.circle
                                        cx={node.x}
                                        cy={node.y}
                                        r={5.2}
                                        stroke="#00BCD4"
                                        strokeWidth={isActive ? 1.6 : 0.8}
                                        fill={isActive ? "#00BCD4" : isNeighbor ? "#0e4a55" : "#161616"}
                                        style={{
                                            filter: isActive
                                                ? "drop-shadow(0 0 6px #00BCD4)"
                                                : isNeighbor
                                                    ? "drop-shadow(0 0 3px rgba(0,188,212,0.55))"
                                                    : "none",
                                        }}
                                        animate={{
                                            opacity: isActive ? 1 : isNeighbor ? 0.95 : 0.75,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <text
                                        x={node.x}
                                        y={node.y + 15}
                                        textAnchor="middle"
                                        fontSize="7.5"
                                        fontWeight="700"
                                        letterSpacing="0.6"
                                        fill={
                                            isActive
                                                ? "#00BCD4"
                                                : isNeighbor
                                                    ? "rgba(255,255,255,0.88)"
                                                    : "rgba(255,255,255,0.55)"
                                        }
                                        style={{ pointerEvents: "none" }}
                                    >
                                        {label}
                                    </text>
                                </motion.g>
                            );
                        })}
                    </svg>
                </div>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/5 hover:border-[#00BCD4]/30 rounded-xl px-3 py-2 sm:px-4 sm:py-2 transition-colors cursor-default shadow-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-[14px] sm:text-[15px] drop-shadow-lg">🧭</span>
                        <div className="flex flex-col">
                            <span className="text-[8.5px] sm:text-[9px] font-bold text-white uppercase tracking-wider drop-shadow-sm">
                                {locale === "es" ? "Paso Actual" : locale === "pt" ? "Passo Atual" : "Current Step"}
                            </span>
                            <motion.span
                                key={activeId}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="text-[7.5px] sm:text-[8px] text-[#00BCD4] font-black uppercase tracking-tight leading-tight pt-[1px] drop-shadow-[0_0_2px_rgba(0,188,212,0.8)]"
                            >
                                {locale === "es" ? active.es : locale === "pt" ? active.pt : active.en}
                            </motion.span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[13px] sm:text-[14px] drop-shadow-lg">🔒</span>
                        <div className="flex flex-col items-end text-right">
                            <span className="text-[8.5px] sm:text-[9px] font-black text-white uppercase tracking-wider drop-shadow-sm">
                                {locale === "es" ? "IP Protegida" : locale === "pt" ? "IP Protegida" : "IP Protected"}
                            </span>
                            <span className="text-[7px] sm:text-[7.5px] text-white/45 uppercase font-bold tracking-wider">
                                {locale === "es" ? "En el sistema" : locale === "pt" ? "No sistema" : "In the system"}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
