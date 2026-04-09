import { IoMdCloseCircle } from "react-icons/io";
import { classNames } from "@workspace/ui";
import styles from "./ClearButton.module.css";

interface ClearButtonProps {
  onClick: () => void;
  visible: boolean;
}

/**
 * ClearButton
 *
 * Bouton pour effacer le contenue de l'input
 */
export const ClearButton = ({ onClick, visible }: ClearButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(styles.clear, visible? styles.visible : "")}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      aria-label="Effacer le contenu"
    >
      <IoMdCloseCircle/>
    </button>
  );
};
