"use client";

import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Footer } from "@/components/landing/layout/footer";
import { Nav } from "@/components/landing/layout/nav";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { ChatLauncher } from "@/components/landing/ui/chat-launcher";
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
  const { content, ui } = useLocale();
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
    (sectorName: string) => {
      handleOpenChat({ type: "qualification", sectorName });
    },
    [handleOpenChat]
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
        <ChatLauncher
          onChat={handlePlaceholderClick}
          whatsapp={{ href: whatsappUrl }}
          chatLabel={content.footer.ctaButton}
          whatsappAriaLabel={ui.openWhatsAppAria}
          chatAriaLabel={ui.openChatAria}
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
