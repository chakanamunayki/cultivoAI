"use client";

import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MessageSquare } from "lucide-react";
import { Footer } from "@/components/landing/layout/footer";
import { Nav } from "@/components/landing/layout/nav";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { CustomCursor } from "@/components/landing/ui/custom-cursor";
import { LazySection } from "@/components/landing/ui/lazy-section";
import { useModal } from "@/components/landing/ui/modal-provider";
import { ModalRenderer } from "@/components/landing/ui/modal-renderer";
import { en } from "@/content/en";
import { es } from "@/content/es";
import type { ChatContext } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";
import {
  PROJECT_ALIASES,
  SERVICE_ALIASES,
  resolveCatalogKey,
  type CatalogEntry,
} from "@/lib/chat/resolve-catalog-key";

// Lazy-loaded below-fold sections
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

const SemilleroSection = dynamic(
  () =>
    import("@/components/landing/sections/semillero-section").then((m) => ({
      default: m.SemilleroSection,
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

const AboutSection = dynamic(
  () =>
    import("@/components/landing/sections/about-section").then((m) => ({
      default: m.AboutSection,
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

const PartnershipsSection = dynamic(
  () =>
    import("@/components/landing/sections/partnerships-section").then((m) => ({
      default: m.PartnershipsSection,
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
    <div className="font-grotesk fixed right-6 bottom-6 z-[60] flex flex-col items-end [[data-menu-open]_&]:hidden">
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
          <span className="hidden md:inline">{chatLabel}</span>
        </button>
      </div>
    </div>
  );
}

// Every language's titles for each card, so the chat can open a service or
// project whichever language the model names it in. Cards are in the same order
// in the Spanish and English files. Portuguese is hidden and still has the old
// card set in a different order, so it is left out.
const ALL_CONTENT = [es, en];

const SERVICE_CATALOG: CatalogEntry[] = es.services.map((service, index) => ({
  key: service.animationKey ?? `service-${index}`,
  titles: ALL_CONTENT.flatMap((c) => c.services[index]?.title ?? []),
}));

// SetaSouls has no animationKey; PROJECT_ALIASES refers to it as "setasouls".
const projectKey = (animationKey: string | undefined, index: number) =>
  animationKey ?? (index === 1 ? "setasouls" : `project-${index}`);

const PROJECT_CATALOG: CatalogEntry[] = es.projects.map((project, index) => ({
  key: projectKey(project.animationKey, index),
  titles: ALL_CONTENT.flatMap((c) => c.projects[index]?.title ?? []),
}));

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext | null>(null);
  const [isChatWidgetLoaded, setIsChatWidgetLoaded] = useState(false);
  const { content } = useLocale();
  const { openProjectModal, openServiceModal, openContactModal, closeModal } = useModal();

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
      const key = resolveCatalogKey(projectTitle, PROJECT_CATALOG, PROJECT_ALIASES);
      const project = content.projects.find(
        (p, index) => projectKey(p.animationKey, index) === key
      );
      if (project) {
        openProjectModal(project);
      }
    },
    [content.projects, openProjectModal]
  );

  const handleOpenServiceModal = useCallback(
    (serviceTitle: string) => {
      const key = resolveCatalogKey(serviceTitle, SERVICE_CATALOG, SERVICE_ALIASES);
      const service = content.services.find(
        (s, index) => (s.animationKey ?? `service-${index}`) === key
      );
      if (service) {
        openServiceModal(service);
      }
    },
    [content.services, openServiceModal]
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
      <ModalRenderer
        onOpenContact={handleOpenContactModal}
        onChatClick={handleOpenChatGeneral}
        onOpenChatWithContext={handleOpenChat}
      />

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

      {/* Section 2: Who we are. Sits right under the hero: its white background is
          what the hero's curved corner transition is drawn to blend into. */}
      <LazySection className="min-h-[400px]">
        <AboutSection />
      </LazySection>

      {/* Section 3: What I build */}
      <LazySection className="min-h-[600px]">
        <ServicesSection onOpenChatBooking={handleOpenChatBooking} />
      </LazySection>

      {/* Section 3: Who I work with */}
      <LazySection className="min-h-[400px]">
        <WhoWeHelpSection
          onOpenChatQualification={handleOpenChatQualification}
          onOpenChatWithSector={handleOpenChatWithSector}
        />
      </LazySection>

      {/* Section 4: Semillero teaser (full network page is phase 2) */}
      <LazySection className="min-h-[300px]">
        <SemilleroSection
          onOpenChatProject={handleOpenChatPartnership}
          onOpenChatInnovation={handleOpenChatPartnership}
        />
      </LazySection>

      {/* Section 5: Projects */}
      <LazySection className="min-h-[600px]">
        <ProjectsSection />
      </LazySection>

      {/* Section 7: How I work (merges How We Work, Why Us, Values, Mission) */}
      <LazySection className="min-h-[400px]">
        <ValuesSection />
      </LazySection>

      {/* Section 8: Ways to work together */}
      <LazySection className="min-h-[500px]">
        <PartnershipsSection onOpenChatGeneral={handleOpenChatPartnership} />
      </LazySection>

      {/* Section 9: What happens next */}
      <LazySection className="min-h-[400px]">
        <WhatHappensNextSection onOpenChat={handleOpenChatGeneral} />
      </LazySection>

      {/* Footer */}
      <Footer onContactClick={handleOpenChatGeneral} onScrollTo={scrollTo} />
    </div>
  );
}
