import { useEffect, useState } from "react";

export const useGitCountdown = ({
  enabled,
  intervalMs,
  lastRun,
}: {
  enabled: boolean;
  intervalMs: number;
  lastRun: number;
}) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!enabled) return;

    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, [enabled]);

  if (!enabled) return null;

  return Math.max(0, lastRun + intervalMs - now);
};