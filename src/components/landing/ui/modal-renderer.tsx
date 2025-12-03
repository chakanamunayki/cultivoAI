"use client";

import { ContactModal } from "@/components/landing/ui/contact-modal";
import { Modal } from "@/components/landing/ui/modal";
import { useModal } from "@/components/landing/ui/modal-provider";
import { PartnershipModal } from "@/components/landing/ui/partnership-modal";
import { ProjectModal } from "@/components/landing/ui/project-modal";
import { ServiceModal } from "@/components/landing/ui/service-modal";
import type { Partnership, Project, Service } from "@/content/types";

interface ModalRendererProps {
  onChatClick?: () => void;
}

export function ModalRenderer({ onChatClick }: ModalRendererProps) {
  const { modalData, closeModal, isOpen } = useModal();

  const renderContent = () => {
    switch (modalData.type) {
      case "project":
        return <ProjectModal project={modalData.data as Project} />;
      case "service":
        return <ServiceModal service={modalData.data as Service} />;
      case "partnership":
        return (
          <PartnershipModal
            partnership={modalData.data as Partnership}
            {...(onChatClick && { onChatClick })}
          />
        );
      case "contact":
        return <ContactModal {...(onChatClick && { onChatClick })} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {renderContent()}
    </Modal>
  );
}
