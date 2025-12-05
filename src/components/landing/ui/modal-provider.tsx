"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Partnership, Project, Service, TeamMember } from "@/content/types";

type ModalType = "project" | "service" | "partnership" | "contact" | "teamMember" | null;

interface ModalData {
  type: ModalType;
  data: Project | Service | Partnership | TeamMember | null;
}

interface ModalContextValue {
  modalData: ModalData;
  openProjectModal: (project: Project) => void;
  openServiceModal: (service: Service) => void;
  openPartnershipModal: (partnership: Partnership) => void;
  openContactModal: () => void;
  openTeamMemberModal: (member: TeamMember) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

interface ModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalData, setModalData] = useState<ModalData>({
    type: null,
    data: null,
  });

  const openProjectModal = useCallback((project: Project) => {
    setModalData({ type: "project", data: project });
  }, []);

  const openServiceModal = useCallback((service: Service) => {
    setModalData({ type: "service", data: service });
  }, []);

  const openPartnershipModal = useCallback((partnership: Partnership) => {
    setModalData({ type: "partnership", data: partnership });
  }, []);

  const openContactModal = useCallback(() => {
    setModalData({ type: "contact", data: null });
  }, []);

  const openTeamMemberModal = useCallback((member: TeamMember) => {
    setModalData({ type: "teamMember", data: member });
  }, []);

  const closeModal = useCallback(() => {
    setModalData({ type: null, data: null });
  }, []);

  const isOpen = modalData.type !== null;

  const value = useMemo<ModalContextValue>(
    () => ({
      modalData,
      openProjectModal,
      openServiceModal,
      openPartnershipModal,
      openContactModal,
      openTeamMemberModal,
      closeModal,
      isOpen,
    }),
    [
      modalData,
      openProjectModal,
      openServiceModal,
      openPartnershipModal,
      openContactModal,
      openTeamMemberModal,
      closeModal,
      isOpen,
    ]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}
