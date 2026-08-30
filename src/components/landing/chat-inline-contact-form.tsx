"use client";

import type { FormEventHandler } from "react";
import { Loader2 } from "lucide-react";
import type { Locale } from "@/content/types";

interface ContactFormData {
  name: string;
  email: string;
}

interface ChatInlineContactFormProps {
  locale: Locale;
  formData: ContactFormData;
  formError: string | null;
  isSubmitting: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onFormDataChange: (next: ContactFormData) => void;
}

const FORM_COPY: Record<Locale, {
  nameLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  sending: string;
  continue: string;
}> = {
  es: {
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "tu@email.com",
    sending: "Enviando...",
    continue: "Continuar",
  },
  en: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    sending: "Sending...",
    continue: "Continue",
  },
  pt: {
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailPlaceholder: "voce@email.com",
    sending: "Enviando...",
    continue: "Continuar",
  },
};

export function ChatInlineContactForm({
  locale,
  formData,
  formError,
  isSubmitting,
  onSubmit,
  onFormDataChange,
}: ChatInlineContactFormProps) {
  const copy = FORM_COPY[locale];
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_var(--primary)] p-4 space-y-3 w-full max-w-[85%]"
    >
      <div>
        <label className="block text-xs font-bold uppercase mb-1 text-black">
          {copy.nameLabel}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
          placeholder={copy.namePlaceholder}
          className="w-full p-2 border-2 border-black bg-muted font-bold text-sm focus:shadow-[2px_2px_0px_0px_var(--primary)] outline-none"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase mb-1 text-black">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
          placeholder={copy.emailPlaceholder}
          className="w-full p-2 border-2 border-black bg-muted font-bold text-sm focus:shadow-[2px_2px_0px_0px_var(--primary)] outline-none"
          disabled={isSubmitting}
        />
      </div>
      {formError && <p className="text-xs font-bold text-[#EF4444]">{formError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2 bg-primary text-primary-foreground font-bold uppercase border-2 border-black hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {copy.sending}
          </>
        ) : (
          copy.continue
        )}
      </button>
    </form>
  );
}
