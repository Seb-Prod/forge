// 🧠 Type générique pour toutes les constantes UI

export type UIConstant<T> = {
  value: T;
  label: string;
  description: string;
};

/**
 * @type ComponentShadowStates
 * @description États d'élévation d'un composant.
 */
export type ComponentShadowStates = {
  default: string;
  hover: string;
  active: string;
  disabled?: string;
};

export type ShadowTokenMap = Record<
  string,
  UIConstant<ComponentShadowStates>
>;
