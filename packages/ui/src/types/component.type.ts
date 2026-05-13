import {
  BorderSize,
  ComponentSize,
  Radius,
  Spacing,
  TextSize,
  Tone,
  Variant,
  VariantKey,
} from "@workspace/ui/constants";

/**
 * Propriétés d'apparence d'un composant UI.
 *
 * Combine les tokens sémantiques (tone, variant, size) avec des overrides
 * individuels permettant de surcharger la taille prédéfinie champ par champ.
 */
export interface ComponentAppearanceProps<TVariant extends string = VariantKey> {
  /** Couleur sémantique du composant (ex. `"primary"`, `"danger"`, `"neutral"`). */
  tone?: Tone;

  /** Style visuel du composant (ex. `"solid"`, `"outline"`, `"ghost"`). */
  variant?: TVariant;

  /**
   * Taille globale du composant.
   * Applique automatiquement les tokens de hauteur, padding, police et rayon.
   *
   * Peut être surchargée champ par champ via `height`, `paddingX`,
   * `fontSize` et `radius`.
   */
  size?: ComponentSize;

  /**
   * Surcharge de la hauteur définie par `size`.
   */
  height?: ComponentSize;

  /**
   * Surcharge du padding horizontal du composant définie par `size`.
   */
  paddingX?: Spacing;

  /**
   * Surcharge de la taille de police du composant définie par `size`.
   */
  fontSize?: TextSize;

  /**
   * Surcharge du rayon des coins du composant définie par `size`.
   */
  radius?: Radius;
}

/**
 * Ensemble de tokens dimensionnels associés à une taille de composant prédéfinie.
 *
 * Utilisé pour définir des presets de taille réutilisables (ex. `sm`, `md`, `lg`)
 * appliqués automatiquement via `ComponentAppearanceProps.size`.
 *
 * Tous les champs sont optionnels afin de permettre des presets partiels
 * (seuls les tokens pertinents sont définis).
 */
export interface ComponentSizeTokens {
  height?: ComponentSize;
  paddingX?: Spacing;
  fontSize?: TextSize;
  radius?: Radius;
  borderSize?: BorderSize;
}

/**
 * Échelle de valeurs utilisées dans le design system.
 *
 * Correspond aux steps de la palette (couleur, opacité, intensité…).
 * Ces valeurs garantissent une cohérence visuelle globale.
 */
export type ScaleStep =
  | 0
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;

/**
 * États interactifs d’un composant UI.
 */
export type ComponentState =
  | "default"
  | "hover"
  | "active"
  | "disabled"
  | "focus";

/**
 * Tokens visuels associés à un état d’un composant.
 *
 * Chaque propriété correspond à une valeur de `ScaleStep`
 * utilisée pour définir l’apparence du composant dans un état donné.
 */
export interface ComponentStateTokens {
  bg?: ScaleStep;
  text: ScaleStep;
  border?: ScaleStep;
  shadow?: ScaleStep;
  highlight?: ScaleStep;
}

/**
 * Mapping des états vers leurs tokens visuels.
 *
 * Permet de définir l’ensemble des styles d’un composant
 * selon ses états interactifs.
 */
export type ComponentStateMap = Record<ComponentState, ComponentStateTokens>;

/**
 * Mapping complet des variants vers leurs états visuels.
 *
 * Associe chaque variant (solid, outline, ghost, etc.)
 * à ses styles pour chaque état interactif.
 */
export type VariantStateMap = Record<
  Variant,
  Record<ComponentState, ComponentStateTokens>
>;

/**
 * Ensemble complet des tokens de variants pour un thème donné.
 *
 * Généralement utilisé pour distinguer les thèmes (light / dark)
 * ou les contextes visuels globaux.
 */
export type VariantTokens = Record<Variant, VariantStateMap>;