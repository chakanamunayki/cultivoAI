"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, MessageSquare } from "lucide-react";
import { landingPrimaryBlueButtonClass } from "@/components/landing/ui/landing-card-styles";
import { useModal } from "@/components/landing/ui/modal-provider";
import { useLocale } from "@/hooks/use-locale";
import { createLead } from "@/lib/leads/client";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  onChatClick?: () => void;
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactModal({ onChatClick }: ContactModalProps) {
  const { content, locale } = useLocale();
  const { closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const contactBandLabel = locale === "es" ? "Contacto directo" : "Direct contact";
  const whatsappCtaLabel =
    locale === "es" ? "Escribenos por WhatsApp" : "Message us on WhatsApp";
  const whatsappHref = `https://wa.me/${content.footer.contactInfo.whatsapp.replace(/\+/g, "")}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const whatsapp = String(formData.get("whatsapp") ?? "").trim();
      const projectType = String(formData.get("projectType") ?? "").trim();
      const description = String(formData.get("description") ?? "").trim();

      if (!name) {
        setSubmitError(locale === "es" ? "Por favor ingresa tu nombre." : "Please enter your name.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) {
        setSubmitError(
          locale === "es"
            ? "Por favor ingresa un email valido."
            : "Please enter a valid email."
        );
        return;
      }

      if (!projectType) {
        setSubmitError(
          locale === "es"
            ? "Por favor selecciona un tipo de proyecto."
            : "Please select a project type."
        );
        return;
      }

      await createLead({
        name,
        email,
        projectType,
        preferredLanguage: locale,
        source: "contact_modal",
        ...(whatsapp ? { whatsapp } : {}),
        ...(description ? { projectDescription: description } : {}),
      });

      form.reset();
      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : locale === "es"
            ? "Hubo un error enviando el formulario. Intenta de nuevo."
            : "There was an error submitting the form. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-h-[92vh] overflow-y-auto bg-[#212121] p-8 pr-2 md:p-12 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#9ca3af_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#9ca3af] [&::-webkit-scrollbar-thumb]:rounded-full">
      {/* Header */}
      <div className="mb-8 overflow-hidden rounded-[18px] border border-black/10 bg-[#f1f1f1] p-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
        <div className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-6 py-2.5">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase">
            {contactBandLabel}
          </p>
        </div>
        <div className="px-6 py-5">
          <Dialog.Title asChild>
            <h2 className="mb-2 text-3xl font-black leading-none tracking-tight text-black md:text-4xl">
              {content.contactForm.title}
            </h2>
          </Dialog.Title>
          <Dialog.Description asChild>
            <p className="font-medium text-neutral-600">{content.contactForm.subtitle}</p>
          </Dialog.Description>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-semibold tracking-[0.06em] text-[#0b2d1f] uppercase shadow-[0_10px_20px_rgba(15,23,42,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#34e073] hover:shadow-[0_14px_26px_rgba(15,23,42,0.25)]"
          >
            <WhatsAppIcon size={18} />
            {whatsappCtaLabel}
          </a>
        </div>
      </div>

      {/* Form */}
      {isSuccess ? (
        <div className="rounded-[18px] border border-black/10 bg-[#f1f1f1] p-6 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold tracking-[0.06em] text-[#00A3B7] uppercase">
            {locale === "es" ? "Enviado" : "Sent"}
          </p>
          <p className="mt-2 text-xl font-black tracking-tight text-black">
            {locale === "es" ? "Gracias. Te escribimos pronto." : "Thanks. We’ll reach out soon."}
          </p>
          <p className="mt-2 text-sm font-medium text-neutral-600">
            {locale === "es"
              ? "Si prefieres, tambien puedes escribirnos por WhatsApp usando el boton de arriba."
              : "If you prefer, you can also message us on WhatsApp using the button above."}
          </p>
          <button
            type="button"
            onClick={closeModal}
            className={cn(
              "mt-5 inline-flex w-full items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-[0.08em]",
              landingPrimaryBlueButtonClass
            )}
          >
            {locale === "es" ? "Cerrar" : "Close"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="rounded-[16px] border border-black/10 bg-[#f2f2f2] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
          <label className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase">
            {content.contactForm.nameLabel} *
          </label>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            disabled={isSubmitting}
            placeholder={content.contactForm.namePlaceholder}
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 font-medium text-[#1f1f1f] outline-none transition-all placeholder:text-[#7a7a7a] focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20"
          />
        </div>

        {/* Email */}
        <div className="rounded-[16px] border border-black/10 bg-[#f2f2f2] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
          <label className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase">
            {content.contactForm.emailLabel} *
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            disabled={isSubmitting}
            placeholder={content.contactForm.emailPlaceholder}
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 font-medium text-[#1f1f1f] outline-none transition-all placeholder:text-[#7a7a7a] focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20"
          />
        </div>

        {/* WhatsApp */}
        <div className="rounded-[16px] border border-black/10 bg-[#f2f2f2] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
          <label className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase">
            {content.contactForm.whatsappLabel}
          </label>
          <input
            type="tel"
            name="whatsapp"
            autoComplete="tel"
            disabled={isSubmitting}
            placeholder={content.contactForm.whatsappPlaceholder}
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 font-medium text-[#1f1f1f] outline-none transition-all placeholder:text-[#7a7a7a] focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20"
          />
        </div>

        {/* Project Type */}
        <div className="rounded-[16px] border border-black/10 bg-[#f2f2f2] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
          <label className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase">
            {content.contactForm.projectTypeLabel} *
          </label>
          <select
            name="projectType"
            required
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-lg border border-black/10 bg-white px-4 py-3 font-medium text-[#1f1f1f] outline-none transition-all focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20"
          >
            <option value="">--</option>
            {content.contactForm.projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="rounded-[16px] border border-black/10 bg-[#f2f2f2] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
          <label className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase">
            {content.contactForm.descriptionLabel}
          </label>
          <textarea
            name="description"
            rows={4}
            disabled={isSubmitting}
            placeholder={content.contactForm.descriptionPlaceholder}
            className="w-full resize-none rounded-lg border border-black/10 bg-white px-4 py-3 font-medium text-[#1f1f1f] outline-none transition-all placeholder:text-[#7a7a7a] focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20"
          />
        </div>

        {/* Submit Button */}
        {submitError && (
          <p
            className="rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            role="alert"
            aria-live="polite"
          >
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full px-8 py-3.5 text-sm font-semibold tracking-[0.08em] disabled:cursor-not-allowed disabled:opacity-50",
            landingPrimaryBlueButtonClass
          )}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              {locale === "es" ? "Enviando..." : "Sending..."}
            </span>
          ) : (
            content.contactForm.submitButton
          )}
        </button>
      </form>
      )}

      {/* Chat Alternative */}
      {onChatClick && (
        <div className="mt-8 rounded-[16px] border border-black/10 bg-[#f1f1f1] p-5 text-center shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
          <p className="mb-4 text-sm font-medium text-neutral-600">{content.contactForm.chatPrompt}</p>
          <button
            onClick={onChatClick}
            className="inline-flex items-center gap-2 rounded-xl bg-[#00BCD4] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase shadow-[0_10px_20px_rgba(15,23,42,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_14px_26px_rgba(15,23,42,0.25)]"
          >
            <MessageSquare size={20} />
            Chat
          </button>
        </div>
      )}
    </div>
  );
}
