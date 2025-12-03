"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

interface ContactModalProps {
  onChatClick?: () => void;
}

export function ContactModal({ onChatClick }: ContactModalProps) {
  const { content } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement form submission via server action
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
  };

  return (
    <div className="p-8 md:p-12 bg-white">
      {/* Header */}
      <div className="mb-8 border-b-4 border-black pb-6">
        <h2 className="text-3xl md:text-4xl font-black uppercase leading-none text-black mb-2">
          {content.contactForm.title}
        </h2>
        <p className="font-bold text-neutral-600">{content.contactForm.subtitle}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-bold uppercase text-xs mb-2">
            {content.contactForm.nameLabel} *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder={content.contactForm.namePlaceholder}
            className="w-full border-4 border-black p-4 font-bold focus:shadow-[4px_4px_0px_0px_#A855F7] focus:outline-none transition-shadow"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-bold uppercase text-xs mb-2">
            {content.contactForm.emailLabel} *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder={content.contactForm.emailPlaceholder}
            className="w-full border-4 border-black p-4 font-bold focus:shadow-[4px_4px_0px_0px_#A855F7] focus:outline-none transition-shadow"
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block font-bold uppercase text-xs mb-2">
            {content.contactForm.whatsappLabel}
          </label>
          <input
            type="tel"
            name="whatsapp"
            placeholder={content.contactForm.whatsappPlaceholder}
            className="w-full border-4 border-black p-4 font-bold focus:shadow-[4px_4px_0px_0px_#A855F7] focus:outline-none transition-shadow"
          />
        </div>

        {/* Project Type */}
        <div>
          <label className="block font-bold uppercase text-xs mb-2">
            {content.contactForm.projectTypeLabel} *
          </label>
          <select
            name="projectType"
            required
            className="w-full border-4 border-black p-4 font-bold bg-white focus:shadow-[4px_4px_0px_0px_#A855F7] focus:outline-none transition-shadow cursor-pointer"
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
        <div>
          <label className="block font-bold uppercase text-xs mb-2">
            {content.contactForm.descriptionLabel}
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder={content.contactForm.descriptionPlaceholder}
            className="w-full border-4 border-black p-4 font-bold focus:shadow-[4px_4px_0px_0px_#A855F7] focus:outline-none transition-shadow resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FFDE00] text-black border-4 border-black px-8 py-4 font-black uppercase hover:shadow-[8px_8px_0px_0px_black] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "..." : content.contactForm.submitButton}
        </button>
      </form>

      {/* Chat Alternative */}
      {onChatClick && (
        <div className="mt-8 pt-6 border-t-4 border-black text-center">
          <p className="text-sm font-bold text-neutral-600 mb-4">{content.contactForm.chatPrompt}</p>
          <button
            onClick={onChatClick}
            className="inline-flex items-center gap-2 bg-[#A855F7] text-white border-4 border-black px-6 py-3 font-black uppercase hover:shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 transition-all"
          >
            <MessageSquare size={20} />
            Chat
          </button>
        </div>
      )}
    </div>
  );
}
