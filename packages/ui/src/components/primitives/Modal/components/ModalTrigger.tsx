import { ReactElement, cloneElement } from "react";
import { useModal } from "../context/useModal";

/**
 * Props du composant `ModalTrigger`.
 */
interface ModalTriggerProps {
  /**
   * Élément React qui déclenchera l'ouverture de la modal au clic.
   * Doit être un élément unique (ex. `<button>`).
   * Son `onClick` existant est préservé et exécuté avant l'ouverture.
   */
  children: ReactElement<any>;
}

/**
 * Déclencheur de la modal. Injecte un gestionnaire `onClick` sur son enfant
 * pour ouvrir la modal, tout en préservant l'éventuel `onClick` existant.
 *
 * ⚠️ Doit être placé à l'intérieur de `<Modal>` mais en dehors de `<ModalContent>`.
 *
 * @example
 * <ModalTrigger>
 *   <button>Ouvrir</button>
 * </ModalTrigger>
 */
export const ModalTrigger = ({ children }: ModalTriggerProps) => {
  const { onOpenChange } = useModal();

  return cloneElement(children, {
    onClick: () => {
      children.props.onClick?.();
      onOpenChange(true);
    },
  });
};