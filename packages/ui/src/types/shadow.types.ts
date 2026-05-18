import { Variant } from "@workspace/ui/constants";

/**
 * @type ShadowLayer
 * @description
 * Couche individuelle d'une shadow multicouche.
 * Permet de composer des effets complexes (highlight + bord + diffus).
 */
export type ShadowLayer = {
  offsetY: number;
  blur: number;
  spread: number;
  /** "shadow" → var(--component-shadow), "highlight" → var(--component-highlight) */
  colorVar: "shadow" | "highlight";
  opacity: number | null; // null = couleur pleine sans alpha
};


// ---------------------------------------------------------------------------
// Intents
// ---------------------------------------------------------------------------

/**
 * @type ShadowIntent
 * @description
 * Intention sémantique d'un effet de shadow.
 *
 * Découple la signification ("soulevé") des valeurs CSS réelles
 * (offsetY, blur, opacity...), résolues selon la taille via `ShadowAmplitude`.
 *
 * - `"none"`    → aucune shadow
 * - `"soft"`    → shadow légère, état de repos
 * - `"raised"`  → shadow plus marquée, effet soulevé (hover)
 * - `"pressed"` → shadow réduite, effet enfoncé (active)
 * - `"flat"`    → shadow supprimée (disabled)
 */
export type ShadowIntent = "none" | "soft" | "raised" | "pressed" | "flat";

/**
 * @type ShadowStateIntent
 * @description
 * Intent de shadow applicable à un état donné (hover, active...).
 *
 * @example
 * const hoverIntent: ShadowStateIntent = { shadow: "raised" };
 */
export type ShadowStateIntent = {
  shadow: ShadowIntent;
};

// ---------------------------------------------------------------------------
// Tokens par variant
// ---------------------------------------------------------------------------

/**
 * @type VariantShadowTokens
 * @description
 * Définit les intents de shadow pour chaque état interactif d'un variant.
 *
 * Dit QUOI faire, pas de combien — l'amplitude est résolue via `ShadowAmplitude`.
 *
 * @example
 * const elevatedShadow: VariantShadowTokens = {
 *   default:  { shadow: "soft" },
 *   hover:    { shadow: "raised" },
 *   active:   { shadow: "pressed" },
 *   disabled: { shadow: "flat" },
 * };
 */
export type VariantShadowTokens = {
  default?: ShadowStateIntent;
  hover?: ShadowStateIntent;
  active?: ShadowStateIntent;
  focus?: ShadowStateIntent;
  disabled?: ShadowStateIntent;
};

/**
 * @type VariantShadowMap
 * @description
 * Map de tous les variants vers leurs tokens de shadow.
 *
 * Typé via `Variant` pour rester synchronisé automatiquement.
 * Un variant absent n'a simplement aucune shadow.
 *
 * @example
 * export const COMPONENT_SHADOW_TOKENS_DEFAULT: VariantShadowMap = {
 *   elevated: elevatedShadow,
 *   "3d":     shadow3D,
 * };
 */
export type VariantShadowMap = Partial<Record<Variant, VariantShadowTokens>>;

// ---------------------------------------------------------------------------
// Amplitude par size
// ---------------------------------------------------------------------------

/**
 * @type ShadowAmplitude
 * @description
 * Valeurs concrètes associées à chaque intent de shadow,
 * pour une taille de composant donnée.
 *
 * - `offsetY` : déplacement vertical de l'ombre (px)
 * - `blur`    : rayon de flou (px)
 * - `spread`  : expansion de l'ombre (px)
 * - `opacity` : opacité de la couleur d'ombre (0–1)
 *
 * @example
 * const mdAmplitude: ShadowAmplitude = {
 *   soft:    { offsetY: 1, blur: 2,  spread: 0, opacity: 0.10 },
 *   raised:  { offsetY: 4, blur: 8,  spread: 0, opacity: 0.15 },
 *   pressed: { offsetY: 1, blur: 2,  spread: 0, opacity: 0.06 },
 *   flat:    { offsetY: 0, blur: 0,  spread: 0, opacity: 0    },
 * };
 */
export type ShadowAmplitudeValue = {
  offsetY: number;
  blur: number;
  spread: number;
  opacity: number;
};

export type ShadowAmplitude = {
  soft: ShadowAmplitudeValue;
  raised: ShadowAmplitudeValue;
  pressed: ShadowAmplitudeValue;
  flat: ShadowAmplitudeValue;
};

// ---------------------------------------------------------------------------
// Valeurs résolues
// ---------------------------------------------------------------------------

/**
 * @type ResolvedShadowState
 * @description
 * Valeurs finales prêtes à être converties en CSS variables,
 * après résolution de l'intent × amplitude.
 *
 * Produites par `resolveVariantShadow` et consommées par
 * `getComponentShadowStyle` pour générer `--component-shadow-box`.
 *
 * @example
 * const resolved: ResolvedShadowState = {
 *   offsetY: 4, blur: 8, spread: 0, opacity: 0.15,
 * };
 * // → "0 4px 8px rgb(from var(--component-shadow) r g b / 0.15)"
 */
export type ResolvedShadowState = {
  offsetY: number;
  blur: number;
  spread: number;
  opacity: number;
  layers: ShadowLayer[];
};

/**
 * @type ResolvedVariantShadow
 * @description
 * Ensemble des états de shadow résolus pour un variant + size donnés.
 *
 * Retourné par `resolveVariantShadow`, consommé par `getComponentShadowStyle`.
 * Un état absent signifie qu'aucune shadow n'est définie pour cet état.
 */
export type ResolvedVariantShadow = {
  default?: ResolvedShadowState;
  hover?: ResolvedShadowState;
  active?: ResolvedShadowState;
  focus?: ResolvedShadowState;
  disabled?: ResolvedShadowState;
};
