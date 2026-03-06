"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal as TerminalIcon,
  CheckCircle2,
  Database,
  Cpu,
  Zap,
  ChevronRight,
  Search,
  Layers,
  BarChart3,
  TrendingUp,
  Repeat,
} from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

// Types for our terminal lines
type LineType = "command" | "success" | "info" | "error" | "event" | "ai";

interface TerminalLine {
  id: string;
  text: string;
  type: LineType;
  icon?: React.ReactNode;
  className?: string;
}

interface CodeTerminalProps {
  fillContainer?: boolean;
}

export const CodeTerminal: React.FC<CodeTerminalProps> = ({ fillContainer = false }) => {
  const { content } = useLocale();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Icon mapping based on line position in script
  const getIconForLine = (index: number) => {
    const iconMap: Record<number, React.ReactNode> = {
      0: <Search size={14} />,
      1: <Layers size={14} />,
      2: <Zap size={14} />,
      3: <Zap size={14} />,
      4: <Cpu size={14} />,
      5: <BarChart3 size={14} />,
      6: <Database size={14} />,
      8: <TrendingUp size={14} />,
      9: <Repeat size={14} />,
    };
    return iconMap[index];
  };

  // Build script from localized content with icons
  const script = content.terminal.script.map((line, index) => ({
    ...line,
    icon: getIconForLine(index),
  }));

  // Auto-scroll logic (only within terminal, not page)
  const bottomRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current && terminalRef.current) {
      const terminal = terminalRef.current;
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [lines]);

  // Script Runner
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const runStep = (stepIndex: number) => {
      // Loop sequence
      if (stepIndex >= script.length) {
        timeout = setTimeout(() => {
          setLines([]);
          setActiveStep(0);
        }, 3000);
        return;
      }

      const step = script[stepIndex];
      if (!step) return;

      const newLine: TerminalLine = {
        id: Math.random().toString(36).substring(2, 9),
        text: step.text,
        type: step.type as LineType,
      };

      if (step.icon) newLine.icon = step.icon;
      if (step.className) newLine.className = step.className;

      setLines((prev) => [...prev, newLine]);

      setActiveStep(stepIndex + 1);
    };

    if (activeStep <= script.length) {
      // Logic to get delay from PREVIOUS step to determine when THIS step runs
      // But here we use a simple forward delay mechanism:
      // The delay property in the script array controls how long to wait BEFORE running the NEXT step.
      const currentDelay = activeStep > 0 ? script[activeStep - 1]?.delay || 500 : 0;

      timeout = setTimeout(() => {
        // This executes the current step logic
        if (activeStep < script.length) {
          runStep(activeStep);
        } else {
          // Restart logic
          runStep(activeStep);
        }
      }, currentDelay);
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        fillContainer ? "p-0" : "p-2 sm:p-3 md:p-10"
      )}
    >
      <motion.div
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#18181B] shadow-[0_18px_34px_rgba(15,23,42,0.26)] ring-1 ring-black/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_rgba(15,23,42,0.32)]",
          fillContainer
            ? "aspect-[16/10] max-w-none md:aspect-[4/3]"
            : "aspect-[5/4] max-w-md sm:aspect-[4/3] sm:max-w-lg md:aspect-video md:max-w-xl"
        )}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Terminal Header */}
        <div className="relative z-20 flex flex-shrink-0 items-center justify-between border-b border-white/10 bg-[#27272A] px-4 py-3">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-primary/100/80" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 opacity-80 md:text-xs">
            <TerminalIcon size={12} />
            <span>cultivo-terminal - zsh - 80x24</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Terminal Body */}
        <div className="relative flex flex-1 flex-col overflow-hidden bg-[#18181B] p-4 font-mono text-xs md:text-sm">
          {/* CRT / Scanline Effect Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
              backgroundSize: "100% 2px",
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/[0.02] to-transparent" />

          {/* Content Area */}
          <div
            ref={terminalRef}
            className="scrollbar-none relative z-10 max-h-full space-y-1.5 overflow-y-auto pb-2 md:space-y-2"
          >
            {/* Initial welcome message */}
            <div className="mb-4 text-[10px] text-zinc-500 select-none md:text-xs">
              {content.terminal.welcomeLine1}
              {new Date().toDateString()} on ttys001
              <br />
              {content.terminal.welcomeLine2}
            </div>

            <AnimatePresence mode="popLayout">
              {lines.map((line) => (
                <LineItem key={line.id} line={line} />
              ))}
            </AnimatePresence>

            {/* Active Cursor Line */}
            <div ref={bottomRef} className="flex h-5 items-center gap-2 text-primary">
              <ChevronRight size={14} />
              <motion.span
                className="block h-4 w-2 bg-primary/100"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const LineItem: React.FC<{ line: TerminalLine }> = ({ line }) => {
  const getStyle = (type: LineType) => {
    switch (type) {
      case "command":
        return "text-primary font-bold";
      case "success":
        return "text-primary";
      case "error":
        return "text-red-400";
      case "event":
        return "text-zinc-300";
      case "ai":
        return "text-primary font-medium";
      default:
        return "text-zinc-300";
    }
  };

  const getPrefix = (type: LineType) => {
    switch (type) {
      case "command":
        return <span className="mr-2 font-bold text-primary">~</span>;
      case "success":
        return <CheckCircle2 size={14} className="mr-2 inline flex-shrink-0 text-primary" />;
      case "event":
        return <span className="mr-2 flex-shrink-0 font-bold text-zinc-400">?</span>;
      case "ai":
        return <span className="mr-2 flex-shrink-0 font-bold text-primary">*</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`flex items-start leading-relaxed break-all md:break-words ${getStyle(line.type)} ${line.className || ""}`}
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="mt-[3px] flex flex-shrink-0 items-center select-none md:mt-1">
        {line.icon ? (
          <span className="mr-2 inline-block opacity-80">{line.icon}</span>
        ) : (
          getPrefix(line.type)
        )}
      </span>
      <span>{line.text}</span>
    </motion.div>
  );
};
