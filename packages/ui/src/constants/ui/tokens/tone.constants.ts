import { UIConstant } from "../types/ui-constant";

/**
 * @constant TONES
 * @description Intentions sémantiques des composants UI.
 * Définit la couleur et le sens porté par un composant.
 */
export const TONES = {
  primary: {
    value: "primary",
    label: "Primary",
    description: "Couleur principale pour les composants importants.",
  },
  secondary: {
    value: "secondary",
    label: "Secondary",
    description: "Couleur secondaire pour les composants complémentaires.",
  },
  neutral: {
    value: "neutral",
    label: "Neutral",
    description: "Couleur neutre par défaut.",
  },
  success: {
    value: "success",
    label: "Success",
    description: "Indique une validation réussie.",
  },
  danger: {
    value: "danger",
    label: "Danger",
    description: "Indique une erreur.",
  },
  warning: {
    value: "warning",
    label: "Warning",
    description: "Indique une alerte.",
  },
  info: {
    value: "info",
    label: "Info",
    description: "Information neutre.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Tone
 * @description Token sémantique dérivé de {@link TONES}.
 * Utilisé pour la prop `tone` des composants UI.
 */
export type Tone = keyof typeof TONES;

/**
 * @constant TONE_INTENSITIES
 * @description Intensités disponibles pour un ton sémantique.
 * Correspond aux palettes de couleurs CSS (ex: `--color-primary-500`).
 */
export const TONE_INTENSITIES = {
  0: {
    value: "transparent",
    label: "Transparent",
    description: "Couleur transparente.",
  },
  50: {
    value: "50",
    label: "50",
    description: "Teinte la plus claire.",
  },
  100: {
    value: "100",
    label: "100",
    description: "Très clair.",
  },
  200: {
    value: "200",
    label: "200",
    description: "Clair.",
  },
  300: {
    value: "300",
    label: "300",
    description: "Légèrement clair.",
  },
  400: {
    value: "400",
    label: "400",
    description: "Ton léger.",
  },
  500: {
    value: "500",
    label: "500",
    description: "Ton de base.",
  },
  600: {
    value: "600",
    label: "600",
    description: "Légèrement sombre.",
  },
  700: {
    value: "700",
    label: "700",
    description: "Sombre.",
  },
  800: {
    value: "800",
    label: "800",
    description: "Très sombre.",
  },
  900: {
    value: "900",
    label: "900",
    description: "Teinte la plus sombre.",
  },
  rgb: {
    value: "500-rgb",
    label: "RGB",
    description: "Valeur RGB du ton de base, pour usage en rgba().",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type ToneIntensity
 * @description Intensité d'un ton dérivée de {@link TONE_INTENSITIES}.
 * Utilisé pour composer des variables CSS comme `--color-{tone}-{intensity}`.
 */
export type ToneIntensity = keyof typeof TONE_INTENSITIES;
