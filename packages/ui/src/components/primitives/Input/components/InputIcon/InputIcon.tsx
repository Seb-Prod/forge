import styles from "./InputIcon.module.css";
import { classNames } from '@workspace/ui';

interface InputIcon {
  children: React.ReactNode;
  type?: "startIcon" | "endIcon"
}

/**
 * InputIcon
 * 
 * Composant pour afficher une icône dans un champ input.
 *
 * - Utilisé pour les icônes `startIcon` ou `endIcon` dans un input.
 * - Permet d'avoir une mise en page cohérente et un style uniforme.
 */
export const InputIcon = ({ children, type="startIcon" }: InputIcon) => {
  return <div className={classNames(styles.icon, type==="startIcon" ? styles.startIcon : styles.endIcon)}>{children}</div>;
};
