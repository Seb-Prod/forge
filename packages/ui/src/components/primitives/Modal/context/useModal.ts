import { useContext } from "react";
import { ModalContext } from "./ModalContext";
import type { ModalContextType } from "./ModalContext.type";

/**
 * Hook permettant aux sous-composants d'accéder au contexte de la Modal.
 * Peut également être utilisé par les consommateurs pour piloter la modal
 * depuis un composant enfant arbitraire.
 *
 * @throws {Error} Si utilisé en dehors d'un composant `<Modal>`.
 * @returns Le contexte de la Modal contenant `open` et `onOpenChange`.
 *
 * @example
 * const { open, onOpenChange } = useModal();
 */
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within <Modal>");
  }
  return context;
};