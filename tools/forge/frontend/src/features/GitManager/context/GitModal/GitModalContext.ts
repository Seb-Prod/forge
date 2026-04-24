import { createContext } from "react";
import type { GitModalContextType } from "./GitModalContext.types";

export const GitModalContext = createContext<GitModalContextType | undefined>(
  undefined,
);
