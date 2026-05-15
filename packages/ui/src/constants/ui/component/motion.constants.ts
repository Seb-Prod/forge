import { UIConstant } from "../types/ui-constant";

/**
 * @constant MOTION_TRANSITIONS
 * @description
 * Transitions standards utilisées dans les animations
 * des composants interactifs.
 *
 * Basées sur des courbes fluides et modernes
 * adaptées aux micro-interactions UI.
 */
export const MOTION_TRANSITIONS = {
  standard: {
    value: "160ms cubic-bezier(.2,.8,.2,1)",
    label: "Standard",
    description: "Transition fluide standard.",
  },

  fast: {
    value: "120ms cubic-bezier(.2,.8,.2,1)",
    label: "Fast",
    description: "Transition rapide.",
  },

  slow: {
    value: "240ms cubic-bezier(.2,.8,.2,1)",
    label: "Slow",
    description: "Transition lente et douce.",
  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type MotionTransition
 * @description
 * Token de transition dérivé de {@link MOTION_TRANSITIONS}.
 */
export type MotionTransition = keyof typeof MOTION_TRANSITIONS;

/**
 * @constant MOTION_SIZE_INTENSITY
 * @description
 * Intensité des micro-interactions selon
 * la taille du composant.
 *
 * Plus le composant est grand,
 * plus l’animation peut être visible.
 */
export const MOTION_SIZE_INTENSITY = {
  xxs: {
    value: 1,
    label: "XXS",
    description: "Intensité minimale.",
  },

  xs: {
    value: 1,
    label: "XS",
    description: "Très faible intensité.",
  },

  sm: {
    value: 1.5,
    label: "SM",
    description: "Faible intensité.",
  },

  md: {
    value: 2,
    label: "MD",
    description: "Intensité standard.",
  },

  lg: {
    value: 3,
    label: "LG",
    description: "Intensité élevée.",
  },

  xl: {
    value: 4,
    label: "XL",
    description: "Très forte intensité.",
  },

  "2xl": {
    value: 5,
    label: "2XL",
    description: "Intensité extra large.",
  },

  "3xl": {
    value: 6,
    label: "3XL",
    description: "Intensité maximale.",
  },
} as const satisfies Record<string, UIConstant<number>>;

/**
 * @type MotionSizeIntensity
 * @description
 * Token d’intensité de mouvement dérivé
 * de {@link MOTION_SIZE_INTENSITY}.
 */
export type MotionSizeIntensity =
  keyof typeof MOTION_SIZE_INTENSITY;