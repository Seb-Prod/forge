import React from "react";
import { ReactNode, CSSProperties, ElementType } from "react";

/**
 * Variantes disponibles du GridLayout.
 */
export type GridLayoutVariant = "default" | "dashboard" | "cards";

/**
 * Propriétés du composant GridLayout.
 */
export interface GridLayoutProps {
  /** Contenu affiché dans le grid */
  children: ReactNode;

  /** Élément HTML à utiliser (div, section, main, etc.) */
  as?: ElementType;

  /** Variante prédéfinie du layout */
  variant?: GridLayoutVariant;

  /** Nombre de colonnes fixes */
  columns?: number;

  /** Espacement entre les éléments */
  gap?: string;

  /** Largeur minimale d’un item pour un grid responsive auto-fit */
  minItemWidth?: string;

  /** Alignement vertical des éléments */
  align?: CSSProperties["alignItems"];

  /** Alignement horizontal des éléments */
  justify?: CSSProperties["justifyItems"];

  /** Classe CSS additionnelle */
  className?: string;

  /** Styles inline supplémentaires */
  style?: CSSProperties;

  /** Ajoute un séparateur entre les éléments */
  divider?: boolean | "vertical" | "horizontal";
  
  /** Couleur du séparateur */
  dividerColor?: string;
}

/**
 * Composant de layout en grid flexible et réutilisable.
 */
export const GridLayout = ({
  children,
  as: Component = "div",
  variant = "default",
  columns,
  gap,
  minItemWidth,
  align = "stretch",
  justify = "stretch",
  divider,
  dividerColor = "rgba(0, 0, 0, 0.1)",
  className = "",
  style = {},
}: GridLayoutProps) => {
  const variantStyles: Record<GridLayoutVariant, CSSProperties> = {
    default: {
      gap: gap ?? "1rem",
    },
    dashboard: {
      gap: gap ?? "2rem",
    },
    cards: {
      gap: gap ?? "1.5rem",
    },
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    alignItems: align,
    justifyItems: justify,
    ...(minItemWidth
      ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
        }
      : columns
      ? {
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }
      : {
          gridTemplateColumns: "1fr",
        }),
    ...variantStyles[variant],
    ...style,
  };

  // Styles pour les séparateurs
  const itemStyle: CSSProperties | undefined = divider
    ? {
        borderRight:
          divider === "vertical" || divider === true
            ? `1px solid ${dividerColor}`
            : undefined,
        borderBottom:
          divider === "horizontal"
            ? `1px solid ${dividerColor}`
            : undefined,
        paddingRight: divider === "vertical" || divider === true ? "1rem" : undefined,
        paddingBottom: divider === "horizontal" ? "1rem" : undefined,
      }
    : undefined;

  return (
    <Component className={className} style={gridStyle}>
      {itemStyle
        ? React.Children.map(children, (child, index) => (
            <div 
              style={{
                ...itemStyle,
                // Retire la bordure du dernier élément de chaque ligne
                ...(columns && (index + 1) % columns === 0 ? { borderRight: "none" } : {}),
              }}
            >
              {child}
            </div>
          ))
        : children}
    </Component>
  );
};