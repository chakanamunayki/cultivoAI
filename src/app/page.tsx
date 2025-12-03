"use client";

import { useCallback, useState } from "react";
import { AIChatWidget } from "@/components/landing/ai-chat-widget";
import { Footer } from "@/components/landing/layout/footer";
import { Marquee } from "@/components/landing/layout/marquee";
import { Nav } from "@/components/landing/layout/nav";
import { AboutSection } from "@/components/landing/sections/about-section";
import { DemosSection } from "@/components/landing/sections/demos-section";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { PartnershipsSection } from "@/components/landing/sections/partnerships-section";
import { ProjectsSection } from "@/components/landing/sections/projects-section";
import { SemillaSection } from "@/components/landing/sections/semilla-section";
import { ServicesSection } from "@/components/landing/sections/services-section";
import { StoriesSection } from "@/components/landing/sections/stories-section";
import { WhyUsSection } from "@/components/landing/sections/why-us-section";
import { useModal } from "@/components/landing/ui/modal-provider";
import { ModalRenderer } from "@/components/landing/ui/modal-renderer";
import { useLocale } from "@/hooks/use-locale";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { content } = useLocale();
  const { openProjectModal, openServiceModal, closeModal } = useModal();

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

  const handleOpenChat = useCallback(() => {
    closeModal();
    setIsChatOpen(true);
  }, [closeModal]);

  return (
    <div className="min-h-full bg-[#F3F4F6] text-black font-grotesk selection:bg-[#FFDE00] selection:text-black">
      {/* Modal Renderer */}
      <ModalRenderer onChatClick={handleOpenChat} />

      {/* AI Chat Widget */}
      <AIChatWidget
        isOpen={isChatOpen}
        onToggle={setIsChatOpen}
        onNavigate={scrollTo}
        onOpenProjectModal={handleOpenProjectModal}
        onOpenServiceModal={handleOpenServiceModal}
      />

      {/* Top Bar Marquee */}
      <Marquee />

      {/* Navigation */}
      <Nav onScrollTo={scrollTo} />

      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: About */}
      <AboutSection />

      {/* Section 3: Why Us */}
      <WhyUsSection />

      {/* Section 4: Services */}
      <ServicesSection />

      {/* Section 5: AI Demos */}
      <DemosSection />

      {/* Section 6: Semilla */}
      <SemillaSection />

      {/* Section 7: Partnerships */}
      <PartnershipsSection />

      {/* Section 8: Projects */}
      <ProjectsSection />

      {/* Section 9: Stories */}
      <StoriesSection />

      {/* Footer */}
      <Footer onContactClick={handleOpenChat} />
    </div>
  );
}
