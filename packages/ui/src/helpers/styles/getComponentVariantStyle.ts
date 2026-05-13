import { Tone, Variant } from "@workspace/ui/constants";
import { VariantStateMap } from "@workspace/ui/types";

/** @version 1.1.0 */

type ComponentCSSVars = Record<string, string>;

type GetComponentVariantStyleParams = {
  tone?: Tone;
  variant?: Variant;
  mode?: "light" | "dark";
  appearances: Record<"light" | "dark", VariantStateMap>;
};

const STATES = ["default", "hover", "active", "disabled"] as const;
const PROPS = ["bg", "text", "border", "shadow", "highlight"] as const;

type State = (typeof STATES)[number];

const STATE_SUFFIX: Record<State, string> = {
  default: "",
  hover: "-hover",
  active: "-active",
  disabled: "-disabled",
};

/**
 * Builds a CSS custom property value referencing a design-token color.
 *
 * @param tone  - The color tone (e.g. `"neutral"`, `"danger"`).
 * @param value - The scale step. Defaults to `0` when omitted.
 * @returns A `var(--color-<tone>-<value>)` string.
 */
const getColorVar = (tone: Tone, value?: string | number): string =>
  `var(--color-${tone}-${value ?? 0})`;

/**
 * Generates a flat map of component-scoped CSS custom properties for a given
 * tone/variant/mode combination, covering all interactive states
 * (`default`, `hover`, `active`, `disabled`) and visual properties
 * (`bg`, `text`, `border`).
 *
 * Intended to be spread directly onto a React element's `style` prop.
 *
 * @example
 * ```tsx
 * <button
 *   style={getComponentVariantStyle({
 *     tone: "danger",
 *     variant: "solid",
 *     mode: "light",
 *     appearances,
 *   })}
 * />
 * ```
 *
 * @version 1.1.0
 */
export const getComponentVariantStyle = ({
  tone = "neutral",
  variant = "solid",
  mode = "light",
  appearances,
}: GetComponentVariantStyleParams): ComponentCSSVars => {
  const levels = appearances[mode][variant];

  return Object.fromEntries(
    STATES.flatMap((state) =>
      PROPS.map((prop) => {
        const suffix = STATE_SUFFIX[state];
        const key = `--component-${prop}${suffix}`;
        const value = getColorVar(tone, levels[state][prop]);
        return [key, value];
      }),
    ),
  );
};