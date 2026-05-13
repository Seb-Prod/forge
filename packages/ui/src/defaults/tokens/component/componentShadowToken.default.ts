import {
  ELEVATION_SHADOWS,
  THREE_D_SHADOWS,
  Variant,
} from "@workspace/ui/constants";
import { ShadowTokenMap } from "@workspace/ui/constants/ui/types/ui-constant";

export const COMPONENT_SHADOW_TOKENS_DEFAULT = {
  elevated: ELEVATION_SHADOWS,
  solid: THREE_D_SHADOWS,
} satisfies Partial<Record<Variant, ShadowTokenMap>>;
