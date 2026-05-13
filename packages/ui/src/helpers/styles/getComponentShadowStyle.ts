import { UIConstant, Variant } from "@workspace/ui/constants";
import { ComponentShadowStates } from "@workspace/ui/constants/ui/types/ui-constant";

type ShadowSizeMap = Record<string, UIConstant<ComponentShadowStates>>;

type GetComponentShadowStyleParams<T extends string> = {
  size: T;
  variant?: Variant;
  shadows: Partial<Record<Variant, ShadowSizeMap>>;
};

const SHADOW_STATES = ["default", "hover", "active", "disabled"] as const;
type ShadowState = (typeof SHADOW_STATES)[number];

const SHADOW_STATE_SUFFIX: Record<ShadowState, string> = {
  default: "",
  hover: "-hover",
  active: "-active",
  disabled: "-disabled",
};

/**
 * Generates a flat map of component-scoped CSS custom properties for
 * `box-shadow` values across all interactive states.
 *
 * Resolves via `shadows[variant][size].value[state]`.
 * Returns `{}` silently when the variant has no shadow definition
 * (e.g. `"ghost"`, `"outline"`).
 *
 * @example
 * ```tsx
 * getComponentShadowStyle({
 *   size: "md",
 *   variant: "elevated",
 *   shadows: COMPONENT_SHADOW_TOKENS_DEFAULT,
 * })
 * // → { "--component-shadow": "0 4px 8px …", "--component-shadow-hover": "…", … }
 * ```
 *
 * @version 1.0.0
 */
export const getComponentShadowStyle = <T extends string>({
  size,
  variant = "solid",
  shadows,
}: GetComponentShadowStyleParams<T>): Record<string, string> => {
  const sizeMap = shadows[variant];

  // Ce variant n'a pas de shadows (ghost, outline…) → rien à émettre
  if (!sizeMap) return {};

  const token = sizeMap[size];

  // Taille non couverte → rien à émettre
  if (!token) return {};

  return Object.fromEntries(
    SHADOW_STATES.map((state) => {
      const suffix = SHADOW_STATE_SUFFIX[state];
      const key = `--component-shadow-box${suffix}`;
      const value = token.value[state] ?? "none";
      return [key, value];
    }),
  );
};
