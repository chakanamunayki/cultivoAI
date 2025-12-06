
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Star,
  Cpu,
  Megaphone,
  BarChart3,
  MessageSquare,
  Users,
  Clock,
  Link as LinkIcon,
  PieChart,
  Lightbulb,
  Sprout
} from 'lucide-react';
import { AnimationStage } from '../types';

// --- COORDINATE SYSTEM (ViewBox 0 0 100 70) ---
// Taller viewbox for better mobile spacing
const POS = {
  root: { x: 50, y: 85 }, // Lowered to give vertical room
  hubs: {
    marketing: { x: 15, y: 45 },
    automation: { x: 50, y: 40 }, // Center sits higher
    bi: { x: 85, y: 45 }
  },
  leaves: {
    m1: { x: 5, y: 20 },
    m2: { x: 25, y: 20 },
    a1: { x: 40, y: 15 },
    a2: { x: 60, y: 15 },
    b1: { x: 75, y: 20 },
    b2: { x: 95, y: 20 }
  },
  success: { x: 50, y: 5 }
};

export const GrowingTree: React.FC = () => {
  const [stage, setStage] = useState<AnimationStage>(AnimationStage.Hidden);

  // Animation Sequence
  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const runSequence = () => {
      setStage(AnimationStage.Seed); // Start with seed
      
      timeouts.push(setTimeout(() => setStage(AnimationStage.Sprout), 1500));   // Connections start
      timeouts.push(setTimeout(() => setStage(AnimationStage.Branches), 2500)); // Main Hubs appear
      timeouts.push(setTimeout(() => setStage(AnimationStage.SubBranches), 4000)); // Leaves appear
      timeouts.push(setTimeout(() => setStage(AnimationStage.Success), 5500)); // Success state
      timeouts.push(setTimeout(() => setStage(AnimationStage.Hold), 7500)); // Hold
      
      // Loop
      timeouts.push(setTimeout(() => {
        setStage(AnimationStage.Hidden);
        setTimeout(runSequence, 800); 
      }, 12000));
    };

    runSequence();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const isStage = (minStage: AnimationStage) => stage >= minStage;

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-slate-50 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
      
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Particles Layer (Visible during Hold/Success) */}
      <AnimatePresence>
        {(stage === AnimationStage.Hold || stage === AnimationStage.Success) && <Particles />}
      </AnimatePresence>

      <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[2/1] px-2">
        
        {/* SVG Connector Layer - The "Tree Structure" Behind */}
        <svg 
          viewBox="0 0 100 70" 
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
        >
          <defs>
            <linearGradient id="gradMarketing" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <linearGradient id="gradAuto" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="gradBI" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Phase 1: Root to Hubs */}
          <Connection 
            start={POS.root} end={POS.hubs.marketing} 
            color="#a855f7" show={isStage(AnimationStage.Sprout)} 
            delay={0}
          />
          <Connection 
            start={POS.root} end={POS.hubs.automation} 
            color="#f59e0b" show={isStage(AnimationStage.Sprout)} 
            delay={0.2}
          />
          <Connection 
            start={POS.root} end={POS.hubs.bi} 
            color="#3b82f6" show={isStage(AnimationStage.Sprout)} 
            delay={0.4}
          />

          {/* Phase 2: Hubs to Leaves */}
          {/* Marketing Leaves */}
          <Connection start={POS.hubs.marketing} end={POS.leaves.m1} color="#d8b4fe" show={isStage(AnimationStage.SubBranches)} delay={0} dashed />
          <Connection start={POS.hubs.marketing} end={POS.leaves.m2} color="#d8b4fe" show={isStage(AnimationStage.SubBranches)} delay={0.1} dashed />
          
          {/* Automation Leaves */}
          <Connection start={POS.hubs.automation} end={POS.leaves.a1} color="#fcd34d" show={isStage(AnimationStage.SubBranches)} delay={0.2} dashed />
          <Connection start={POS.hubs.automation} end={POS.leaves.a2} color="#fcd34d" show={isStage(AnimationStage.SubBranches)} delay={0.3} dashed />

          {/* BI Leaves */}
          <Connection start={POS.hubs.bi} end={POS.leaves.b1} color="#93c5fd" show={isStage(AnimationStage.SubBranches)} delay={0.4} dashed />
          <Connection start={POS.hubs.bi} end={POS.leaves.b2} color="#93c5fd" show={isStage(AnimationStage.SubBranches)} delay={0.5} dashed />

          {/* Phase 3: Success Beams */}
          {isStage(AnimationStage.Success) && (
             <motion.path
               d={`M${POS.hubs.marketing.x} ${POS.hubs.marketing.y - 3} Q ${POS.hubs.marketing.x + 5} ${POS.success.y + 15} ${POS.success.x} ${POS.success.y + 5}
                  M${POS.hubs.automation.x} ${POS.hubs.automation.y - 3} L ${POS.success.x} ${POS.success.y + 5}
                  M${POS.hubs.bi.x} ${POS.hubs.bi.y - 3} Q ${POS.hubs.bi.x - 5} ${POS.success.y + 15} ${POS.success.x} ${POS.success.y + 5}`}
               fill="none"
               stroke="url(#gradAuto)"
               strokeWidth="0.5"
               strokeDasharray="2 2"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 0.6 }}
               transition={{ duration: 1.5 }}
             />
          )}
        </svg>

        {/* Nodes Layer - Cards Sitting ON TOP */}
        <AnimatePresence mode="wait">
          
          {/* ROOT NODE - The Seed */}
          {isStage(AnimationStage.Seed) && (
            <Node 
              pos={POS.root} 
              icon={stage === AnimationStage.Seed ? <Sprout size={20} /> : <Cpu size={24} />} 
              label="Tu Negocio" 
              theme="green"
              main
              pulsing={stage === AnimationStage.Seed}
            />
          )}

          {/* MAIN HUBS */}
          {isStage(AnimationStage.Branches) && (
            <>
              <Node pos={POS.hubs.marketing} icon={<Megaphone />} label="MARKETING" theme="purple" delay={0} />
              <Node pos={POS.hubs.automation} icon={<Zap />} label="AUTOMATIZACIÓN" theme="amber" delay={0.2} />
              <Node pos={POS.hubs.bi} icon={<BarChart3 />} label="DATA & BI" theme="blue" delay={0.4} />
            </>
          )}

          {/* LEAF NODES */}
          {isStage(AnimationStage.SubBranches) && (
            <>
              {/* Marketing */}
              <Node pos={POS.leaves.m1} icon={<MessageSquare />} label="Chatbots" theme="purple-light" small delay={0} />
              <Node pos={POS.leaves.m2} icon={<Users />} label="Alcance" theme="purple-light" small delay={0.1} />
              
              {/* Automation */}
              <Node pos={POS.leaves.a1} icon={<Clock />} label="24/7" theme="amber-light" small delay={0.2} />
              <Node pos={POS.leaves.a2} icon={<LinkIcon />} label="Conexión" theme="amber-light" small delay={0.3} />

              {/* BI */}
              <Node pos={POS.leaves.b1} icon={<PieChart />} label="Métricas" theme="blue-light" small delay={0.4} />
              <Node pos={POS.leaves.b2} icon={<Lightbulb />} label="Estrategia" theme="blue-light" small delay={0.5} />
            </>
          )}

          {/* SUCCESS STATE */}
          {isStage(AnimationStage.Success) && (
            <motion.div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 w-full flex justify-center"
              style={{ left: `${POS.success.x}%`, top: `${POS.success.y}%` }}
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <div className="relative group cursor-default">
                 <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-40 animate-pulse"></div>
                 <div className="relative bg-gradient-to-r from-amber-400 to-yellow-500 p-3 md:p-4 rounded-2xl shadow-xl shadow-amber-200/50 flex items-center gap-2 md:gap-3 ring-4 ring-yellow-50/80">
                    <Star className="w-5 h-5 md:w-6 md:h-6 text-white fill-white animate-[spin_4s_linear_infinite]" />
                    <span className="font-bold text-white tracking-wide pr-1 text-sm md:text-base">ÉXITO TOTAL</span>
                 </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Particles = () => {
  // Generate random particles
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: 20 + Math.random() * 60, // Concentrated in middle
    y: 10 + Math.random() * 50,
    size: Math.random() * 6 + 4,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
       {particles.map(p => (
         <motion.div
            key={p.id}
            className="absolute bg-gradient-to-t from-green-300/30 to-yellow-300/30 rounded-full blur-[1px]"
            style={{ 
              left: `${p.x}%`, 
              top: `${p.y}%`,
              width: p.size,
              height: p.size
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              y: [0, -40],
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.2]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
         />
       ))}
    </div>
  )
}

const Connection = ({ start, end, color, show, delay = 0, dashed = false }: any) => {
  // Calculate control points for smooth Bezier curves
  const midY = (start.y + end.y) / 2;
  const path = `M${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;

  return (
    <>
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={dashed ? "1" : "2"}
        strokeDasharray={dashed ? "4 4" : "none"}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: dashed ? 0.3 : 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      />
      {/* Moving Particle Effect on Line */}
      {show && !dashed && (
        <motion.circle
          r="2"
          fill={color}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatDelay: 0.5 
          }}
          style={{ offsetPath: `path("${path}")` } as any}
        />
      )}
    </>
  );
};

interface NodeProps {
  pos: { x: number; y: number };
  icon: React.ReactNode;
  label: string;
  theme: 'green' | 'purple' | 'amber' | 'blue' | 'purple-light' | 'amber-light' | 'blue-light';
  main?: boolean;
  small?: boolean;
  delay?: number;
  pulsing?: boolean;
}

const Node: React.FC<NodeProps> = ({ pos, icon, label, theme, main, small, delay = 0, pulsing }) => {
  const styles = {
    green: "bg-white text-green-600 border-green-200 shadow-green-100",
    purple: "bg-white text-purple-600 border-purple-200 shadow-purple-100",
    amber: "bg-white text-amber-500 border-amber-200 shadow-amber-100",
    blue: "bg-white text-blue-600 border-blue-200 shadow-blue-100",
    
    "purple-light": "bg-purple-50/80 text-purple-600 border-purple-100/50 shadow-purple-50",
    "amber-light": "bg-amber-50/80 text-amber-600 border-amber-100/50 shadow-amber-50",
    "blue-light": "bg-blue-50/80 text-blue-600 border-blue-100/50 shadow-blue-50",
  };

  // Responsive sizing using Tailwind classes
  const cardSize = main 
    ? "w-16 h-16 md:w-20 md:h-20" 
    : small 
      ? "w-9 h-9 md:w-11 md:h-11" 
      : "w-12 h-12 md:w-14 md:h-14";
      
  const iconScale = main ? "scale-110" : small ? "scale-[0.80] md:scale-90" : "scale-95";
  
  const fontSize = main 
    ? "text-xs md:text-sm font-bold mt-2" 
    : small 
      ? "text-[9px] md:text-xs font-medium mt-1 text-slate-500" 
      : "text-[10px] md:text-xs font-bold mt-1.5";

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* CARD */}
      <div className={`
        ${cardSize} rounded-2xl flex items-center justify-center 
        shadow-lg border backdrop-blur-sm transition-all duration-300 relative
        ${styles[theme]}
        ${pulsing ? 'animate-pulse ring-4 ring-green-100' : ''}
      `}>
        <div className={iconScale}>
          {/* We clone element to enforce size if needed, but CSS scaling is usually enough */}
          {React.isValidElement(icon) ? React.cloneElement(icon as any, { strokeWidth: 2 }) : icon}
        </div>
      </div>
      
      {/* LABEL */}
      <motion.span 
        className={`${fontSize} tracking-wide text-center whitespace-nowrap bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-md shadow-sm border border-slate-100/50`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.1 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};
