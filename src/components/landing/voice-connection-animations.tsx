import { Loader2, Mic, WifiOff } from "lucide-react";

export function ConnectingAnimation() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Spinning squares */}
      <div className="absolute w-32 h-32 border-4 border-primary animate-spin-slow" />
      <div className="absolute w-24 h-24 border-4 border-primary animate-spin-slow-reverse" />
      {/* Center loader */}
      <div className="absolute w-16 h-16 bg-secondary border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <Loader2 size={28} className="text-black animate-spin" />
      </div>
    </div>
  );
}

export function IdleAnimation() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Static outer ring */}
      <div className="absolute w-40 h-40 border-4 border-white/20" />
      {/* Center mic icon - no longer clickable, just visual indicator */}
      <div className="w-24 h-24 bg-[#10B981] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <Mic size={32} className="text-white" />
      </div>
    </div>
  );
}

export function ErrorAnimation({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="relative w-48 h-48 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      {/* Static outer ring */}
      <div className="absolute w-40 h-40 border-4 border-[#EF4444]/30" />
      {/* Center error icon */}
      <div className="w-24 h-24 bg-[#EF4444] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-[#DC2626] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
        <WifiOff size={32} className="text-white" />
      </div>
    </div>
  );
}
