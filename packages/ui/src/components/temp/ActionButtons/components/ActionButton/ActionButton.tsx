import { MdClose, MdAdd, MdRemove } from "react-icons/md";
import styles from "./ActionButton.module.css";

export type ActionButtonAction = "close" | "expand" | "collapse";

/**
 * Composant ActionButton - Bouton d'action avec icône et animations.
 * 
 * @example
 * ```tsx
 * <ActionButton action="close" onClick={handleClose} />
 * <ActionButton action="expand" onClick={handleExpand} disabled />
 * ```
 */
export interface ActionButtonProps {
  /** Action à effectuer (détermine l'icône et la couleur) */
  action?: ActionButtonAction;
  
  /** Fonction appelée au clic */
  onClick?: () => void;
  
  /** Désactive le bouton */
  disabled?: boolean;
  
  /** Classes CSS supplémentaires */
  className?: string;
  
  /** Label accessible (auto-généré si non fourni) */
  "aria-label"?: string;
}

const ACTION_CONFIG = {
  close: {
    icon: MdClose,
    tone: "danger",
    label: "Fermer",
  },
  expand: {
    icon: MdAdd,
    tone: "success",
    label: "Agrandir",
  },
  collapse: {
    icon: MdRemove,
    tone: "warning",
    label: "Réduire",
  },
} as const;

/**
 * Bouton d'action avec icône, couleur et animation selon l'action.
 * Utilise le système de design via `data-tone`.
 */
export const ActionButton = ({ 
  onClick, 
  disabled = false, 
  className,
  action = "close",
  "aria-label": ariaLabel,
}: ActionButtonProps) => {
  const config = ACTION_CONFIG[action];
  const Icon = config.icon;

  return (
    <button
      type="button"
      className={`${styles.actionButton} has-halo ${className || ""}`}
      onClick={onClick}
      aria-label={ariaLabel || config.label}
      disabled={disabled}
      data-action={action}
      data-tone={config.tone}
    >
      <Icon />
    </button>
  );
};