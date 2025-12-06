
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  CheckCircle2, 
  MessageCircle, 
  Cpu, 
  TrendingUp,
  Smartphone,
  Wifi,
  Battery,
  AlertTriangle,
  XCircle,
  Database,
  Terminal,
  Activity
} from 'lucide-react';

// --- TYPES ---

type LineType = 'command' | 'success' | 'progress' | 'info' | 'message' | 'stat' | 'warning' | 'error';

interface ScriptItem {
  text: string;
  type: LineType;
  delay: number; // Time to wait AFTER this step completes
}

interface TerminalLine {
  id: string;
  text: string;
  type: LineType;
  fullText: string; 
}

const SCRIPT: ScriptItem[] = [
  { text: "./init_cultivo_agent --env=production", type: 'command', delay: 800 },
  { text: "Loading core modules (NLP, Vision, RAG)...", type: 'progress', delay: 1000 },
  { text: "Connected to WhatsApp Business API (v18.0)", type: 'success', delay: 500 },
  { text: "System active. Listening for triggers on port 443.", type: 'info', delay: 2000 },
  
  { text: "> Incoming Webhook: message_received", type: 'command', delay: 600 },
  { text: "Source: +52 55 81** **92 (Mexico City)", type: 'info', delay: 400 },
  
  { text: "Querying Salesforce CRM for ID #5581...", type: 'progress', delay: 1200 },
  { text: "Match Found: Sofía L. (Status: Negotiation)", type: 'success', delay: 500 },
  { text: "Warning: Deal expired 48h ago. Auto-reactivating context.", type: 'warning', delay: 800 },
  
  { text: "Retrieving conversation history...", type: 'info', delay: 600 },
  { text: "> Analyzing intent (Model: GPT-4-Turbo)...", type: 'command', delay: 1500 },
  
  { text: "Intent Detected: REQUEST_MEETING", type: 'success', delay: 400 },
  { text: "Sentiment Score: 0.89 (Positive)", type: 'stat', delay: 500 },
  
  { text: "Checking calendar availability...", type: 'progress', delay: 800 },
  { text: "Error: Google Calendar API timeout (500ms). Retrying...", type: 'error', delay: 1000 },
  { text: "Slots retrieved: Thursday 10:00 AM, 4:00 PM.", type: 'success', delay: 600 },
  
  { text: "Drafting response...", type: 'info', delay: 1000 },
  { text: "Hola Sofía, ¡qué bueno saber de ti! He reactivado tu propuesta. Veo que tienes interés en agendar una revisión final. Tengo disponibilidad este jueves a las 10 AM o 4 PM. ¿Te aparto un lugar?", type: 'message', delay: 3500 },
  
  { text: "> Sending message via Twilio...", type: 'command', delay: 1000 },
  { text: "Message delivered (Status: Read)", type: 'success', delay: 600 },
  
  { text: "Triggering internal workflow: 'Sales_FollowUp'", type: 'command', delay: 800 },
  { text: "Notification sent to Slack channel #sales-leads", type: 'success', delay: 500 },
  { text: "Session closed. Latency: 4.2s", type: 'stat', delay: 5000 },
];

