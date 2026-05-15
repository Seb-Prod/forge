import { MOTION_SIZE_INTENSITY, MOTION_TRANSITIONS } from "@workspace/ui/constants/ui/component/motion.constants";
import { ComponentMotionMap } from "@workspace/ui/types/component.type";

/**
 * @function createSolidMotion
 * @description
 * Génère les animations du variant `solid`.
 *
 * Philosophie UX :
 * - hover → léger lift
 * - active → bouton pressé
 *
 * L’intensité dépend de la taille du composant.
 */
export const createSolidMotion = (
  size: keyof typeof MOTION_SIZE_INTENSITY
): ComponentMotionMap => {
  const distance = MOTION_SIZE_INTENSITY[size].value;

  return {
    default: {
      transform: "translateY(0)",

      transition: `
        transform ${MOTION_TRANSITIONS.standard.value},
        box-shadow ${MOTION_TRANSITIONS.standard.value},
        background-color ${MOTION_TRANSITIONS.standard.value}
      `,
    },

    hover: {
      transform: `translateY(-${distance}px)`,
    },

    active: {
      transform: `translateY(${distance}px) scale(.98)`,
    },

    disabled: {
      transform: "translateY(0)",
    },

    focus: {},
  };
};