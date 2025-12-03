"use client";

import { TrendingUp, Zap, Bot, Database } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import type { Step } from "@/content/types";

interface DashboardViewProps {
  steps: Step[];
}

export function DashboardView({ steps }: DashboardViewProps) {
  return (
    <div className="h-full bg-gray-50 p-4 grid grid-cols-2 grid-rows-3 gap-3">
      {/* Static Widgets */}
      <div className="col-span-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <span className="text-xs text-gray-400 font-bold uppercase">
          Total Revenue
        </span>
        <div className="text-2xl font-bold text-gray-800">$12,450</div>
        <div className="text-xs text-green-500 flex items-center gap-1">
          <TrendingUp size={10} /> +12%
        </div>
      </div>
      <div className="col-span-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <span className="text-xs text-gray-400 font-bold uppercase">
          Active Users
        </span>
        <div className="text-2xl font-bold text-gray-800">1,204</div>
        <div className="h-1 w-full bg-gray-100 rounded-full mt-2">
          <div className="h-full w-2/3 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* Live Updates Area */}
      <div className="col-span-2 row-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-3 overflow-hidden relative">
        <div className="text-xs font-bold text-gray-400 uppercase mb-2 flex justify-between">
          <span>Live Activity Log</span>
          <span className="flex items-center gap-1 text-green-500">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>{" "}
            Live
          </span>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-[140px]">
          {steps.map((step, i) => {
            const text = step.action || step.result;
            const isBot = text?.includes("Insight") || text?.includes("Bot:");
            const isData = text?.includes("$") || text?.includes("%") || text?.includes("Ventas");
            const isTrigger = text?.includes("Sync") || text?.includes("Detectando");

            return (
              <Reveal key={i} delay={i * 500}>
                <div
                  className={`text-xs p-2 rounded-lg flex items-center gap-2 ${
                    isBot
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                      : isData
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {isTrigger && <Zap size={10} />}
                  {isBot && <Bot size={10} />}
                  {isData && <Database size={10} />}
                  {text}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
