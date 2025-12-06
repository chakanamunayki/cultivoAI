"use client";

import { useState, useEffect } from "react";
import { Code2, Eye, Sparkles, Check, Loader2 } from "lucide-react";
import type { Step } from "@/content/types";

interface CodeViewProps {
  steps: Step[];
}

type ViewMode = "code" | "generating" | "preview";

export function CodeView({ steps }: CodeViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("code");
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  const generatedCode = [
    '<div className="hero-section">',
    '  <h1 className="text-5xl font-black">',
    '    Welcome to Our Platform',
    '  </h1>',
    '  <p className="text-xl mt-4">',
    '    AI-powered solutions for your business',
    '  </p>',
    '  <button className="cta-button">',
    '    Get Started →',
    '  </button>',
    '</div>',
  ];

  // Animation sequence
  useEffect(() => {
    if (steps.length === 0) return;

    let timeout: NodeJS.Timeout;

    const runSequence = async () => {
      // Phase 1: Show code being typed
      setViewMode("code");
      setCodeLines([]);
      setCurrentLine(0);

      for (let i = 0; i < generatedCode.length; i++) {
        const line = generatedCode[i] ?? "";
        await new Promise(resolve => {
          timeout = setTimeout(resolve, 400);
        });
        setCodeLines(prev => [...prev, line]);
        setCurrentLine(i + 1);
      }

      // Phase 2: Generating/processing
      await new Promise(resolve => {
        timeout = setTimeout(resolve, 1000);
      });
      setViewMode("generating");

      // Phase 3: Show preview
      await new Promise(resolve => {
        timeout = setTimeout(resolve, 2000);
      });
      setViewMode("preview");

      // Phase 4: Reset
      await new Promise(resolve => {
        timeout = setTimeout(resolve, 4000);
      });
      runSequence();
    };

    runSequence();

    return () => clearTimeout(timeout);
  }, [steps.length]);

  return (
    <div className="h-full flex flex-col bg-[#1a1a2e]">
      {/* Tab Bar */}
      <div className="flex items-center border-b-4 border-black bg-[#16213e]">
        <button
          className={`flex items-center gap-2 px-4 py-3 font-bold text-sm uppercase transition-all ${
            viewMode === "code" || viewMode === "generating"
              ? "bg-[#1a1a2e] text-white border-r-4 border-black"
              : "bg-[#16213e] text-gray-400 hover:text-white border-r-4 border-black"
          }`}
        >
          <Code2 className="w-4 h-4" />
          Code
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-3 font-bold text-sm uppercase transition-all ${
            viewMode === "preview"
              ? "bg-white text-black border-r-4 border-black"
              : "bg-[#16213e] text-gray-400 hover:text-white border-r-4 border-black"
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <div className="flex-1" />
        {viewMode === "generating" && (
          <div className="flex items-center gap-2 px-4 text-purple-400 text-sm font-bold">
            <Sparkles className="w-4 h-4 animate-spin" />
            AI Building...
          </div>
        )}
        {viewMode === "preview" && (
          <div className="flex items-center gap-2 px-4 text-green-400 text-sm font-bold">
            <Check className="w-4 h-4" />
            Live Preview
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {(viewMode === "code" || viewMode === "generating") && (
          <div className="h-full p-4 font-mono text-sm overflow-auto">
            {/* File indicator */}
            <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              components/HeroSection.tsx
            </div>

            {/* Code lines */}
            <div className="space-y-1">
              {codeLines.map((line, i) => (
                <div key={i} className="flex gap-4 animate-in slide-in-from-left duration-300">
                  <span className="text-gray-600 select-none w-6 text-right">{i + 1}</span>
                  <pre className="text-green-300 flex-1">
                    <code>{line}</code>
                  </pre>
                </div>
              ))}

              {/* Cursor */}
              <div className="flex gap-4">
                <span className="text-gray-600 select-none w-6 text-right">{currentLine + 1}</span>
                <span className="text-white animate-pulse">|</span>
              </div>
            </div>

            {/* Generating overlay */}
            {viewMode === "generating" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-[#16213e] border-4 border-purple-500 shadow-[8px_8px_0px_0px_#A855F7] p-6 text-center">
                  <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto mb-3" />
                  <div className="font-black text-white uppercase">Building Component</div>
                  <div className="text-purple-400 text-sm mt-1">AI generating preview...</div>
                </div>
              </div>
            )}
          </div>
        )}

        {viewMode === "preview" && (
          <div className="h-full bg-gradient-to-br from-[#FFC805] to-[#FFDE00] p-8 flex items-center justify-center animate-in fade-in duration-500">
            {/* Preview of the generated component */}
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md text-center transform hover:-translate-y-1 transition-transform">
              <h1 className="text-3xl md:text-4xl font-black text-black mb-4 uppercase">
                Welcome to Our Platform
              </h1>
              <p className="text-lg text-gray-700 mb-6 font-medium">
                AI-powered solutions for your business
              </p>
              <button className="bg-[#A855F7] text-white font-black uppercase px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                Get Started →
              </button>

              {/* Success badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-green-600 font-bold text-sm">
                <Check className="w-5 h-5" />
                Component Generated Successfully
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
