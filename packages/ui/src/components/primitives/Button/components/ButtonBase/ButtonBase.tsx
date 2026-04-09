// ButtonBase.tsx
import { ReactNode } from "react";
import styles from "./ButtonBase.module.css";

// Utilitaires partagés
export const renderButtonIcon = (
  iconOnly: boolean,
  icon: ReactNode,
  startIcon: ReactNode,
  endIcon: ReactNode,
  content: ReactNode,
) => {
  if (iconOnly) {
    return icon;
  }

  return (
    <div className={styles.base}>
      {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      {content}
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </div>
  );
};

export const getButtonAriaLabel = (
  loading: boolean,
  loadingText: string | undefined,
  ariaLabel: string | undefined,
) => {
  return loading && loadingText ? loadingText : ariaLabel;
};