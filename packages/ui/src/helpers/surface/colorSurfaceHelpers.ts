import { Surface, SURFACES, Tone } from "@workspace/ui/constants";

/**
 * @function resolveSurfaceVar
 * @description Résout une propriété de surface en variable CSS.
 * Sans teinte, utilise la variable de surface générique.
 * Avec teinte, utilise la variable de couleur sémantique.
 *
 * @param surface  - Token {@link Surface} définissant le niveau d'élévation
 * @param property - Propriété de surface à résoudre (`surfaceTone`, `textTone`, `borderTone`)
 * @param tone     - Token {@link Tone} optionnel pour une couleur sémantique
 * @returns Variable CSS résolue
 *
 * @internal
 */
type SurfaceProperty = "surfaceTone" | "textTone" | "borderTone";

const resolveSurfaceVar = (surface: Surface, property: SurfaceProperty, tone?: Tone): string => {
  const intensity = SURFACES[surface][property];
  if (!tone) return `var(--surface-${intensity})`;
  return `var(--color-${tone}-${intensity})`;
};

/**
 * @function getSurfaceBackground
 * @description Résout un token de surface et une teinte optionnelle en variable CSS de fond.
 * Sans teinte, utilise la variable de surface générique.
 * Avec teinte, utilise la variable de couleur sémantique.
 *
 * @param surface - Token {@link Surface} définissant le niveau d'élévation
 * @param tone    - Token {@link Tone} optionnel pour une couleur sémantique
 * @returns Variable CSS de fond
 *
 * @example
 * getSurfaceBackground("raised")            // "var(--surface-600)"
 * getSurfaceBackground("raised", "primary") // "var(--color-primary-600)"
 */
export const getSurfaceBackground = (surface: Surface, tone?: Tone): string =>
  resolveSurfaceVar(surface, "surfaceTone", tone);

/**
 * @function getSurfaceTextColor
 * @description Résout un token de surface et une teinte optionnelle en variable CSS de texte.
 * Garantit le contraste lisible via le `textTone` embarqué dans {@link SURFACES}.
 * Sans teinte, utilise la variable de surface générique.
 * Avec teinte, utilise la variable de couleur sémantique.
 *
 * @param surface - Token {@link Surface} définissant le niveau d'élévation
 * @param tone    - Token {@link Tone} optionnel pour une couleur sémantique
 * @returns Variable CSS de couleur de texte
 *
 * @example
 * getSurfaceTextColor("base")               // "var(--surface-50)"
 * getSurfaceTextColor("inverted", "primary") // "var(--color-primary-900)"
 */
export const getSurfaceTextColor = (surface: Surface, tone?: Tone): string =>
  resolveSurfaceVar(surface, "textTone", tone);

/**
 * @function getSurfaceBorderColor
 * @description Résout un token de surface et une teinte optionnelle en variable CSS de bordure.
 * Sans teinte, utilise la variable de surface générique.
 * Avec teinte, utilise la variable de couleur sémantique.
 *
 * @param surface - Token {@link Surface} définissant le niveau d'élévation
 * @param tone    - Token {@link Tone} optionnel pour une couleur sémantique
 * @returns Variable CSS de couleur de bordure
 *
 * @example
 * getSurfaceBorderColor("raised")            // "var(--surface-500)"
 * getSurfaceBorderColor("raised", "primary") // "var(--color-primary-500)"
 */
export const getSurfaceBorderColor = (surface: Surface, tone?: Tone): string =>
  resolveSurfaceVar(surface, "borderTone", tone);