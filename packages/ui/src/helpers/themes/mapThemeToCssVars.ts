export const mapThemeToCssVars = (
  theme: Record<string, string>,
  prefix: string,
) =>
  Object.fromEntries(
    Object.entries(theme).map(([key, value]) => [
      `--${prefix}-${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`,
      value,
    ]),
  );