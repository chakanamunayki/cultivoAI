"use client";

import { CodeTerminal } from "@/components/landing/ui/code-terminal";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

export function ProcessTerminalSection() {
  const { content } = useLocale();

  return (
    <section
      id="process-terminal"
      className="bg-white border-b-4 border-black"
      aria-labelledby="process-terminal-heading"
    >
      <div className="max-w-[1140px] mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16">
        <Reveal>
          <h2
            id="process-terminal-heading"
            className="text-3xl md:text-4xl font-black tracking-tight text-center"
          >
            {content.terminal.sectionTitle}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 md:mt-8">
            <CodeTerminal />
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-5 text-center text-sm md:text-base font-medium text-neutral-700">
            {content.terminal.summary}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
