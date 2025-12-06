"use client";

import { useState, useEffect } from "react";
import { User, Star, ArrowRight, Sparkles } from "lucide-react";
import type { Step } from "@/content/types";

interface CRMViewProps {
  steps: Step[];
}

interface Lead {
  id: number;
  name: string;
  company: string;
  source: string;
  score: number;
  column: number;
  isNew?: boolean;
  isMoving?: boolean;
}

export function CRMView({ steps }: CRMViewProps) {
  const columns = ["New Leads", "Contacted", "Qualified"];
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, name: "Maria Garcia", company: "TechCorp", source: "Website", score: 45, column: 0 },
    { id: 2, name: "Carlos Ruiz", company: "StartupXYZ", source: "Referral", score: 62, column: 1 },
  ]);
  const [animationStep, setAnimationStep] = useState(0);

  // Animation sequence based on steps
  useEffect(() => {
    if (steps.length === 0) return;

    const sequence = [
      // Step 1: New lead arrives
      () => {
        setLeads(prev => [...prev, {
          id: 3,
          name: "Juan Perez",
          company: "GlobalTech",
          source: "LinkedIn",
          score: 78,
          column: 0,
          isNew: true,
        }]);
      },
      // Step 2: AI analyzes and scores
      () => {
        setLeads(prev => prev.map(l =>
          l.id === 3 ? { ...l, isNew: false, score: 92 } : l
        ));
      },
      // Step 3: Move to qualified
      () => {
        setLeads(prev => prev.map(l =>
          l.id === 3 ? { ...l, isMoving: true } : l
        ));
        setTimeout(() => {
          setLeads(prev => prev.map(l =>
            l.id === 3 ? { ...l, column: 2, isMoving: false } : l
          ));
        }, 600);
      },
      // Step 4: Another lead arrives
      () => {
        setLeads(prev => [...prev, {
          id: 4,
          name: "Ana Martinez",
          company: "InnovateCo",
          source: "Email",
          score: 55,
          column: 0,
          isNew: true,
        }]);
      },
      // Step 5: Move first lead to contacted
      () => {
        setLeads(prev => prev.map(l =>
          l.id === 1 ? { ...l, isMoving: true } : l
        ));
        setTimeout(() => {
          setLeads(prev => prev.map(l =>
            l.id === 1 ? { ...l, column: 1, isMoving: false, score: 68 } : l
          ));
        }, 600);
      },
    ];

    const interval = setInterval(() => {
      if (animationStep < sequence.length) {
        const step = sequence[animationStep];
        if (step) step();
        setAnimationStep(prev => prev + 1);
      } else {
        // Reset animation
        setAnimationStep(0);
        setLeads([
          { id: 1, name: "Maria Garcia", company: "TechCorp", source: "Website", score: 45, column: 0 },
          { id: 2, name: "Carlos Ruiz", company: "StartupXYZ", source: "Referral", score: 62, column: 1 },
        ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [animationStep, steps.length]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500 text-white";
    if (score >= 60) return "bg-yellow-500 text-black";
    return "bg-gray-400 text-white";
  };

  const getColumnColor = (idx: number) => {
    if (idx === 0) return "bg-blue-500";
    if (idx === 1) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="h-full bg-slate-50 p-3 md:p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 md:pb-3 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
          <span className="font-black text-xs md:text-sm uppercase tracking-wide">AI Lead Manager</span>
        </div>
        <div className="text-[10px] md:text-xs font-bold text-gray-500">
          {leads.length} Leads
        </div>
      </div>

      {/* Kanban Board - 2 columns on mobile, 3 on desktop */}
      <div className="flex-1 grid grid-cols-2 md:flex gap-2 md:gap-4 overflow-hidden">
        {columns.map((col, colIdx) => {
          const columnLeads = leads.filter(l => l.column === colIdx);
          // Hide middle column on mobile to show only 2
          const hideOnMobile = colIdx === 1;
          return (
            <div
              key={col}
              className={`${hideOnMobile ? "hidden md:flex" : "flex"} flex-1 min-w-0 bg-white border-3 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-col`}
            >
              {/* Column Header */}
              <div className={`p-2 md:p-3 border-b-3 md:border-b-4 border-black ${getColumnColor(colIdx)}`}>
                <div className="flex items-center justify-between">
                  <span className="font-black text-[10px] md:text-sm uppercase text-white tracking-wide truncate">
                    {col}
                  </span>
                  <span className="bg-white text-black font-black text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 border-2 border-black shrink-0">
                    {columnLeads.length}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 p-2 md:p-3 space-y-2 md:space-y-3 overflow-y-auto">
                {columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`
                      relative bg-white border-2 md:border-3 border-black p-2 md:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                      transition-all duration-500 ease-out
                      hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      ${lead.isNew ? "animate-pulse ring-2 ring-purple-500 ring-offset-1" : ""}
                      ${lead.isMoving ? "opacity-50 scale-95 translate-x-2" : ""}
                    `}
                  >
                    {/* Lead Header */}
                    <div className="flex items-start gap-2 mb-1.5 md:mb-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
                        <User className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-black text-[11px] md:text-sm leading-tight truncate">{lead.name}</div>
                        <div className="text-[9px] md:text-[10px] text-gray-500 font-medium truncate">{lead.company}</div>
                      </div>
                    </div>

                    {/* Lead Details */}
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[8px] md:text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 font-bold border border-black truncate">
                        {lead.source}
                      </span>
                      <div className={`flex items-center gap-0.5 px-1.5 py-0.5 font-black text-[10px] md:text-xs border-2 border-black shrink-0 ${getScoreColor(lead.score)}`}>
                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        {lead.score}
                      </div>
                    </div>

                    {/* Moving indicator */}
                    {lead.isMoving && (
                      <div className="absolute right-1 top-1/2 -translate-y-1/2">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-purple-600 animate-bounce" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Empty state */}
                {columnLeads.length === 0 && (
                  <div className="h-full flex items-center justify-center text-gray-400 text-[10px] md:text-xs font-bold uppercase">
                    Empty
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
