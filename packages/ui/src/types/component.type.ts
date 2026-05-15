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
 * ============================================================================
 * COMPONENT APPEARANCE
 * ============================================================================
 */

/**
 * Propriétés d’apparence génériques d’un composant UI.
 *
 * Combine :
 * - les tokens sémantiques (`tone`, `variant`, `size`)
 * - les overrides individuels de layout
 * - les presets de design system
 */
export interface ComponentAppearanceProps<
  TVariant extends string = VariantKey,
> {
  /**
   * Couleur sémantique du composant.
   *
   * Exemple :
   * - `"primary"`
   * - `"danger"`
   * - `"neutral"`
   */
  tone?: Tone;

  /**
   * Variant visuel du composant.
   *
   * Exemple :
   * - `"solid"`
   * - `"outline"`
   * - `"ghost"`
   */
  variant?: TVariant;

  /**
   * Taille globale du composant.
   *
   * Applique automatiquement :
   * - la hauteur
   * - le padding
   * - le radius
   * - la taille de texte
   */
  size?: ComponentSize;

  /**
   * Override manuel de la hauteur.
   */
  height?: ComponentSize;

  /**
   * Override manuel du padding horizontal.
   */
  paddingX?: Spacing;

  /**
   * Override manuel de la taille du texte.
   */
  fontSize?: TextSize;

  /**
   * Override manuel du rayon des coins.
   */
  radius?: Radius;
}

/**
 * ============================================================================
 * SIZE TOKENS
 * ============================================================================
 */

/**
 * Ensemble des tokens dimensionnels associés à une taille.
 *
 * Utilisé pour définir des presets :
 * - `sm`
 * - `md`
 * - `lg`
 */
export interface ComponentSizeTokens {
  /**
   * Hauteur du composant.
   */
  height?: ComponentSize;

  /**
   * Padding horizontal.
   */
  paddingX?: Spacing;

  /**
   * Taille du texte.
   */
  fontSize?: TextSize;

  /**
   * Rayon des coins.
   */
  radius?: Radius;

  /**
   * Taille de bordure.
   */
  borderSize?: BorderSize;
}

/**
 * ============================================================================
 * COLOR SCALE
 * ============================================================================
 */

/**
 * Échelle normalisée utilisée dans le design system.
 *
 * Utilisée pour :
 * - les couleurs
 * - les ombres
 * - les highlights
 * - les intensités visuelles
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
 * ============================================================================
 * COMPONENT STATES
 * ============================================================================
 */

/**
 * États interactifs standards d’un composant UI.
 */
export type ComponentState =
  | "default"
  | "hover"
  | "active"
  | "disabled"
  | "focus";

/**
 * ============================================================================
 * VISUAL TOKENS
 * ============================================================================
 */

/**
 * Tokens visuels associés à un état interactif.
 *
 * Chaque propriété représente une intensité issue du design system.
 */
export interface ComponentStateTokens {
  /**
   * Couleur de fond.
   */
  bg?: ScaleStep;

  /**
   * Couleur du texte.
   */
  text: ScaleStep;

  /**
   * Couleur de bordure.
   */
  border?: ScaleStep;

  /**
   * Intensité de shadow.
   */
  shadow?: ScaleStep;

  /**
   * Couleur ou intensité de highlight.
   */
  highlight?: ScaleStep;
}

/**
 * Mapping des états interactifs vers leurs tokens visuels.
 */
export type ComponentStateMap = Record<
  ComponentState,
  ComponentStateTokens
>;

/**
 * Mapping complet des variants vers leurs états visuels.
 *
 * Exemple :
 * - solid
 * - outline
 * - ghost
 */
export type VariantStateMap = Record<
  Variant,
  ComponentStateMap
>;

/**
 * ============================================================================
 * MOTION TOKENS
 * ============================================================================
 */

/**
 * Tokens d’animation/interactions associés à un état.
 *
 * Permet de gérer :
 * - transform
 * - transition
 * - effets interactifs
 */
export interface ComponentMotionStateTokens {
  /**
   * Transformation CSS appliquée à l’état.
   *
   * Exemple :
   * - `translateY(-2px)`
   * - `scale(.98)`
   */
  transform?: string;

  /**
   * Transition CSS appliquée à l’état.
   *
   * Exemple :
   * - `160ms ease`
   * - `200ms cubic-bezier(...)`
   */
  transition?: string;
}

/**
 * Mapping des états interactifs vers leurs tokens de motion.
 */
export type ComponentMotionMap = Record<
  ComponentState,
  ComponentMotionStateTokens
>;

/**
 * Mapping complet des variants vers leurs comportements interactifs.
 *
 * Exemple :
 * - solid → lift effect
 * - ghost → subtle scale
 * - 3d → depth press effect
 */
export type VariantMotionMap = Record<
  Variant,
  ComponentMotionMap
>;

/**
 * ============================================================================
 * THEME TOKENS
 * ============================================================================
 */

/**
 * Tokens visuels complets pour un thème.
 *
 * Exemple :
 * - light
 * - dark
 */
export type ThemeVariantTokens = Record<
  "light" | "dark",
  VariantStateMap
>;

/**
 * Tokens de motion complets pour un thème.
 */
export type ThemeMotionTokens = Record<
  "light" | "dark",
  VariantMotionMap
>;