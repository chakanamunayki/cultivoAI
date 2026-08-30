"use client";

import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MessageSquare } from "lucide-react";
import { Footer } from "@/components/landing/layout/footer";
import { Nav } from "@/components/landing/layout/nav";
import { AboutSection } from "@/components/landing/sections/about-section";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { CustomCursor } from "@/components/landing/ui/custom-cursor";
import { LazySection } from "@/components/landing/ui/lazy-section";
import { useModal } from "@/components/landing/ui/modal-provider";
import { ModalRenderer } from "@/components/landing/ui/modal-renderer";
import type { ChatContext } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

// Lazy-loaded below-fold sections
const WhatWeDoSection = dynamic(
  () =>
    import("@/components/landing/sections/what-we-do-section").then((m) => ({
      default: m.WhatWeDoSection,
    })),
  { ssr: true }
);

const HowWeWorkSection = dynamic(
  () =>
    import("@/components/landing/sections/how-we-work-section").then((m) => ({
      default: m.HowWeWorkSection,
    })),
  { ssr: true }
);

const WhyUsSection = dynamic(
  () =>
    import("@/components/landing/sections/why-us-section").then((m) => ({
      default: m.WhyUsSection,
    })),
  { ssr: true }
);

const ServicesSection = dynamic(
  () =>
    import("@/components/landing/sections/services-section").then((m) => ({
      default: m.ServicesSection,
    })),
  { ssr: true }
);

const WhoWeHelpSection = dynamic(
  () =>
    import("@/components/landing/sections/who-we-help-section").then((m) => ({
      default: m.WhoWeHelpSection,
    })),
  { ssr: true }
);

const PartnershipsSection = dynamic(
  () =>
    import("@/components/landing/sections/partnerships-section").then((m) => ({
      default: m.PartnershipsSection,
    })),
  { ssr: true }
);

const ProjectsSection = dynamic(
  () =>
    import("@/components/landing/sections/projects-section").then((m) => ({
      default: m.ProjectsSection,
    })),
  { ssr: true }
);

const ValuesSection = dynamic(
  () =>
    import("@/components/landing/sections/values-section").then((m) => ({
      default: m.ValuesSection,
    })),
  { ssr: true }
);

const MissionSection = dynamic(
  () =>
    import("@/components/landing/sections/mission-section").then((m) => ({
      default: m.MissionSection,
    })),
  { ssr: true }
);

const WhatHappensNextSection = dynamic(
  () =>
    import("@/components/landing/sections/what-happens-next-section").then((m) => ({
      default: m.WhatHappensNextSection,
    })),
  { ssr: true }
);

// Lazy-loaded chat widget (loaded after initial paint)
const AIChatWidget = dynamic(
  () =>
    import("@/components/landing/ai-chat-widget").then((m) => ({
      default: m.AIChatWidget,
    })),
  { ssr: false }
);

