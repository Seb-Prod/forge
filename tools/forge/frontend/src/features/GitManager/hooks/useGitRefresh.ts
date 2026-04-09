import { useEffect, useState } from "react";
import { LOCAL_REFRESH_INTERVAL, REMOTE_REFRESH_INTERVAL, STATUS_REFRESH_INTERVAL } from "./useGitActions";

type Handlers = {
  handleLocalTree:  () => Promise<void>;
  handleRemoteTree: () => Promise<void>;
  handleStatus:     () => Promise<void>;
};

export const useGitRefresh = ({
  handleLocalTree, handleRemoteTree, handleStatus,
}: Handlers) => {
  const [localEnabled,  setLocalEnabled]  = useState(true);
  const [remoteEnabled, setRemoteEnabled] = useState(true);
  const [statusEnabled, setStatusEnabled] = useState(true);

  useEffect(() => {
    handleLocalTree();
    handleRemoteTree();
    handleStatus();
  }, [handleLocalTree, handleRemoteTree, handleStatus]);

  useEffect(() => {
    if (!localEnabled) return;
    const id = setInterval(handleLocalTree, LOCAL_REFRESH_INTERVAL * 1000);
    return () => clearInterval(id);
  }, [localEnabled, handleLocalTree]);

  useEffect(() => {
    if (!remoteEnabled) return;
    const id = setInterval(handleRemoteTree, REMOTE_REFRESH_INTERVAL * 1000);
    return () => clearInterval(id);
  }, [remoteEnabled, handleRemoteTree]);

  useEffect(() => {
    if (!statusEnabled) return;
    const id = setInterval(handleStatus, STATUS_REFRESH_INTERVAL * 1000);
    return () => clearInterval(id);
  }, [statusEnabled, handleStatus]);

  return {
    localEnabled,  setLocalEnabled,
    remoteEnabled, setRemoteEnabled,
    statusEnabled, setStatusEnabled,
  };
};