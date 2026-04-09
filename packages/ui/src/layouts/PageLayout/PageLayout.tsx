import { ReactNode } from "react";
import styles from "./PageLayout.module.css";
import { Surface, UnderConstructionPage } from "@workspace/ui";

/**
 * Proprétés du composant PageLayout.
 */
export interface PageLayoutProps {
  /** Contenue de la page */
  children?: ReactNode;
  surface?: Surface;
}

/**
 * Composant de mise en page
 */
export const PageLayout = ({ children, surface="base" }: PageLayoutProps) => {
  return (
    <div data-surface={surface} className={styles.page}>{children ?? <UnderConstructionPage />}</div>
  );
};
