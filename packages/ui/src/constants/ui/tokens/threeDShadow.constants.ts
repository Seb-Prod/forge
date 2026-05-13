import { ComponentShadowStates, UIConstant } from "../types/ui-constant";

/**
 * @constant THREE_D_SHADOWS
 * @description Shadows avec effet 3D / profondeur.
 *
 * Le principe :
 * - une shadow basse plus sombre
 * - une highlight subtile en haut
 * - une impression de relief physique
 *
 * Utilise :
 * - `--component-shadow`
 * - `--component-highlight`
 */
export const THREE_D_SHADOWS = {
  xxs: {
    value: {
      default: `
        0 1px 0 rgb(from var(--component-highlight) r g b / 0.70),
        0 2px 2px rgb(from var(--component-shadow) r g b / 0.18)
      `,
      hover: `
        0 1px 0 rgb(from var(--component-highlight) r g b / 0.85),
        0 3px 4px rgb(from var(--component-shadow) r g b / 0.22)
      `,
      active: `
        inset 0 1px 2px rgb(from var(--component-shadow) r g b / 0.18)
      `,
      disabled: "none",
    },
    label: "XXS",
    description: "Relief minimal.",
  },

  xs: {
    value: {
      default: `
        0 1px 0 rgb(from var(--component-highlight) r g b / 0.75),
        0 3px 4px rgb(from var(--component-shadow) r g b / 0.20)
      `,
      hover: `
        0 1px 0 rgb(from var(--component-highlight) r g b / 0.90),
        0 4px 6px rgb(from var(--component-shadow) r g b / 0.24)
      `,
      active: `
        inset 0 1px 3px rgb(from var(--component-shadow) r g b / 0.20)
      `,
      disabled: "none",
    },
    label: "XS",
    description: "Très léger relief.",
  },

  sm: {
    value: {
      default: `
        0 1px 0 rgb(from var(--component-highlight) r g b / 0.80),
        0 4px 6px rgb(from var(--component-shadow) r g b / 0.22)
      `,
      hover: `
        0 1px 0 rgb(from var(--component-highlight) r g b / 1),
        0 6px 10px rgb(from var(--component-shadow) r g b / 0.26)
      `,
      active: `
        inset 0 2px 4px rgb(from var(--component-shadow) r g b / 0.22)
      `,
      disabled: "none",
    },
    label: "SM",
    description: "Petit effet 3D.",
  },

  md: {

  value: {

    default: `
      0 2px 0 var(--component-highlight),
      0 4px 0 var(--component-shadow),
      0 10px 16px rgb(from var(--component-shadow) r g b / 0.28)
    `,

    hover: `
      0 3px 0 var(--component-highlight),
      0 6px 0 var(--component-shadow),
      0 14px 22px rgb(from var(--component-shadow) r g b / 0.32)
    `,

    active: `
      0 1px 0 var(--component-highlight),
      0 4px 0 var(--component-shadow),
      0 10px 16px rgb(from var(--component-shadow) r g b / 0.28)
    `,

    disabled: `
      0 2px 0 rgb(from var(--component-shadow) r g b / 0.15)
    `,

  },

  label: "MD",

  description: "Relief standard 3D.",

},

  lg: {
    value: {
      default: `
        0 2px 0 rgb(from var(--component-highlight) r g b / 0.90),
        0 8px 14px rgb(from var(--component-shadow) r g b / 0.26)
      `,
      hover: `
        0 2px 0 rgb(from var(--component-highlight) r g b / 1),
        0 12px 20px rgb(from var(--component-shadow) r g b / 0.30)
      `,
      active: `
        inset 0 4px 8px rgb(from var(--component-shadow) r g b / 0.26)
      `,
      disabled: "none",
    },
    label: "LG",
    description: "Relief important.",
  },

  xl: {
    value: {
      default: `
        0 3px 0 rgb(from var(--component-highlight) r g b / 0.95),
        0 12px 20px rgb(from var(--component-shadow) r g b / 0.28)
      `,
      hover: `
        0 3px 0 rgb(from var(--component-highlight) r g b / 1),
        0 16px 28px rgb(from var(--component-shadow) r g b / 0.32)
      `,
      active: `
        inset 0 5px 10px rgb(from var(--component-shadow) r g b / 0.28)
      `,
      disabled: "none",
    },
    label: "XL",
    description: "Effet 3D marqué.",
  },

  "2xl": {
    value: {
      default: `
        0 4px 0 rgb(from var(--component-highlight) r g b / 1),
        0 16px 28px rgb(from var(--component-shadow) r g b / 0.30)
      `,
      hover: `
        0 4px 0 rgb(from var(--component-highlight) r g b / 1),
        0 20px 36px rgb(from var(--component-shadow) r g b / 0.34)
      `,
      active: `
        inset 0 6px 12px rgb(from var(--component-shadow) r g b / 0.30)
      `,
      disabled: "none",
    },
    label: "2XL",
    description: "Gros relief 3D.",
  },

  "3xl": {
    value: {
      default: `
        0 5px 0 rgb(from var(--component-highlight) r g b / 1),
        0 20px 40px rgb(from var(--component-shadow) r g b / 0.32)
      `,
      hover: `
        0 5px 0 rgb(from var(--component-highlight) r g b / 1),
        0 28px 52px rgb(from var(--component-shadow) r g b / 0.36)
      `,
      active: `
        inset 0 8px 16px rgb(from var(--component-shadow) r g b / 0.32)
      `,
      disabled: "none",
    },
    label: "3XL",
    description: "Relief massif.",
  },
} as const satisfies Record<
  string,
  UIConstant<ComponentShadowStates>
>;

/**
 * @type ThreeDShadow
 * @description Token de shadow 3D dérivé de
 * {@link THREE_D_SHADOWS}.
 */
export type ThreeDShadow =
  keyof typeof THREE_D_SHADOWS;