export function pickConstants<T extends Record<string, unknown>, K extends keyof T>(
  constants: T,
  keys: K[]
): Pick<T, K> {
  return Object.fromEntries(
    keys.map((key) => [key, constants[key]])
  ) as Pick<T, K>;
}