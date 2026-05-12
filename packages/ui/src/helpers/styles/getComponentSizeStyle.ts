import { ComponentSizeTokens } from "@workspace/ui/types";
import { getRadius } from "../radius.helpers";
import { getMargin } from "../spacing";
import {
  BORDER_SIZES,
  COMPONENT_SIZES,
  getConstantValue,
  TEXT_SIZES,
} from "@workspace/ui/constants";

/** @version 1.1.0 */

type ComponentCSSVars = Record<string, string>;

type SizeMap<T extends string = string> = Record<T, ComponentSizeTokens>;

type GetComponentSizeStyleParams<T extends string> = {
  size?: T;
  sizes: SizeMap<T>;
};

const SIZE_VARS: Array<{
  key: string;
  resolve: (tokens: ComponentSizeTokens) => string | undefined;
}> = [
  { key: "--component-radius", resolve: (t) => getRadius(t.radius) },
  { key: "--component-padding", resolve: (t) => getMargin(t.paddingX) },
  {
    key: "--component-height",
    resolve: (t) => getConstantValue(COMPONENT_SIZES, t.height),
  },
  {
    key: "--component-fontSize",
    resolve: (t) => getConstantValue(TEXT_SIZES, t.fontSize),
  },
  {
    key: "--component-borderSize",
    resolve: (t) => getConstantValue(BORDER_SIZES, t.borderSize),
  },
];

/**
 * Generates a flat map of component-scoped CSS custom properties for a given
 * size token, covering radius, padding, height, font size, and border size.
 *
 * Returns an empty object when `size` is not provided.
 *
 * Intended to be spread directly onto a React element's `style` prop.
 *
 * @example
 * ```tsx
 * <button
 *   style={getComponentSizeStyle({ size: "md", sizes })}
 * />
 * ```
 *
 * @version 1.1.0
 */
export const getComponentSizeStyle = <T extends string>({
  size,
  sizes,
}: GetComponentSizeStyleParams<T>): ComponentCSSVars => {
  if (!size) return {};

  const tokens = sizes[size];

  return Object.fromEntries(
    SIZE_VARS.flatMap(({ key, resolve }) => {
      const value = resolve(tokens);
      return value !== undefined ? [[key, value]] : [];
    }),
  );
};