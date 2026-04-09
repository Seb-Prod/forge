import { ReactNode, CSSProperties, HTMLAttributes, forwardRef } from "react";
import styles from "./Card.module.css";
import { classNames } from "../../../functions/classNames";

/**
 * Variante de surface du composant Card.
 */
export type SurfaceVariant = "base" | "elevated" | "outlined";

/**
 * Tonalité du composant Card.
 */
export type CardTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

/**
 * Propriétés du composant Card.
 */
export interface CardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className"
> {
  /** Titre affiché dans l'en-tête de la carte */
  title?: string;

  /** Variante visuelle de la carte */
  variant?: SurfaceVariant;

  /** Tonalité de la carte (couleur sémantique) */
  tone?: CardTone;

  /** Taille de la carte */
  size?: "sm" | "md" | "lg";

  /** Élément sémantique HTML à utiliser */
  as?: "div" | "article" | "section";

  /** Contenu du pied de page */
  footer?: ReactNode;

  /** Action à afficher dans l'en-tête (ex: bouton, icône) */
  headerAction?: ReactNode;

  /** Rendre la carte interactive (cliquable) */
  interactive?: boolean;

  /** Gestionnaire de clic si la carte est interactive */
  onClick?: () => void;

  /** Classes CSS supplémentaires */
  className?: string;

  /** Styles inline */
  style?: CSSProperties;

  /** Contenu de la carte */
  children?: ReactNode;
}

type StrictCardProps =
  | (CardProps & {
      interactive: true;
      onClick: () => void;
      "aria-label": string;
    })
  | (CardProps & {
      interactive?: false;
      onClick?: never;
      "aria-label"?: string;
    });

/**
 * Composant Card générique pour afficher du contenu dans un conteneur stylisé.
 *
 * @example
 * ```tsx
 * // Carte simple
 * <Card title="Profil utilisateur" variant="elevated">
 *   <p>Contenu de la carte</p>
 * </Card>
 * 
 * // Carte avec tonalité
 * <Card title="Erreur" tone="danger" variant="outlined">
 *   <p>Une erreur s'est produite</p>
 * </Card>
 * ```
 */
export const CardHold = forwardRef<HTMLDivElement, StrictCardProps>(
  (
    {
      title,
      variant = "base",
      tone= "neutral",
      size = "md",
      as: Component = "div",
      footer,
      headerAction,
      interactive = false,
      onClick,
      children,
      className = "",
      style,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const sizeClass = size !== "md" ? styles[`card--${size}`] : undefined;

    const classList = classNames(
      styles.card,
      styles[`card--${variant}`],
      sizeClass,
      interactive && styles["card--interactive"],
      className,
    );

    /**
     * Gère le clic sur la carte si elle est interactive.
     */
    const handleClick = () => {
      if (interactive && onClick) {
        onClick();
      }
    };

    /**
     * Gère l'appui sur les touches clavier si la carte est interactive.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (interactive && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.();
      }
    };

    const interactiveProps = interactive
      ? {
          role: "button",
          tabIndex: 0,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          "aria-label": ariaLabel,
        }
      : {};

    return (
      <Component
        {...props}
        {...interactiveProps}
        ref={ref}
        className={classList}
        data-surface={variant}
        data-card-tone={tone !== "neutral" ? tone : undefined}
        data-interactive={interactive ? "true" : undefined}
        style={style}
      >
        {(title || headerAction) && (
          <div className={styles.cardHeader}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            {headerAction && (
              <div className={styles.cardHeaderAction}>{headerAction}</div>
            )}
          </div>
        )}

        <div className={styles.cardContent}>{children}</div>

        {footer && <div className={styles.cardFooter}>{footer}</div>}
      </Component>
    );
  },
);

CardHold.displayName = "Card";
