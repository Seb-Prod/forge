export function generateJsx(
  componentName: string,
  props: Record<string, any> = {},
  children?: string
) {
  const entries = Object.entries(props).filter(([_, v]) => v !== undefined);

  const propsLines = entries
    .map(([key, value]) => {
      if (typeof value === "string") return `${key}="${value}"`;
      if (typeof value === "boolean") return value ? key : null;
      if (typeof value === "function") return `${key}={() => {}}`;
      if (typeof value === "object") return `${key}={...}`;
      return `${key}={${JSON.stringify(value)}}`;
    })
    .filter(Boolean);

  const propsString =
    propsLines.length > 0
      ? "\n  " + propsLines.join("\n  ") + "\n"
      : "";

  if (children) {
    return `<${componentName}${propsString}>
  ${children}
</${componentName}>`;
  }

  return `<${componentName}${propsString}/>`;
}