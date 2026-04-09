// src/context/dev-processes/useDevProcesses.ts

import { useContext } from "react";
import { DevProcessesContext } from "./DevProcessesContext";

export const useDevProcesses = () => {
  const context = useContext(DevProcessesContext);

  if (!context) {
    throw new Error(
      "useDevProcesses must be used within a DevProcessesProvider"
    );
  }

  return context;
};