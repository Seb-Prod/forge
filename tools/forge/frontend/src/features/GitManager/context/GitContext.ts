import { createContext } from "react";
import type { GitContextType } from "./GitContext.types";

export const GitContext = createContext<GitContextType | undefined>(undefined);