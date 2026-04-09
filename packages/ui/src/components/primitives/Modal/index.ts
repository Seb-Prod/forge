export { Modal } from "./Modal";
export { ModalContent } from "./components/ModalContent";
export { ModalTrigger } from "./components/ModalTrigger";
export { ModalClose } from "./components/ModalClose";
export { ModalHeader } from "./components/ModalHeader";
export { ModalTitle } from "./components/ModalTitle";
export { ModalDescription } from "./components/ModalDescription";
export { ModalFooter } from "./components/ModalFooter";

// Hook exposé publiquement pour piloter la modal depuis un enfant arbitraire
export { useModal } from "./context/useModal";

export type { ModalContextType } from "./context/ModalContext.type";
