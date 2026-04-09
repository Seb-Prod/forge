import { TextProps, DEFAULT_PROPS } from "./Text.types";
import { ElementType, forwardRef, useMemo } from "react";
import { getTextStyle } from "./helpers/getTextStyles";

/**
 * Composant typographique de base du design system.
 *
 * Rend un élément HTML sémantique configurable via la prop `as` (`p`, `span`,
 * `h1`–`h6`, `label`, `strong`, `em`, `small`, `legend`).
 * L'apparence est entièrement pilotée par les tokens du design system
 * (taille, graisse, alignement, transformation, décoration, couleur).
 *
 * @example
 * // Paragraphe simple
 * <Text size="md" weight="regular">Contenu</Text>
 *
 * @example
 * // Titre sémantique
 * <Text as="h1" size="3xl" weight="bold" tone="primary">Titre</Text>
 *
 * @example
 * // Label de formulaire
 * <Text as="label" htmlFor="email" size="sm" weight="medium">Email</Text>
 *
 * @example
 * // Texte tronqué
 * <Text truncate>Texte très long qui sera tronqué avec une ellipse</Text>
 *
 * @example
 * // Texte limité à 3 lignes
 * <Text lineClamp={3}>Texte long sur plusieurs lignes...</Text>
 */
export const Text = forwardRef<HTMLElement, TextProps>((props, ref) => {
  const mergedProps = { ...DEFAULT_PROPS, ...props };

  const Component = mergedProps.as as ElementType;

  const textStyle = useMemo(
    () => getTextStyle(mergedProps),
    [
      mergedProps.size,
      mergedProps.weight,
      mergedProps.align,
      mergedProps.transform,
      mergedProps.decoration,
      mergedProps.italic,
      mergedProps.truncate,
      mergedProps.lineClamp,
      mergedProps.tone,
      mergedProps.intensity,
      mergedProps.color,
      mergedProps.style,
    ],
  );

  return (
    <Component
      ref={ref}
      className={mergedProps.className}
      style={textStyle}
      htmlFor={mergedProps.as === "label" ? mergedProps.htmlFor : undefined}
    >
      {mergedProps.children}
    </Component>
  );
});

Text.displayName = "Text";