// Chat button placeholder shown before widget loads
function WhatsAppIcon({ size = 22 }: { size?: number }) {
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

function ChatButtonPlaceholder({
  onClick,
  whatsappUrl,
  chatLabel,
}: {
  onClick: () => void;
  whatsappUrl: string;
  chatLabel: string;
}) {
  return (
    <div className="font-grotesk fixed right-6 bottom-6 z-[60] flex flex-col items-end">
      <div className="flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[58px] w-[58px] items-center justify-center rounded-xl bg-[#25D366] text-[#0b2d1f] shadow-[0_10px_20px_rgba(15,23,42,0.26)] transition-all hover:-translate-y-0.5 hover:bg-[#34e073] hover:shadow-[0_14px_26px_rgba(15,23,42,0.32)]"
          aria-label="Open WhatsApp"
        >
          <WhatsAppIcon />
        </a>
        <button
          onClick={onClick}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 border-4 border-black p-4 font-bold uppercase transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
          <span>{chatLabel}</span>
        </button>
      </div>
    </div>
  );
}

// Services were consolidated from 8 cards to 4. The chat model can still emit an
// absorbed service name; map each normalized old name to the surviving card's
// stable animationKey so the modal still opens instead of silently no-op'ing.
const ABSORBED_SERVICE_ALIASES: Record<string, string> = {
  // -> Decision and Automation Systems (animationKey "dashboards")
  "workflow optimization": "dashboards",
  "optimizacion de flujos": "dashboards",
  workflow: "dashboards",
  automation: "dashboards",
  "ai assistants": "dashboards",
  "asistentes ia": "dashboards",
  asistentes: "dashboards",
  "decision dashboards": "dashboards",
  "dashboards de decision": "dashboards",
  dashboard: "dashboards",
  // -> Custom AI and Software Builds (animationKey "software-web")
  "software, websites and digital experiences": "software-web",
  "software, sitios web y experiencias digitales": "software-web",
  "startup advisory": "software-web",
  "asesoria para startups": "software-web",
  websites: "software-web",
  // -> Company Brain (animationKey "company-brain")
  "knowledge and content systems": "company-brain",
  "sistemas de conocimiento y contenido": "company-brain",
};

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext | null>(null);
  const [isChatWidgetLoaded, setIsChatWidgetLoaded] = useState(false);
  const { content } = useLocale();
  const { openProjectModal, openServiceModal, openContactModal, closeModal } = useModal();

  const normalizeForMatch = useCallback((value: string) => {
    return value
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();
  }, []);

  // Load chat widget after initial page paint (2-3 second delay or on first interaction)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChatWidgetLoaded(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const targetId = id.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleOpenProjectModal = useCallback(
    (projectTitle: string) => {
      const target = normalizeForMatch(projectTitle);
      const project = content.projects.find((p) => normalizeForMatch(p.title).includes(target));
      if (project) {
        openProjectModal(project);
      }
    },
    [content.projects, normalizeForMatch, openProjectModal]
  );

  const handleOpenServiceModal = useCallback(
    (serviceTitle: string) => {
      const target = normalizeForMatch(serviceTitle);
      let service = content.services.find((s) => normalizeForMatch(s.title).includes(target));
      if (!service) {
        // Fall back to absorbed-name aliases from the 8->4 consolidation.
        const aliasKey = Object.keys(ABSORBED_SERVICE_ALIASES).find((key) =>
          target.includes(key)
        );
        if (aliasKey) {
          const animationKey = ABSORBED_SERVICE_ALIASES[aliasKey];
          service = content.services.find((s) => s.animationKey === animationKey);
        }
      }
      if (service) {
        openServiceModal(service);
      }
    },
    [content.services, normalizeForMatch, openServiceModal]
  );

  // Open chat with optional context
  const handleOpenChat = useCallback(
    (context?: ChatContext) => {
      closeModal();
      setChatContext(context || null);
      // Immediately load widget if user tries to open chat
      setIsChatWidgetLoaded(true);
      setIsChatOpen(true);
    },
    [closeModal]
  );

  const handleOpenChatGeneral = useCallback(() => {
    handleOpenChat({ type: "general" });
  }, [handleOpenChat]);

  const handleOpenChatBooking = useCallback(() => {
    handleOpenChat({ type: "booking" });
  }, [handleOpenChat]);

  const handleOpenChatQualification = useCallback(() => {
    handleOpenChat({ type: "qualification" });
  }, [handleOpenChat]);

  const handleOpenChatPartnership = useCallback(() => {
    handleOpenChat({ type: "partnership" });
  }, [handleOpenChat]);

  const handleOpenChatImpact = useCallback(() => {
    handleOpenChat({ type: "impact" });
  }, [handleOpenChat]);

  const handleOpenContactModal = useCallback(() => {
    setIsChatOpen(false);
    closeModal();
    openContactModal();
  }, [closeModal, openContactModal]);

  const handleScrollToProjects = useCallback(() => {
    scrollTo("#projects");
  }, [scrollTo]);

  const handleScrollToServices = useCallback(() => {
    scrollTo("#services");
  }, [scrollTo]);

  // Handler for sector-specific chat
  const handleOpenChatWithSector = useCallback(
    (_sectorName: string) => {
      handleOpenChatQualification();
    },
    [handleOpenChatQualification]
  );

  // Form fallback handler
  const handleOpenFormFromChat = useCallback(() => {
    setIsChatOpen(false);
    openContactModal();
  }, [openContactModal]);

  // Handler for placeholder click - loads widget and opens chat
  const handlePlaceholderClick = useCallback(() => {
    setIsChatWidgetLoaded(true);
    setIsChatOpen(true);
  }, []);
  const whatsappUrl = `https://wa.me/${content.footer.contactInfo.whatsapp.replace(/\+/g, "")}`;

  return (
    <div className="bg-white text-foreground font-grotesk min-h-full">
      <CustomCursor />

      {/* Modal Renderer */}
      <ModalRenderer onOpenContact={handleOpenContactModal} onChatClick={handleOpenChatGeneral} />

      {/* AI Chat Widget - lazy loaded */}
      {isChatWidgetLoaded ? (
        <AIChatWidget
          isOpen={isChatOpen}
          onToggle={setIsChatOpen}
          onNavigate={scrollTo}
          onOpenProjectModal={handleOpenProjectModal}
          onOpenServiceModal={handleOpenServiceModal}
          context={chatContext}
          onOpenForm={handleOpenFormFromChat}
        />
      ) : (
        <ChatButtonPlaceholder
          onClick={handlePlaceholderClick}
          whatsappUrl={whatsappUrl}
          chatLabel={content.footer.ctaButton}
        />
      )}

      {/* Navigation with integrated ticker */}
      <Nav onScrollTo={scrollTo} onOpenChat={handleOpenChatGeneral} />

      {/* Section 1: Hero - Eager loaded (above fold) */}
      <HeroSection
        onPrimaryCta={handleOpenChatGeneral}
        onSecondaryCta={handleScrollToProjects}
        onTertiaryCta={handleScrollToServices}
      />

      {/* Section 2: What We Do - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <WhatWeDoSection />
      </LazySection>

      {/* Section 3: About - Eager loaded (above fold) */}
      <AboutSection />

      {/* Section 3: How We Work - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <HowWeWorkSection />
      </LazySection>

      {/* Section 4: Why Us - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <WhyUsSection />
      </LazySection>

      {/* Section 6: Services - Lazy loaded */}
      <LazySection className="min-h-[600px]">
        <ServicesSection onOpenChatBooking={handleOpenChatBooking} />
      </LazySection>

      {/* Section 6: Who We Help - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <WhoWeHelpSection
          onOpenChatQualification={handleOpenChatQualification}
          onOpenChatWithSector={handleOpenChatWithSector}
        />
      </LazySection>

      {/* Section 8: Partnerships - Lazy loaded */}
      <LazySection className="min-h-[500px]">
        <PartnershipsSection onOpenChatGeneral={handleOpenChatPartnership} />
      </LazySection>

      {/* Section 9: Projects - Lazy loaded */}
      <LazySection className="min-h-[600px]">
        <ProjectsSection />
      </LazySection>

      {/* Section 13: Values - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <ValuesSection />
      </LazySection>

      {/* Section 14: Mission - Lazy loaded */}
      <LazySection className="min-h-[300px]">
        <MissionSection onOpenChatImpact={handleOpenChatImpact} />
      </LazySection>

      {/* Section 15: What Happens Next - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <WhatHappensNextSection onOpenChat={handleOpenChatGeneral} />
      </LazySection>

      {/* Footer */}
      <Footer onContactClick={handleOpenChatGeneral} onScrollTo={scrollTo} />
    </div>
  );
}
