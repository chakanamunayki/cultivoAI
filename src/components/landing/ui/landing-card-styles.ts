import { cn } from "@/lib/utils";

export type LandingCardVariant = "dark" | "blue";

const CARD_VARIANT_CLASS: Record<LandingCardVariant, string> = {
  dark:
    "border-white/15 bg-[#212121] text-[#FFFFFF] shadow-[0_14px_30px_rgba(0,0,0,0.3)] ring-1 ring-white/5 hover:-translate-y-0.5 hover:bg-[#1b1b1b] hover:shadow-[0_18px_34px_rgba(0,0,0,0.4)]",
  blue:
    "border-[#00BCD4] bg-[#00BCD4] text-[#FFFFFF] shadow-[0_18px_34px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_22px_40px_rgba(15,23,42,0.28)]",
};

const TITLE_BAND_VARIANT_CLASS: Record<LandingCardVariant, string> = {
  dark: "border-[#00BCD4]/35 bg-[#00BCD4] text-[#FFFFFF]",
  blue: "border-white/15 bg-[#212121] text-[#FFFFFF]",
};

export function landingCardClass(variant: LandingCardVariant, className?: string) {
  return cn(
    "rounded-[24px] border transition-all duration-200",
    CARD_VARIANT_CLASS[variant],
    className
  );
}

export function landingTitleBandClass(variant: LandingCardVariant, className?: string) {
  return cn("border-b", TITLE_BAND_VARIANT_CLASS[variant], className);
}

export function landingIconChipClass(variant: LandingCardVariant, className?: string) {
  return cn(
    "rounded-lg border p-2 transition-transform group-hover:scale-105",
    variant === "blue" ? "border-white/25 bg-white/10" : "border-white/20 bg-black/20",
    className
  );
}

export const landingPrimaryDarkButtonClass =
  "rounded-xl bg-[#212121] text-white uppercase shadow-[0_14px_28px_rgba(17,24,39,0.26)] transition-all hover:-translate-y-0.5 hover:bg-[#181818] hover:shadow-[0_18px_34px_rgba(17,24,39,0.32)]";

export const landingPrimaryBlueButtonClass =
  "rounded-xl bg-[#00BCD4] text-white uppercase shadow-[0_14px_28px_rgba(15,23,42,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_18px_34px_rgba(15,23,42,0.28)]";
