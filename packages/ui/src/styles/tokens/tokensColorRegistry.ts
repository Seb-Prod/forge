import { VariantStateMap } from "@workspace/ui/types";
import {
  tokens3DDefault,
  tokensElevatedDefault,
  tokensGhostDefault,
  tokensOutlineDefault,
  tokensSolidDefault,
} from "./bases/colors";

const colorTokens = {
  solid: tokensSolidDefault,
  ghost: tokensGhostDefault,
  outline: tokensOutlineDefault,
  elevated: tokensElevatedDefault,
  "3d": tokens3DDefault,
} as const;

export const COMPONENT_COLOR_TOKENS_DEFAULT = {
  light: Object.fromEntries(
    Object.entries(colorTokens).map(([key, value]) => [key, value.light]),
  ),

  dark: Object.fromEntries(
    Object.entries(colorTokens).map(([key, value]) => [key, value.dark]),
  ),
} as const satisfies Record<"light" | "dark", Partial<VariantStateMap>>;
