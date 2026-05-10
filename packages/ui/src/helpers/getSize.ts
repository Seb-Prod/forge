import { COMPONENT_SIZES } from "../constants";
import { createTokenResolver } from "./shared";

export const getSize = createTokenResolver(COMPONENT_SIZES, "md");