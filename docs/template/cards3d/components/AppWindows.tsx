
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  BarChart2, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  MoreHorizontal,
  Code2,
  Zap,
  MousePointer2
} from 'lucide-react';

export const AppWindows: React.FC = () => {
  return (
    <div className="relative w-full h-[650px] md:h-[550px] flex items-center justify-center perspective-1000 overflow-hidden md:overflow-visible">
      <div className="relative w-full max-w-[500px] h-full">
        {/* Window 1: WhatsApp / Communication (Back Left) */}
        <WhatsAppWindow />

        {/* Window 2: Dynamic Dev/Design Window (Top Right - Always Visible) */}
        <CodeWindow />

        {/* Window 3: Dashboard (Middle) */}
        <DashboardWindow />

        {/* Window 4: Automations (Front Right) */}
        <AutomationWindow />
      </div>
    </div>
  );
};

// --- Sub-Components ---

const WindowFrame: React.FC<{
  children: React.ReactNode;
  title: string;
  color: 'green' | 'blue' | 'purple' | 'indigo' | 'gray';
  className?: string;
  style?: any;
  delay?: number;
  initialY?: number;
}> = ({ children, title, color, className, style, delay = 0, initialY = 20 }) => {
  const floatTransition = {
    duration: 6,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
    delay: delay,
  };

  const colors: Record<string, string> = {
    green: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
    indigo: "text-indigo-600 bg-indigo-50",
    gray: "text-gray-600 bg-gray-50",
  };

  return (
    <motion.div
      className={`absolute rounded-xl overflow-hidden bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl ${className}`}
      style={style}
      initial={{ y: initialY, opacity: 0 }}
      animate={{ 
        y: [0, -10, 0],
        opacity: 1 
      }}
      transition={{
        y: floatTransition,
        opacity: { duration: 0.8, delay }
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -25, // Pronounced lift
        zIndex: 100, // Bring to absolute front
        rotate: 0, // Reset rotation to face user
        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)", // Deeper shadow
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
    >
      {/* Window Header */}
      <div className="h-10 bg-gray-50/80 border-b border-gray-100 flex items-center px-4 justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-sm" />
        </div>
        <div className={`text-xs font-semibold px-2 py-1 rounded-md ${colors[color]} flex items-center gap-1.5`}>
          {title}
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Window Content */}
      <div className="p-5 h-full relative bg-white/40">
        {children}
      </div>
    </motion.div>
  );
};

