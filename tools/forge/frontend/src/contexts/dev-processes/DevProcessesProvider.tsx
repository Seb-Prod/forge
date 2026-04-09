// src/context/dev-processes/DevProcessesProvider.tsx

import { useCallback } from "react";
import { useActions } from "@/hooks/useActions";
import { DevProcessesContext } from "./DevProcessesContext";

interface Props {
  children: React.ReactNode;
  pollingInterval?: number;
}

export const DevProcessesProvider = ({
  children,
  pollingInterval = 2000,
}: Props) => {
  const { actions, loading, error, refetch } = useActions({
    pollingInterval,
  });

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return (
    <DevProcessesContext.Provider
      value={{
        processes: actions,
        loading,
        error,
        refresh,
      }}
    >
      {children}
    </DevProcessesContext.Provider>
  );
};