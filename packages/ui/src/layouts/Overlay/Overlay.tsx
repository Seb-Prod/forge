// Overlay.tsx
import { ReactNode } from "react";
import styles from "./Overlay.module.css";
import { classNames } from "../../functions/classNames";

export interface OverlayProps {
  /** État d'ouverture */
  open: boolean;
  
  /** Callback au clic sur l'overlay */
  onClick?: () => void;
  
  /** Désactive le clic sur l'overlay */
  disableClick?: boolean;
  
  /** Opacité personnalisée (0-1) */
  opacity?: number;
  
  /** Applique un blur */
  blur?: boolean;
  
  /** Classes CSS supplémentaires */
  className?: string;
  
  /** Contenu centré dans l'overlay */
  children?: ReactNode;
  
  /** Z-index personnalisé */
  zIndex?: number;
}

export const Overlay = ({
  open,
  onClick,
  disableClick = false,
  opacity,
  blur = true,
  className = "",
  children,
  zIndex = 1000,
}: OverlayProps) => {
  if (!open) return null;

  const handleClick = () => {
    if (!disableClick && onClick) {
      onClick();
    }
  };

  const style = {
    ...(opacity !== undefined && { backgroundColor: `rgba(0, 0, 0, ${opacity})` }),
    ...(zIndex && { zIndex }),
  };

  return (
    <div
      className={classNames(
        styles.overlay,
        blur && styles["overlay--blur"],
        className
      )}
      onClick={handleClick}
      style={style}
    >
      {children}
    </div>
  );
};