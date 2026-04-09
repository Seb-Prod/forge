import { ReactNode } from "react";
import styles from "./ButtonContent.module.css";

type ButtonContentProps = {
  loading: boolean;
  loadingText?: string;
  children: ReactNode;
};

export const ButtonContent = ({
  loading,
  loadingText,
  children,
}: ButtonContentProps) => {
  return (
    <span className={styles.contentWrapper}>
      {loading && (
        <span className={styles.loadingOverlay}>
          <span className={styles.spinner} aria-hidden />
          {loadingText && (
            <span className={styles.loadingText}>{loadingText}</span>
          )}
        </span>
      )}
      <span className={loading ? styles.hiddenContent : ""}>
        {children}
      </span>
    </span>
  );
};