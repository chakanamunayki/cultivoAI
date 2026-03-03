"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "default" | "wide";
}

export function Modal({ isOpen, onClose, children, size = "default" }: ModalProps) {
  const maxWidthClass = size === "wide" ? "max-w-6xl" : "max-w-4xl";

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
          className={`fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] ${maxWidthClass} max-h-[92vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white border-4 border-black shadow-[16px_16px_0px_0px_var(--primary)] p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300 focus:outline-none`}
        >
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 bg-red-500 text-white border-2 border-black p-2 hover:bg-red-600 hover:translate-y-1 transition-all z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
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
