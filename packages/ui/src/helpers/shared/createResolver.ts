import { CSS_SIZE_REGEX } from "@workspace/ui/constants";
import { createLogger } from "./createLogger";


export const createResolver = <T extends string>(
  map: Record<string, { value: string }>,
  logger: ReturnType<typeof createLogger>,
  context: string,
) => (value: T | string): string => {
  if (Object.prototype.hasOwnProperty.call(map, value)) {
    return `var(${map[value].value})`;
  }
  if (!CSS_SIZE_REGEX.test(value)) {
    logger.warn(`Valeur invalide : "${value}". Attendu : token ${context} ou taille CSS valide.`);
  }
  return value;
};