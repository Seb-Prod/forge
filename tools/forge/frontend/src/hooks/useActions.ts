// hooks/useActions.ts
import { useCallback, useEffect, useState } from "react";
import { getAllActions, getActionsByCategory } from "../services/api";
import type { ActionCategory, DevProcess } from "@/types/types";

interface UseActionsOptions {
  category?: ActionCategory;
  pollingInterval?: number;
  enabled?: boolean;
}

export const useActions = (options: UseActionsOptions = {}) => {
  const { category, pollingInterval = 2000, enabled = true } = options;
  
  const [actions, setActions] = useState<DevProcess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchActions = useCallback(async () => {  // ← useCallback pour stabiliser la référence
    try {
      setLoading(true);
      const data = category
        ? await getActionsByCategory(category)
        : await getAllActions();
      setActions(data.actions);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    if (!enabled) return;

    fetchActions();
    const interval = setInterval(fetchActions, pollingInterval);

    return () => clearInterval(interval);
  }, [fetchActions, pollingInterval, enabled]);

  return { actions, loading, error, refetch: fetchActions };
};