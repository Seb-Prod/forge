import { SIZES } from "../constants";
import { createTokenResolver } from "./shared";

export const getSize = createTokenResolver(SIZES, "md");