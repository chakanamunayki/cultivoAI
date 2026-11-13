"use client";

import { useId, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, MessageSquare } from "lucide-react";
import { landingPrimaryBlueButtonClass } from "@/components/landing/ui/landing-card-styles";
import { useModal } from "@/components/landing/ui/modal-provider";
import { WhatsAppIcon } from "@/components/landing/ui/whatsapp-icon";
import { useLocale } from "@/hooks/use-locale";
import { createLead } from "@/lib/leads/client";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  onChatClick?: () => void;
}

export function ContactModal({ onChatClick }: ContactModalProps) {
  const { content, locale, ui } = useLocale();
  const { closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fieldId = useId();
  const contactBandLabel = ui.directContact;
  const whatsappCtaLabel = ui.contactForm.whatsappCta;
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
        setSubmitError(ui.contactForm.errorName);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) {
        setSubmitError(ui.contactForm.errorEmail);
        return;
      }

      if (!projectType) {
        setSubmitError(ui.contactForm.errorProjectType);
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
          : ui.contactForm.errorGeneric;
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
          <p className="text-xs font-semibold tracking-[0.08em] text-[#18181b] uppercase">
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
            {ui.contactForm.sentLabel}
          </p>
          <p className="mt-2 text-xl font-black tracking-tight text-black">
            {ui.contactForm.sentTitle}
          </p>
          <p className="mt-2 text-sm font-medium text-neutral-600">
            {ui.contactForm.sentWhatsappHint}
          </p>
          <button
            type="button"
            onClick={closeModal}
            className={cn(
              "mt-5 inline-flex w-full items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-[0.08em]",
              landingPrimaryBlueButtonClass
            )}
          >
            {ui.contactForm.close}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="rounded-[16px] border border-black/10 bg-[#f2f2f2] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
          <label
            htmlFor={`${fieldId}-name`}
            className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase"
          >
            {content.contactForm.nameLabel} *
          </label>
          <input
            id={`${fieldId}-name`}
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
          <label
            htmlFor={`${fieldId}-email`}
            className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase"
          >
            {content.contactForm.emailLabel} *
          </label>
          <input
            id={`${fieldId}-email`}
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
          <label
            htmlFor={`${fieldId}-whatsapp`}
            className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase"
          >
            {content.contactForm.whatsappLabel}
          </label>
          <input
            id={`${fieldId}-whatsapp`}
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
          <label
            htmlFor={`${fieldId}-projectType`}
            className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase"
          >
            {content.contactForm.projectTypeLabel} *
          </label>
          <select
            id={`${fieldId}-projectType`}
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
          <label
            htmlFor={`${fieldId}-description`}
            className="mb-2 block text-xs font-semibold tracking-[0.07em] text-[#4f4f4f] uppercase"
          >
            {content.contactForm.descriptionLabel}
          </label>
          <textarea
            id={`${fieldId}-description`}
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
              {ui.contactForm.sending}
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
            className="inline-flex items-center gap-2 rounded-xl bg-[#00BCD4] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-[#18181b] uppercase shadow-[0_10px_20px_rgba(15,23,42,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_14px_26px_rgba(15,23,42,0.25)]"
          >
            <MessageSquare size={20} />
            Chat
          </button>
        </div>
      )}
    </div>
  );
}
