import { Spacing, SPACINGS } from "../constants";

export const getSpacingValue = (spacing?: Spacing): string | undefined => {
  if (!spacing) return undefined;
  if (!SPACINGS[spacing]) {
    console.warn(`[getSpacingValue] Token inconnu : "${spacing}"`);
    return undefined;
  }
  return SPACINGS[spacing].value;
};