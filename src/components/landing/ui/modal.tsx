"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "default" | "wide";
  variant?: "brutalist" | "soft" | "softDark";
}

export function Modal({
  isOpen,
  onClose,
  children,
  size = "default",
  variant = "brutalist",
}: ModalProps) {
  const maxWidthClass = size === "wide" ? "max-w-6xl" : "max-w-4xl";
  const isSoft = variant === "soft";
  const isSoftDark = variant === "softDark";
  const contentClass = isSoft
    ? "overflow-hidden bg-[#f7f7f7] border border-white/80 rounded-[28px] shadow-[0_24px_70px_rgba(15,23,42,0.24),inset_0_0_0_1px_rgba(255,255,255,0.9)] ring-1 ring-black/5 p-0"
    : isSoftDark
      ? "overflow-hidden bg-[#212121] border border-white/15 rounded-[28px] shadow-[0_24px_70px_rgba(0,0,0,0.46)] ring-1 ring-white/5 p-0"
    : "overflow-y-auto bg-white border-4 border-black shadow-[16px_16px_0px_0px_var(--primary)] p-0";
  const closeButtonClass = isSoft
    ? "absolute top-4 right-4 bg-white/95 text-neutral-700 border border-white/80 p-2.5 rounded-full hover:bg-white hover:text-neutral-900 transition-all z-50 shadow-[0_10px_20px_rgba(15,23,42,0.18)] cursor-pointer"
    : isSoftDark
      ? "absolute top-4 right-4 bg-[#00BCD4] text-white border border-white/30 p-2.5 rounded-full hover:-translate-y-0.5 hover:bg-[#00BCD4] transition-all z-50 shadow-[0_10px_20px_rgba(15,23,42,0.22)] cursor-pointer"
    : "absolute top-4 right-4 bg-red-500 text-white border-2 border-black p-2 hover:bg-red-600 hover:translate-y-1 transition-all z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer";

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] ${maxWidthClass} max-h-[92vh] -translate-x-1/2 -translate-y-1/2 ${contentClass} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300 focus:outline-none`}
        >
          <Dialog.Close asChild>
            <button
              className={closeButtonClass}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