const WhatsAppWindow = () => {
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMsg(true), 1500);
    const interval = setInterval(() => {
      setShowMsg(false);
      setTimeout(() => setShowMsg(true), 1000);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    }
  }, []);

  return (
    <WindowFrame
      title="WhatsApp Business"
      color="green"
      // Mobile: Top-0, Centered (slightly left)
      className="w-[280px] md:w-[320px] h-[220px] left-1/2 -translate-x-[60%] md:-translate-x-0 md:-left-12 top-0 md:top-8 z-10 origin-bottom-right"
      delay={0}
      style={{ rotate: -6 }}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-emerald-200 shadow-lg">
            <MessageCircle size={20} fill="white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-gray-800">Ventas</h4>
            <p className="text-[10px] text-gray-500">En línea ahora</p>
          </div>
          <div className="relative flex items-center justify-center w-6 h-6 bg-red-500 rounded-full shadow-md">
            <span className="text-white text-[10px] font-bold">3</span>
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-red-500"
              animate={{ scale: [1, 1.4], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-3 text-xs">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-gray-100 p-2.5 rounded-lg rounded-tl-none self-start w-3/4 text-gray-600"
          >
            Hola, ¿tienen disponible?
          </motion.div>
          
          <AnimatePresence>
            {showMsg && (
              <motion.div 
                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg rounded-tl-none self-start w-4/5 text-emerald-900 shadow-sm"
              >
                <div className="font-bold mb-1 text-[10px] text-emerald-600 uppercase tracking-wider">Nuevo Lead</div>
                ¡Sí! ¿Te gustaría agendar una demo?
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </WindowFrame>
  );
};

const DashboardWindow = () => {
  return (
    <WindowFrame
      title="Dashboard"
      color="blue"
      // Mobile: Top-52 (spread out), Centered
      className="w-[300px] md:w-[340px] h-[240px] left-1/2 -translate-x-[50%] md:-translate-x-0 md:left-12 top-52 md:top-24 z-20 origin-center"
      delay={1.5}
      style={{ rotate: 2 }}
    >
      <div className="flex flex-col h-full justify-between">
        {/* Notification Badge */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
           <div className="relative flex items-center justify-center w-5 h-5 bg-red-500 rounded-full shadow-md ring-2 ring-white">
              <span className="text-white text-[10px] font-bold">5</span>
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-red-500"
                animate={{ scale: [1, 1.4], opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
           </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Ingresos</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900">$4,250 <span className="text-sm text-gray-400 font-normal">USD</span></h3>
                <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  <ArrowUpRight size={10} className="mr-0.5" /> 12%
                </span>
              </div>
            </div>
            <BarChart2 className="text-blue-500 opacity-20" size={32} />
          </div>

          {/* Simple Animated Chart */}
          <div className="flex items-end gap-2 h-20 mt-4 border-b border-gray-100 pb-2">
            {[40, 65, 45, 80, 55, 90, 78].map((h, i) => (
              <motion.div
                key={i}
                className={`flex-1 rounded-t-sm transition-colors ${i === 6 ? 'bg-blue-500' : 'bg-blue-100'}`}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-medium text-gray-500">
            <span>Meta Mensual</span>
            <span>78%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

const AutomationWindow = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Lead capturado", checked: false },
    { id: 2, text: "Auto-respuesta enviada", checked: false },
    { id: 3, text: "Añadido al CRM", checked: false },
    { id: 4, text: "Seguimiento programado", loading: true }
  ]);

  useEffect(() => {
    const runSequence = () => {
        setItems([
            { id: 1, text: "Lead capturado", checked: false },
            { id: 2, text: "Auto-respuesta enviada", checked: false },
            { id: 3, text: "Añadido al CRM", checked: false },
            { id: 4, text: "Seguimiento programado", loading: true }
        ]);

        setTimeout(() => checkItem(1), 1000);
        setTimeout(() => checkItem(2), 2000);
        setTimeout(() => checkItem(3), 3000);
    };

    const checkItem = (id: number) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, checked: true } : item));
    };

    runSequence();
    const interval = setInterval(runSequence, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WindowFrame
      title="Automations"
      color="purple"
      // Mobile: Bottom area (top-96 approx), Centered
      className="w-[280px] md:w-[300px] h-[210px] left-1/2 -translate-x-[45%] md:-translate-x-0 md:-right-4 bottom-2 md:bottom-8 z-30 origin-top-left"
      delay={0.8}
      style={{ rotate: -3 }}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xs font-bold text-gray-700">Flujo Activo</h4>
          <MoreHorizontal size={14} className="text-gray-400" />
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative flex-shrink-0">
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: item.checked ? [1, 1.2, 1] : 1,
                    backgroundColor: item.checked ? "#10b981" : item.loading ? "#f3f4f6" : "#fff"
                  }}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    item.checked ? "border-emerald-500" : "border-gray-200"
                  }`}
                >
                  {item.checked && <CheckCircle2 size={12} className="text-white" />}
                  {item.loading && !item.checked && (
                    <Clock size={12} className="text-purple-500 animate-spin" />
                  )}
                </motion.div>
              </div>
              <span className={`text-xs ${item.checked ? "text-gray-800 font-medium" : "text-gray-500"}`}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-50">
             <div className="flex items-center gap-2 text-[10px] text-purple-600 font-medium bg-purple-50 self-start px-2 py-1 rounded w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                Ejecutando
             </div>
        </div>
      </div>
    </WindowFrame>
  );
};

const CodeWindow = () => {
  const [mode, setMode] = useState<'code' | 'design'>('code');

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const cycle = () => {
       setMode('code');
       // Switch to design after 4s
       timeouts.push(setTimeout(() => setMode('design'), 4000));
    }

    // Run first cycle (start with code, switch to design after 4s)
    timeouts.push(setTimeout(() => setMode('design'), 4000));

    // Repeat cycle every 10 seconds (4s code + 6s design)
    const interval = setInterval(cycle, 10000);

    return () => {
       timeouts.forEach(clearTimeout);
       clearInterval(interval);
    }
  }, []);

  return (
    <WindowFrame
      title={mode === 'code' ? "dev.local" : "Live Preview"}
      color="indigo"
      // Mobile: Top-28, Centered (slightly right of center to balance WA)
      // Desktop: Top right
      className="w-[260px] md:w-[280px] h-[190px] left-1/2 -translate-x-[40%] md:left-auto md:translate-x-0 md:-right-6 top-28 md:top-4 z-40 origin-center"
      delay={0}
      initialY={-20}
      style={{ rotate: 4 }}
    >
       <div className="relative w-full h-full font-sans">
          <AnimatePresence mode="wait">
             {mode === 'code' ? (
               <motion.div
                 key="code"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                 transition={{ duration: 0.4 }}
                 className="absolute inset-0 bg-slate-800 rounded-lg p-3 font-mono text-[10px] text-slate-300 leading-relaxed shadow-inner overflow-hidden"
               >
                  <div className="flex items-center gap-2 mb-2 opacity-50 border-b border-slate-700 pb-1">
                    <Code2 size={10} /> <span className="text-[8px]">App.tsx</span>
                  </div>
                  <div>
                    <span className="text-purple-400">export</span> <span className="text-blue-400">default</span> <span className="text-purple-400">function</span> <span className="text-yellow-300">Page</span>() {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-blue-400">Hero</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">title</span>=<span className="text-orange-300">"Crece"</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">cta</span>=<span className="text-orange-300">"Iniciar"</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'/>'}<br/>
                    &nbsp;&nbsp;);<br/>
                    {'}'}
                    <motion.span 
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-1.5 h-3 bg-blue-400 ml-1 align-middle"
                    />
                  </div>
               </motion.div>
             ) : (
               <motion.div
                 key="design"
                 initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }}
                 className="absolute inset-0 bg-white rounded-lg p-0 overflow-hidden flex flex-col"
               >
                  {/* Modern Landing Page Mockup */}
                  <div className="h-8 bg-white border-b border-slate-50 flex items-center px-3 justify-between shadow-sm z-10">
                     <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-indigo-600 rounded-sm"></div>
                        <span className="font-bold text-slate-800 text-[8px] tracking-tight">Cultivo</span>
                     </div>
                     <div className="flex gap-1.5">
                        <div className="w-6 h-1 bg-slate-100 rounded-full"/>
                        <div className="w-4 h-1 bg-slate-100 rounded-full"/>
                     </div>
                  </div>

                  <div className="flex-1 relative bg-slate-50 overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full blur-xl opacity-60 translate-x-8 -translate-y-8"></div>
                     
                     <div className="relative p-4 flex flex-col gap-2 z-0">
                        <div className="w-fit px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 rounded-full flex items-center gap-1">
                           <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse"></div>
                           <span className="text-[6px] font-bold text-indigo-600 uppercase">Live</span>
                        </div>
                        
                        <h2 className="text-[10px] font-black text-slate-900 leading-tight">
                           Automatiza tu<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Futuro</span>
                        </h2>
                        
                        <motion.button 
                           initial={{ y: 5, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.3 }}
                           className="mt-1 w-fit bg-slate-900 text-white text-[8px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-slate-200 flex items-center gap-1"
                        >
                           Empezar <ArrowUpRight size={8} />
                        </motion.button>
                     </div>

                     <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute bottom-2 right-2 w-16 h-12 bg-white rounded-lg shadow-md border border-slate-100 p-1.5 flex flex-col gap-1"
                     >
                        <div className="flex items-center gap-1 mb-0.5">
                           <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                              <Zap size={8} className="text-green-600" />
                           </div>
                           <div className="h-1 w-6 bg-slate-100 rounded-full"></div>
                        </div>
                        <div className="h-1 w-full bg-slate-50 rounded-full">
                           <motion.div 
                             className="h-full bg-green-500 rounded-full"
                             initial={{ width: 0 }}
                             animate={{ width: "100%" }}
                             transition={{ delay: 0.8, duration: 0.5 }}
                           />
                        </div>
                     </motion.div>
                     
                     <motion.div
                       initial={{ x: 100, y: 100 }}
                       animate={{ x: 50, y: 60 }}
                       transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                       className="absolute top-0 left-0 pointer-events-none z-20 drop-shadow-md"
                     >
                        <MousePointer2 size={12} className="fill-slate-900 text-slate-50" />
                     </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white z-10 pointer-events-none"
                  />
               </motion.div>
             )}
          </AnimatePresence>
       </div>
    </WindowFrame>
  );
}
