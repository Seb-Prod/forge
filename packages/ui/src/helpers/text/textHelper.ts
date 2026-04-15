import { TEXT_DECORATIONS, TEXT_LINE_HEIGHTS, TEXT_SIZES, TEXT_WEIGHTS } from "@workspace/ui/constants";
import { createTokenResolver, createTokenValueResolver } from "../shared/createTokenResolver";

export const getTextSize = createTokenResolver(TEXT_SIZES, "md");
export const getTextLigneHeight = createTokenResolver(TEXT_LINE_HEIGHTS, "normal");
export const getTextWeight = createTokenResolver(TEXT_WEIGHTS, "regular");
export const getTextDecoration = createTokenValueResolver(TEXT_DECORATIONS, "none")
