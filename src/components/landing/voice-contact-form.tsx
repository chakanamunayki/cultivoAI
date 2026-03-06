"use client";

import type { FormEventHandler } from "react";
import { Loader2 } from "lucide-react";

interface VoiceFormData {
  name: string;
  email: string;
  phone: string;
}

interface VoiceContactFormProps {
  locale: "es" | "en";
  labels: {
    name: string;
    email: string;
    phone: string;
    submit: string;
    submitting: string;
  };
  formData: VoiceFormData;
  formError: string | null;
  isSubmitting: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onFormDataChange: (next: VoiceFormData) => void;
  showSkipButton?: boolean;
  skipButtonLabel?: string;
  onSkip?: () => void;
  submitButtonClassName?: string;
}

export function VoiceContactForm({
  locale,
  labels,
  formData,
  formError,
  isSubmitting,
  onSubmit,
  onFormDataChange,
  showSkipButton = false,
  skipButtonLabel,
  onSkip,
  submitButtonClassName,
}: VoiceContactFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_var(--primary)] p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-bold uppercase mb-2 text-black">{labels.name}</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
          placeholder={locale === "es" ? "Tu nombre" : "Your name"}
          className="w-full p-3 border-4 border-black bg-muted font-bold text-base focus:shadow-[4px_4px_0px_0px_var(--primary)] outline-none transition-shadow"
          disabled={isSubmitting}
          autoFocus
        />
      </div>
      <div>
        <label className="block text-sm font-bold uppercase mb-2 text-black">{labels.email}</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
          placeholder={locale === "es" ? "tu@email.com" : "your@email.com"}
          className="w-full p-3 border-4 border-black bg-muted font-bold text-base focus:shadow-[4px_4px_0px_0px_var(--primary)] outline-none transition-shadow"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-sm font-bold uppercase mb-2 text-black">{labels.phone}</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onFormDataChange({ ...formData, phone: e.target.value })}
          placeholder={locale === "es" ? "+57 300 123 4567" : "+1 555 123 4567"}
          className="w-full p-3 border-4 border-black bg-muted font-bold text-base focus:shadow-[4px_4px_0px_0px_var(--primary)] outline-none transition-shadow"
          disabled={isSubmitting}
        />
      </div>
      {formError && <p className="text-sm font-bold text-[#EF4444]">{formError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className={
          submitButtonClassName ??
          "w-full p-3 bg-primary text-primary-foreground font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/90 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        }
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            {labels.submitting}
          </>
        ) : (
          labels.submit
        )}
      </button>
      {showSkipButton && onSkip && skipButtonLabel && (
        <button
          type="button"
          onClick={onSkip}
          disabled={isSubmitting}
          className="w-full p-2 text-sm font-bold text-black/60 uppercase hover:text-black disabled:opacity-50 transition-colors"
        >
          {skipButtonLabel}
        </button>
      )}
    </form>
  );
}
