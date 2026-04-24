import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: (value: any) => value is T
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return initialValue;

      const parsed = JSON.parse(stored);

      if (validate && !validate(parsed)) {
        return initialValue;
      }

      return parsed;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}