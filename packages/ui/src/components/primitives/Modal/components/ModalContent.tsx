import styles from "../styles/Modal.module.css";
import { useModal } from "../context/useModal";

/**
 * Props du composant `ModalContent`.
 */
interface ModalContentProps {
  /** Contenu affiché à l'intérieur de la modal. */
  children: React.ReactNode;
}

/**
 * Conteneur principal de la modal. Affiche un overlay semi-transparent
 * et ferme la modal si l'utilisateur clique en dehors du panneau.
 *
 * @example
 * <ModalContent>
 *   <ModalHeader>...</ModalHeader>
 *   <ModalFooter>...</ModalFooter>
 * </ModalContent>
 */
export const ModalContent = ({ children }: ModalContentProps) => {
  const { onOpenChange, closeOnOutsideClick } = useModal();

  return (
    <div
      className={styles.overlay}
      onClick={() => {
        if (closeOnOutsideClick) {
          onOpenChange(false);
        }
      }}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};