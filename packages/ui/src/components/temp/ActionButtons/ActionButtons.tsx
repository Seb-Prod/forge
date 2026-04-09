import { ActionButton } from "./components/ActionButton";
import styles from "./ActionButtons.module.css";


export interface ActionButtonsProps {
  /** Callback pour l'action de réduction */
  onCollapse?: () => void;
  
  /** Callback pour l'action d'agrandissement */
  onExpand?: () => void;
  
  /** Callback pour l'action de fermeture */
  onClose?: () => void;
  
  /** Désactive le bouton de réduction */
  disableCollapse?: boolean;
  
  /** Désactive le bouton d'agrandissement */
  disableExpand?: boolean;
  
  /** Désactive le bouton de fermeture */
  disableClose?: boolean;
  
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant ActionButtons - Groupe de boutons d'actions.
 * 
 * @example
 * ```tsx
 * <ActionButtons 
 *   onClose={handleClose}
 *   onExpand={handleExpand}
 *   onCollapse={handleCollapse}
 * />
 * ```
 */
export const ActionButtons = ({
  onCollapse,
  onExpand,
  onClose,
  disableCollapse = false,
  disableExpand = false,
  disableClose = false,
  className,
}: ActionButtonsProps) => {
  return (
    <div className={`${styles.container} ${className || ""}`}>
      {onCollapse && (
        <ActionButton
          action="collapse"
          onClick={onCollapse}
          disabled={disableCollapse}
        />
      )}
      {onExpand && (
        <ActionButton
          action="expand"
          onClick={onExpand}
          disabled={disableExpand}
        />
      )}
      {onClose && (
        <ActionButton
          action="close"
          onClick={onClose}
          disabled={disableClose}
        />
      )}
    </div>
  );
};