import { ReactNode } from "react";
import styles from "./BadgeContent.module.css";

interface BadgeContentProps {
  children?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const BadgeContent = ({ children, startIcon, endIcon }: BadgeContentProps) => {
  const contentClass = [
    styles.content,
    !startIcon ? styles.marginLeft : "",
    !endIcon ? styles.marginRight : "",
  ].join(" ");

  return (
    <>
      {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      {children && <span className={contentClass}>{children}</span>}
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </>
  );
};