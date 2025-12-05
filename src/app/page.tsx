"use client";

import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MessageSquare } from "lucide-react";
import { Footer } from "@/components/landing/layout/footer";
import { Marquee } from "@/components/landing/layout/marquee";
import { Nav } from "@/components/landing/layout/nav";
import { AboutSection } from "@/components/landing/sections/about-section";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { LazySection } from "@/components/landing/ui/lazy-section";
import { useModal } from "@/components/landing/ui/modal-provider";
import { ModalRenderer } from "@/components/landing/ui/modal-renderer";
import type { ChatContext } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

// Lazy-loaded below-fold sections
const HowWeWorkSection = dynamic(
  () =>
    import("@/components/landing/sections/how-we-work-section").then((m) => ({
      default: m.HowWeWorkSection,
    })),
  { ssr: true }
);

const WhatWeDoSection = dynamic(
  () =>
    import("@/components/landing/sections/what-we-do-section").then((m) => ({
      default: m.WhatWeDoSection,
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

const DemosSection = dynamic(
  () =>
    import("@/components/landing/sections/demos-section").then((m) => ({
      default: m.DemosSection,
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

const SemillaSection = dynamic(
  () =>
    import("@/components/landing/sections/semilla-section").then((m) => ({
      default: m.SemillaSection,
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

const StoriesSection = dynamic(
  () =>
    import("@/components/landing/sections/stories-section").then((m) => ({
      default: m.StoriesSection,
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
    import("@/components/landing/sections/what-happens-next-section").then(
      (m) => ({
        default: m.WhatHappensNextSection,
      })
    ),
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
function ChatButtonPlaceholder({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end font-grotesk">
      <button
        onClick={onClick}
        className="bg-black text-white p-4 border-4 border-transparent hover:border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 font-bold uppercase"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
        <span>Chat AI</span>
      </button>
    </div>
  );
}

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext | null>(null);
  const [isChatWidgetLoaded, setIsChatWidgetLoaded] = useState(false);
  const { content } = useLocale();
  const { openProjectModal, openServiceModal, openContactModal, closeModal } =
    useModal();

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
      const project = content.projects.find((p) =>
        p.title.toLowerCase().includes(projectTitle.toLowerCase())
      );
      if (project) {
        openProjectModal(project);
      }
    },
    [content.projects, openProjectModal]
  );

  const handleOpenServiceModal = useCallback(
    (serviceTitle: string) => {
      const service = content.services.find((s) =>
        s.title.toLowerCase().includes(serviceTitle.toLowerCase())
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

  // Convenience handlers for specific contexts
  const handleOpenChatBooking = useCallback(() => {
    handleOpenChat({ type: "booking" });
  }, [handleOpenChat]);

  const handleOpenChatStory = useCallback(() => {
    handleOpenChat({ type: "story" });
  }, [handleOpenChat]);

  const handleOpenChatSemilla = useCallback(() => {
    handleOpenChat({ type: "semilla" });
  }, [handleOpenChat]);

  const handleOpenChatGeneral = useCallback(() => {
    handleOpenChat({ type: "general" });
  }, [handleOpenChat]);

  const handleOpenChatQualification = useCallback(() => {
    handleOpenChat({ type: "qualification" });
  }, [handleOpenChat]);

  // Handler for sector-specific chat
  const handleOpenChatWithSector = useCallback(
    (_sectorName: string) => {
      // Open qualification chat - the sector context can be used for personalization later
      handleOpenChat({ type: "qualification" });
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

  return (
    <div className="min-h-full bg-[#F3F4F6] text-black font-grotesk selection:bg-[#FFDE00] selection:text-black">
      {/* Modal Renderer */}
      <ModalRenderer onChatClick={handleOpenChatGeneral} />

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
        <ChatButtonPlaceholder onClick={handlePlaceholderClick} />
      )}

      {/* Top Bar Marquee */}
      <Marquee />

      {/* Navigation */}
      <Nav onScrollTo={scrollTo} onOpenChat={handleOpenChatGeneral} />

      {/* Section 1: Hero - Eager loaded (above fold) */}
      <HeroSection
        onOpenChatBooking={handleOpenChatBooking}
        onOpenChatStory={handleOpenChatStory}
      />

      {/* Section 2: About - Eager loaded (above fold) */}
      <AboutSection />

      {/* Section 3: How We Work - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <HowWeWorkSection />
      </LazySection>

      {/* Section 4: What We Do - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <WhatWeDoSection />
      </LazySection>

      {/* Section 5: Why Us - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <WhyUsSection />
      </LazySection>

      {/* Section 6: Services - Lazy loaded */}
      <LazySection className="min-h-[600px]">
        <ServicesSection onOpenChatBooking={handleOpenChatBooking} />
      </LazySection>

      {/* Section 5: AI Demos - Lazy loaded */}
      <LazySection className="min-h-[500px]">
        <DemosSection />
      </LazySection>

      {/* Section 6: Who We Help - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <WhoWeHelpSection
          onOpenChatQualification={handleOpenChatQualification}
          onOpenChatWithSector={handleOpenChatWithSector}
        />
      </LazySection>

      {/* Section 7: Semilla - Lazy loaded */}
      <LazySection className="min-h-[600px]">
        <SemillaSection onOpenChatSemilla={handleOpenChatSemilla} />
      </LazySection>

      {/* Section 8: Partnerships - Lazy loaded */}
      <LazySection className="min-h-[500px]">
        <PartnershipsSection onOpenChatGeneral={handleOpenChatGeneral} />
      </LazySection>

      {/* Section 9: Projects - Lazy loaded */}
      <LazySection className="min-h-[600px]">
        <ProjectsSection />
      </LazySection>

      {/* Section 12: Stories - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <StoriesSection />
      </LazySection>

      {/* Section 13: Values - Lazy loaded */}
      <LazySection className="min-h-[400px]">
        <ValuesSection />
      </LazySection>

      {/* Section 14: Mission - Lazy loaded */}
      <LazySection className="min-h-[300px]">
        <MissionSection />
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
