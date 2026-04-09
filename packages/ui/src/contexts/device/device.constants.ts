/**
 * Breakpoints (en pixels).
 * Alignés sur les valeurs par défaut de Tailwind CSS.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/**
 * Délai (en ms) utilisé pour le debounce du resize.
 */
export const RESIZE_DEBOUNCE_DELAY = 150;