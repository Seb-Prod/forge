import { ReactElement, cloneElement } from "react";
import { useModal } from "../context/useModal";

/**
 * Props du composant `ModalClose`.
 */
interface ModalCloseProps {
  /**
   * Élément React qui fermera la modal au clic.
   * Doit être un élément unique (ex. `<button>`).
   * Son `onClick` existant est préservé et exécuté avant la fermeture.
   */
  children: ReactElement<any>;
}

/**
 * Bouton de fermeture de la modal. Injecte un gestionnaire `onClick` sur son enfant
 * pour fermer la modal, tout en préservant l'éventuel `onClick` existant.
 *
 * @example
 * <ModalClose>
 *   <button>Annuler</button>
 * </ModalClose>
 */
export const ModalClose = ({ children }: ModalCloseProps) => {
  const { onOpenChange } = useModal();

  return cloneElement(children, {
    onClick: () => {
      children.props.onClick?.();
      onOpenChange(false);
    },
  });
};