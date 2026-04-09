import { HTMLAttributes, forwardRef } from "react";
import { classNames } from "../../../functions/classNames";
import styles from "./StatusBadge.module.css";

/**
 * Variantes de couleur du badge de statut.
 */
export type StatusVariant = "success" | "danger" | "warning" | "info" | "neutral";

/**
 * Propriétés du composant StatusBadge.
 */
export interface StatusBadgeProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  /** Variante visuelle dictant la couleur du point */
  variant?: StatusVariant;
  
  /** Texte affiché à côté du point */
  label?: string;
  
  /** Active l'animation de pulsation (utile pour un état de chargement ou d'attente) */
  isLoading?: boolean;
  
  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant StatusBadge - Affiche un indicateur d'état avec un point de couleur et un label.
 * * @example
 * ```tsx
 * // Statut simple
 * <StatusBadge variant="success" label="Online" />
 * * // Statut en chargement
 * <StatusBadge variant="neutral" label="Vérification..." isLoading />
 * ```
 */
export const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  (
    {
      variant = "neutral",
      label,
      isLoading = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const classList = classNames(
      styles.statusBadge,
      isLoading && styles["statusBadge--loading"],
      className,
    );

    return (
      <div
        {...props}
        ref={ref}
        className={classList}
        data-role="status"
        data-tone={variant}
      >
        <div className={styles.dot} aria-hidden="true" />
        
        {label && <span className={styles.label}>{label}</span>}
        
        {/* Slot pour du contenu additionnel */}
        {children}
      </div>
    );
  },
);

StatusBadge.displayName = "StatusBadge";