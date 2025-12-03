"use client";

import { Reveal } from "@/components/landing/ui/reveal";
import type { Step } from "@/content/types";

interface CodeViewProps {
  steps: Step[];
}

export function CodeView({ steps }: CodeViewProps) {
  return (
    <div className="h-full bg-[#1e1e1e] font-mono p-4 text-sm overflow-hidden flex flex-col">
      <div className="flex gap-2 mb-4 border-b border-gray-700 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-gray-500 text-xs">app.tsx</span>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto">
        {steps.map((step, i) => {
          const text = step.action || step.result;
          const isUser = !!step.action && !step.action.includes("IA:");
          const isAI = text?.includes("IA:") || text?.includes("Generando");
          const isData = text?.includes("<") || text?.includes("/>");
          const isAction = text?.includes("desplegado") || text?.includes("Vercel");

          return (
            <Reveal key={i} delay={i * 300}>
              <div className="flex gap-2">
                <span className="text-gray-600 select-none">{i + 1}</span>
                <div className="flex-1">
                  {isUser && (
                    <span className="text-blue-400">
                      {"// Request: "}
                      {text}
                    </span>
                  )}
                  {isAI && (
                    <span className="text-purple-400 animate-pulse">
                      {`/* ${text} */`}
                    </span>
                  )}
                  {isData && (
                    <span className="text-green-300">{text}</span>
                  )}
                  {isAction && (
                    <span className="text-yellow-300">
                      {`console.log("${text}")`}
                    </span>
                  )}
                  {!isUser && !isAI && !isData && !isAction && text && (
                    <span className="text-gray-400">{text}</span>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
        <div className="animate-pulse text-gray-400">_</div>
      </div>
    </div>
  );
}
