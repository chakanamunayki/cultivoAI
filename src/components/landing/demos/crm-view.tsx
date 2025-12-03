"use client";

import { Reveal } from "@/components/landing/ui/reveal";
import type { Step } from "@/content/types";

interface CRMViewProps {
  steps: Step[];
}

export function CRMView({ steps }: CRMViewProps) {
  const columns = ["New Leads", "Contacted", "Qualified"];

  return (
    <div className="h-full bg-slate-100 p-4 flex gap-3 overflow-x-auto">
      {columns.map((col, idx) => (
        <div
          key={col}
          className="w-1/3 min-w-[120px] bg-slate-200/50 rounded-lg p-2 flex flex-col gap-2"
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            {col}
          </div>
          {idx === 0 && (
            <div className="bg-white p-2 rounded shadow-sm border-l-4 border-blue-500">
              <div className="w-8 h-8 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-2 bg-gray-200 w-3/4 rounded mb-1"></div>
              <div className="h-2 bg-gray-200 w-1/2 rounded"></div>
            </div>
          )}

          {/* Dynamic Step Injection - New Leads Column */}
          {idx === 0 &&
            steps.map((step, i) => {
              const text = step.action || step.result;
              const isTrigger = text?.includes("Lead:") || text?.includes("Nuevo");

              if (!isTrigger) return null;

              return (
                <Reveal key={i} delay={i * 600}>
                  <div className="bg-white p-2 rounded shadow-sm border-l-4 border-purple-500 animate-in slide-in-from-left duration-300">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-xs text-gray-800">
                        Juan Perez
                      </div>
                      <div className="text-[8px] bg-blue-100 text-blue-600 px-1 rounded">
                        LinkedIn
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      CEO @ TechCorp
                    </div>
                  </div>
                </Reveal>
              );
            })}

          {/* Dynamic Step Injection - Qualified Column */}
          {idx === 2 &&
            steps.map((step, i) => {
              const text = step.action || step.result;
              const isAction = text?.includes("Movido") || text?.includes("Prioridad");

              if (!isAction) return null;

              return (
                <Reveal key={i} delay={i * 600}>
                  <div className="bg-white p-2 rounded shadow-md ring-2 ring-green-400 border-l-4 border-green-500">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-xs text-gray-800">
                        Juan Perez
                      </div>
                      <div className="text-[8px] bg-green-100 text-green-600 px-1 rounded">
                        92/100
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      High Priority Lead
                    </div>
                  </div>
                </Reveal>
              );
            })}
        </div>
      ))}
    </div>
  );
}
