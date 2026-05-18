import { Variant } from "@workspace/ui/constants";

// ---------------------------------------------------------------------------
// Intents
// ---------------------------------------------------------------------------

/**
 * @type MotionIntent
 * @description
 * Intention sémantique d'un effet de mouvement.
 *
 * Découple la signification ("monter") de la valeur réelle ("−2px"),
 * qui est résolue selon la taille du composant via `MotionAmplitude`.
 *
 * - `"none"`    → aucun effet
 * - `"up"`      → translateY négatif (remonte)
 * - `"down"`    → translateY positif (descend)
 * - `"grow"`    → scale > 1 (grossit)
 * - `"shrink"`  → scale < 1 (rétrécit)
 * - `"fade"`    → opacity réduite
 */
export type MotionIntent = "none" | "up" | "down" | "grow" | "shrink" | "fade";

/**
 * @type MotionStateIntent
 * @description
 * Ensemble d'intents applicables à un état donné (hover, active...).
 *
 * Chaque propriété est optionnelle : seuls les effets voulus sont déclarés.
 *
 * @example
 * // Le composant remonte et grossit au hover
 * const hoverIntent: MotionStateIntent = {
 *   translateY: "up",
 *   scale: "grow",
 * };
 */
export type MotionStateIntent = {
  translateY?: MotionIntent;
  scale?: MotionIntent;
  opacity?: MotionIntent;
};

// ---------------------------------------------------------------------------
// Tokens par variant
// ---------------------------------------------------------------------------

/**
 * @type VariantMotionTokens
 * @description
 * Définit les intents de mouvement pour chaque état interactif d'un variant.
 *
 * C'est la couche "intention" du système motion : elle dit QUOI faire,
 * pas de combien — l'amplitude est résolue séparément via `MotionAmplitude`.
 *
 * @example
 * const elevatedMotion: VariantMotionTokens = {
 *   hover:    { translateY: "up",   scale: "grow" },
 *   active:   { translateY: "down", scale: "shrink" },
 *   disabled: { opacity: "fade" },
 * };
 */
export type VariantMotionTokens = {
  hover?: MotionStateIntent;
  active?: MotionStateIntent;
  focus?: MotionStateIntent;
  disabled?: MotionStateIntent;
};

/**
 * @type VariantMotionMap
 * @description
 * Map de tous les variants disponibles vers leurs tokens de mouvement.
 *
 * Typé via `Variant` (source de vérité dans `VARIANTS`) pour rester
 * synchronisé automatiquement si un variant est ajouté ou supprimé.
 *
 * Toutes les clés sont optionnelles : un variant sans entrée
 * n'a simplement aucun effet motion.
 *
 * @example
 * export const COMPONENT_MOTION_TOKENS_DEFAULT: VariantMotionMap = {
 *   solid:    solidMotion,
 *   elevated: elevatedMotion,
 *   "3d":     motion3D,
 * };
 */
export type VariantMotionMap = Partial<Record<Variant, VariantMotionTokens>>;

// ---------------------------------------------------------------------------
// Amplitude par size
// ---------------------------------------------------------------------------

/**
 * @type MotionAmplitude
 * @description
 * Valeurs concrètes (en px ou ratio) associées à chaque intent,
 * pour une taille de composant donnée.
 *
 * Permet d'adapter l'intensité du mouvement à la taille :
 * un `xxs` bougera moins qu'un `3xl` pour le même intent.
 *
 * Consommé par `resolveVariantMotion` pour transformer
 * les intents en valeurs réelles.
 *
 * @example
 * const mdAmplitude: MotionAmplitude = {
 *   up: 2, down: 2, grow: 1.04, shrink: 0.96, fade: 0.4,
 * };
 */
export type MotionAmplitude = {
  /** translateY négatif appliqué pour l'intent "up" (px) */
  up: number;
  /** translateY positif appliqué pour l'intent "down" (px) */
  down: number;
  /** scale appliqué pour l'intent "grow" (ratio, ex: 1.04) */
  grow: number;
  /** scale appliqué pour l'intent "shrink" (ratio, ex: 0.96) */
  shrink: number;
  /** opacity appliquée pour l'intent "fade" (0–1) */
  fade: number;
};

// ---------------------------------------------------------------------------
// Valeurs résolues
// ---------------------------------------------------------------------------

/**
 * @type ResolvedMotionState
 * @description
 * Valeurs finales prêtes à être converties en CSS variables,
 * après résolution de l'intent × amplitude.
 *
 * Produites par `resolveVariantMotion` et consommées par
 * `getComponentMotionStyle` pour générer les custom properties.
 *
 * @example
 * // intent "up" + amplitude md → translateY: -2
 * const resolved: ResolvedMotionState = {
 *   translateY: -2,
 *   scale: 1.04,
 *   opacity: 1,
 * };
 */
export type ResolvedMotionState = {
  /** Déplacement vertical en px (négatif = vers le haut) */
  translateY: number;
  /** Facteur d'échelle (1 = neutre, > 1 = plus grand, < 1 = plus petit) */
  scale: number;
  /** Opacité (1 = visible, 0 = invisible) */
  opacity: number;
};

/**
 * @type ResolvedVariantMotion
 * @description
 * Ensemble des états résolus pour un variant + size donnés.
 *
 * Retourné par `resolveVariantMotion`, directement consommé
 * par `getComponentMotionStyle`.
 *
 * Un état absent (`undefined`) signifie qu'aucun mouvement
 * n'est défini pour cet état : les CSS variables tombent sur leur défaut (0 / 1).
 */
export type ResolvedVariantMotion = {
  hover?: ResolvedMotionState;
  active?: ResolvedMotionState;
  focus?: ResolvedMotionState;
  disabled?: ResolvedMotionState;
};
