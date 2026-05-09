/** Pas de niveau de scale CSS (0–950). */
export type ScaleStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** Niveau d'élévation d'ombre (0 = aucune, 5 = maximale). */
export type ShadowLevel = 0 | 1 | 2 | 3 | 4 | 5;

/** État d'un composant interactif. */
export type ComponentState = "default" | "hover" | "active" | "disabled" | "focus";

/** Tokens de style associés à un état. */
export interface ComponentStateTokens {
  bg: ScaleStep;
  text: ScaleStep;
  border: ScaleStep;
  shadow: ShadowLevel;
}

export type ComponentStateMap = Record<ComponentState, ComponentStateTokens>;