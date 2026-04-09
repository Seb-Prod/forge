export const toPascalCase = (value: string): string =>
  value.replace(/[-_ ]+/g, " ").trim().split(" ")
    .map((w) => w ? w.charAt(0).toUpperCase() + w.slice(1) : "")
    .join("");

export const toCamelCase = (value: string): string => {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

export const toHookName = (value: string): string => {
  const camel = toCamelCase(value);
  return camel.startsWith("use") ? camel : `use${toPascalCase(value)}`;
};

// Map exportée pour la config déclarative
export const namingStrategies = {
  pascal: toPascalCase,
  camel: toCamelCase,
  hook: toHookName,
} satisfies Record<string, (v: string) => string>;