import { ComponentShadowStates, UIConstant } from "../types/ui-constant";

/**
 * @constant THREE_D_SHADOWS
 * @description Shadows avec effet 3D / profondeur.
 *
 * Le principe :
 * - une highlight solide en haut (top border)
 * - une shadow solide en bas (bottom border)
 * - un blur diffus pour la profondeur ambiante
 * - état active : compression du relief
 * - état disabled : relief atténué
 *
 * Utilise :
 * - `--component-shadow`
 * - `--component-highlight`
 */
export const THREE_D_SHADOWS = {
  xxs: {
    value: {
      default: `
        0 1px 0 var(--component-highlight),
        0 2px 0 var(--component-shadow),
        0 4px 6px rgb(from var(--component-shadow) r g b / 0.16)
      `,
      hover: `
        0 1px 0 var(--component-highlight),
        0 3px 0 var(--component-shadow),
        0 6px 10px rgb(from var(--component-shadow) r g b / 0.20)
      `,
      active: `
        0 1px 0 var(--component-highlight),
        0 1px 0 var(--component-shadow),
        0 2px 4px rgb(from var(--component-shadow) r g b / 0.16)
      `,
      disabled: `
        0 1px 0 rgb(from var(--component-shadow) r g b / 0.10)
      `,
    },
    label: "XXS",
    description: "Relief minimal.",
  },

  xs: {
    value: {
      default: `
        0 1px 0 var(--component-highlight),
        0 3px 0 var(--component-shadow),
        0 6px 10px rgb(from var(--component-shadow) r g b / 0.20)
      `,
      hover: `
        0 1px 0 var(--component-highlight),
        0 4px 0 var(--component-shadow),
        0 8px 14px rgb(from var(--component-shadow) r g b / 0.24)
      `,
      active: `
        0 1px 0 var(--component-highlight),
        0 2px 0 var(--component-shadow),
        0 4px 6px rgb(from var(--component-shadow) r g b / 0.20)
      `,
      disabled: `
        0 1px 0 rgb(from var(--component-shadow) r g b / 0.12)
      `,
    },
    label: "XS",
    description: "Très léger relief.",
  },

  sm: {
    value: {
      default: `
        0 1px 0 var(--component-highlight),
        0 3px 0 var(--component-shadow),
        0 8px 12px rgb(from var(--component-shadow) r g b / 0.22)
      `,
      hover: `
        0 2px 0 var(--component-highlight),
        0 5px 0 var(--component-shadow),
        0 10px 18px rgb(from var(--component-shadow) r g b / 0.26)
      `,
      active: `
        0 1px 0 var(--component-highlight),
        0 2px 0 var(--component-shadow),
        0 6px 10px rgb(from var(--component-shadow) r g b / 0.22)
      `,
      disabled: `
        0 1px 0 rgb(from var(--component-shadow) r g b / 0.13)
      `,
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
        0 2px 0 var(--component-highlight),
        0 6px 0 var(--component-shadow),
        0 14px 22px rgb(from var(--component-shadow) r g b / 0.30)
      `,
      hover: `
        0 3px 0 var(--component-highlight),
        0 8px 0 var(--component-shadow),
        0 18px 28px rgb(from var(--component-shadow) r g b / 0.34)
      `,
      active: `
        0 1px 0 var(--component-highlight),
        0 5px 0 var(--component-shadow),
        0 12px 18px rgb(from var(--component-shadow) r g b / 0.30)
      `,
      disabled: `
        0 2px 0 rgb(from var(--component-shadow) r g b / 0.17)
      `,
    },
    label: "LG",
    description: "Relief important.",
  },

  xl: {
    value: {
      default: `
        0 3px 0 var(--component-highlight),
        0 8px 0 var(--component-shadow),
        0 18px 30px rgb(from var(--component-shadow) r g b / 0.32)
      `,
      hover: `
        0 4px 0 var(--component-highlight),
        0 10px 0 var(--component-shadow),
        0 22px 36px rgb(from var(--component-shadow) r g b / 0.36)
      `,
      active: `
        0 2px 0 var(--component-highlight),
        0 6px 0 var(--component-shadow),
        0 14px 24px rgb(from var(--component-shadow) r g b / 0.32)
      `,
      disabled: `
        0 3px 0 rgb(from var(--component-shadow) r g b / 0.18)
      `,
    },
    label: "XL",
    description: "Effet 3D marqué.",
  },

  "2xl": {
    value: {
      default: `
        0 3px 0 var(--component-highlight),
        0 10px 0 var(--component-shadow),
        0 22px 36px rgb(from var(--component-shadow) r g b / 0.34)
      `,
      hover: `
        0 4px 0 var(--component-highlight),
        0 12px 0 var(--component-shadow),
        0 28px 44px rgb(from var(--component-shadow) r g b / 0.38)
      `,
      active: `
        0 2px 0 var(--component-highlight),
        0 8px 0 var(--component-shadow),
        0 18px 30px rgb(from var(--component-shadow) r g b / 0.34)
      `,
      disabled: `
        0 3px 0 rgb(from var(--component-shadow) r g b / 0.20)
      `,
    },
    label: "2XL",
    description: "Gros relief 3D.",
  },

  "3xl": {
    value: {
      default: `
        0 4px 0 var(--component-highlight),
        0 12px 0 var(--component-shadow),
        0 28px 48px rgb(from var(--component-shadow) r g b / 0.36)
      `,
      hover: `
        0 5px 0 var(--component-highlight),
        0 16px 0 var(--component-shadow),
        0 36px 60px rgb(from var(--component-shadow) r g b / 0.40)
      `,
      active: `
        0 2px 0 var(--component-highlight),
        0 10px 0 var(--component-shadow),
        0 22px 40px rgb(from var(--component-shadow) r g b / 0.36)
      `,
      disabled: `
        0 4px 0 rgb(from var(--component-shadow) r g b / 0.22)
      `,
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