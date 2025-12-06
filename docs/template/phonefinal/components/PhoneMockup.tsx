
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  Battery, 
  Signal, 
  ChevronLeft, 
  Video, 
  Phone, 
  MoreVertical, 
  CheckCheck,
  Smile,
  Mic,
  Plus,
  Camera,
  Mail,
  Calendar,
  BarChart3,
  Send
} from 'lucide-react';

// --- TYPES & DATA ---

type MessageType = 'user' | 'bot';

interface Message {
  id: string;
  type: MessageType;
  text: string;
  time: string;
  read?: boolean;
}

interface Notification {
  id: string;
  icon: React.ReactNode;
  text: string;
  color: string;
  side: 'left' | 'right';
}

const SEQUENCE = [
  { t: 800, type: 'msg', role: 'user', text: "Hola! Vi su página web" },
  { t: 2500, type: 'msg', role: 'bot', text: "¡Hola! 👋 Bienvenido a CultivoAI.\n¿En qué puedo ayudarte hoy?" },
  { t: 4500, type: 'msg', role: 'user', text: "Cuánto cuesta un chatbot?" },
  { t: 5500, type: 'typing', val: true },
  { t: 7500, type: 'typing', val: false },
  { t: 7600, type: 'msg', role: 'bot', text: "Los chatbots empiezan desde $100 USD.\nIncluye:\n✅ Diseño de personalidad\n✅ Entrenamiento con tu info\n✅ Integración WhatsApp/Web\n\n¿Te agendo una llamada con Paul?" },
  { t: 8000, type: 'notify', text: "Lead added to CRM", icon: <BarChart3 size={16}/>, color: "bg-blue-500", side: 'right' },
  { t: 10500, type: 'msg', role: 'user', text: "Sí! Mañana a las 10am" },
  { t: 11000, type: 'notify', text: "Meeting scheduled", icon: <Calendar size={16}/>, color: "bg-purple-500", side: 'left' },
  { t: 12500, type: 'msg', role: 'bot', text: "Perfecto ✅ \nAgendado: Mañana 10:00 AM\nTe envié confirmación por email.\n¡Hasta mañana! 🙌" },
  { t: 13000, type: 'notify', text: "Email sent to lead", icon: <Mail size={16}/>, color: "bg-green-500", side: 'right' },
];

const TOTAL_CYCLE_TIME = 19000; // Total time before reset

