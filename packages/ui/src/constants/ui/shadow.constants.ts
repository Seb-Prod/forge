import { UIConstant } from "./type";

/**
 * @constant SHADOWS
 * @description Niveaux d'ombre pour marquer l'élévation visuelle d'un composant.
 */
export const SHADOWS = {
  none:  { value: "--shadow-none",  label: "None",       description: "Aucune ombre."              },
  xs:    { value: "--shadow-xs",    label: "Extra Small", description: "Ombre très légère."         },
  sm:    { value: "--shadow-sm",    label: "Small",      description: "Ombre légère."              },
  md:    { value: "--shadow-md",    label: "Medium",     description: "Ombre standard."            },
  lg:    { value: "--shadow-lg",    label: "Large",      description: "Ombre marquée."             },
  xl:    { value: "--shadow-xl",    label: "Extra Large", description: "Ombre prononcée."           },
  "2xl": { value: "--shadow-2xl",   label: "2X Large",   description: "Ombre très prononcée."      },
  inner: { value: "--shadow-inner", label: "Inner",      description: "Ombre intérieure (inset)."  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type Shadow
 * @description Token d'ombre dérivé de {@link SHADOWS}.
 * Utilisé pour la prop `shadow` des composants UI.
 */
export type Shadow = keyof typeof SHADOWS;