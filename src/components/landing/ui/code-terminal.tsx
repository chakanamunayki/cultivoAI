"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  CheckCircle2,
  Database,
  Cpu,
  Zap,
  ChevronRight,
  Linkedin,
  Search,
  UserPlus
} from 'lucide-react';
import { useLocale } from '@/hooks/use-locale';

// Types for our terminal lines
type LineType = 'command' | 'success' | 'info' | 'error' | 'event' | 'ai';

interface TerminalLine {
  id: string;
  text: string;
  type: LineType;
  icon?: React.ReactNode;
  className?: string;
}

export const CodeTerminal: React.FC = () => {
  const { content } = useLocale();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Icon mapping based on line position in script
  const getIconForLine = (index: number) => {
    const iconMap: Record<number, React.ReactNode> = {
      1: <Cpu size={14} />,
      3: <Linkedin size={14} />,
      5: <Search size={14} />,
      6: <UserPlus size={14} />,
      8: <Zap size={14} />,
      14: <Database size={14} />,
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

      setLines(prev => [...prev, newLine]);

      setActiveStep(stepIndex + 1);
    };

    if (activeStep <= script.length) {
      // Logic to get delay from PREVIOUS step to determine when THIS step runs
      // But here we use a simple forward delay mechanism:
      // The delay property in the script array controls how long to wait BEFORE running the NEXT step.
      const currentDelay = activeStep > 0 ? (script[activeStep - 1]?.delay || 500) : 0;

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
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-10">
      <motion.div
        className="relative w-full max-w-xl aspect-[4/3] md:aspect-video bg-[#0f172a] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Terminal Header */}
        <div className="bg-[#1e293b] px-4 py-3 flex items-center justify-between border-b-4 border-black flex-shrink-0 z-20 relative">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] md:text-xs font-mono opacity-80">
            <TerminalIcon size={12} />
            <span>cultivo-terminal — zsh — 80x24</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Terminal Body */}
        <div className="relative flex-1 bg-[#0f172a] p-4 font-mono text-xs md:text-sm overflow-hidden flex flex-col">

          {/* CRT / Scanline Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
               style={{
                 backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                 backgroundSize: '100% 2px, 3px 100%'
               }}
          />
          <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-white/[0.02] to-transparent" />

          {/* Content Area */}
          <div ref={terminalRef} className="relative z-10 space-y-1.5 md:space-y-2 overflow-y-auto max-h-full scrollbar-none pb-2">
             {/* Initial welcome message */}
             <div className="text-slate-500 mb-4 text-[10px] md:text-xs select-none">
                {content.terminal.welcomeLine1}{new Date().toDateString()} on ttys001<br/>
                {content.terminal.welcomeLine2}
             </div>

            <AnimatePresence mode='popLayout'>
              {lines.map((line) => (
                <LineItem key={line.id} line={line} />
              ))}
            </AnimatePresence>

            {/* Active Cursor Line */}
            <div ref={bottomRef} className="flex items-center gap-2 text-emerald-500 h-5">
                 <ChevronRight size={14} />
                 <motion.span
                   className="w-2 h-4 bg-emerald-500 block"
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
      case 'command': return "text-emerald-400 font-bold";
      case 'success': return "text-emerald-400";
      case 'error': return "text-red-400";
      case 'event': return "text-blue-400";
      case 'ai': return "text-purple-400 font-medium";
      default: return "text-slate-300";
    }
  };

  const getPrefix = (type: LineType) => {
    switch (type) {
      case 'command': return <span className="mr-2 text-emerald-500 font-bold">~</span>;
      case 'success': return <CheckCircle2 size={14} className="mr-2 inline text-emerald-500 flex-shrink-0" />;
      case 'event': return <span className="mr-2 text-blue-500 font-bold flex-shrink-0">?</span>;
      case 'ai': return <span className="mr-2 text-purple-500 font-bold flex-shrink-0">✦</span>;
      default: return null;
    }
  };

  return (
    <motion.div
      className={`flex items-start leading-relaxed break-all md:break-words ${getStyle(line.type)} ${line.className || ''}`}
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
        <span className="flex-shrink-0 flex items-center mt-[3px] md:mt-1 select-none">
            {line.icon ? <span className="mr-2 inline-block opacity-80">{line.icon}</span> : getPrefix(line.type)}
        </span>
        <span>{line.text}</span>
    </motion.div>
  );
};
