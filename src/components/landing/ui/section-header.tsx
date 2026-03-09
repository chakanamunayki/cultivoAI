import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  headingId?: string;
  className?: string;
  subtitleClassName?: string;
  tone?: "default" | "onDark";
}

export function SectionHeader({
  title,
  subtitle,
  headingId,
  className,
  subtitleClassName,
  tone = "default",
}: SectionHeaderProps) {
  const isOnDark = tone === "onDark";

  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <h2
          id={headingId}
          className={cn(
            "inline-block rounded-[14px] border px-4 py-2 text-4xl leading-none font-black tracking-tight uppercase shadow-[0_14px_30px_rgba(15,23,42,0.2)] md:text-5xl lg:text-6xl",
            isOnDark
              ? "border-[#00BCD4] bg-[#00BCD4] text-[#1f1f1f]"
              : "border-black/80 bg-[#1f1f1f] text-[#00BCD4]"
          )}
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
