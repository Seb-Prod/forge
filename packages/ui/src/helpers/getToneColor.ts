import { Tone, ToneIntensity, TONE_INTENSITIES } from "@workspace/ui/constants";

/**
 * @function getToneColor
 * @description Résout un token de ton et une intensité optionnelle en variable CSS de couleur.
 * Sans intensité, utilise le ton de base (`500`).
 *
 * @param tone      - Token {@link Tone} définissant la couleur sémantique
 * @param intensity - Token {@link ToneIntensity} optionnel. Par défaut `500`
 * @returns Variable CSS de couleur
 *
 * @example
 * getToneColor("primary")           // "var(--color-primary-500)"
 * getToneColor("danger", 100)       // "var(--color-danger-100)"
 * getToneColor("success", "rgb")    // "var(--color-success-500-rgb)"
 */
export const getToneColor = (tone: Tone = "primary", intensity: ToneIntensity = 500): string =>
  `var(--color-${tone}-${TONE_INTENSITIES[intensity].value})`;