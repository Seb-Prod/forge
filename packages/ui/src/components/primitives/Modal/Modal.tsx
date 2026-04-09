import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./context/ModalContext";

/**
 * Props du composant racine `Modal`.
 */
interface ModalProps {
  /** Contrôle l'état d'ouverture de la modal (composant contrôlé). */
  open: boolean;
  /** Appelé lorsque la modal doit changer d'état (fermeture via ESC, clic extérieur, etc.). */
  onOpenChange: (open: boolean) => void;
  /** Sous-composants de la modal (`ModalTrigger`, `ModalContent`, etc.). */
  children: React.ReactNode;
  /** Désactive la fermeture de la modal par le click extérieur */
  closeOnOutsideClick?: boolean;
}

/**
 * Composant racine de la Modal. Gère le contexte, le portail DOM,
 * la fermeture via la touche Escape et le blocage du scroll.
 *
 * Doit englober tous les sous-composants :
 * `ModalTrigger`, `ModalContent`, `ModalHeader`, `ModalTitle`,
 * `ModalDescription`, `ModalFooter`, `ModalClose`.
 *
 * @example
 * <Modal open={open} onOpenChange={setOpen}>
 *   <ModalTrigger><button>Ouvrir</button></ModalTrigger>
 *   <ModalContent>
 *     <ModalHeader>
 *       <ModalTitle>Titre</ModalTitle>
 *       <ModalDescription>Description</ModalDescription>
 *     </ModalHeader>
 *     <ModalFooter>
 *       <ModalClose><button>Fermer</button></ModalClose>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 */
export const Modal = ({
  open,
  onOpenChange,
  children,
  closeOnOutsideClick = true,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <ModalContext.Provider value={{ open, onOpenChange, closeOnOutsideClick }}>
      {children}
    </ModalContext.Provider>,
    document.body,
  );
};
