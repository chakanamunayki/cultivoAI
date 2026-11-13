"use client";

import { MessageSquare } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";

// The closed chat: WhatsApp + "Let's talk", fixed bottom-right. Shared by the
// placeholder in page.tsx and the loaded AIChatWidget so the two never drift and
// nothing jumps when the widget swaps in.
const launcherButton =
  "inline-flex h-[58px] items-center justify-center rounded-xl shadow-[0_10px_20px_rgba(15,23,42,0.26)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(15,23,42,0.32)]";
const whatsappClass = `${launcherButton} w-[58px] bg-[#25D366] text-[#0b2d1f] hover:bg-[#34e073]`;
const chatClass = `${launcherButton} min-w-[58px] gap-2 bg-primary px-4 font-bold text-[#18181b] uppercase`;

interface ChatLauncherProps {
  chatLabel: string;
  chatAriaLabel: string;
  onChat: () => void;
  whatsappAriaLabel: string;
  /** A plain link (placeholder) or a handler that builds a prefilled message (widget). */
  whatsapp: { href: string } | { onClick: () => void };
}

export function ChatLauncher({
  chatLabel,
  chatAriaLabel,
  onChat,
  whatsappAriaLabel,
  whatsapp,
}: ChatLauncherProps) {
  return (
    <div className="font-grotesk fixed right-4 bottom-4 z-[60] flex flex-col items-end md:right-6 md:bottom-6 [[data-menu-open]_&]:hidden">
      <div className="flex items-center gap-2">
        {"href" in whatsapp ? (
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className={whatsappClass}
            aria-label={whatsappAriaLabel}
          >
            <WhatsAppIcon size={24} />
          </a>
        ) : (
          <button
            type="button"
            onClick={whatsapp.onClick}
            className={whatsappClass}
            aria-label={whatsappAriaLabel}
          >
            <WhatsAppIcon size={24} />
          </button>
        )}
        <button type="button" onClick={onChat} className={chatClass} aria-label={chatAriaLabel}>
          <MessageSquare size={24} aria-hidden="true" />
          <span className="hidden md:inline">{chatLabel}</span>
        </button>
      </div>
    </div>
  );
}
