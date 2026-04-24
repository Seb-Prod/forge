import { createContext } from "react";
import type { GitRepositoryContextType } from "./GitRepositoryContext.types";

export const GitRepositoryContext = createContext<
  GitRepositoryContextType | undefined
>(undefined);
