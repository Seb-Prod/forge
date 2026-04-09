import { ButtonHTMLAttributes } from "react";
import { classNames } from "../../../../functions/classNames";
import styles from "./BurgerMenu.module.css";

/**
 * Propriétés du composant BurgerMenu.
 */
export interface BurgerMenuProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children"
> {
  /** État ouvert/fermé du menu */
  isOpen?: boolean;
}

/**
 * Bouton burger menu animé pour la navigation mobile.
 *
 * Affiche une icône hamburger qui se transforme en croix (X) quand le menu est ouvert.
 */
export function BurgerMenu({
  isOpen = false,
  onClick,
  ...props
}: BurgerMenuProps) {
  return (
    <button
      {...props}
      type="button"
      className={classNames(styles.burgerMenu, isOpen && styles.open)}
      onClick={onClick}
      role="switch"
      aria-checked={isOpen}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
    >
      <span className={styles.icon} />
    </button>
  );
}
