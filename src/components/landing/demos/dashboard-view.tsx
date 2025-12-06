"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Zap, Bot, Database, Users, DollarSign, Activity, BarChart3, ArrowUpRight, ShoppingCart, Clock } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import type { Step } from "@/content/types";

interface DashboardViewProps {
  steps: Step[];
}

export function DashboardView({ steps }: DashboardViewProps) {
  const [animatedStats, setAnimatedStats] = useState({
    revenue: 12400,
    users: 1204,
    orders: 89,
    conversion: 4.2,
  });
  const [activeBar, setActiveBar] = useState(0);

  // Animate stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 500 - 100),
        users: prev.users + Math.floor(Math.random() * 20 - 5),
        orders: Math.min(100, Math.max(70, prev.orders + Math.floor(Math.random() * 6 - 3))),
        conversion: Math.max(3, Math.min(6, prev.conversion + (Math.random() * 0.4 - 0.2))),
      }));
      setActiveBar(prev => (prev + 1) % 7);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const chartBars = [65, 45, 78, 52, 90, 68, 85];

  return (
    <div className="h-full bg-slate-100 p-2 md:p-3 flex flex-col gap-2 md:gap-3 overflow-hidden">
      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-1.5 md:gap-2">
        {/* Revenue Card */}
        <div className="bg-white border-2 md:border-3 border-black p-2 md:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 border-2 border-black flex items-center justify-center">
              <DollarSign size={10} className="text-white" />
            </div>
            <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase hidden md:block">Revenue</span>
          </div>
          <div className="text-sm md:text-lg font-black text-black">${(animatedStats.revenue / 1000).toFixed(1)}K</div>
          <div className="text-[8px] md:text-[10px] text-green-600 font-bold flex items-center gap-0.5 mt-0.5">
            <TrendingUp size={8} /> +12%
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white border-2 md:border-3 border-black p-2 md:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 border-2 border-black flex items-center justify-center">
              <Users size={10} className="text-white" />
            </div>
            <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase hidden md:block">Users</span>
          </div>
          <div className="text-sm md:text-lg font-black text-black">{animatedStats.users.toLocaleString()}</div>
          <div className="text-[8px] md:text-[10px] text-blue-600 font-bold flex items-center gap-0.5 mt-0.5">
            <TrendingUp size={8} /> +8%
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white border-2 md:border-3 border-black p-2 md:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500 border-2 border-black flex items-center justify-center">
              <ShoppingCart size={10} className="text-white" />
            </div>
            <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase hidden md:block">Orders</span>
          </div>
          <div className="text-sm md:text-lg font-black text-black">{animatedStats.orders}</div>
          <div className="text-[8px] md:text-[10px] text-purple-600 font-bold flex items-center gap-0.5 mt-0.5">
            <Activity size={8} /> Live
          </div>
        </div>

        {/* Conversion Card */}
        <div className="bg-white border-2 md:border-3 border-black p-2 md:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-yellow-500 border-2 border-black flex items-center justify-center">
              <ArrowUpRight size={10} className="text-white" />
            </div>
            <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase hidden md:block">Conv.</span>
          </div>
          <div className="text-sm md:text-lg font-black text-black">{animatedStats.conversion.toFixed(1)}%</div>
          <div className="text-[8px] md:text-[10px] text-yellow-600 font-bold flex items-center gap-0.5 mt-0.5">
            <TrendingUp size={8} /> +0.3%
          </div>
        </div>
      </div>

      {/* Middle Row - Chart and Quick Stats */}
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {/* Mini Chart */}
        <div className="col-span-3 bg-white border-3 border-black p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <BarChart3 size={12} className="text-purple-600" />
              <span className="text-[9px] md:text-xs font-black uppercase">Weekly Performance</span>
            </div>
            <span className="text-[8px] md:text-[10px] text-green-600 font-bold">+24%</span>
          </div>
          {/* Chart Bars */}
          <div className="flex items-end justify-between gap-1 h-12 md:h-16">
            {chartBars.map((height, i) => (
              <div
                key={i}
                className={`flex-1 border-2 border-black transition-all duration-300 ${
                  i === activeBar ? "bg-purple-500" : "bg-purple-200"
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[7px] md:text-[8px] text-gray-500 font-bold">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
        </div>

        {/* AI Insights Quick Panel */}
        <div className="col-span-2 bg-[#A855F7] border-3 border-black p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          <div className="flex items-center gap-1.5 mb-2">
            <Bot size={12} className="text-white" />
            <span className="text-[9px] md:text-xs font-black uppercase text-white">AI Insights</span>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="bg-white/20 p-1.5 border border-white/30 text-white text-[8px] md:text-[9px] font-medium">
              📈 Peak sales at 2PM
            </div>
            <div className="bg-white/20 p-1.5 border border-white/30 text-white text-[8px] md:text-[9px] font-medium">
              🎯 Target: 95% reached
            </div>
            <div className="bg-white/20 p-1.5 border border-white/30 text-white text-[8px] md:text-[9px] font-medium hidden md:block">
              ⚡ 3 tasks automated
            </div>
          </div>
        </div>
      </div>

      {/* Live Updates Area */}
      <div className="flex-1 bg-white border-3 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden min-h-0">
        <div className="p-2 md:p-3 border-b-2 md:border-b-3 border-black bg-[#FFDE00] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-1.5">
            <Clock size={10} className="text-black" />
            <span className="text-[10px] md:text-xs font-black uppercase">Live Activity</span>
          </div>
          <span className="flex items-center gap-1 text-green-700 text-[10px] md:text-xs font-bold">
            <div className="w-2 h-2 bg-green-600 border border-black animate-pulse"></div>
            Live
          </span>
        </div>
        <div className="flex-1 p-2 md:p-3 space-y-1.5 md:space-y-2 overflow-y-auto">
          {steps.map((step, i) => {
            const text = step.action || step.result;
            const isBot = text?.includes("Insight") || text?.includes("Bot:");
            const isData = text?.includes("$") || text?.includes("%") || text?.includes("Ventas");
            const isTrigger = text?.includes("Sync") || text?.includes("Detectando");

            return (
              <Reveal key={i} delay={i * 500}>
                <div
                  className={`text-[10px] md:text-xs p-2 border-2 border-black flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    isBot
                      ? "bg-yellow-100 text-yellow-800"
                      : isData
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isTrigger && <Zap size={10} className="shrink-0" />}
                  {isBot && <Bot size={10} className="shrink-0" />}
                  {isData && <Database size={10} className="shrink-0" />}
                  <span className="font-medium truncate">{text}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
