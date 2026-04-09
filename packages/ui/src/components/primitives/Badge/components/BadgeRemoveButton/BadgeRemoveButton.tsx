import { IoMdClose } from "react-icons/io";
import styles from "./BadgeRemoveButon.module.css";

interface BadgeRemoveButtonProps {
  onRemove: () => void;
  ariaLabel?: string;
}

export const BadgeRemoveButton = ({ 
  onRemove, 
  ariaLabel = "Supprimer" 
}: BadgeRemoveButtonProps) => {
  return (
    <button
      type="button"
      className={styles.removeButton}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      aria-label={ariaLabel}
    >
      <IoMdClose />
    </button>
  );
};