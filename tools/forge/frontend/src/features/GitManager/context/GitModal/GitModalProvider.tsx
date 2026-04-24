import { useState, type ReactNode } from "react";
import { GitModalContext } from "./GitModalContext";
import {
  type ActiveModal,
  type FormResult,
  type GitModalContextType,
  type GitModalPayload,
} from "./GitModalContext.types";

export const GitModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [payload, setPayload] = useState<GitModalPayload | null>(null);
  const [result, setResult] = useState<FormResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (modal: ActiveModal, data?: GitModalPayload) => {
    setActiveModal(modal);
    setPayload(data ?? null);
  };

  const closeModal = () => setActiveModal(null);

  const value: GitModalContextType = {
    activeModal,
    payload,
    openModal,
    closeModal,
    setPayload,
    result,
    setResult,
    isLoading,
    setIsLoading,
  };

  return (
    <GitModalContext.Provider value={value}>
      {children}
    </GitModalContext.Provider>
  );
};
