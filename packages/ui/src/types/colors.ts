/**
 * 🎨 Types de couleurs supportés dans le design system
 *
 * Ce fichier définit les formats de couleurs CSS acceptés
 * pour les composants UI.
 *
 * Il permet de restreindre les valeurs à des formats valides
 * tout en gardant de la flexibilité via les template literal types.
 *
 * ─────────────────────────────────────────────
 * Formats supportés :
 * ─────────────────────────────────────────────
 *
 * - RGB   → rgb(255, 255, 255)
 * - RGBA  → rgba(255, 255, 255, 0.5)
 * - HEX   → #FFFFFF / #FFF
 *
 * ─────────────────────────────────────────────
 * Exemple d'utilisation :
 * ─────────────────────────────────────────────
 *
 * ```ts
 * import { TextColor } from "@workspace/ui/types/color";
 *
 * const color: TextColor = "rgb(255, 0, 0)";
 * const colorHex: TextColor = "#FF0000";
 * const colorAlpha: TextColor = "rgba(255, 0, 0, 0.5)";
 * ```
 *
 * ─────────────────────────────────────────────
 * ⚠️ Notes :
 * ─────────────────────────────────────────────
 *
 * - Ces types ne valident pas strictement les valeurs internes
 *   (ex: rgb(999, 999, 999) reste accepté).
 * - Ils servent principalement à garantir le bon format de chaîne.
 * - Pour une validation stricte, utiliser une validation runtime.
 */

// Format RGB → "rgb(255, 255, 255)"
type RGBColor = `rgb(${string})`;

// Format RGBA → "rgba(255, 255, 255, 0.5)"
type RGBAColor = `rgba(${string})`;

// Format HEX → "#FFFFFF" ou "#FFF"
type HexColor = `#${string}`;

/**
 * 🎯 Type principal pour les couleurs de texte
 *
 * Regroupe tous les formats supportés.
 */
export type Color = RGBColor | RGBAColor | HexColor;