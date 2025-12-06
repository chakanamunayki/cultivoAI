
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

// Types for our terminal lines
type LineType = 'command' | 'success' | 'info' | 'error' | 'event' | 'ai';

interface TerminalLine {
  id: string;
  text: string;
  type: LineType;
  icon?: React.ReactNode;
  className?: string;
}

export const AppWindows: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // The animation script
  // Delays are in ms and happen AFTER the line is shown
  const script = [
    { text: "cultivo start --mode=growth", type: 'command', delay: 800 },
    { text: "Initializing neural core v2.5.0...", type: 'info', delay: 400, icon: <Cpu size={14} /> },
    { text: "Authenticating LinkedIn Sales Navigator...", type: 'info', delay: 300 },
    { text: "Connected to LinkedIn Secure Gateway", type: 'success', delay: 200, icon: <Linkedin size={14} /> },
    { text: "Connected to HubSpot CRM", type: 'success', delay: 600 },
    { text: "Growth engine active. Scouting leads...", type: 'info', delay: 2000, icon: <Search size={14} /> },
    
    // Scenario Start - LinkedIn Automation
    { text: "Prospect detected: Sofia R. (CMO @ TechFlow)", type: 'event', delay: 600, icon: <UserPlus size={14} /> },
    { text: "Source: LinkedIn | Location: Bogotá", type: 'info', delay: 1000, className: "text-slate-400 pl-6" },
    
    { text: "Analyzing profile & activity...", type: 'info', delay: 1000, icon: <Zap size={14} /> },
    { text: "Insight: High intent. Posted about 'AI Automation'", type: 'ai', delay: 800 },
    
    { text: "Generating personalized outreach...", type: 'command', delay: 1000 },
    { text: 'Draft: "Hola Sofia, vi tu post sobre IA..."', type: 'info', delay: 800, className: "text-slate-400 italic pl-6" },
    
    { text: "Action: Connection request sent", type: 'success', delay: 800, className: "text-emerald-300" },
    
    { text: "Syncing lead to HubSpot...", type: 'command', delay: 600 },
    { text: "Lead successfully created: ID #8842", type: 'success', delay: 4000, icon: <Database size={14} /> },
  ];

  // Auto-scroll logic
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      
      setLines(prev => [
        ...prev, 
        { 
          id: Math.random().toString(36).substring(2, 9),
          text: step.text,
          type: step.type as LineType,
          icon: step.icon,
          className: step.className
        }
      ]);
      
      setActiveStep(stepIndex + 1);
    };

    if (activeStep <= script.length) {
      // Logic to get delay from PREVIOUS step to determine when THIS step runs
      // But here we use a simple forward delay mechanism: 
      // The delay property in the script array controls how long to wait BEFORE running the NEXT step.
      const currentDelay = activeStep > 0 ? script[activeStep - 1].delay || 500 : 0;
      
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
  }, [activeStep]);

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-10 perspective-[1200px]">
      <motion.div 
        className="relative w-full max-w-xl aspect-[4/3] md:aspect-video bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden border border-slate-700/50 flex flex-col"
        initial={{ rotateY: -5, rotateX: 2, y: 10, opacity: 0 }}
        animate={{ rotateY: -5, rotateX: 2, y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5)',
          transformStyle: 'preserve-3d'
        }}
        whileHover={{
            rotateY: 0,
            rotateX: 0,
            scale: 1.01,
            transition: { duration: 0.5 }
        }}
      >
        {/* Terminal Header */}
        <div className="bg-[#1e293b] px-4 py-3 flex items-center justify-between border-b border-slate-700/50 flex-shrink-0 z-20 relative">
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
          <div className="relative z-10 space-y-1.5 md:space-y-2 overflow-y-auto max-h-full scrollbar-none pb-2">
             {/* Initial welcome message */}
             <div className="text-slate-500 mb-4 text-[10px] md:text-xs select-none">
                Last login: {new Date().toDateString()} on ttys001<br/>
                Cultivo AI Automation Suite v2.5.0
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
