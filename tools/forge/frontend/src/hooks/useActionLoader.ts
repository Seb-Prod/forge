import { useState, useCallback } from "react";

export function useActionLoader<T extends unknown[], R>(
  action: (actionId: string, ...args: T) => Promise<R>
) {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleExecute = useCallback(async (actionId: string, ...args: T) => {
    setLoading(prev => ({ ...prev, [actionId]: true }));
    try {
      return await action(actionId, ...args);
    } catch (error) {
      console.error(`Failed to execute ${actionId}:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [actionId]: false }));
    }
  }, [action]);

  return { loading, handleExecute };
}