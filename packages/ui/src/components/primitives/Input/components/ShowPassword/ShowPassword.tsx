import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import styles from "./ShowPassword.module.css";

interface ShowPasswordProps {
  showPassword: boolean;
  onClick: () => void;
}

/**
 * ShowPassword
 *
 * Toggle pour afficher ou masquer le mot de passe
 */
export const ShowPassword = ({ showPassword, onClick }: ShowPasswordProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
      aria-pressed={showPassword}
    >
      {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
    </button>
  );
};