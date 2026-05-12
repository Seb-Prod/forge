import { ComponentShadowStates, UIConstant } from "../types/ui-constant";

/**
 * @constant COMPONENT_SHADOWS_ELEVATED
 * @description Shadows des composants "elevated"
 * selon leur taille.
 *
 * Les shadows utilisent :
 * - une élévation faible sur les petites tailles
 * - une élévation plus diffuse sur les grandes tailles
 *
 * La couleur provient de :
 * `--component-shadow`
 */
export const COMPONENT_SHADOWS_ELEVATED = {
  xxs: {
    value: {
      default: `
        0 1px 2px rgb(from var(--component-shadow) r g b / 0.10)
      `,
      hover: `
        0 2px 4px rgb(from var(--component-shadow) r g b / 0.14)
      `,
      active: `
        0 1px 1px rgb(from var(--component-shadow) r g b / 0.08)
      `,
      disabled: "none",
    },
    label: "XXS",
    description: "Shadow minimale.",
  },

  xs: {
    value: {
      default: `
        0 1px 3px rgb(from var(--component-shadow) r g b / 0.11)
      `,
      hover: `
        0 2px 5px rgb(from var(--component-shadow) r g b / 0.15)
      `,
      active: `
        0 1px 2px rgb(from var(--component-shadow) r g b / 0.09)
      `,
      disabled: "none",
    },
    label: "XS",
    description: "Très petite shadow.",
  },

  sm: {
    value: {
      default: `
        0 2px 4px rgb(from var(--component-shadow) r g b / 0.12)
      `,
      hover: `
        0 4px 8px rgb(from var(--component-shadow) r g b / 0.16)
      `,
      active: `
        0 2px 3px rgb(from var(--component-shadow) r g b / 0.10)
      `,
      disabled: "none",
    },

    label: "SM",
    description: "Petite shadow.",
  },

  md: {
    value: {
      default: `
        0 4px 8px rgb(from var(--component-shadow) r g b / 0.14)
      `,
      hover: `
        0 6px 14px rgb(from var(--component-shadow) r g b / 0.18)
      `,
      active: `
        0 2px 4px rgb(from var(--component-shadow) r g b / 0.10)
      `,
      disabled: "none",
    },

    label: "MD",
    description: "Shadow standard.",
  },

  lg: {
    value: {
      default: `
        0 6px 12px rgb(from var(--component-shadow) r g b / 0.16)
      `,
      hover: `
        0 10px 20px rgb(from var(--component-shadow) r g b / 0.20)
      `,
      active: `
        0 4px 8px rgb(from var(--component-shadow) r g b / 0.12)
      `,
      disabled: "none",
    },
    label: "LG",
    description: "Grande shadow.",
  },

  xl: {
    value: {
      default: `
        0 10px 24px rgb(from var(--component-shadow) r g b / 0.18)
      `,
      hover: `
        0 14px 32px rgb(from var(--component-shadow) r g b / 0.22)
      `,
      active: `
        0 6px 12px rgb(from var(--component-shadow) r g b / 0.14)
      `,
      disabled: "none",
    },
    label: "XL",
    description: "Très grande shadow.",
  },

  "2xl": {
    value: {
      default: `
        0 14px 32px rgb(from var(--component-shadow) r g b / 0.20)
      `,
      hover: `
        0 18px 40px rgb(from var(--component-shadow) r g b / 0.24)
      `,
      active: `
        0 8px 16px rgb(from var(--component-shadow) r g b / 0.16)
      `,
      disabled: "none",
    },
    label: "2XL",
    description: "Shadow extra large.",
  },

  "3xl": {
    value: {
      default: `
        0 18px 40px rgb(from var(--component-shadow) r g b / 0.22)
      `,
      hover: `
        0 24px 48px rgb(from var(--component-shadow) r g b / 0.26)
      `,
      active: `
        0 10px 20px rgb(from var(--component-shadow) r g b / 0.18)
      `,
      disabled: "none",
    },
    label: "3XL",
    description: "Shadow massive.",
  },
} as const satisfies Record<
  string,
  UIConstant<ComponentShadowStates>
>;

/**
 * @type ComponentShadowElevatedSize
 * @description Token de shadow dérivé de
 * {@link COMPONENT_SHADOWS_ELEVATED}.
 */
export type ComponentShadowElevatedSize =
  keyof typeof COMPONENT_SHADOWS_ELEVATED;