export const PhoneMockup: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Main Animation Loop
  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const runSequence = () => {
      // Reset state
      setMessages([]);
      setIsTyping(false);
      setNotifications([]);

      const startTime = Date.now();
      
      SEQUENCE.forEach((step: any) => {
        const timeout = setTimeout(() => {
          if (step.type === 'msg') {
            const newMsg: Message = {
              id: Math.random().toString(36).substr(2, 9),
              type: step.role,
              text: step.text,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
              read: step.role === 'bot'
            };
            setMessages(prev => [...prev, newMsg]);
          } else if (step.type === 'typing') {
            setIsTyping(step.val);
          } else if (step.type === 'notify') {
            const notifId = Math.random().toString();
            setNotifications(prev => [...prev, {
              id: notifId,
              text: step.text,
              icon: step.icon,
              color: step.color,
              side: step.side
            }]);
            // Remove notification after 3.5 seconds
            setTimeout(() => {
              setNotifications(prev => prev.filter(n => n.id !== notifId));
            }, 3500);
          }
        }, step.t);
        timeouts.push(timeout);
      });

      // Schedule Reset
      timeouts.push(setTimeout(runSequence, TOTAL_CYCLE_TIME));
    };

    runSequence();

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-[300px] sm:w-[340px] h-[640px] flex items-center justify-center perspective-[1500px]">
      
      {/* Floating Notifications Layer - Z-Index 30 to stay on TOP of phone */}
      <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
        <AnimatePresence>
          {notifications.map((n) => (
            <NotificationCard key={n.id} data={n} />
          ))}
        </AnimatePresence>
      </div>

      {/* PHONE CONTAINER */}
      <motion.div 
        className="relative w-[280px] h-[560px] bg-black rounded-[45px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] border-[8px] border-gray-900 overflow-hidden z-10"
        animate={{ 
          y: [-6, 6, -6],
          rotateY: [-5, -2, -5],
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ 
          scale: 1.02,
          rotateX: 2,
          rotateY: 0,
          transition: { duration: 0.3 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Hardware Buttons */}
        <div className="absolute top-24 -left-[10px] w-[3px] h-10 bg-gray-800 rounded-l-md" />
        <div className="absolute top-40 -left-[10px] w-[3px] h-14 bg-gray-800 rounded-l-md" />
        <div className="absolute top-32 -right-[10px] w-[3px] h-16 bg-gray-800 rounded-r-md" />

        {/* Screen Content */}
        <div className="w-full h-full bg-[#E5DDD5] flex flex-col relative overflow-hidden rounded-[38px]">
          
          {/* Status Bar */}
          <div className="h-7 w-full bg-[#075e54] flex items-center justify-between px-6 pt-2 pb-1 z-30">
            <span className="text-[10px] text-white font-medium">9:41</span>
            <div className="flex gap-1.5 items-center text-white">
              <Signal size={10} strokeWidth={3} />
              <Wifi size={10} strokeWidth={3} />
              <Battery size={10} strokeWidth={3} />
            </div>
          </div>

          {/* WhatsApp Header */}
          <div className="bg-[#075e54] px-3 py-2 flex items-center gap-2 shadow-sm z-20">
            <button className="text-white">
              <ChevronLeft size={24} />
            </button>
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20 relative">
               <span className="text-lg">🤖</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-sm font-semibold truncate">CultivoAI Bot</h3>
              <p className="text-green-100 text-[10px] truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Online
              </p>
            </div>
            <div className="flex items-center gap-3 text-white pr-1">
              <Video size={20} />
              <Phone size={18} />
              <MoreVertical size={18} />
            </div>
          </div>

          {/* Chat Area */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide"
            ref={scrollRef}
            style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          >
            {/* Encryption Notice */}
            <div className="flex justify-center my-2">
              <div className="bg-[#fcf3d0] shadow-sm rounded-lg px-2 py-1 max-w-[85%]">
                <p className="text-[9px] text-center text-gray-600 leading-tight">
                  🔒 Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                </p>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} msg={msg} />
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="self-start bg-white rounded-lg rounded-tl-none shadow-sm px-3 py-2.5 max-w-[80%]"
                >
                  <div className="flex gap-1">
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} />
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Spacer for bottom padding */}
            <div className="h-2" />
          </div>

          {/* Input Area */}
          <div className="bg-[#f0f2f5] px-2 py-2 flex items-center gap-2 pb-6 z-20">
            <Plus size={20} className="text-[#007bff]" />
            <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm border border-gray-100">
              <span className="text-gray-400 text-sm">Message...</span>
              <div className="ml-auto flex gap-2 text-gray-400">
                 <Camera size={18} />
                 <Mic size={18} />
              </div>
            </div>
            <div className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center text-white shadow-sm">
               <Send size={16} className="ml-0.5" />
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-30" />
          
          {/* Screen Gloss Reflection */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-40 rounded-[38px]" />
        </div>
      </motion.div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ChatBubble: React.FC<{ msg: Message }> = ({ msg }) => {
  const isBot = msg.type === 'bot';
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full ${isBot ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`
          relative max-w-[85%] px-3 py-1.5 rounded-lg shadow-sm text-sm leading-snug
          ${isBot 
            ? 'bg-[#dcf8c6] rounded-tr-none text-gray-900' 
            : 'bg-white rounded-tl-none text-gray-900'
          }
        `}
      >
        {/* Triangle tail */}
        <div className={`
          absolute top-0 w-3 h-3 
          ${isBot 
            ? '-right-1.5 bg-[#dcf8c6] [clip-path:polygon(0_0,100%_0,0_100%)]' 
            : '-left-1.5 bg-white [clip-path:polygon(0_0,100%_0,100%_100%)]'
          }
        `} />

        <div className="whitespace-pre-wrap">{msg.text}</div>
        
        <div className="flex items-center justify-end gap-1 mt-1 opacity-60">
          <span className="text-[10px]">{msg.time}</span>
          {isBot && (
            <CheckCheck size={12} className="text-[#34b7f1]" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const NotificationCard: React.FC<{ data: Notification }> = ({ data }) => {
  const isRight = data.side === 'right';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        x: isRight ? 80 : -80, // Moved closer to center to stay on screen for mobile
        y: isRight ? -140 : 120, 
        rotate: isRight ? 2 : -2 
      }}
      exit={{ opacity: 0, scale: 0.8, y: (isRight ? -140 : 120) - 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`
        absolute
        bg-white/95 backdrop-blur-md rounded-xl shadow-xl shadow-slate-200/50
        py-3 px-4 flex items-center gap-3 border border-white/60 min-w-[200px]
        ring-1 ring-slate-900/5
      `}
      style={{
        zIndex: 50 // High Z-Index to ensure visibility
      }}
    >
      <div className={`w-1 h-8 rounded-full ${data.color}`} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">System Event</p>
        <div className="flex items-center gap-2 text-gray-800 text-xs font-semibold whitespace-nowrap">
          <span className={`${data.color} bg-opacity-10 text-opacity-100 p-1 rounded-md`}>
            {React.cloneElement(data.icon as any, { size: 14, className: `text-current` })}
          </span>
          {data.text}
        </div>
      </div>
    </motion.div>
  );
}
