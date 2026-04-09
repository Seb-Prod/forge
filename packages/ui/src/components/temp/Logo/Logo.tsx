import { HTMLAttributes, forwardRef } from "react";
import { classNames } from "../../../functions/classNames";
import styles from "./Logo.module.css";

/**
 * Taille du logo.
 */
export type LogoSize = "sm" | "md" | "lg" | "xl";

/**
 * Alignement du texte par rapport au logo.
 */
export type LogoAlign = "right" | "bottom" | "left" | "top";

/**
 * Propriétés du composant Logo.
 */
export interface LogoProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  /** Taille du logo */
  size?: LogoSize;
  
  /** Alignement du texte par rapport au logo */
  align?: LogoAlign;
  
  /** Texte affiché à côté du logo */
  text?: string;
  
  /** Source de l'image du logo (URL ou chemin) */
  logoSrc: string;
  
  /** Texte alternatif pour l'accessibilité (si non fourni, utilise le text) */
  alt?: string;
  
  /** Rendre le logo cliquable */
  interactive?: boolean;
  
  /** Gestionnaire de clic si le logo est interactif */
  onClick?: () => void;
  
  /** Classes CSS supplémentaires */
  className?: string;
}

type StrictLogoProps =
  | (LogoProps & { interactive: true; onClick: () => void; "aria-label": string })
  | (LogoProps & { interactive?: false; onClick?: never; "aria-label"?: string });

/**
 * Composant Logo - Affiche un logo avec texte optionnel.
 * 
 * @example
 * ```tsx
 * // Logo simple
 * <Logo logoSrc="/logo.svg" text="Forge" />
 * 
 * // Logo personnalisé
 * <Logo 
 *   logoSrc="/logo.svg" 
 *   text="Mon App" 
 *   size="lg" 
 *   align="bottom"
 * />
 * 
 * // Logo interactif
 * <Logo 
 *   logoSrc="/logo.svg" 
 *   text="Accueil"
 *   interactive
 *   onClick={() => navigate('/')}
 *   aria-label="Retour à l'accueil"
 * />
 * ```
 */
export const Logo = forwardRef<HTMLDivElement, StrictLogoProps>(
  (
    {
      size = "md",
      align = "right",
      text = "",
      logoSrc,
      alt,
      interactive = false,
      onClick,
      className = "",
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const classList = classNames(
      styles.logo,
      interactive && styles["logo--interactive"],
      className,
    );

    /**
     * Gère le clic sur le logo si interactif.
     */
    const handleClick = () => {
      if (interactive && onClick) {
        onClick();
      }
    };

    /**
     * Gère l'appui sur les touches clavier si interactif.
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
      <div
        {...props}
        {...interactiveProps}
        ref={ref}
        className={classList}
        data-size={size}
        data-align={align}
      >
        <div className={styles.logoImage}>
          <img 
            src={logoSrc} 
            alt={alt || `${text} logo`}
            draggable={false}
          />
        </div>
        {text && <span className={styles.logoText}>{text}</span>}
      </div>
    );
  },
);

Logo.displayName = "Logo";