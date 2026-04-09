import { UIConstant } from "./type";

/**
 * @constant LABEL_POSITIONS
 * @description Positions du label par rapport à son champ de formulaire.
 */
export const LABEL_POSITIONS = {
  top:      { value: "top",      label: "Top",      description: "Au-dessus" },
  left:     { value: "left",     label: "Left",     description: "À gauche"  },
  floating: { value: "floating", label: "Floating", description: "Flottant"  },
} as const satisfies Record<string, UIConstant<string>>;

/**
 * @type LabelPosition
 * @description Token de position de label dérivé de {@link LABEL_POSITIONS}.
 * Utilisé pour la prop `labelPosition` des composants de formulaire.
 */
export type LabelPosition = keyof typeof LABEL_POSITIONS;