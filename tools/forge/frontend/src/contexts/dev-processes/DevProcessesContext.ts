import { createContext } from "react";
import type { DevProcess } from "@/types/types";


export interface DevProcessesContextValue {
  processes: DevProcess[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export const DevProcessesContext = createContext<
  DevProcessesContextValue | undefined
>(undefined);