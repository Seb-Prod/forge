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
   * Taille globale du composant. Applique automatiquement les tokens
   * de hauteur, padding, police et rayon correspondants.
   *
   * Peut être surchargée champ par champ via `height`, `paddingX`,
   * `fontSize` et `radius`.
   */
  size?: ComponentSize;

  /**
   * Surcharge de la hauteur définie par `size`.
   */
  height?: ComponentSize;
  paddingX?: Spacing;
  fontSize?: TextSize;
  radius?: Radius;
}

/**
 * Ensemble de tokens dimensionnels associés à une taille de composant prédéfinie.
 *
 * Utilisé pour définir des presets de taille réutilisables (ex. `sm`, `md`, `lg`)
 * qui sont ensuite appliqués via `ComponentAppearanceProps.size`.
 *
 * Tous les champs sont optionnels pour permettre des presets partiels
 * (seuls les tokens pertinents sont renseignés).
 */
export interface ComponentSizeTokens {
  height?: ComponentSize;
  paddingX?: Spacing;
  fontSize?: TextSize;
  radius?: Radius;
  borderSize?: BorderSize;
}

/**
 * Pas valides de l'échelle de design (de 50 à 950).
 *
 * Correspond aux stops de la palette de couleurs ou d'opacité
 * définis dans le système de tokens. Les valeurs intermédiaires
 * non listées ne sont pas autorisées.
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
 * États interactifs d'un composant UI.
 */
export type ComponentState =
  | "default"
  | "hover"
  | "active"
  | "disabled"
  | "focus";

/**
 * Tokens visuels associés à un état donné d'un composant.
 *
 * Chaque propriété est un pas de l'échelle de design (`ScaleStep`)
 * référençant la valeur à utiliser pour cet état dans la palette courante.
 */
export interface ComponentStateTokens {
  bg?: ScaleStep;
  text: ScaleStep;
  border?: ScaleStep;
  shadow?: ScaleStep;
  highlight?: ScaleStep;
}

/**
 * Table de correspondance entre chaque état interactif et ses tokens visuels.
 *
 * Permet de centraliser la définition des styles pour tous les états
 * d'un composant en un seul objet.
 */
export type ComponentStateMap = Record<ComponentState, ComponentStateTokens>;

/** Association surface → tokens, hors cas `"none"`. */
export type VariantStateMap = Record<
  Variant,
  Record<ComponentState, ComponentStateTokens>
>;

export type VariantTokens = Record<Variant, VariantStateMap>;
