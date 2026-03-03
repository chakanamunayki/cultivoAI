"use client";

import { ContactModal } from "@/components/landing/ui/contact-modal";
import { Modal } from "@/components/landing/ui/modal";
import { useModal } from "@/components/landing/ui/modal-provider";
import { PartnershipModal } from "@/components/landing/ui/partnership-modal";
import { ProjectModal } from "@/components/landing/ui/project-modal";
import { ServiceModal } from "@/components/landing/ui/service-modal";
import { TeamMemberModal } from "@/components/landing/ui/team-member-modal";
import type { Partnership, Project, Service, TeamMember } from "@/content/types";

interface ModalRendererProps {
  onOpenContact?: () => void;
  onChatClick?: () => void;
}

export function ModalRenderer({ onOpenContact, onChatClick }: ModalRendererProps) {
  const { modalData, closeModal, isOpen } = useModal();
  const modalSize = modalData.type === "project" ? "wide" : "default";

  const renderContent = () => {
    switch (modalData.type) {
      case "project":
        return (
          <ProjectModal
            key={(modalData.data as Project).title}
            project={modalData.data as Project}
            {...(onOpenContact && { onOpenContact })}
          />
        );
      case "service":
        return (
          <ServiceModal
            service={modalData.data as Service}
            {...(onOpenContact && { onOpenContact })}
          />
        );
      case "partnership":
        return (
          <PartnershipModal
            partnership={modalData.data as Partnership}
            {...(onOpenContact && { onOpenContact })}
          />
        );
      case "contact":
        return <ContactModal {...(onChatClick && { onChatClick })} />;
      case "teamMember":
        return (
          <TeamMemberModal
            member={modalData.data as TeamMember}
            {...(onOpenContact && { onOpenContact })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size={modalSize}>
      {renderContent()}
    </Modal>
  );
}
