import { useState, useEffect } from "react";
import {
  LOCAL_REFRESH_INTERVAL,
  REMOTE_REFRESH_INTERVAL,
  STATUS_REFRESH_INTERVAL,
} from "../hooks/useGitActions";

export const useGitCountdown = (enabled: {
  local:  boolean;
  remote: boolean;
  status: boolean;
}) => {
  const [localRemaining,  setLocalRemaining]  = useState(LOCAL_REFRESH_INTERVAL);
  const [remoteRemaining, setRemoteRemaining] = useState(REMOTE_REFRESH_INTERVAL);
  const [statusRemaining, setStatusRemaining] = useState(STATUS_REFRESH_INTERVAL);

  useEffect(() => {
    const tick = setInterval(() => {
      setLocalRemaining ((p) => enabled.local  ? (p <= 1 ? LOCAL_REFRESH_INTERVAL  : p - 1) : p);
      setRemoteRemaining((p) => enabled.remote ? (p <= 1 ? REMOTE_REFRESH_INTERVAL : p - 1) : p);
      setStatusRemaining((p) => enabled.status ? (p <= 1 ? STATUS_REFRESH_INTERVAL : p - 1) : p);
    }, 1000);
    return () => clearInterval(tick);
  }, [enabled.local, enabled.remote, enabled.status, statusRemaining]);

  

  return { localRemaining, remoteRemaining, statusRemaining };
};