import { ScaleStep } from "@workspace/ui/types";

// ---------------------------------------------------------------------------
// State maps
// ---------------------------------------------------------------------------

/**
 * @type OptionalStateMap
 * @description
 * Map d'états interactifs avec valeurs optionnelles.
 *
 * Utilisée pour les propriétés visuelles facultatives (bg, border, shadow...)
 * où seul l'état `default` peut suffire.
 */
type OptionalStateMap = {
  default?: ScaleStep;
  hover?: ScaleStep;
  active?: ScaleStep;
  focus?: ScaleStep;
  disabled?: ScaleStep;
};

/**
 * @type RequiredStateMap
 * @description
 * Map d'états interactifs avec valeurs obligatoires.
 *
 * Utilisée pour `text` : un composant doit toujours avoir
 * une couleur de texte définie pour chaque état.
 */
type RequiredStateMap = {
  default: ScaleStep;
  hover: ScaleStep;
  active: ScaleStep;
  focus: ScaleStep;
  disabled: ScaleStep;
};

// ---------------------------------------------------------------------------
// Mode map
// ---------------------------------------------------------------------------

/**
 * @type ModeMap
 * @description
 * Conteneur light/dark pour une state map donnée.
 *
 * Paramétré par `T` pour accepter aussi bien `OptionalStateMap`
 * que `RequiredStateMap` selon la propriété.
 *
 * @example
 * const bgMap: ModeMap = {
 *   light: { default: 100, hover: 200, active: 300 },
 *   dark:  { default: 800, hover: 700, active: 600 },
 * };
 */
type ModeMap<T extends OptionalStateMap = OptionalStateMap> = {
  light?: T;
  dark?: T;
};

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------

/**
 * @type PaletteBase
 * @description
 * Structure de palette d'entrée pour un variant de couleur.
 *
 * Définit les scale steps par propriété visuelle, par mode (light/dark)
 * et par état interactif (default, hover, active).
 *
 * - `text` est obligatoire : tout composant doit avoir une couleur de texte.
 * - Les autres propriétés sont optionnelles selon le variant
 *   (ex: `ghost` n'a pas de `bg`, `solid` n'a pas de `shadow`).
 *
 * Consommée par `buildVariantTokens` pour produire un `ComponentStateMap`
 * via `createVariantTokens`.
 *
 * @example
 * const elevatedBase = {
 *   bg: {
 *     light: { default: 100, hover: 200, active: 300 },
 *     dark:  { default: 800, hover: 700, active: 600 },
 *   },
 *   text: {
 *     light: { default: 700, hover: 800, active: 900 },
 *     dark:  { default: 100, hover: 50,  active: 50  },
 *   },
 *   shadow: {
 *     light: { default: 900 },
 *     dark:  { default: 200 },
 *   },
 * } satisfies PaletteBase;
 */
export type PaletteBase = {
  /** Couleur de fond par mode et état. */
  bg?: ModeMap;
  /** Couleur de texte par mode et état — obligatoire. */
  text: ModeMap<RequiredStateMap>;
  /** Couleur de bordure par mode et état. */
  border?: ModeMap;
  /** Couleur d'ombre par mode et état. */
  shadow?: ModeMap;
  /** Couleur de highlight par mode et état. */
  highlight?: ModeMap;
};