export const AppWindows: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, typingText, isTyping]);

  // Cursor Blinking
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 500);
    return () => clearInterval(interval);
  }, []);

  // Main Sequence Runner
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let charIntervalId: ReturnType<typeof setTimeout>;

    const runStep = async () => {
      if (currentStep >= SCRIPT.length) {
        // End of script, wait then restart
        timeoutId = setTimeout(() => {
          setLines([]);
          setCurrentStep(0);
          setTypingText('');
        }, 3000);
        return;
      }

      const step = SCRIPT[currentStep];
      setIsTyping(true);
      setTypingText('');

      // Typing Effect logic for all types
      let charIndex = 0;
      const typeChar = () => {
        if (charIndex <= step.text.length) {
          setTypingText(step.text.slice(0, charIndex));
          charIndex++;
          // Randomize typing speed slightly (20-40ms) for realistic feel
          charIntervalId = setTimeout(typeChar, 20 + Math.random() * 20); 
        } else {
          // Finished typing line
          setIsTyping(false);
          setLines(prev => [...prev, { id: Math.random().toString(), text: step.text, type: step.type, fullText: step.text }]);
          setTypingText('');
          
          // Wait delay before next step
          timeoutId = setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, step.delay);
        }
      };

      typeChar();
    };

    runStep();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(charIntervalId);
    };
  }, [currentStep]);

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-8 perspective-[1200px]">
      <motion.div 
        className="relative w-full max-w-lg bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden border border-slate-700/50 flex flex-col min-h-[420px] max-h-[520px]"
        initial={{ rotateY: -5, rotateX: 2, y: 10, opacity: 0 }}
        animate={{ rotateY: -5, rotateX: 2, y: 0, opacity: 1 }}
        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* Header */}
        <div className="bg-[#1e293b] px-4 py-3 flex items-center justify-between border-b border-slate-700/50 z-20 shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium opacity-80">
            <Smartphone size={14} />
            <span>Cultivo_Agent_Runtime_v2.exe</span>
          </div>
          <div className="flex gap-2 text-slate-500">
             <Wifi size={14} />
             <Battery size={14} />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="relative flex-1 p-6 font-mono text-xs md:text-sm overflow-y-auto scrollbar-hide flex flex-col font-medium tracking-wide">
          <div className="space-y-3 pb-2">
            {/* Completed Lines */}
            {lines.map((line) => (
              <RenderLine key={line.id} line={line} />
            ))}

            {/* Currently Typing Line */}
            {isTyping && (
               <div className={`flex items-start gap-2 ${getTextColor(SCRIPT[currentStep].type)}`}>
                 <div className="mt-0.5 shrink-0">
                   <Prefix type={SCRIPT[currentStep].type} />
                 </div>
                 <span className="break-words">{typingText}</span>
                 {showCursor && <span className="w-2 h-4 bg-emerald-500 inline-block align-middle ml-1" />}
               </div>
            )}
            
            {/* Idle Cursor */}
            {!isTyping && lines.length > 0 && (
               <div className="flex items-center gap-2 mt-2" ref={bottomRef}>
                 <ChevronRight size={16} className="text-emerald-500" />
                 <motion.span 
                   className="w-2 h-4 bg-emerald-500 block"
                   animate={{ opacity: [1, 0] }}
                   transition={{ repeat: Infinity, duration: 0.8 }}
                 />
               </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- SUB-COMPONENTS & HELPERS ---

const getTextColor = (type: LineType) => {
  switch (type) {
    case 'command': return "text-cyan-400 font-bold";
    case 'success': return "text-emerald-400";
    case 'stat': return "text-slate-300";
    case 'info': return "text-slate-400";
    case 'warning': return "text-amber-300";
    case 'error': return "text-red-400";
    default: return "text-slate-300";
  }
};

const Prefix = ({ type }: { type: LineType }) => {
  switch (type) {
    case 'command': return <span className="text-cyan-400 font-bold mr-1">&gt;</span>;
    case 'success': return <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />;
    case 'info': return <Cpu size={16} className="text-slate-500 shrink-0 mt-0.5" />;
    case 'stat': return <Activity size={16} className="text-pink-400 shrink-0 mt-0.5" />;
    case 'warning': return <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />;
    case 'error': return <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />;
    default: return null;
  }
};

const RenderLine: React.FC<{ line: TerminalLine }> = ({ line }) => {
  const isMessage = line.type === 'message';
  const isProgress = line.type === 'progress';
  const isError = line.type === 'error';
  const isWarning = line.type === 'warning';
  
  if (isMessage) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        className="ml-4 mt-2 p-3 bg-slate-800/50 border-l-2 border-emerald-500 rounded-r-lg rounded-bl-lg max-w-[95%]"
      >
        <div className="flex items-center gap-2 text-emerald-400 text-xs mb-1 uppercase tracking-wider font-bold">
          <MessageCircle size={12} />
          <span>Message Preview</span>
        </div>
        <p className="text-emerald-50/90 leading-relaxed italic text-[11px] sm:text-xs">"{line.text}"</p>
      </motion.div>
    );
  }

  if (isProgress) {
    return (
      <div className="flex flex-col gap-1 w-full max-w-sm ml-6 py-1">
        <span className="text-slate-400 text-xs flex items-center gap-2">
            {line.text}
        </span>
        <div className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        flex items-start gap-3 break-words transition-colors duration-200
        ${getTextColor(line.type)}
        ${isError ? 'bg-red-500/10 -mx-2 px-2 py-1.5 rounded border-l-2 border-red-500/50' : ''}
        ${isWarning ? 'bg-amber-500/5 -mx-2 px-2 py-1.5 rounded border-l-2 border-amber-500/30' : ''}
      `}
    >
      <div className="mt-0.5 shrink-0">
        <Prefix type={line.type} />
      </div>
      <div className="flex-1 leading-snug">
        {line.type === 'success' ? (
          <span className="font-semibold tracking-tight">{line.text}</span>
        ) : line.type === 'stat' ? (
          <span>
            {line.text.split(':')[0]}: <span className="text-pink-400 font-bold text-sm ml-1">{line.text.split(':')[1]}</span>
          </span>
        ) : (
          formatText(line.text)
        )}
      </div>
    </motion.div>
  );
};

// Helper to highlight specific words
const formatText = (text: string) => {
  // Bold command arguments or quoted strings
  if (text.includes('"')) {
    const parts = text.split('"');
    return (
      <span>
        {parts[0]}
        <span className="text-purple-300 font-medium opacity-90">"{parts[1]}"</span>
        {parts[2]}
      </span>
    );
  }
  return text;
};
