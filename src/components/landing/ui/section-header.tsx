import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  headingId?: string;
  className?: string;
  subtitleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  headingId,
  className,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <h2
          id={headingId}
          className="inline-block rounded-[14px] border border-[#00BCD4] bg-[#00BCD4] px-4 py-2 text-4xl leading-none font-black tracking-tight text-[#FFFFFF] uppercase shadow-[0_14px_30px_rgba(15,23,42,0.2)] md:text-5xl lg:text-6xl"
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              "max-w-2xl border-l-4 border-[#00BCD4] pl-4 text-lg font-semibold text-[#3a3a3a] md:mt-2 md:max-w-xl md:pl-6 md:text-xl",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
